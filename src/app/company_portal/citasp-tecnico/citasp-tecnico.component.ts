import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';
import { switchMap } from 'rxjs';
import { ServiciosTecnicosService } from 'src/app/client-portal/servicios_tecnicos/service/servicios_tecnicos.service';
import { CitaService } from 'src/app/services/cita.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ModalidadService } from 'src/app/services/modalidad.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citasp-tecnico',
  templateUrl: './citasp-tecnico.component.html',
  styleUrls: ['./citasp-tecnico.component.scss']
})
export class CitaspTecnicoComponent {
  listaCitasPendientes: any[] = [];
  serviciosInstall: any[] = [];
  serviciosRepair: any[] = [];
  modalidades: any[] = [];
  distritos: any[] = [];
  horarios: any[] = [];
  usuarios: any[] = [];
  clientes: any[] = [];

  page: number = 1;
  itemsPerPage: number = 10;

  citaSeleccionada: any = null;
  modalInstance: any;
  idServicioReparacionSeleccionado: any = '';
  precioReparacionSeleccionado: number = 0.00;

  // Filtros
  searchText: string = "";
  filtroServicio: string = "";
  filtroDistrito: string = "";
  filtroModalidad: string = "";

  servicios_tecnicos: any = {
    id_servicio: 0,
    id_cita: 0,
    id_cliente: 0,
    id_modalidad: '',
    id_distrito: '',
    direccion: '',
    fecha_atencion: '',
    id_horario: '',
    documento: '',
    precio_serviciot: 0.00,
    precio_domicilio: 0.00
  };

  idServicioSeleccionado: any = '';
  precioSeleccionado: number = 0.00;
  fechaUnica: string = '';

  idDistritoSeleccionado: any = '';
  precioTarifa: number = 0.00;
  modalidadAnterior: number = 0;
  formCitaTecnico!: NgForm;

  constructor(
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private modalidadService: ModalidadService,
    private distritoService: DistritoService,
    private horarioService: HorarioService,
    private usuarioService: UsuarioService,
    private citaService: CitaService,
    private tarifaService: TarifaService,
    private serviciosTecnicosService: ServiciosTecnicosService
  ) { }

  ngOnInit(): void {
    const hoy = new Date();
    this.fechaUnica = hoy.toISOString().split('T')[0];
    this.servicios_tecnicos.fecha_atencion = this.fechaUnica;

    const token = localStorage.getItem('token');
    const idusuario = Number(localStorage.getItem('id_usuario'));
    if (token && idusuario) {
      this.usuarioService.obtenerUser(idusuario, token).subscribe({
        next: data => this.usuarios = data,
        error: err => console.error('Error al cargar cliente:', err)
      });
    }

    this.cargarCatalogos().then(() => {
      this.cargarCitasPendientes();
    });

    this.servicioService.getServiciosReparacion().subscribe({
      next: (sr: any[]) => this.serviciosRepair = sr,
      error: (err: any) => console.error('Error al cargar instalación:', err)
    })
  }

  async cargarCatalogos() {
    await Promise.all([
      this.servicioService.listarServicio().toPromise().then(data => this.serviciosInstall = data),
      this.modalidadService.listarModalidades().toPromise().then(data => this.modalidades = data),
      this.distritoService.listarDistritos().toPromise().then(data => this.distritos = data),
      this.horarioService.listarHorarios().toPromise().then(data => this.horarios = data),
      this.clienteService.listarClientes().toPromise().then(data => this.clientes = data),
    ]);
  }

  cargarCitasPendientes() {
    let idusuario = Number(localStorage.getItem('id_usuario'));
    this.citaService.getCitasTecnico(idusuario).subscribe({
      next: (resp) => {
        console.log("Citas recibidos:", resp);
        this.listaCitasPendientes = resp;
      },
      error: (err) => {
        console.error("Error al obtener citas:", err);
      }
    });
  }

  ;

  getServicioDesc(id: number): string {
    const s = this.serviciosInstall.find(x => x.id_servicio == id);
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

  getClientes(id: number): string {
    const c = this.clientes.find(x => x.id_cliente == id);
    return c ? `${c.nombres} ${c.apellidos}` : '';
  }
  getClientesDocumento(id: number): string {
    const c = this.clientes.find(x => x.id_cliente == id);
    return c ? c.documento : '';
  }

  setearPrecio(): void {
    const servicio = this.serviciosRepair.find(sr => sr.id_servicio == this.idServicioReparacionSeleccionado);
    this.precioReparacionSeleccionado = servicio ? parseFloat(servicio.precio) : 0.00;
  }

  get precioServicioReparacion(): string {
    const n = Number(this.precioReparacionSeleccionado) || 0;
    return n.toFixed(2);
  }

  abrirModal(id_cita: number) {
    this.citaService.getCitaDetalle(id_cita).subscribe({
      next: (resp) => {
        this.citaSeleccionada = resp;
        this.citaSeleccionada.id_usuario = "";

        setTimeout(() => {
          const modalEl = document.getElementById('modalDetalleCita');
          const modal = Modal.getOrCreateInstance(modalEl!);
          modal.show();
        }, 50);
      },
      error: (err) => console.error(err)
    });

  }


  validarModalidad() {
    if (this.servicios_tecnicos.id_modalidad != 3) {
      this.idDistritoSeleccionado = '';
      this.servicios_tecnicos.direccion = '';
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



  guardarCambios() {

    const idServicio = Number(this.idServicioReparacionSeleccionado);
    const precioServicioR = parseFloat(this.precioServicioReparacion) || 0;
    const precioDomicilio = this.servicios_tecnicos.id_modalidad == 3
      ? parseFloat(this.tarifaDomicilio) || 0
      : 0;


    const data = {
      id_cita: this.citaSeleccionada.id_cita,
      id_cliente: this.citaSeleccionada.id_cliente,
      observacion_tecnico: this.citaSeleccionada.observacion_tecnico,

      servicios_tecnicos: {
        id_servicio: idServicio,
        id_modalidad: this.servicios_tecnicos.id_modalidad,
        id_tarifadomicilio:
          this.servicios_tecnicos.id_modalidad == 3 ? this.idDistritoSeleccionado : null,
        id_distrito:
          this.servicios_tecnicos.id_modalidad == 3 ? this.idDistritoSeleccionado : null,
        direccion:
          this.servicios_tecnicos.id_modalidad == 3 ? this.servicios_tecnicos.direccion : null,
        fecha_atencion: this.servicios_tecnicos.fecha_atencion,
        id_horario: this.servicios_tecnicos.id_horario,
        documento: this.citaSeleccionada.documento,
        precio_serviciot: precioServicioR,
        precio_domicilio: precioDomicilio
      }
    };

    console.log('DATA ENVIADA 👉', data);

    this.citaService.finalizarCita(data).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'La cita fue finalizada correctamente'
        }).then(() => window.location.reload());
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo completar la operación', 'error');
      }
    });
  }

  filtrarCitas() {
    return this.listaCitasPendientes.filter(c => {
      const cumpleDistrito = this.filtroDistrito
        ? c.id_distrito == this.filtroDistrito
        : true;

      const cumpleModalidad = this.filtroModalidad
        ? c.id_modalidad == this.filtroModalidad
        : true;

      return cumpleDistrito && cumpleModalidad;
    });
  }

}
