import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { CitaService } from 'src/app/services/cita.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ModalidadService } from 'src/app/services/modalidad.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citasp-tecnico',
  templateUrl: './citasp-tecnico.component.html',
  styleUrls: ['./citasp-tecnico.component.scss']
})
export class CitaspTecnicoComponent {
  listaCitasPendientes: any[] = [];
      servicios: any[] = [];
      modalidades: any[] = [];
      distritos: any[] = [];
      horarios: any[] = [];
      usuarios: any[] = [];
      clientes: any[] = [];
     
      page: number = 1;
      itemsPerPage: number = 10;
  
      citaSeleccionada: any = null;
    modalInstance: any;
  
      // Filtros
  searchText: string = "";
  filtroServicio: string = "";
  filtroDistrito: string = "";
  filtroModalidad: string = "";
    
    
      constructor(
        private clienteService: ClienteService,
        private servicioService: ServicioService,
        private modalidadService: ModalidadService,
        private distritoService: DistritoService,
        private horarioService: HorarioService,
        private usuarioService: UsuarioService,
        private citaService: CitaService
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
          this.servicioService.listarServicio().toPromise().then(data => this.servicios = data),
          this.modalidadService.listarModalidades().toPromise().then(data => this.modalidades = data),
          this.distritoService.listarDistritos().toPromise().then(data => this.distritos = data),
          this.horarioService.listarHorarios().toPromise().then(data => this.horarios = data),
          this.clienteService.listarClientes().toPromise().then(data => this.clientes = data),
          this.usuarioService.listaUsuariosTecnicos().toPromise().then(data => this.usuarios = data)
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
  
      getClientes(id: number): string {
        const c = this.clientes.find(x => x.id_cliente == id);
        return c ? `${c.nombres} ${c.apellidos}` : '';
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
  
  
    guardarCambios() {
    this.citaService.comentarioUpdate(this.citaSeleccionada).subscribe({
      next: () => {
        Swal.fire({
                              title: "¡Registro exitoso!",
                              text: "Ha registrado con éxito su comentario.",
                              icon: "success",
                              draggable: true,
                              confirmButtonText: "Aceptar",
                            
                            }).then(() => {
                              window.location.reload();
                            })
        this.modalInstance.hide();
      },
      error: (err) => console.error(err)
    });
  }

}
