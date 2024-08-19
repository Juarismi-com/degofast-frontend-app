<template>
   <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700"
   >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
         >
            Contribuyente
         </h1>
         <!--div v-if="registerFail" class="text-center">
            Ocurrio un problema en su registro
         </div-->
      </div>

      <div class="border-b border-gray-200 mb-4">
         <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center"
            role="tablist"
         >
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 0,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 0,
                  }"
                  @click="activeTab = 0"
                  role="tab"
               >
                  <label class="text-base">Datos del Contribuyente</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 1,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 1,
                  }"
                  @click="activeTab = 1"
                  role="tab"
               >
                  <label class="text-base">Establecimiento</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 2,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 2,
                  }"
                  @click="activeTab = 2"
                  role="tab"
               >
                  <label class="text-base">Puntos de Expedicion</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 3,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 3,
                  }"
                  @click="activeTab = 3"
                  role="tab"
               >
                  <label class="text-base">Certificado</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 4,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 4,
                  }"
                  @click="activeTab = 4"
                  role="tab"
               >
                  <label class="text-base">Actividades Economicas</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 5,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 5,
                  }"
                  @click="activeTab = 5"
                  role="tab"
               >
                  <label class="text-base">Usuarios con acceso</label>
               </button>
            </li>
         </ul>
      </div>

      <form @submit.prevent="saveContributorData" method="post">
         <div
            v-if="activeTab === 0"
            class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5"
         >
            <div>
               <label for="timbradoNumero" :class="[commonLabelClass]"
                  >Numero de Timbrado*</label
               >
               <input
                  type="text"
                  name="timbradoNumero"
                  id="timbradoNumero"
                  :class="[commonInputClass]"
                  placeholder="Nro de timbrado actual"
                  required="true"
                  v-model="form.timbradoNumero"
               />
            </div>

            <div>
               <label for="timbradoFecha" :class="[commonLabelClass]"
                  >Fecha de Timbrado*</label
               >
               <input
                  type="datetime-local"
                  v-model="form.timbradoFecha"
                  id="fecha"
                  :class="[commonInputClass]"
               />
            </div>

            <div>
               <label for="tipoContribuyente" :class="[commonLabelClass]"
                  >Tipo de Contribuyente *</label
               >
               <select
                  name="tipoContribuyente"
                  :class="[commonInputClass]"
                  id="tipoContribuyente"
                  v-model="form.tipoContribuyente"
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
                  :class="[commonInputClass]"
                  placeholder="XXXXXXX-Y"
                  required="true"
                  v-model="form.ruc"
               />
            </div>

            <div>
               <label for="csc" :class="[commonLabelClass]">CSC</label>
               <input
                  type="text"
                  name="csc"
                  id="csc"
                  :class="[commonInputClass]"
                  required="true"
                  v-model="form.csc"
               />
            </div>

            <div>
               <label for="nombreFantasia" :class="[commonLabelClass]"
                  >Nombre de Fantasia*</label
               >
               <input
                  type="text"
                  name="nombreFantasia"
                  id="nombreFantasia"
                  :class="[commonInputClass]"
                  placeholder="Empresa X"
                  required="true"
                  v-model="form.nombreFantasia"
               />
            </div>

            <div>
               <label for="razonSocial" :class="[commonLabelClass]"
                  >Razon Social*</label
               >
               <input
                  type="text"
                  name="razonSocial"
                  id="razonSocial"
                  :class="[commonInputClass]"
                  placeholder="Razon Social S.R.L"
                  required="true"
                  v-model="form.razonSocial"
               />
            </div>

            <div>
               <label for="email" :class="[commonLabelClass]">Email</label>
               <input
                  type="email"
                  name="email"
                  id="email"
                  :class="[commonInputClass]"
                  required="true"
                  v-model="form.email"
               />
            </div>
            <div class="m-7">
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
         </div>
      </form>

      <form @submit.prevent="saveEstablecimiento" method="post">
         <div v-if="activeTab === 1">
            <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
               <div>
                  <label
                     for="formEstablecimientoCodigo"
                     :class="[commonLabelClass]"
                     >Codigo</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoCodigo"
                     id="formEstablecimientoCodigo"
                     :class="[commonInputClass]"
                     placeholder="Codigo"
                     v-model="formEstablecimiento.codigo"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoDireccion"
                     :class="[commonLabelClass]"
                     >direccion</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoDireccion"
                     id="formEstablecimientoDireccion"
                     :class="[commonInputClass]"
                     placeholder="Dirección"
                     v-model="formEstablecimiento.direccion"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoNumeroCasa"
                     :class="[commonLabelClass]"
                     >Número de casa</label
                  >
                  <input
                     type="number"
                     name="formEstablecimientoNumeroCasa"
                     id="formEstablecimientoNumeroCasa"
                     :class="[commonInputClass]"
                     placeholder="Número de casa"
                     v-model="formEstablecimiento.numeroCasa"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoComplementoDireccion1"
                     :class="[commonLabelClass]"
                     >Dirección complemento 1</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoComplementoDireccion1"
                     id="formEstablecimientoComplementoDireccion1"
                     :class="[commonInputClass]"
                     placeholder="Dirección complemento 1"
                     v-model="formEstablecimiento.complementoDireccion1"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoComplementoDireccion2"
                     :class="[commonLabelClass]"
                     >Dirección complemento 2</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoComplementoDireccion2"
                     id="formEstablecimientoComplementoDireccion2"
                     :class="[commonInputClass]"
                     placeholder="Dirección complemento 2"
                     v-model="formEstablecimiento.complementoDireccion2"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoDepartamento"
                     :class="[commonLabelClass]"
                     >Departamento</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoDepartamento"
                     id="formEstablecimientoDepartamento"
                     :class="[commonInputClass]"
                     placeholder="Departamento"
                     v-model="formEstablecimiento.departamento"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoDepartamentoDescripcion"
                     :class="[commonLabelClass]"
                     >Departamento descripción</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoDepartamentoDescripcion"
                     id="formEstablecimientoDepartamentoDescripcion"
                     :class="[commonInputClass]"
                     placeholder="Departamento Descripcion"
                     v-model="formEstablecimiento.departamentoDescripcion"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoDistrito"
                     :class="[commonLabelClass]"
                     >Distrito</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoDistrito"
                     id="formEstablecimientoDistrito"
                     :class="[commonInputClass]"
                     placeholder="Distrito"
                     v-model="formEstablecimiento.distrito"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoDistritoDescripcion"
                     :class="[commonLabelClass]"
                     >Distrito descripción</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoDistritoDescripcion"
                     id="formEstablecimientoDistritoDescripcion"
                     :class="[commonInputClass]"
                     placeholder="Distrito Descripcion"
                     v-model="formEstablecimiento.distritoDescripcion"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoCiudad"
                     :class="[commonLabelClass]"
                     >Ciudad</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoCiudad"
                     id="formEstablecimientoCiudad"
                     :class="[commonInputClass]"
                     placeholder="Ciudad"
                     v-model="formEstablecimiento.ciudad"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoCiudadDescripcion"
                     :class="[commonLabelClass]"
                     >Ciudad descripción</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoCiudadDescripcion"
                     id="formEstablecimientoCiudadDescripcion"
                     :class="[commonInputClass]"
                     placeholder="Ciudad Descripcion"
                     v-model="formEstablecimiento.ciudadDescripcion"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoTelefono"
                     :class="[commonLabelClass]"
                     >Telefono</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoTelefono"
                     id="formEstablecimientoTelefono"
                     :class="[commonInputClass]"
                     placeholder="Telefono"
                     v-model="formEstablecimiento.telefono"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoEmail"
                     :class="[commonLabelClass]"
                     >Email</label
                  >
                  <input
                     type="email"
                     name="formEstablecimientoEmail"
                     id="formEstablecimientoEmail"
                     :class="[commonInputClass]"
                     placeholder="Email"
                     v-model="formEstablecimiento.email"
                  />
               </div>
               <div>
                  <label
                     for="formEstablecimientoDenominacion"
                     :class="[commonLabelClass]"
                     >Denominación</label
                  >
                  <input
                     type="text"
                     name="formEstablecimientoDenominacion"
                     id="formEstablecimientoDenominacion"
                     :class="[commonInputClass]"
                     placeholder="Denominacion"
                     v-model="formEstablecimiento.denominacion"
                  />
               </div>

               <div class="m-7">
                  <button
                     type="button"
                     class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                     @click="agregarEstablecimientoItem"
                  >
                     Agregar
                  </button>
               </div>
            </div>

            <div class="m-5">
               <table class="divide-gray-200 min-w-full">
                  <thead class="bg-gray-50">
                     <tr>
                        <th
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Código
                        </th>
                        <th
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Dirección
                        </th>
                        <th
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Número de casa
                        </th>
                        <th
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Depto.
                        </th>
                        <th
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Distrito
                        </th>
                        <th
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Ciudad
                        </th>
                        <th
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Telefono
                        </th>
                        <th
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Email
                        </th>
                     </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                     <tr
                        v-for="item in establecimientoData.items"
                        :key="item.codigo"
                     >
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.codigo }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.direccion }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.numeroCasa }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.departamentoDescripcion }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.distritoDescripcion }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.ciudadDescripcion }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.telefono }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.email }}
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div class="m-5">
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
         </div>
      </form>
      <form @submit.prevent="savePuntoExpedicion" method="post">
         <div v-if="activeTab === 2">
            <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
               <div>
                  <label
                     for="formPuntoExpedicionNroActual"
                     :class="[commonLabelClass]"
                     >Nro. Actual</label
                  >
                  <input
                     type="number"
                     name="formPuntoExpedicionNroActual"
                     id="formPuntoExpedicionNroActual"
                     :class="[commonInputClass]"
                     placeholder="Nro. Actual"
                     v-model="formPuntoExpedicion.nroActual"
                  />
               </div>
               <div>
                  <label
                     for="formPuntoExpedicionNroInicial"
                     :class="[commonLabelClass]"
                     >Nro. Inicial</label
                  >
                  <input
                     type="text"
                     name="formPuntoExpedicionNroInicial"
                     id="formPuntoExpedicionNroInicial"
                     :class="[commonInputClass]"
                     placeholder="Nro. Inicial"
                     v-model="formPuntoExpedicion.nroInicial"
                  />
               </div>
               <div>
                  <label
                     for="formPuntoExpedicionCodigo"
                     :class="[commonLabelClass]"
                     >Código</label
                  >
                  <input
                     type="text"
                     name="formPuntoExpedicionCodigo"
                     id="formPuntoExpedicionCodigo"
                     :class="[commonInputClass]"
                     placeholder="Codigo"
                     v-model="formPuntoExpedicion.codigo"
                  />
               </div>
               <div>
                  <label
                     for="formPuntoExpedicionTipoDocumento"
                     :class="[commonLabelClass]"
                     >Tipo de Documento</label
                  >
                  <select
                     name="formPuntoExpedicionTipoDocumento"
                     :class="[commonInputClass]"
                     id="formPuntoExpedicionTipoDocumento"
                     v-model="formPuntoExpedicion.tipoDocumento"
                  >
                     <option value="1">Factura Electrónica</option>
                     <option value="4">Autofactura electrónica</option>
                     <option value="5">Nota de crédito electrónica</option>
                     <option value="6">Nota de débito electrónica</option>
                     <option value="7">Nota de remisión electrónica</option>
                  </select>
               </div>
               <div>
                  <label
                     for="formPuntoExpedicionEstablecimiento"
                     :class="[commonLabelClass]"
                     >Establecimiento</label
                  >
                  <select
                     name="formPuntoExpedicionEstablecimiento"
                     :class="[commonInputClass]"
                     id="formPuntoExpedicionEstablecimiento"
                     v-model="formPuntoExpedicion.establecimiento"
                  >
                     <option
                        v-for="(
                           establecimiento, index
                        ) in contributor.establecimientos"
                        :key="index"
                        :value="establecimiento.codigo"
                     >
                        {{
                           establecimiento.denominacion +
                           " - " +
                           establecimiento.codigo
                        }}
                     </option>
                  </select>
               </div>
               <div class="m-7">
                  <button
                     type="button"
                     class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                     @click="agregarPuntoExpedicionItem"
                  >
                     Agregar
                  </button>
               </div>
            </div>

            <div class="w-3/4 m-5">
               <table class="w-full divide-y divide-gray-200 overflow-x-auto">
                  <thead class="bg-gray-50">
                     <tr>
                        <th
                           scope="col"
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Nro Actual
                        </th>
                        <th
                           scope="col"
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Nro. Inicial
                        </th>
                        <th
                           scope="col"
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Código
                        </th>
                        <th
                           scope="col"
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Tipo de Documento
                        </th>
                        <th
                           scope="col"
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Establecimiento
                        </th>
                     </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                     <tr
                        v-for="item in puntoExpedicionData.items"
                        :key="item.codigo"
                     >
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.nroActual }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.nroInicial }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.codigo }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.tipoDocumento }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.establecimiento }}
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div class="m-5">
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
         </div>
      </form>
      <form @submit.prevent="saveCertified" method="post">
         <div
            v-if="activeTab === 3"
            class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5"
         >
            <div>
               <label for="formCertifiedFile" :class="[commonLabelClass]"
                  >Certificado</label
               >
               <input
                  type="file"
                  name="formCertifiedFile"
                  id="formCertifiedFile"
                  :class="[commonInputClass]"
                  @change="handleFileUpload"
               />
            </div>
            <div>
               <label for="formCertifiedPassword" :class="[commonLabelClass]"
                  >Contraseña</label
               >
               <input
                  type="text"
                  name="formCertifiedPassword"
                  id="formCertifiedPassword"
                  :class="[commonInputClass]"
                  placeholder="Contraseña"
                  v-model="formCertified.password"
               />
            </div>
            <div class="m-5">
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
            <h1 :style="{ color: certDataColor }" class="font-bold">
               {{ messageCertData }}
            </h1>
         </div>
      </form>
      <form @submit.prevent="saveActividadEconomica" method="post">
         <div v-if="activeTab === 4">
            <!-- <ActividadEconomicaTab :form="form.value" /> -->

            <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
               <div>
                  <label
                     for="formActividadEconomicaCodigo"
                     :class="[commonLabelClass]"
                     >Codigo</label
                  >
                  <input
                     type="text"
                     name="formActividadEconomicaCodigo"
                     id="formActividadEconomicaCodigo"
                     :class="[commonInputClass]"
                     placeholder="Codigo"
                     v-model="formActividadEconomica.codigo"
                  />
               </div>
               <div>
                  <label
                     for="formActividadEconomicaDescripcion"
                     :class="[commonLabelClass]"
                     >Descripcion</label
                  >
                  <input
                     type="text"
                     name="formActividadEconomicaDescripcion"
                     id="formActividadEconomicaDescripcion"
                     :class="[commonInputClass]"
                     placeholder="Descripción / Titulo de la Actividad Economica"
                     v-model="formActividadEconomica.descripcion"
                  />
               </div>
               <div class="m-7">
                  <button
                     type="button"
                     class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                     @click="agregarActividadEconomicaItem"
                  >
                     Agregar
                  </button>
               </div>
            </div>

            <div class="w-3/4 m-5">
               <table class="w-full divide-y divide-gray-200 overflow-x-auto">
                  <thead class="bg-gray-50">
                     <tr>
                        <th
                           scope="col"
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Código
                        </th>
                        <th
                           scope="col"
                           class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           Descripción
                        </th>
                     </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                     <tr
                        v-for="item in actividadEconomicaData.items"
                        :key="item.codigo"
                     >
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.codigo }}
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm text-gray-900">
                              {{ item.descripcion }}
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div class="m-5">
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
         </div>
      </form>
      <form @submit.prevent="saveUser" method="post">
         <div
            v-if="activeTab === 5"
            class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5"
         >
            Pestaña 6
         </div>
      </form>
   </div>
