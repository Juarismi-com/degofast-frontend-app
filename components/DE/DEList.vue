<template>
   <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <h3 class="text-white text-2xl py-2"> Documentos Electronicos </h3>

      <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
         <!-- OPTION CRUD OF ITEM -->
          <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div class="flex items-center flex-1 space-x-4">
                  <h5>
                      <span class="text-gray-500">Registros:</span>
                      <span class="dark:text-white">{{ items.length }}</span>
                  </h5>
                  <!--h5>
                      <span class="text-gray-500">Total Venta:</span>
                      <span class="dark:text-white">$88.4k</span>
                  </h5!-->
              </div>
              <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                  <!--button type="button" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                      <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                      Add new product
                  </button-->
                  <input type="file" accept="text/csv"/>
                  <button type="button" class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="uploadFile">
                      Subir
                  </button>
                  <!--button type="button" class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                      <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Export
                  </button!-->
              </div>
          </div>
          <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-4 py-3">Cliente</th>
                          <th scope="col" class="px-4 py-3">Fecha</th>
                          <th scope="col" class="px-4 py-3 text-center">Condición de Venta</th>
                          <th scope="col" class="px-4 py-3">Establecimiento</th>
                          <th scope="col" class="px-4 py-3">Moneda</th>
                          <th scope="col" class="px-4 py-3">Cantidad Det.</th>
                          <th scope="col" class="px-4 py-3">Estado</th>
                          <th scope="col" class="px-4 py-3">Total</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                       v-for="(item, index) in items"
                       :key="index">
                          <th class="px-4 py-2">
                              {{  item.cliente }}
                          </th>
                          <td class="px-4 py-2">
                              {{ item.fechaVenta }}
                          </td>
                          <td class="px-4 py-2 text-center">
                              {{ item.tipoVenta }}
                          </td>
                          <td class="px-4 py-2">
                              {{ item.establecimiento }}
                          </td>
                          <td class="px-4 py-2">
                              {{ item.moneda }}
                          </td>
                          <td class="px-4 py-2">
                              {{ item.detail.length }}
                          </td>
                          <td class="px-4 py-2">
                              {{ item.estado }}
                          </td>
                          <td class="px-4 py-2">
                              {{ item.totalVenta }}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Viendo
                  <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                  de
                  <span class="font-semibold text-gray-900 dark:text-white">{{  items.length }}</span>
              </span>
              <ul class="inline-flex items-stretch -space-x-px">
                  <li>
                      <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          <span class="sr-only">Previous</span>
                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                  </li>
                  <li>
                      <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                  </li>
                  <li>
                      <a href="#" aria-current="page" class="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                  </li>
                  <li>
                      <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                  </li>
                  <li>
                      <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                  </li>
                  <li>
                      <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          <span class="sr-only">Next</span>
                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                          </svg>
                      </a>
                  </li>
              </ul>
          </nav>
      </div>
   </section>
</template>

<script>
export default {
   data(){
      return {
         items: [{
            cliente: 'Juan Perez',
            tipoVenta: 'contado',
            fechaVenta: '18/sep/2023',
            totalFacturas: '1',
            establecimiento: 'Local 1',
            servicios_ofrecidos: '4',
            moneda: 'PYG',
            totalVenta: 152300,
            estado: "Aceptado",
            detail: [{
               name: 'x',
               value: 152300,
               iva_tipo: 5
            }]
         },
         {
            cliente: 'Juan Perez',
            tipoVenta: 'contado',
            fechaVenta: '18/sep/2023',
            totalFacturas: '1',
            establecimiento: 'Local 1',
            servicios_ofrecidos: '4',
            moneda: 'PYG',
            totalVenta: 452155,
            estado: "Aceptado",
            detail: [{
               name: 'x',
               value: 15454,
            },{
               name: 'x',
               value: 15454,
            }]
         },
         {
            cliente: 'Juan Perez',
            tipoVenta: 'contado',
            fechaVenta: '18/sep/2023',
            totalFacturas: '1',
            establecimiento: 'Local 1',
            servicios_ofrecidos: '4',
            moneda: 'PYG',
            totalVenta: 152300,
            estado: "Aceptado",
            detail: [{
               name: 'x',
               value: 152300
            },{
               name: 'x',
               value: 15454,
            }]
         },
         {
            cliente: 'Juan Perez',
            tipoVenta: 'contado',
            fechaVenta: '18/sep/2023',
            totalFacturas: '1',
            establecimiento: 'Local 1',
            servicios_ofrecidos: '4',
            moneda: 'PYG',
            totalVenta: 152300,
            estado: "Aceptado",
            detail: [{
               name: 'x',
               value: 852222
            }]
         },
         {
            cliente: 'Juan Perez',
            tipoVenta: 'contado',
            fechaVenta: '18/sep/2023',
            totalFacturas: '1',
            establecimiento: 'Local 1',
            servicios_ofrecidos: '4',
            moneda: 'PYG',
            totalVenta: 565220,
            estado: "Aceptado",
            detail: [{
               name: 'x',
               value: 152300
            },{
               name: 'x',
               value: 152300
            },{
               name: 'x',
               value: 152300
            }]
         },
         {
            cliente: 'Juan Perez',
            tipoVenta: 'contado',
            fechaVenta: '16/sep/2023',
            totalFacturas: '1',
            establecimiento: 'Local 1',
            servicios_ofrecidos: '4',
            moneda: 'PYG',
            totalVenta: 25630,
            estado: "Aceptado",
            detail: [{
               name: 'x',
               value: 152300
            }]
         },
         {
            cliente: 'Juan Perez',
            tipoVenta: 'contado',
            fechaVenta: '15/sep/2023',
            totalFacturas: '1',
            establecimiento: 'Local 1',
            servicios_ofrecidos: '4',
            moneda: 'PYG',
            totalVenta: 45210,
            estado: "Aceptado",
            detail: [{
               name: 'x',
               value: 152300
            }]
         }
         ]
      }
   },
   methods: {
      uploadFile(){
         if (confirm("Desea subir el archivo")){
            this.items.unshift({
               cliente: 'Maria Fernandez',
               tipoVenta: 'contado',
               fechaVenta: '18/sep/2023',
               totalFacturas: '1',
               establecimiento: 'Local 1',
               servicios_ofrecidos: '4',
               moneda: 'PYG',
               totalVenta: 441000,
               estado: "En proceso",
               detail: [{
                  name: 'x',
                  value: 441000
               }]
            })
         }

         setTimeout(() => {
            this.items[0].estado = "Aceptado"
         }, 5000);
      }
   }
}
</script>