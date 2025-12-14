import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ModalidadService } from 'src/app/services/modalidad.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Modal } from 'bootstrap';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CitaService } from 'src/app/services/cita.service';
import { ServiciosTecnicosService } from '../servicios_tecnicos/service/servicios_tecnicos.service';


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
      error: (err: any) => console.error('Error al cargar instalación:', err)
    })
  }

  cargarPagos() {
    this.clienteService.obtenerListaPagos(this.idCliente).subscribe({
      next: (resp) => {
        console.log("Pagos recibidos:", resp);
        this.listaPagos = resp;
      },
      error: (err) => {
        console.error("Error al obtener pagos:", err);
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
    console.log(u);
    return u ? `${u.nombres} ${u.apellidos}` : '';

  }


  // abrirModal(id_pago: number) {


  //   this.servicioTecnicoService
  //     .obtenerServicioFaltaPago(this.idCliente, this.idCita)
  //     .subscribe(resp => {
  //       console.log(resp);
  //     });

  //   this.detallePago = null;

  //   this.clienteService.detallePago(id_pago).subscribe(detalle => {
  //     console.log("DETALLE RECIBIDO:", detalle);

  //     this.detallePago = detalle[0];

  //     setTimeout(() => {
  //       const modalEl = document.getElementById('detalleModal');
  //       const modal = Modal.getOrCreateInstance(modalEl!);
  //       modal.show();
  //     }, 50);
  //   });
  // }
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

      this.servicioTecnico = st[0]; // si es array
      console.log('aquiiiiiiiiiii',st);

      this.clienteService.detallePago(id_pago).subscribe(detalle => {

        this.detallePago = detalle[0];

        const modalEl = document.getElementById('detalleModal');
        const modal = Modal.getOrCreateInstance(modalEl!);
        modal.show();

      });

    });
}

  pagarServicio() {
    const dataPag = {
      id_tipopago: "CREDIT_CARD",
  id_servicio_tecnico: this.servicioTecnico.id_servicio_tecnico,
  monto_final: this.montoTotal
};

this.servicioTecnicoService.registrarPago(dataPag).subscribe({
  next: resp => {
    console.log('Pago registrado', resp);
  },
  error: err => {
    console.error('Error', err);
  }
});}

}


