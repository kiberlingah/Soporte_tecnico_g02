import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ModalidadService } from 'src/app/services/modalidad.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Modal } from 'bootstrap';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environment/environment';
import { CitaService } from 'src/app/services/cita.service';
import { ServiciosTecnicosService } from '../servicios_tecnicos/service/servicios_tecnicos.service';
import Swal from 'sweetalert2';

declare var MercadoPago: any;
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  listaPagos: any[] = [];
  servicios: any[] = [];
  modalidades: any[] = [];
  distritos: any[] = [];
  horarios: any[] = [];
  usuarios: any[] = [];
  serviciosRepair: any[] = [];
  cliente: any = {};
   paymentBrickController: any;
  correo: string = '';


  idCliente!: number;
  idCita!: number;
  page: number = 1;
  itemsPerPage: number = 8;

  detallePago: any;
  servicioTecnico: any;


  constructor(
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private modalidadService: ModalidadService,
    private distritoService: DistritoService,
    private horarioService: HorarioService,
    private usuarioService: UsuarioService,
    private servicioTecnicoService: ServiciosTecnicosService,
  ) { }

  ngOnInit(): void {
    this.idCliente = Number(localStorage.getItem('id_cliente'));
    this.idCita = Number(localStorage.getItem('id_cita'));

    this.cargarCatalogos().then(() => {
      this.cargarPagos();
    });

    const token = localStorage.getItem('token');
    const idCliente = Number(localStorage.getItem('id_cliente'));

        if (token && idCliente) {
      this.clienteService.obtenerCliente(idCliente, token).subscribe({
        next: data => {
          this.cliente = data;
        },
      });
    }
  }

  async cargarCatalogos() {
    await Promise.all([
      this.servicioService.listarServicio().toPromise().then(data => this.servicios = data),
      this.modalidadService.listarModalidades().toPromise().then(data => this.modalidades = data),
      this.distritoService.listarDistritos().toPromise().then(data => this.distritos = data),
      this.horarioService.listarHorarios().toPromise().then(data => this.horarios = data),
      this.usuarioService.listarUsuarios().toPromise().then(data => this.usuarios = data),
    ]);

    this.servicioService.getServiciosReparacion().subscribe({
      next: (sr: any[]) => this.serviciosRepair = sr,
    })
  }

  cargarPagos() {
    this.clienteService.obtenerListaPagos(this.idCliente).subscribe({
      next: (resp) => {
        this.listaPagos = resp;
      },
      error: (err) => {
      }
    });
  }

  getServicioDesc(id: number): string {
    const s = this.servicios.find(x => x.id_servicio == id);
    return s ? s.descripcion_servicio : 'Cita de Diagnostico';
  }

  getModalidadNombre(id: number): string {
    const m = this.modalidades.find(x => x.id_modalidad == id);
    return m ? m.nombre_modalidad : '';
  }

  getDistritoNombre(id: number): string {
    const d = this.distritos.find(x => x.id_distrito == id);
    return d ? d.nombre_distrito : '';
  }

  getHorario(id: number): string {
    const h = this.horarios.find(x => x.id_horario == id);
    return h ? h.horario : '';
  }

  getUsuarioDatos(id: number): string {
    const u = this.usuarios.find(x => x.id_usuario == id);
    return u ? `${u.nombres} ${u.apellidos}` : '';

  }


get montoTotal(): string {

  const precioServ =Number(this.servicioTecnico.precio_serviciot || 0); 
    const precioDom=     Number(this.servicioTecnico.precio_domicilio || 0);
    const precioTotal = precioServ + precioDom;
    const n = Number(precioTotal)||0;
    return n.toFixed(2);
}

  abrirModal(id_pago: number, id_cita: number) {

  this.detallePago = null;
  this.servicioTecnico = null;

  this.servicioTecnicoService
    .obtenerServicioFaltaPago(this.idCliente, id_cita)
    .subscribe(st => {

      this.servicioTecnico = st[0];

      this.clienteService.detallePago(id_pago).subscribe(detalle => {

        this.detallePago = detalle[0];

        const modalEl = document.getElementById('detalleModal');
        const modal = Modal.getOrCreateInstance(modalEl!);
        modal.show();

      });

    });
}

  pagarServicio() {
const montoFinal = parseFloat(this.montoTotal) || 0;

    const dataPag = {
      id_tipopago: "CREDIT_CARD",
  id_servicio_tecnico: this.servicioTecnico.id_servicio_tecnico,
  monto_final: montoFinal
};

    setTimeout(() => {
      const modalEl = document.getElementById('pasarelaModal');
      const modal = Modal.getOrCreateInstance(modalEl!);
      modal.show();
    }, 50);


    this.mostrarPasarela(montoFinal, this.correo, dataPag);
    return;
  }

async mostrarPasarela(monto: number, email: string, dataPago: any) {
    const mp = new MercadoPago('TEST-18feeddc-35a5-4ca5-8a6a-c8761e37c9c1', {
      locale: 'es-PE'
    });
    const bricksBuilder = mp.bricks();
    const settings = {
      initialization: {
        amount: 100,
        payer: {
          email: email,
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
        },
        onSubmit: (cardFormData: any) => {
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
                this.servicioTecnicoService.registrarPago(dataPago).subscribe({
                  next: (resp) => {
                    Swal.fire({
                      title: "¡Registro exitoso!",
                                  html: `
    <p>Se ha registrado la cita de diagnóstico con éxito.</p>
    <p>En breve recibirá un correo de confirmación.</p>
    <p><strong>Gracias por elegirnos.</strong></p>
  `,
                      icon: "success",
                      draggable: true,
                      confirmButtonText: "Aceptar",
                    }).then(() => {
                      window.location.reload();
                    });
                  },
                  error: (err) => {
                    Swal.fire({
                      title: "Error al Registrar!",
                      text: "Hubo un problema al registrar su cita de instalación.",
                      icon: "error",
                      draggable: true
                    });

                  }

                });
              })
              .catch((err) => {
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

  }

}


