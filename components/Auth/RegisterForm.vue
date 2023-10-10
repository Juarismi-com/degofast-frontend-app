<template>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
         <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
               Cree una cuenta
            </h1>
            <div v-if="registerFail" class="text-center">Ocurrio un problema en su registro</div>
            <form class="space-y-4 md:space-y-6" action="#" @submit="register">
               <div>
                     <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                     <input type="text" name="nombre" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre de Usuario" required="true"
                     v-model="form.nombre">
               </div>
               <div>
                     <label for="documentoNumero" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cédula (Sin Puntos)</label>
                     <input type="text" name="documentoNumero" id="documentoNumero" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre de Usuario" required="true"
                     v-model="form.documentoNumero">
               </div>
               <div>
                     <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                     <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre de Usuario" required="true"
                     v-model="form.email">
               </div>
               <div>
                     <label for="cargo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Oficio / Cargo</label>
                     <input type="text" name="cargo" id="cargo" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre de Usuario" required="true"
                     v-model="form.cargo">
               </div>
               <div>
                     <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                     <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="true"
                     v-model="form.password">
               </div>
               <div>
                     <label for="password2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Contraseña</label>
                     <input type="password" name="password2" id="password2" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="true"
                     v-model="form.password2">
               </div>
               <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrarse</button>
               <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                     ¿Ya tienes una cuenta? <NuxtLink class="font-medium text-blue-600 hover:underline dark:text-blue-500" to="/auth">Iniciar Sesión</NuxtLink>
               </p>
            </form>
         </div>
   </div>
</template>

<script>
import { API_BASE_URL } from '~/config';
export default {
   data(){
      return {
         form: {
            nombre: '',
            cargo: '',
            email: '', 
            password: '',
            password2: '',
            documentoNumero: ''
         },
         registerFail: false
      }
   },
   methods: {
      async register(e){
         e.preventDefault();
         this.registerFail = false

         if (this.form.password !== this.form.password2){
            alert('Contraseña no son las mismas')
            return;
         }

         const res = await useFetch(`${API_BASE_URL}/auth/register`, {
            method: 'post',
            body: {
               ...this.form
            }
         })

         if (res.status.value === "success"){
            const {token} = res.data.value;
            console.log(token)
            this.$router.push('/auth')
         } else {
            this.registerFail = true
         }
      }
   }
}
</script>
