import { Component } from '@angular/core';
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
  selector: 'app-serviciosp-tecnico',
  templateUrl: './serviciosp-tecnico.component.html',
  styleUrls: ['./serviciosp-tecnico.component.scss']
})
export class ServiciospTecnicoComponent {
  listaStPendientes: any[] = [];
    serviciosInstall: any[] = [];
    serviciosRepair: any[] = [];
    modalidades: any[] = [];
    distritos: any[] = [];
    horarios: any[] = [];
    usuarios: any[] = [];
    clientes: any[] = [];
  
    page: number = 1;
    itemsPerPage: number = 10;
  
    stSeleccionada: any = null;
    modalInstance: any;
    idServicioReparacionSeleccionado: any = '';
    precioReparacionSeleccionado: number = 0.00;
  
    // Filtros
    searchText: string = "";
    filtroServicio: string = "";
    filtroDistrito: string = "";
    filtroModalidad: string = "";
  
      idServicioSeleccionado: any = '';
    precioSeleccionado: number = 0.00;
      fechaUnica: string = '';
  
    idDistritoSeleccionado: any = '';
    precioTarifa: number = 0.00;
    modalidadAnterior: number = 0;
  
  
    constructor(
      private clienteService: ClienteService,
      private servicioService: ServicioService,
      private modalidadService: ModalidadService,
      private distritoService: DistritoService,
      private horarioService: HorarioService,
      private usuarioService: UsuarioService,
      private citaService: CitaService,
      private tarifaService: TarifaService,
      private stService: ServiciosTecnicosService
    ) { }
  
    ngOnInit(): void {

  
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
  
    }
  
    async cargarCatalogos() {
      await Promise.all([
        this.servicioService.listarServicio().toPromise().then(data => this.serviciosInstall = data),
        this.modalidadService.listarModalidades().toPromise().then(data => this.modalidades = data),
        this.distritoService.listarDistritos().toPromise().then(data => this.distritos = data),
        this.horarioService.listarHorarios().toPromise().then(data => this.horarios = data),
        this.clienteService.listarClientes().toPromise().then(data => this.clientes = data),
        //this.usuarioService.listaUsuariosTecnicos().toPromise().then(data => this.usuarios = data)
      ]);
    }
  
    cargarCitasPendientes() {
      let idusuario = Number(localStorage.getItem('id_usuario'));
      this.stService.getStTecnico(idusuario).subscribe({
        next: (resp) => {
          console.log("Citas recibidos:", resp);
          this.listaStPendientes = resp;
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
  
    abrirModal(id_servicio_tecnico: number) {
      this.stService.getStDetalle(id_servicio_tecnico).subscribe({
        next: (resp) => {
          this.stSeleccionada = resp;
          this.stSeleccionada.id_usuario = "";
  
          setTimeout(() => {
            const modalEl = document.getElementById('modalDetalleCita');
            const modal = Modal.getOrCreateInstance(modalEl!);
            modal.show();
          }, 50);
        },
        error: (err) => console.error(err)
      });
  
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
  
  
  
  
    //
  
guardarCambios() {

  const data = {
    id_servicio_tecnico: this.stSeleccionada.id_servicio_tecnico,
    observacion_tecnico: this.stSeleccionada.observacion_tecnico
  };

  this.stService.comentarioStUpdate(data).subscribe({
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

}
