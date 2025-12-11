import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ModalidadService } from 'src/app/services/modalidad.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Modal } from 'bootstrap';
import { UsuarioService } from 'src/app/services/usuario.service';


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

  idCliente!: number;
  page: number = 1;
  itemsPerPage: number = 8;

  detallePago: any;


  constructor(
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private modalidadService: ModalidadService,
    private distritoService: DistritoService,
    private horarioService: HorarioService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.idCliente = Number(localStorage.getItem('id_cliente'));

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
      this.usuarioService.listarUsuarios().toPromise().then(data => this.usuarios = data)
    ]);
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


  abrirModal(id_pago: number) {
    this.detallePago = null;

    this.clienteService.detallePago(id_pago).subscribe(detalle => {
      console.log("DETALLE RECIBIDO:", detalle);

      this.detallePago = detalle[0];

      setTimeout(() => {
        const modalEl = document.getElementById('detalleModal');
        const modal = Modal.getOrCreateInstance(modalEl!);
        modal.show();
      }, 50);
    });
  }

}


