import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

// Servicios que consumen tus APIs Laravel
import { ModalidadService } from 'src/app/services/modalidad.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CitaService } from 'src/app/services/cita.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { environment } from'src/environment/environment';

declare var MercadoPago: any;

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  servicios: any[] = [];
  modalidades: any[] = [];
  distritos: any[] = [];
  horarios: any[] = [];
  tarifasDomicilio: any[] = [];
  cliente: any = {};
  nombreCompleto: string = '';
  paymentBrickController: any;
  correo: string = '';
  //hoy: string = '';

  // Estado del formulario
  citas_diagnostico: any = {
    id_cliente: '',
    id_horario: '',
    fecha_atencion: '',
    estado: '',
    id_modalidad: '',
    id_tarifadomicilio: '',
    id_distrito: '',
    direccion: '',
    comentario_cliente: '',
    documento: '',
    id_usuario: '',
    observacion_tecnico: '',
    precio_diagnostico: 0,
    precio_domicilio: 0,
    acepto: false
  };


  fechaMinima: string = '';
  idDistritoSeleccionado: any = '';
  precioTarifa: number = 0.00;
  modalidadAnterior: number = 0;

  constructor(
    private modalidadService: ModalidadService,
    private distritoService: DistritoService,
    private horarioService: HorarioService,
    private tarifaService: TarifaService,
    private clienteService: ClienteService,
    private citaService: CitaService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {

    // Fecha 
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 2);
    this.fechaMinima = manana.toISOString().split('T')[0];
    this.citas_diagnostico.fecha_atencion = this.fechaMinima;

    // listas de modalidades, distritos y horarios
    this.modalidadService.getModalidades().subscribe({
      next: (d: any[]) => this.modalidades = d,
      error: (err: any) => console.error('Error al cargar modalidades:', err)
    });
    this.distritoService.listar().subscribe({
      next: (d: any[]) => this.distritos = d,
      error: (err: any) => console.error('Error al cargar distritos:', err)
    });
    this.horarioService.listar().subscribe({
      next: (h: any[]) => this.horarios = h,
      error: (err: any) => console.error('Error al cargar horarios:', err)
    });
    this.tarifaService.listar().subscribe({
      next: (t: any[]) => this.tarifasDomicilio = t,
      error: (err: any) => console.error('Error al cargar tarifas:', err)
    });


    const token = localStorage.getItem('token');
    const idCliente = Number(localStorage.getItem('id_cliente'));


    if (token && idCliente) {
      this.clienteService.obtenerCliente(idCliente, token).subscribe({
        next: data => {
          this.cliente = data;
          this.nombreCompleto = `${this.cliente.nombres} ${this.cliente.apellidos}`;
          this.citas_diagnostico.id_cliente = this.cliente.id_cliente;
          this.correo = this.cliente.correo;
        },
        error: err => console.error('Error al cargar cliente:', err)
      });
    }
  }

  validarNoDomingo() {
    if (!this.citas_diagnostico.fecha_atencion) return;

    const [year, month, day] = this.citas_diagnostico.fecha_atencion.split('-').map(Number);
    const fecha = new Date(year, month - 1, day);
    const diaSemana = fecha.getDay();

    if (diaSemana === 0) {
      Swal.fire({
        title: "¡Lo sentimos!",
        text: "No atendemos los días domingo. Por favor elija otra fecha.",
        imageUrl: "https://cdn3d.iconscout.com/3d/premium/thumb/sleeping-robot-3d-icon-png-download-11431668.png",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "Custom image",
        confirmButtonText: "Aceptar",
      })
        ;
      this.citas_diagnostico.fecha_atencion = this.fechaMinima;
    }
  }

  validarModalidad() {
    if (this.citas_diagnostico.id_modalidad != 3) {
      this.idDistritoSeleccionado = '';
      this.citas_diagnostico.direccion = '';
      this.precioTarifa = 0;
    }
  }

  setearTarifaDomicilio(): void {
    if (!this.idDistritoSeleccionado) {
      this.precioTarifa = 0;
      return;
    }
    this.tarifaService.obtenerTarifaDistrito(this.idDistritoSeleccionado)
      .subscribe({
        next: (resp) => {
          this.precioTarifa = parseFloat(resp.precio);
          console.log("Precio obtenido:", this.precioTarifa);
        },
        error: (err) => {
          console.error("Error obteniendo tarifa:", err);
          this.precioTarifa = 0;
        }
      }
      );
  }

  get tarifaDomicilio(): string {
    const n = Number(this.precioTarifa) || 0;
    return n.toFixed(2);
  }


