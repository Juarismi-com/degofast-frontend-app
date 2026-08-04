<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <h2 class="my-6 text-2xl font-semibold text-gray-700">
         Recibo
      </h2>

      <form @submit.prevent="submitRecibo" class="p-6 bg-white">
         <div class="text-xl">
            <h3>Detalles</h3>
            <hr />
         </div>
         <div class="p-6 bg-white grid grid-cols-4 gap-4">
            <div>
               <label for="numero">Número:</label>
               <input
                  type="text"
                  v-model="formData.numero"
                  id="numero"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="fecha">Fecha:</label>
               <input
                  type="datetime-local"
                  v-model="formData.fecha"
                  id="fecha"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="recibidoDe">Recibido de:</label>
               <input
                  type="text"
                  v-model="formData.recibidoDe"
                  id="recibidoDe"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="ruc">RUC:</label>
               <input
                  type="text"
                  v-model="formData.ruc"
                  id="ruc"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="ci">C.I. N°:</label>
               <input
                  type="text"
                  v-model="formData.ciNumero"
                  id="ci"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="concepto">Concepto:</label>
               <input
                  type="text"
                  v-model="formData.concepto"
                  id="concepto"
                  :class="INPUT_CLASS.sm"
               />
            </div>
         </div>

         <div class="text-xl">
            <h3>Monto</h3>
            <hr />
         </div>

         <div class="p-6 bg-white grid grid-cols-4 gap-4">
            <div>
               <label for="monto">Monto</label>
               <input
                  type="text"
                  v-model="formData.monto"
                  id="monto"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="montoLetras">Monto en letras:</label>
               <input
                  type="text"
                  v-model="formData.montoLetras"
                  id="montoLetras"
                  :class="INPUT_CLASS.sm"
               />
            </div>
         </div>

         <div class="text-xl">
            <h3>Pago</h3>
            <hr />
         </div>

         <div class="p-6 bg-white grid grid-cols-4 gap-4">
            <div>
               <label for="moneda">Moneda:</label>
               <select
                  v-model="formData.moneda"
                  id="moneda"
                  :class="INPUT_CLASS.sm"
               >
                  <option value="PYG">PYG</option>
                  <option value="USD">USD</option>
               </select>
            </div>
            <div>
               <label for="formaPago">Forma de pago:</label>
               <select
                  v-model="formData.formaPago"
                  id="formaPago"
                  :class="INPUT_CLASS.sm"
               >
                  <option value="Efectivo">Efectivo</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Transferencia">Transferencia</option>
               </select>
            </div>
            <div
               v-if="
                  formData.formaPago == 'Cheque' ||
                  formData.formaPago == 'Transferencia'
               "
            >
               <label for="banco">Banco</label>
               <input
                  type="text"
                  v-model="formData.banco"
                  id="banco"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div
               v-if="
                  formData.formaPago == 'Cheque' ||
                  formData.formaPago == 'Transferencia'
               "
            >
               <label for="nroBanco">N° Banco</label>
               <input
                  type="text"
                  v-model="formData.nroBanco"
                  id="nroBanco"
                  :class="INPUT_CLASS.sm"
               />
            </div>
         </div>

         <div class="m-5">
            <button
               type="submit"
               :disabled="isSubmitting"
               class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {{ isSubmitting ? "Enviando..." : "Enviar" }}
            </button>
         </div>
      </form>
   </div>
</template>

<script setup>
import { INPUT_CLASS } from "~/config";
import { deReceiptData, validateRecibo } from "~/config/receipt";
import { saveRecibo } from "~/services/recibo.service";
import { formatDateHours } from "~/helpers/date.helper";
import { useToast } from "vue-toast-notification";

const toast = useToast();

// datos del formulario / recibo
const formData = ref({
   ...deReceiptData,
   tipoDocumento: 50,
});

const isSubmitting = ref(false);

const submitRecibo = async () => {
   if (isSubmitting.value) return;

   try {
      if (validateRecibo(formData.value)) {
         isSubmitting.value = true;

         const payload = {
            ...formData.value,
            fecha: formatDateHours(formData.value.fecha),
         };

         const response = await saveRecibo(payload);

         if (response) {
            toast.success("Recibo enviado", { duration: 3000 });
            resetForm();
         }
      }
   } catch (error) {
      console.error(error);
      toast.error(error?.message || String(error), { duration: 3000 });
   } finally {
      isSubmitting.value = false;
   }
};

const resetForm = () => {
   formData.value = {
      ...deReceiptData,
      tipoDocumento: 50,
   };
};
</script>
