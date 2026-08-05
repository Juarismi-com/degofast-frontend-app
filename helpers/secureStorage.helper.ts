/**
 * Persistencia cifrada en localStorage (AES-GCM, Web Crypto API).
 *
 * La clave de cifrado vive únicamente en sessionStorage: se genera una vez
 * por sesión de navegador y se pierde al cerrarlo. Esto es intencional: si
 * la clave viviera junto a los datos cifrados (localStorage), cualquiera con
 * acceso al disco tendría ambos y el cifrado no protegería nada. Con la
 * clave en sessionStorage, cerrar el navegador vuelve indescifrable (y por
 * lo tanto inútil) lo que haya quedado en localStorage.
 *
 * Esto NO protege contra XSS: código corriendo en la página tiene acceso
 * tanto a sessionStorage como a localStorage. Protege contra alguien con
 * acceso al disco/perfil del navegador sin sesión activa.
 */

const SESSION_KEY_STORAGE_NAME = "__secureStorageKey";

const toBase64 = (buffer: ArrayBuffer) =>
   btoa(String.fromCharCode(...new Uint8Array(buffer)));

const fromBase64 = (base64: string) =>
   Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer;

let sessionKeyPromise: Promise<CryptoKey> | null = null;

const getSessionKey = async (): Promise<CryptoKey> => {
   if (sessionKeyPromise) return sessionKeyPromise;

   sessionKeyPromise = (async () => {
      const existing = sessionStorage.getItem(SESSION_KEY_STORAGE_NAME);

      if (existing) {
         try {
            return await crypto.subtle.importKey(
               "raw",
               fromBase64(existing),
               "AES-GCM",
               true,
               ["encrypt", "decrypt"],
            );
         } catch {
            // Clave corrupta: se genera una nueva más abajo
         }
      }

      const key = await crypto.subtle.generateKey(
         { name: "AES-GCM", length: 256 },
         true,
         ["encrypt", "decrypt"],
      );

      const raw = await crypto.subtle.exportKey("raw", key);
      sessionStorage.setItem(SESSION_KEY_STORAGE_NAME, toBase64(raw));

      return key;
   })();

   return sessionKeyPromise;
};

/**
 * Cifra `value` y lo guarda en localStorage bajo `storageKey`.
 * Si `value` es null/undefined, elimina la entrada.
 */
export const setSecureItem = async (
   storageKey: string,
   value: unknown,
): Promise<void> => {
   if (value === null || value === undefined) {
      localStorage.removeItem(storageKey);
      return;
   }

   const key = await getSessionKey();
   const iv = crypto.getRandomValues(new Uint8Array(12));
   const encoded = new TextEncoder().encode(JSON.stringify(value));

   const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoded,
   );

   localStorage.setItem(
      storageKey,
      `${toBase64(iv.buffer)}.${toBase64(ciphertext)}`,
   );
};

/**
 * Lee y descifra `storageKey` de localStorage.
 * Devuelve null si no existe, está corrupto, o la clave de sesión ya no
 * coincide (p. ej. se cerró el navegador y se abrió de nuevo).
 */
export const getSecureItem = async <T = unknown>(
   storageKey: string,
): Promise<T | null> => {
   const raw = localStorage.getItem(storageKey);
   if (!raw) return null;

   const [ivPart, dataPart] = raw.split(".");
   if (!ivPart || !dataPart) {
      localStorage.removeItem(storageKey);
      return null;
   }

   try {
      const key = await getSessionKey();
      const iv = new Uint8Array(fromBase64(ivPart));
      const ciphertext = fromBase64(dataPart);

      const decrypted = await crypto.subtle.decrypt(
         { name: "AES-GCM", iv },
         key,
         ciphertext,
      );

      return JSON.parse(new TextDecoder().decode(decrypted));
   } catch {
      localStorage.removeItem(storageKey);
      return null;
   }
};

export const clearSecureItem = (storageKey: string): void => {
   localStorage.removeItem(storageKey);
};