registrarCitaDiagnostico(formCitaDiagnostico: NgForm) {
  // 🔥 Marca todos los campos como tocados para activar los mensajes en rojo
  formCitaDiagnostico.form.markAllAsTouched();

  // Validación global antes de enviar
  formCitaDiagnostico.form.markAllAsTouched();

if (formCitaDiagnostico.invalid) {
  Swal.fire({
    title: "Registro incompleto",
    text: "Por favor completa todos los campos obligatorios antes de continuar.",
    icon: "warning",
    confirmButtonText: "Aceptar"
  });
  return;
}


  // Si todo está completo, continúa con el envío
  const idCliente = Number(localStorage.getItem('id_cliente'));
  const precioCita = 50.00;
  const precioDomicilio = this.citas_diagnostico.id_modalidad == 3
    ? parseFloat(this.tarifaDomicilio) || 0
    : 0;

  const montoFinal = precioCita + precioDomicilio;

  const data = {
    citas_diagnostico: {
      id_cliente: idCliente,
      id_horario: this.citas_diagnostico.id_horario,
      fecha_atencion: this.citas_diagnostico.fecha_atencion,
      estado: "Pendiente",
      id_modalidad: this.citas_diagnostico.id_modalidad,
      id_tarifadomicilio: this.citas_diagnostico.id_modalidad == 3 ? this.idDistritoSeleccionado : null,
      id_distrito: this.citas_diagnostico.id_modalidad == 3 ? this.idDistritoSeleccionado : null,
      direccion: this.citas_diagnostico.id_modalidad == 3 ? this.citas_diagnostico.direccion : null,
      documento: this.citas_diagnostico.documento,
      comentario_cliente: this.citas_diagnostico.comentario_cliente,
      id_usuario: null,
      observacion_tecnico: null,
      precio_diagnostico: precioCita,
      precio_domicilio: precioDomicilio,
    },
    pago: {
      id_tipopago: "CREDIT_CARD",
      fecha_pago: this.obtenerFechaHoraPeru(),
      monto_final: montoFinal,
    },
  };

  // Si todo está bien, abre la pasarela con el monto correcto
  this.mostrarPasarela(montoFinal, this.correo, data);
}



  obtenerFechaHoraPeru(): string {
    const fecha = new Date();
    const formateador = new Intl.DateTimeFormat("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Lima"
    });

    const partes = formateador.formatToParts(fecha);

    const get = (tipo: string) =>
      partes.find(p => p.type === tipo)?.value || "00";

    return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
  }

  async mostrarPasarela(monto:number, email: string, dataPago: any){
    const mp = new MercadoPago('TEST-18feeddc-35a5-4ca5-8a6a-c8761e37c9c1', {
        locale: 'es-PE'
    });
    const bricksBuilder = mp.bricks();
    const settings = {
      initialization: {
        amount: 100,
        payer: {
          email: "demo@mail.com",
        }
      },
      customization: {
        paymentMethods: {
          creditCard: "all",
          maxInstallments: 1
        }
      },
      callbacks: {
        onReady: () => {
          console.log("CardPayment Brick listo");
        },
        onSubmit: (cardFormData:any) => {
          console.log("Payload enviado:", cardFormData);

          return new Promise((resolve, reject) => {
            fetch(`${environment.urlHost}/mercado-pago/procesar-pago`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cardFormData),
            })
              .then((res) => res.json())
              .then((data) => {
                this.citaService.registrarCitaDiagnostico(dataPago).subscribe({
                  next: (resp) => {
                    Swal.fire({
                      title: "¡Registro exitoso!",
                      text: "Se ha registrado la cita de diagnóstico con éxito.",
                      icon: "success",
                      draggable: true,
                      confirmButtonText: "Aceptar",
                    
                    }).then(() => {
                      window.location.reload();
                    })
                  },
                  error: (err) => {
                    //alert("Hubo un problema al registrar.");
                    console.error("Error al registrar", err);
                    Swal.fire({
                      title: "Error al Registrar!",
                      text: "Hubo un problema al registrar su cita de diagnóstico.",
                      icon: "error",
                      draggable: true
                    });
                  }
                  
                });
              })
              .catch((err) => {
                console.error(err);
                Swal.fire({
                  title: "Error al Registrar!",
                  text: "Hubo un problema al registrar su cita de diagnóstico.",
                  icon: "error",
                  draggable: true
                });
                // reject();
              });
          });
        },
        onError: (error: string) => {
          console.error("Error en CardPayment:", error);
        },
      }
    };

    this.paymentBrickController = await bricksBuilder.create(
      "cardPayment",
      "cardPaymentBrick_container",
      settings
    );
    /*
    const renderCardPaymentBrick = async (bricksBuilder: any) => {
        const settings = {
            initialization: {
                amount: 30, // monto a ser pago
                payer: {
                    email: "test_user@test.com",
                },
            },
            customization: {
                visual: {
                    style: {
                        theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
                        customVariables: {},
                    },
                },
                paymentMethods: {
                    maxInstallments: 1,
                },
            },
            callbacks: {
                onReady: () => {
                    // callback llamado cuando Brick esté listo
                },
                onSubmit: (cardFormData:any) => {
                    //  callback llamado cuando el usuario haga clic en el botón enviar los datos
                    //  ejemplo de envío de los datos recolectados por el Brick a su servidor
                    return new Promise((resolve, reject) => {
                        fetch("http://localhost:81/mercado-pago/procesar-pago", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(cardFormData)
                            })
                            .then((response) => {
                                // recibir el resultado del pago
                                alert('Pago realizado correctamente');
                                // resolve();
                            })
                            .catch((error) => {
                                // tratar respuesta de error al intentar crear el pago
                                reject();
                            })
                    });
                },
                onError: (error:any) => {
                    // callback llamado para todos los casos de error de Brick
                },
            },
        };
        this.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
    };
    */
    // renderCardPaymentBrick(bricksBuilder);
  }
}