</template>

<script setup>
/**
 * @todo add object for establecimientos, by defailt send 1
 * @todo separate a component in actividadEconomica, establecimientos, etc
 * @todo add table of actividades generadas
 */
import moment from "moment";
import { storeToRefs } from "pinia";
import { get, create, update } from "~/services/http.service";
import { useAuthStore } from "~/stores";
const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

const form = ref({
   ...contributor.value,
   timbradoFecha: contributor.value
      ? moment(contributor.value.timbradoFecha).format("YYYY-MM-DDTHH:mm:ss")
      : null,
});
const activeTab = ref(0);

// const registerFail = ref(false);

const commonInputClass =
   "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500";

const commonLabelClass =
   "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

/**
 * Verificia si la actividad economica ya se agrego, sino lo agrega
 */
// const addActividadEconomica = () => {
//    const actividadesEconomicas = form.value.actividadesEconomicas;
//    const actividadEconomica = { ...formActividadEconomica.value };

//    const isAdded = actividadesEconomicas.some((actividad) => {
//       return actividad.codigo === actividadEconomica.codigo;
//    });

//    if (!isAdded) actividadesEconomicas.push(actividadEconomica);
// };

const setContributorDefault = () => {
   contributor;
};

/**
 * Guarda el formulario
 */
const saveContributorData = async (e) => {
   if (validateForm()) {
      let timbradoFecha = moment(form.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...form.value,
         timbradoFecha,
      };

      try {
         if (authStore.contributor) {
            const res = await update(
               `contributor-emitter/${authStore.contributor.id}`,
               payload,
            );
            console.log("Datos actualizados:", res);
         } else {
            const res = await create("contributor-emitter", payload);
            console.log("Datos creados:", res);
         }
      } catch (error) {
         throw error;
      }
   }
};

