<template>
   <div>
      <form @submit.prevent="saveForm" method="post">
         <div class="mx-5 flex justify-end">
            <div>
               <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {{ isSubmitting ? "Guardando..." : "Guardar" }}
               </button>
            </div>
         </div>
         <div
            class="col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-5"
         >
            <div>
               <label for="timbradoNumero" :class="[commonLabelClass]"
                  >Numero de Timbrado *</label
               >
               <input
                  type="text"
                  name="timbradoNumero"
                  id="timbradoNumero"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Nro de timbrado actual"
                  v-model="formData.timbradoNumero"
               />
            </div>

            <div>
               <label for="timbradoFecha" :class="[commonLabelClass]"
                  >Fecha de Timbrado *</label
               >
               <input
                  type="datetime-local"
                  v-model="formData.timbradoFecha"
                  id="fecha"
                  :class="[INPUT_CLASS.sm]"
               />
            </div>

            <div>
               <label for="tipoContribuyente" :class="[commonLabelClass]"
                  >Tipo de Contribuyente *</label
               >
               <select
                  name="tipoContribuyente"
                  :class="[INPUT_CLASS.sm]"
                  id="tipoContribuyente"
                  v-model="formData.tipoContribuyente"
               >
                  <option value="1">Persona Fisica</option>
                  <option value="2">Persona Juridica</option>
               </select>
            </div>

            <div>
               <label for="ruc" :class="[commonLabelClass]"
                  >RUC (Sin puntos)*</label
               >
               <input
                  type="text"
                  name="ruc"
                  id="ruc"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="XXXXXXX-Y"
                  required="true"
                  v-model="formData.ruc"
               />
            </div>

            <div>
               <label for="csc" :class="[commonLabelClass]">CSC</label>
               <div class="relative">
                  <input
                     :type="showCsc ? 'text' : 'password'"
                     name="csc"
                     id="csc"
                     :class="[INPUT_CLASS.sm, 'pr-9']"
                     :required="!isEditing"
                     v-model="formData.csc"
                  />
                  <button
                     type="button"
                     class="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
                     :aria-label="showCsc ? 'Ocultar CSC' : 'Mostrar CSC'"
                     @click="showCsc = !showCsc"
                  >
                     <EyeSlashIcon v-if="showCsc" class="size-4" />
                     <EyeIcon v-else class="size-4" />
                  </button>
               </div>
               <p
                  v-if="isEditing && !formData.csc"
                  class="mt-1 text-xs text-gray-500"
               >
                  Por seguridad no se guarda en este navegador. Dejalo vacío
                  para no modificarlo, o ingresalo para actualizarlo.
               </p>
            </div>

            <div>
               <label for="nombreFantasia" :class="[commonLabelClass]"
                  >Nombre de Fantasia *</label
               >
               <input
                  type="text"
                  name="nombreFantasia"
                  id="nombreFantasia"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Empresa X"
                  required="true"
                  v-model="formData.nombreFantasia"
               />
            </div>

            <div>
               <label for="razonSocial" :class="[commonLabelClass]"
                  >Razon Social *</label
               >
               <input
                  type="text"
                  name="razonSocial"
                  id="razonSocial"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Razon Social S.R.L"
                  required="true"
                  v-model="formData.razonSocial"
               />
            </div>

            <div>
               <label for="email" :class="[commonLabelClass]">Email</label>
               <input
                  type="email"
                  name="email"
                  id="email"
                  :class="[INPUT_CLASS.sm]"
                  required="true"
                  v-model="formData.email"
               />
            </div>
         </div>
      </form>
   </div>
</template>

<script setup>
import moment from "moment";
import { create, update } from "~/services/http.service";
import { INPUT_CLASS } from "~/config";
import { commonLabelClass } from "~/config/styles";
import { useToast } from "vue-toast-notification";
import { defineProps } from "vue";
import { storeToRefs } from "pinia";
import { useContributorStore } from "~/stores";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";

const contributorStore = useContributorStore();
const { setContributor } = contributorStore;
const { csc: storedCsc } = storeToRefs(contributorStore);
const toast = useToast();
const { handleError } = useErrorHandler();

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const isEditing = computed(() => !!props.contributor?._id);
const showCsc = ref(false);

const formData = ref({
   timbradoNumero: props.contributor?.timbradoNumero,
   tipoContribuyente: props.contributor?.tipoContribuyente,
   ruc: props.contributor?.ruc,
   nombreFantasia: props.contributor?.nombreFantasia,
   razonSocial: props.contributor?.razonSocial,
   email: props.contributor?.email,
   // el CSC no se persiste en este navegador (dato sensible); solo vive en
   // memoria mientras dura la sesión
   csc: storedCsc.value || "",
   timbradoFecha: props.contributor
      ? moment(props.contributor.timbradoFecha)
           .local()
           .format("YYYY-MM-DDTHH:mm")
      : null,
});

const emit = defineEmits(["save-data"]);
const isSubmitting = ref(false);

const saveForm = async (e) => {
   if (isSubmitting.value) return;

   if (validateForm()) {
      isSubmitting.value = true;
      let timbradoFecha = moment(formData.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...formData.value,
         timbradoFecha,
      };

      // si se está editando y no se tocó el campo, no mandar csc vacío:
      // pisaría el valor ya guardado en el backend
      if (isEditing.value && !payload.csc) {
         delete payload.csc;
      }

      try {
         let saved;

         if (props.contributor?._id) {
            saved = await update(
               `contributor-emitter/${props.contributor._id}`,
               payload,
            );
         } else {
            saved = await create("contributor-emitter", payload);
         }

         toast.success("¡Operación exitosa!", { duration: 3000 });
         setContributor({ ...payload, ...saved });
      } catch (error) {
         handleError(error, "¡Error! no se pudo completar la solicitud");
      } finally {
         isSubmitting.value = false;
      }
   }
};

/**
 * @todo ajustar validadores para que todos tengan el mismo formato y que que
 * esten en sus respectivos archivos
 */
const validateForm = () => {
   try {
      const { timbradoNumero, ruc, csc, nombreFantasia, razonSocial, email } =
         formData.value;

      if (!timbradoNumero || isNaN(Number(timbradoNumero)))
         throw new Error(
            "El campo 'timbradoNúmero' es requerido y debe ser numérico",
         );

      if (!ruc) throw new Error("RUC es requerido");
      if (!isEditing.value && !csc) throw new Error("CSC es requerido");
      if (!nombreFantasia) throw new Error("Nombre de fantasía es requerido");
      if (!razonSocial) throw new Error("Razon Social es requerido");
      if (!email) throw new Error("Email es requerido");

      return true;
   } catch (error) {
      handleError(error);
      return false;
   }
};
</script>
