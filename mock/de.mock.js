export const factura = {
   cdc: "0144 4444 0170 0100 1001 4528 2250 1201 7158 7322 6094",
   loteRequestId: null,
   loteResponseId: null,
   _id: "65cf9bd86376460e7e0b6c10",
   tipoDocumento: 1,
   establecimiento: 1,
   punto: "001",
   numero: "1007016",
   serie: null,
   descripcion: null,
   observacion: null,
   fecha: "2023-09-12 10:11:00",
   tipoEmision: 1,
   tipoTransaccion: 1,
   tipoImpuesto: 1,
   moneda: "PYG",
   condicionAnticipo: null,
   condicionTipoCambio: 1,
   cambio: 6700,
   cliente: {
      contribuyente: true,
      ruc: "5310689-0",
      razonSocial: "CLIENTE DE PRUEBA S.A",
      nombreFantasia: "CLIENTE DE PRUEBA",
      tipoOperacion: 1,
      direccion: "Direccion S.A",
      numeroCasa: 12345,
      departamento: 1,
      distrito: 1,
      ciudad: 1,
      pais: "PRY",
      tipoContribuyente: 1,
      documentoTipo: 1,
      documentoNumero: "2323223",
      telefono: "0981123456",
      celular: "0981123456",
      email: "vanfretes@gmail.com",
      codigo: "712",
      _id: "6527312764e223db1928cb5f",
      __v: 0,
   },
   usuario: {
      documentoTipo: 1,
      documentoNumero: "5310689",
      nombre: "Ivan",
      cargo: "Programador",
      email: "vanfretes@gmail.com",
      _id: "65270bb1a29e0ba93fe50907",
   },
   factura: {
      presencia: 1,
      fechaEnvio: null,
      dncp: null,
      _id: "65cf9bd86376460e7e0b6c13",
   },
   condicion: {
      tipo: 2,
      credito: {
         tipo: 2,
         plazo: "",
         cuotas: 1,
         montoEntrega: 0,
         infoCuotas: [
            {
               moneda: "PYG",
               monto: "123456",
               vencimiento: "2022-06-15",
            },
         ],
      },
      _id: "65cf9bd86376460e7e0b6c14",
   },
   items: [
      {
         internal_id: null,
         codigo: "1234",
         descripcion: "DESCRICPION DEL PRODUCTO",
         observacion: "",
         unidadMedida: 99,
         cantidad: 37.194,
         precioUnitario: 62955,
         cambio: 68522,
         ivaTipo: 4,
         ivaBase: 50,
         iva: 5,
         lote: null,
         vencimiento: null,
         numeroSerie: "",
         numeroPedido: "",
         numeroSeguimiento: "",
         internal_deId: null,
         _id: "65cf9bd86376460e7e0b6c15",
      },
   ],
   internal_deId: null,
   created_at: "2024-02-16T17:30:54.437Z",
   updated_at: "2024-02-16T17:30:54.437Z",
   estado: "PENDING",
   __v: 0,
};
