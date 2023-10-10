<template>
   <div>
      Perfil
   </div>
</template>


<script>
export default {
   data(){
      return {
         profile: {
            "version" : 150,
            "fechaFirmaDigital" : "2023-08-13T00:00:00",
            "ruc" : "5310689-0",
            "razonSocial" : "RAZON SOCIAL DE PRUEBA",
            "nombreFantasia" : "EMPRESA S.A DE PRUEBA",
            "actividadesEconomicas" : [{
               "codigo": "1254",
               "descripcion": "Desarrollo de Software"
            }],   
            "timbradoNumero" : "05310689",
            "timbradoFecha" : "2023-08-28",
            "tipoContribuyente" : 2, 
            "tipoRegimen" : 8, 
            "establecimientos" : [{
               "codigo" : "001",
               "direccion" : "Barrio Carolina", 
               "numeroCasa" : "0", 
               "complementoDireccion1" : "Entre calle 2", 
               "complementoDireccion2" : "y Calle 7",
               "departamento" : 1,
               "departamentoDescripcion" : "CENTRAL",
               "distrito" : 1,
               "distritoDescripcion" : "YPANE",
               "ciudad" : 1,
               "ciudadDescripcion" : "CALLE A C/ CALLE B",
               "telefono" : "09866660601",
               "email" : "vanfretes@gmail.com",
               "denominacion" : "Sucursal 1"
            }]
         }
      }
   }
}
</script>