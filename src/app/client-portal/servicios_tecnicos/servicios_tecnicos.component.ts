import { Component, OnInit } from '@angular/core';
import { ModalidadService } from 'src/app/services/modalidad.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { ServiciosTecnicosService } from './service/servicios_tecnicos.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios_tecnicos.component.html',
  styleUrls: ['./servicios_tecnicos.component.scss']
})
export class ServiciosTecnicosComponent implements OnInit {
  servicios: any[] = [];
  modalidades: any[] = [];
  distritos: any[] = [];
  horarios: any[] = [];
  tarifasDomicilio: any[] = [];
  cliente: any = {};
  nombreCompleto: string = '';

  servicios_tecnicos: any = {
    id_servicio: 0,
    id_cliente: '',
    id_modalidad: '',
    id_distrito: '',
    direccion: '',
    fecha_atencion: '',
    id_horario: '',
    documento: '',
    estado: '',
    comentario_cliente: '',
    precio_serviciot: 0.00,
    precio_domicilio: 0.00,
  };

  idServicioSeleccionado: any = '';
  precioSeleccionado: number = 0.00;
  fechaMinima: string = '';

  idDistritoSeleccionado: any = '';
  precioTarifa: number = 0.00;
  modalidadAnterior: number = 0;

  constructor(
    private modalidadService: ModalidadService,
    private distritoService: DistritoService,
    private horarioService: HorarioService,
    private servicioService: ServicioService,
    private tarifaService: TarifaService,
    private clienteService: ClienteService,
    private serviciosTecnicosService: ServiciosTecnicosService,
  ) { }

  ngOnInit(): void {
    //fecha
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 2);
    this.fechaMinima = manana.toISOString().split('T')[0];
    this.servicios_tecnicos.fecha_atencion = this.fechaMinima;

    // Cargar modalidades
    this.modalidadService.getModalidades().subscribe({
      next: (d: any[]) => this.modalidades = d,
      error: (err: any) => console.error('Error al cargar modalidades:', err)
    });

    // Cargar distritos
    this.distritoService.listar().subscribe({
      next: (d: any[]) => this.distritos = d,
      error: (err: any) => console.error('Error al cargar distritos:', err)
    });

    // Cargar horarios
    this.horarioService.listar().subscribe({
      next: (h: any[]) => this.horarios = h,
      error: (err: any) => console.error('Error al cargar horarios:', err)
    });

    // Cargar tarifas por distrito
    this.tarifaService.listar().subscribe({
      next: (t: any[]) => this.tarifasDomicilio = t,
      error: (err: any) => console.error('Error al cargar tarifas:', err)
    });

    this.servicioService.getServiciosInstalacion().subscribe({
      next: (s: any[]) => this.servicios = s,
      error: (err: any) => console.error('Error al cargar instalación:', err)
    });

    const token = localStorage.getItem('token');
    const idCliente = Number(localStorage.getItem('id_cliente'));

    if (token && idCliente) {
      this.clienteService.obtenerCliente(idCliente, token).subscribe({
        next: data => {
          this.cliente = data;
          this.nombreCompleto = `${this.cliente.nombres} ${this.cliente.apellidos}`;
          this.servicios_tecnicos.id_cliente = this.cliente.id_cliente;
        },
        error: err => console.error('Error al cargar cliente:', err)
      });
    }
  }

  validarNoDomingo() {
    if (!this.servicios_tecnicos.fecha_atencion) return;

    const [year, month, day] = this.servicios_tecnicos.fecha_atencion.split('-').map(Number);
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
      this.servicios_tecnicos.fecha_atencion = this.fechaMinima;
    }
  }

  setearPrecio(): void {
    const servicio = this.servicios.find(s => s.id_servicio == this.idServicioSeleccionado);
    console.log('Servicio seleccionado:', servicio);
    this.precioSeleccionado = servicio ? parseFloat(servicio.precio) : 0.00;
    console.log('Precio actualizado:', this.precioSeleccionado);
  }

  get precioServicio(): string {
    const n = Number(this.precioSeleccionado) || 0;
    return n.toFixed(2);
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


registrarServicioInstalacion(formCita: NgForm) {
  // 🔥 Marca todos los campos como tocados para activar los mensajes en rojo
  formCita.form.markAllAsTouched();

  // Validación global antes de enviar
  if (formCita.invalid || !this.servicios_tecnicos.acepto) {
    Swal.fire({
      title: "Registro incompleto",
      text: "Por favor completa todos los campos obligatorios y acepta los términos y condiciones.",
      icon: "warning",
      confirmButtonText: "Aceptar"
    });
    return;
  }

  const precioServicio = parseFloat(this.precioServicio) || 0;
  const precioDomicilio = this.servicios_tecnicos.id_modalidad == 3
    ? parseFloat(this.tarifaDomicilio) || 0
    : 0;

  const montoFinal = precioServicio + precioDomicilio;

  const data = {
    servicios_tecnicos: {
      id_cita: null,
      id_cliente: this.cliente.id_cliente,
      id_servicio: this.idServicioSeleccionado,
      id_horario: this.servicios_tecnicos.id_horario,
      fecha_atencion: this.servicios_tecnicos.fecha_atencion,
      id_modalidad: this.servicios_tecnicos.id_modalidad,
      id_tarifadomicilio:
        this.servicios_tecnicos.id_modalidad == 3 ? this.idDistritoSeleccionado : null,
      id_distrito:
        this.servicios_tecnicos.id_modalidad == 3 ? this.idDistritoSeleccionado : null,
      direccion:
        this.servicios_tecnicos.id_modalidad == 3 ? this.servicios_tecnicos.direccion : null,
      documento: this.servicios_tecnicos.documento,
      comentario_cliente: this.servicios_tecnicos.comentario_cliente,
      estado: "Pendiente",
      id_usuario: null,
      observacion_tecnico: null,
      precio_serviciot: precioServicio,
      precio_domicilio: precioDomicilio,
      acepto: this.servicios_tecnicos.acepto
    },
    pago: {
      id_tipopago: "CREDIT_CARD",
      fecha_pago: this.obtenerFechaHoraPeru(),
      monto_final: montoFinal,
    },
  };

  console.log("Enviando a API:", data);

  this.serviciosTecnicosService.registrarServicio(data).subscribe({
    next: (resp) => {
      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Se ha registrado la cita de instalación con éxito.",
        icon: "success",
        draggable: true,
        confirmButtonText: "Aceptar",
      }).then(() => {
        window.location.reload();
      });
    },
    error: (err) => {
      console.error("Error al registrar", err);
      Swal.fire({
        title: "Error al Registrar!",
        text: "Hubo un problema al registrar su cita de instalación.",
        icon: "error",
        draggable: true
      });
    }
  });
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
}
