export class ServicioTecnico {
    id_cita?: number;
    id_cliente?: number;
    id_servicio?: number;
    id_horario?: number;
    fecha_atencion?: string;
    id_modalidad?: number;
    id_tarifadomicilio?: number;
    id_distrito?: number;
    direccion?: string;
    documento?: string;
    estado?: string;
    id_usuario?: number;
    observacion_tecnico?: string;
    comentario_cliente?: string;
    precio_serviciot?: number;
    precio_domicilio?: number;
    //pagos?: pagos[];
}

export class pagos{
    id_tipo_pago?: string;
    id_cita?: number;
    id_servicio_tecnico?: number;
    fecha_pago?: string;
    monto_final?: number;
}