const formActividadEconomica = ref({
   codigo: "",
   descripcion: "",
});

const actividadEconomicaData = ref({ items: [] });

const agregarActividadEconomicaItem = () => {
   if (
      formActividadEconomica.value.codigo &&
      formActividadEconomica.value.descripcion
   ) {
      actividadEconomicaData.value.items.push({
         ...formActividadEconomica.value,
      });
      formActividadEconomica.value = { codigo: "", descripcion: "" };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

const saveActividadEconomica = async (e) => {
   if (validateForm()) {

      let timbradoFecha = moment(form.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...form.value,
         timbradoFecha,
         actividadesEconomicas: actividadEconomicaData.value.items,
      };

      try {
         if (authStore.contributor) {
            const res = await update(
               `contributor-emitter/${authStore.contributor._id}`,
               payload,
            );
            console.log("Datos actualizados:", res);
         } else {
            console.log("Se debe cargar los datos del contribuyente", res);
         }
      } catch (error) {
         throw error;
      }
   }
};

const formEstablecimiento = ref({
   codigo: "001",
   direccion: "",
   numeroCasa: 0,
   complementoDireccion1: "",
   complementoDireccion2: "",
   departamento: "",
   departamentoDescripcion: "",
   distrito: "",
   distritoDescripcion: "",
   ciudad: "",
   ciudadDescripcion: "",
   telefono: "",
   email: "",
   denominacion: "",
});

const establecimientoData = ref({ items: [] });

const agregarEstablecimientoItem = () => {
   if (
      formEstablecimiento.value.codigo &&
      formEstablecimiento.value.direccion
   ) {
      establecimientoData.value.items.push({ ...formEstablecimiento.value });
      formEstablecimiento.value = {
         codigo: "001",
         direccion: "",
         numeroCasa: 1,
         complementoDireccion1: "",
         complementoDireccion2: "",
         departamento: "",
         departamentoDescripcion: "",
         distrito: "",
         distritoDescripcion: "",
         ciudad: "",
         ciudadDescripcion: "",
         telefono: "",
         email: "",
         denominacion: "",
      };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

const saveEstablecimiento = async (e) => {
   if (validateForm()) {

      let timbradoFecha = moment(form.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...form.value,
         timbradoFecha,
         establecimientos: establecimientoData.value.items,
      };

      try {
         if (authStore.contributor) {
            const res = await update(
               `contributor-emitter/${authStore.contributor._id}`,
               payload,
            );
            console.log("Datos actualizados:", res);
         } else {
            console.log("Se debe cargar los datos del contribuyente", res);
         }
      } catch (error) {
         console.error("Error al actualizar los datos:", error.message);
      }
   }
};

const formPuntoExpedicion = ref({
   nroActual: 0,
   nroInicial: 0,
   contributor: null,
   codigo: "",
   establecimiento: null,
   tipoDocumento: 1,
});

const puntoExpedicionData = ref({ items: [] });

const agregarPuntoExpedicionItem = () => {
   if (
      formPuntoExpedicion.value.nroActual &&
      formPuntoExpedicion.value.nroInicial &&
      formPuntoExpedicion.value.codigo &&
      formPuntoExpedicion.value.tipoDocumento
   ) {
      puntoExpedicionData.value.items.push({ ...formPuntoExpedicion.value });
      formPuntoExpedicion.value = {
         nroActual: 1,
         nroInicial: 1,
         contributor: null,
         codigo: "",
         establecimiento: null,
         tipoDocumento: 1,
      };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

const savePuntoExpedicion = async (e) => {
   if (validateForm()) {
      let payload = {
         ...formPuntoExpedicion.value,
      };

      try {
         if (authStore.contributor) {
            const res = await create("punto-expedicion", payload);
            console.log("Datos actualizados:", res);
         } else {
            console.log("Se debe cargar los datos del contribuyente", res);
         }
      } catch (error) {
         console.error("Error al actualizar los datos:", error.message);
      }
   }
};

const formCertified = ref({
   cert: null,
   password: "",
});

const handleFileUpload = (event) => {
   formCertified.value.cert = event.target.files[0];
};

const messageCertData = ref("No se ha cargado ningún certificado");
const certDataColor = ref("red");

/* @todo validar funcionalidad */
const saveCertified = async (e) => {
   try {
      if (authStore.contributor) {
         const formData = new FormData();

         if (formCertified.value.cert) {
            formData.append("cert", formCertified.value.cert);
         } else {
            console.error("No se ha seleccionado un archivo.");
            return;
         }

         formData.append("password", formCertified.value.password);

         const res = await create("certifieds/local", formData);
         console.log("Datos actualizados:", res);

         formCertified.value = {
            cert: null,
            password: "",
         };
      } else {
         console.log("Se debe cargar los datos del contribuyente", res);
      }
   } catch (error) {
      console.error("Error al actualizar los datos:", error.message);
   }
};

const validateForm = () => {
   const errors = [];
   const { ruc, csc, nombreFantasia, razonSocial, email } =
      form.value;

   if (!ruc) errors.push("Ruc es requerido");
   if (!csc) errors.push("Csc es requerido");
   if (!nombreFantasia) errors.push("Nombre de fantasía es requerido");
   if (!razonSocial) errors.push("Razon Social es requerido");
   if (!email) errors.push("Email es requerido");

   if (errors.length > 0) {
      const message = errors.join("\n");
      alert(message);

      return false;
   }

   return true;
};

const getPuntoExpedicion = async () => {
   const puntosExpedicion = await get("punto-expedicion");

   if (puntosExpedicion.length > 0) {
      puntoExpedicionData.value.items = puntosExpedicion;
   } else {
      puntoExpedicionData.value.items = [];
   }
};

const getDepartments = async () => {
   try {
      const departaments = await get("departments");
      console.log(departaments);
      return departaments;
   } catch (error) {
      console.log(error);
      const data = error?.response?.data?.error;
   }
};

onMounted(() => {
   if (authStore.contributor) {
      const { actividadesEconomicas, establecimientos } = authStore.contributor;

      if (actividadesEconomicas.length > 0) {
         actividadEconomicaData.value.items = actividadesEconomicas;
      } else {
         actividadEconomicaData.value.items = [];
      }

      if (establecimientos.length > 0) {
         establecimientoData.value.items = establecimientos;
      } else {
         establecimientoData.value.items = [];
      }

      if (authStore.contributor?.certData?.length > 0) {
         messageCertData.value = "Ya se ha cargado un certificado";
         certDataColor.value = "green";
      }
   } else {
      actividadEconomicaData.value.items = [];
      establecimientoData.value.items = [];
   }

   //getDepartments();
   getPuntoExpedicion();
});
</script>
