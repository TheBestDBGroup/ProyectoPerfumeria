CREATE SEQUENCE ydm_secuencia_perfume
     start with 1
     increment 1
     minvalue 1
     maxvalue 30
;

CREATE TABLE ydm_perfume
(
     id_perfume numeric NOT NULL DEFAULT nextval('ydm_secuencia_perfume'::regclass),
     nombre_perfume varchar(75) NOT NULL,
     tipo_perfume varchar(10) NOT NULL,
     genero_perfume varchar(6) NOT NULL,
     edad_perfume varchar(9) NOT NULL,
     CONSTRAINT pk_id_perfume PRIMARY KEY (id_perfume),
     CONSTRAINT chk_tipo_perfume CHECK(tipo_perfume in ('monolitico', 'fases')),
     CONSTRAINT chk_genero_perfume CHECK(genero_perfume in ('hombre', 'mujer', 'unisex')),
     CONSTRAINT chk_edad_perfume CHECK(edad_perfume in ('adulto', 'joven', 'atemporal'))
);

CREATE SEQUENCE ydm_secuencia_perfumista
     start with 1
     increment 1
     minvalue 1
     maxvalue 50
;

CREATE TABLE ydm_perfumista
(
     id_perfumista numeric NOT NULL DEFAULT nextval('ydm_secuencia_perfumista'::regclass),
     nombre_perfumista varchar(20) NOT NULL,
     apellido_perfumista varchar(20) NOT NULL,
     email_perfumista varchar(50) UNIQUE DEFAULT NULL,
     sdo_nombre_perfumista varchar(20),
     sdo_apellido_perfumista varchar(20),
     CONSTRAINT pk_id_perfumista PRIMARY KEY (id_perfumista)
);

CREATE SEQUENCE ydm_secuencia_familia_olfativa
     start with 1
     increment 1
     minvalue 1
     maxvalue 10
;

CREATE TABLE ydm_familia_olfativa
(
     id_familia_olfativa numeric NOT NULL DEFAULT nextval('ydm_secuencia_familia_olfativa'::regclass),
     nombre_familia_olfativa varchar(20) NOT NULL UNIQUE,
     CONSTRAINT pk_id_familia_olfativa PRIMARY KEY (id_familia_olfativa)
);

CREATE SEQUENCE ydm_secuencia_proceso
     start with 1
     increment 1
     minvalue 1
     maxvalue 4
;

CREATE TABLE ydm_proceso
(
     id_proceso numeric NOT NULL DEFAULT nextval('ydm_secuencia_proceso'::regclass),
     nombre_proceso varchar(15) NOT NULL UNIQUE,
     descripcion_proceso varchar NOT NULL,
     CONSTRAINT pk_id_proceso PRIMARY KEY (id_proceso)
);

CREATE SEQUENCE ydm_secuencia_palabra_clave
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_palabra_clave
(
     id_palabra_clave numeric NOT NULL DEFAULT nextval('ydm_secuencia_palabra_clave'::regclass),
     nombre_palabra_clave varchar(20) NOT NULL UNIQUE,
     CONSTRAINT pk_id_palabra_clave PRIMARY KEY (id_palabra_clave)
);

CREATE SEQUENCE ydm_secuencia_ingrediente_prohibido
     start with 1
     increment 1
     minvalue 1
     maxvalue 20
;

CREATE TABLE ydm_ingrediente_prohibido
(
     id_ingrediente_prohibido numeric NOT NULL DEFAULT nextval('ydm_secuencia_ingrediente_prohibido'::regclass),
     nombre_ingrediente_prohibido varchar(30) NOT NULL UNIQUE,
     CONSTRAINT pk_id_ingrediente_prohibido PRIMARY KEY (id_ingrediente_prohibido)
);

CREATE SEQUENCE ydm_secuencia_condicion_pago
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_condicion_pago
(
    id_condicion_pago numeric NOT NULL DEFAULT nextval('ydm_secuencia_condicion_pago'::regclass),
    id_proveedor_condicion_pago numeric NOT NULL,
    tipo_condicion_pago varchar(7) NOT NULL,
    cuotas_condicion_pago numeric,
    prctj_cuotas_condicion_pago numeric,
    mesescantidad_condicion_pago numeric,
    CONSTRAINT pk_id_condicion_pago PRIMARY KEY (id_condicion_pago, id_proveedor_condicion_pago),
    CONSTRAINT chk_tipo_condicion_pago CHECK(tipo_condicion_pago in ('credito', 'contado'))
);

CREATE SEQUENCE ydm_secuencia_esencia_perfume
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_esencia_perfume
(
    id_esencia_perfume numeric NOT NULL DEFAULT nextval('ydm_secuencia_esencia_perfume'::regclass),
    nombre_esencia_perfume varchar(30) NOT NULL UNIQUE,
    descripcion_esencia_perfume varchar NOT NULL,
    tipo_esencia_perfume varchar(10) NOT NULL,
    cas_esencia_perfume numeric UNIQUE DEFAULT NULL,
    id_proceso_esencia_perfume numeric,    
    CONSTRAINT pk_id_esencia_perfume PRIMARY KEY (id_esencia_perfume),
    CONSTRAINT chk_tipo_esencia_perfume CHECK(tipo_esencia_perfume in ('natural', 'sintetico'))
);

CREATE SEQUENCE ydm_secuencia_ingrediente_general
     start with 1
     increment 1
     minvalue 1
     maxvalue 10
;

CREATE TABLE ydm_ingrediente_general
(
    id_ingrediente_general numeric NOT NULL DEFAULT nextval('ydm_secuencia_ingrediente_general'::regclass),
    cas_ingrediente_general numeric NOT NULL,
    nombre_ingrediente_general varchar(30) NOT NULL,
    tipo_ingrediente_general varchar(10) NOT NULL,
    descripcion_ingrediente_general varchar NOT NULL,
    id_proveedor_ingrediente_general numeric,    
    CONSTRAINT pk_id_ingrediente_general PRIMARY KEY (id_ingrediente_general),
    CONSTRAINT chk_tipo_ingrediente_general CHECK(tipo_ingrediente_general in ('natural', 'sintetico'))
);

CREATE SEQUENCE ydm_secuencia_criterio_eval
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_criterio_eval
(
    id_criterio_eval numeric NOT NULL DEFAULT nextval('ydm_secuencia_criterio_eval'::regclass),
    tipo_criterio_eval varchar(10) NOT NULL,
    descripcion_criterio_eval varchar NOT NULL,
    peso_criterio_eval numeric NOT NULL, 
    CONSTRAINT pk_id_criterio_eval PRIMARY KEY (id_criterio_eval),
    CONSTRAINT chk_tipo_criterio_eval CHECK(tipo_criterio_eval in ('ubicación geográfica', 'costo', 'alternativa
de envío', 'condición de pago', 'cumplimiento'))
);

CREATE SEQUENCE ydm_secuencia_ingrediente_esencia
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_ingrediente_esencia
(
    id_ingrediente_esencia numeric NOT NULL DEFAULT nextval('ydm_secuencia_ingrediente_esencia'::regclass),
    cas_ingrediente_esencia numeric NOT NULL UNIQUE,
    nombre_ingrediente_esencia varchar(30) NOT NULL UNIQUE,
    proceso_ingrediente_esencia varchar(15) NOT NULL,
    desc_proceso_ingrediente_esencia varchar,
    vigencia_ingrediente_esencia date,
    flashpoint_ingrediente_esencia numeric,
    solubilidad_ingrediente_esencia varchar,
    CONSTRAINT pk_id_ingrediente_esencia PRIMARY KEY (id_ingrediente_esencia)
);

CREATE SEQUENCE ydm_secuencia_intensidad
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_intensidad
(
    id_intensidad numeric NOT NULL DEFAULT nextval('ydm_secuencia_intensidad'::regclass),
    id_perfume_intensidad numeric NOT NULL,
    tipo_intensidad varchar(20) NOT NULL,
    descripcion_intensidad varchar NOT NULL,
    CONSTRAINT pk_id_intensidad PRIMARY KEY (id_intensidad, id_perfume_intensidad)
);

CREATE TABLE ydm_escala
(
    fecha_creacion_escala date NOT NULL DEFAULT CURRENT_DATE,
    min_escala numeric NOT NULL,
    max_escala numeric NOT NULL,
    fecha_expiracion_escala date,
    CONSTRAINT pk_fecha_creacion_escala PRIMARY KEY (fecha_creacion_escala)
);

CREATE SEQUENCE ydm_secuencia_eval_crit
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_eval_crit
(
    id_eval_crit numeric NOT NULL DEFAULT nextval('ydm_secuencia_eval_crit'::regclass),
    id_productor_eval_crit numeric NOT NULL,
    id_criterio_eval_eval_crit numeric NOT NULL,
    peso_prctj_eval_crit numeric NOT NULL,
    tipo_eval_crit varchar(15) NOT NULL,
    fecha_final_eval_crit date,
    CONSTRAINT pk_id_eval_crit PRIMARY KEY (id_eval_crit, id_productor_eval_crit, id_criterio_eval_eval_crit),
    CONSTRAINT chk_tipo_eval_crit CHECK(tipo_eval_crit in ('inicial', 'renovacion'))
);

CREATE TABLE ydm_monolitico 
(
    id_perfume_monolitico numeric NOT NULL,
    id_aceite_monolitico numeric NOT NULL,
    CONSTRAINT pk_monolitico PRIMARY KEY (id_perfume_monolitico, id_aceite_monolitico)
);

CREATE TABLE ydm_otro_comp
(
   id_perfume_otro_comp numeric NOT NULL,
   id_ingrediente_general_otro_comp numeric NOT NULL,
   CONSTRAINT pk_otro_comp PRIMARY KEY (id_perfume_otro_comp,id_ingrediente_general_otro_comp)
);

CREATE SEQUENCE ydm_pres_perp 
    start with 1
    increment 1
    minvalue 1
    maxvalue 100
;

CREATE TABLE ydm_pres_perp(
    id_pres_perp numeric NOT NULL DEFAULT nextval
    ('ydm_pres_perp' ::regclass),
    id_intensidad_pres_perp numeric NOT NULL,
    CONSTRAINT pk_pres_perp PRIMARY kEY (id_pres_perp,id_intensidad_presp_perp)
);
 
 CREATE TABLE ydm_pfm_pfmt(
     id_perfume_pfm_pfmt numeric NOT NULL,
     id_perfumista_pfm_pfmt numeric NOT NULL,
     CONSTRAINT pk_pfm_pfmt PRIMARY kEY (id_perfume_pfm_pfmt,id_perfumista_pfm_pfmt)
 );


CREATE TABLE ydm_principal
(
    id_perfume_principal numeric NOT NULL,
    id_familia_olfativa_principal numeric NOT NULL,
    CONSTRAINT pk_principal PRIMARY KEY (id_perfume_principal,id_familia_olfativa_principal)
);

CREATE SEQUENCE ydm_secuencia_nota 
    start with 1
    increment 1
    minvalue 1
    maxvalue 100
;

CREATE TABLE ydm_nota 
(
    id_nota numeric NOT NULL DEFAULT nextval
    ('ydm_nota' ::regclass),
    id_perfume_nota numeric NOT NULL,
    id_aceite_nota numeric NOT NULL,
    tipo_nota varchar(8),
    CONSTRAINT pk_nota PRIMARY KEY (id_nota,id_perfume_nota,id_aceite_nota),
    CONSTRAINT chk_tipo_nota CHECK (tipo_nota in ('salida','corazon','fondo'))
);

CREATE TABLE ydm_ep_fo
(
    id_aceite_ep_fo numeric NOT NULL,
    id_familia_olfativa_ep_fo numeric NULL,
    CONSTRAINT pk_ep_fo PRIMARY KEY (id_aceite_ep_fo,id_familia_olfativa_ep_fo)
);

CREATE TABLE ydm_ie_fo
(
    id_familia_olfativa_ie_fo numeric NOT NULL,
    id_ingrediente_esencia_ie_fo numeric NOT NULL,
    CONSTRAINT pk_ie_fo PRIMARY kEY (id_familia_olfativa_ie_fo,id_ingrediente_esencia_ie_fo)
);

CREATE TABLE ydm_ep_ig
(
    id_aceite_ep_ig numeric NOT NULL,
    id_ingrediente_general_ep_ig numeric NOT NULL,
    CONSTRAINT pk_ep_ig PRIMARY KEY (id_aceite_ep_ig,id_ingrediente_general_ep_ig)
);

CREATE TABLE ydm_otro
(
    id_ingrediente_esencia_otro numeric NOT NULL,
    id_ingrediente_general_otro numeric NOT NULL,
    CONSTRAINT pk_otro PRIMARY KEY (id_ingrediente_esencia_otro,id_ingrediente_general_otro)
);

CREATE TABLE ydm_fo_pc
(
    id_familia_olfativa_fo_pc numeric NOT NULL,
    id_palabra_clave_fo_pc numeric NOT NULL,
    CONSTRAINT pk_fo_pc PRIMARY KEY (id_familia_olfativa_fo_pc,id_palabra_clave_fo_pc)
);

CREATE TABLE ydm_g_pc
(
    id_ingrediente_general_g_pc numeric NOT NULL,
    id_palabra_clave_g_pc numeric NOT NULL,
    CONSTRAINT pk_g_pc PRIMARY KEY (id_ingrediente_general_g_pc,id_palabra_clave_g_pc)
);

CREATE TABLE ydm_pc_ep
(
    id_palabra_clave_pc_ep numeric NOT NULL,
    id_esencia_perfume_pc_ep numeric NOT NULL,
    CONSTRAINT pk_pc_ep PRIMARY KEY (id_palabra_clave_pc_ep, id_esencia_perfume_pc_ep)
);

CREATE SEQUENCE ydm_secuencia_pi_pdt_env
start with 1
    increment 1
    minvalue 1
    maxvalue 50
;

CREATE TABLE ydm_pi_pdt_env
(
    id_pi_pdt_env numeric NOT NULL DEFAULT nextval
    ('ydm_secuencia_pi_pdt_env' ::regclass),
    id_productor_pi_pdt_env numeric NOT NULL,
    id_pais_pi_pdt_env numeric NOT NULL,
    nombre_pi_pdt_env varchar(30) NOT NULL,
    CONSTRAINT pk_pi_pdt_env PRIMARY KEY (id_pi_pdt_env,id_productor_pi_pdt_env,id_pais_pi_pdt_env)
);

CREATE TABLE ydm_origen
(
    id_ingrediente_esencia_origen numeric NOT NULL,
    id_pais_origen numeric NOT NULL,
    CONSTRAINT pk_origen PRIMARY KEY (id_ingrediente_esencia_origen,id_pais_origen)
);

CREATE SEQUENCE ydm_secuencia_detalle_pedido
start with 1
    increment 1
    minvalue 1
    maxvalue 100
;

CREATE TABLE ydm_detalle_pedido
(
    id_detalle_pedido numeric NOT NULL DEFAULT nextval
    ('ydm_secuencia_detalle_pedido'::regclass),
    id_presentacion_detalle_pedido numeric NOT NULL,
    id_pedido_detalle_pedido numeric NOT NULL,
    cantidad_detalle_pedido numeric NOT NULL,
    CONSTRAINT pk_detalle_pedido PRIMARY KEY (id_detalle_pedido,id_presentacion_detalle_pedido,id_pedido_detalle_pedido)
);

CREATE SEQUENCE ydm_secuencia_productor
start with 1
    increment 1
    minvalue 1
    maxvalue 100
;
CREATE TABLE ydm_productor
(
    id_productor numeric NOT NULL DEFAULT nextval
    ('ydm_secuencia_productor'::regclass),
    nombre_productor varchar(30) NOT NULL,
    web_productor varchar(60) NOT NULL, 
    email_productor varchar(60) NOT NULL,
    id_asociacion_nacional_productor numeric NOT NULL,
    CONSTRAINT pk_productor PRIMARY KEY (id_productor),
    CONSTRAINT unq_nombre_productor UNIQUE (nombre_productor)
);

CREATE SEQUENCE ydm_secuencia_asociacion_nacional
start with 1
    increment 1
    minvalue 1
    maxvalue 100
;

CREATE TABLE ydm_asociacion_nacional 
(
    id_asociacion_nacional numeric NOT NULL DEFAULT nextval
    ('ydm_secuencia_asociacion_nacional'::regclass),
    nombre_asociacion_nacional varchar(30) NOT NULL,
    region_asociacion_nacional varchar(30) NOT NULL,
    id_pais_asociacion_nacional  numeric NOT NULL,
    CONSTRAINT pk_asociacion_nacional PRIMARY KEY (id_asociacion_nacional),
    CONSTRAINT unq_nombre_asociacion_nacional UNIQUE (nombre_asociacion_nacional)
);

CREATE SEQUENCE ydm_secuencia_proveedor
start with 1
    increment 1
    minvalue 1
    maxvalue 20
;

CREATE TABLE ydm_proveedor
(
    id_proveedor numeric NOT NULL DEFAULT nextval
    ('ydm_secuencia_proveedor'::regclass),
    nombre_proveedor numeric NOT NULL,
    web_proveedor varchar(60) NOT NULL,
    email_proveedor varchar(60) NOT NULL,
    id_asociacion_nacional_proveedor numeric NOT NULL,
    id_pais_proveedor numeric NOT NULL, 
    CONSTRAINT pk_proveedor PRIMARY KEY (id_proveedor)
);

CREATE SEQUENCE ydm_secuencia_contrato
start with 1
    increment 1
    minvalue 1
    maxvalue 100
;

CREATE TABLE ydm_contrato
(
    id_contrato numeric NOT NULL DEFAULT nextval
    ('ydm_secuencia_contrato'::regclass),
    fecha_emision_contrato date NOT NULL,
    fecha_cancela_contrato date,
    motivo_cancela_contrato varchar,
    exclusivo_contrato boolean,
    id_productor_contrato numeric NOT NULL,
    id_proveedor_contrato numeric NOT NULL,
    CONSTRAINT pk_contrato PRIMARY KEY (id_contrato) 
);

CREATE SEQUENCE ydm_secuencia_renueva
start with 1
    increment 1
    minvalue 1
    maxvalue 30
;

CREATE TABLE ydm_renueva
(
    id_renueva numeric NOT NULL DEFAULT nextval
    ('ydm_secuencia_renueva'::regclass),
    id_contrato_renueva numeric NOT NULL,
    fecha_renueva date NOT NULL,
    CONSTRAINT PK_renueva PRIMARY KEY (id_renueva,id_contrato_renueva)
);

CREATE SEQUENCE ydm_secuencia_alt_envio
start with 1
    increment 1
    minvalue 1
    maxvalue 30
;

CREATE TABLE ydm_alt_envio
(
    id_alt_envio numeric NOT NULL DEFAULT nextval
    ('ydm_secuencia_alt_envio'::regclass),
    id_proveedoralt_envio numeric NOT NULL,
    id_contratoalt_envio numeric NOT NULL,
    id_paisalt_envio numeric NOT NULL,
    transporte_alt_envio varchar NOT NULL,
    costo_alt_envio numeric NOT NULL,
    tiempo_estimado_alt_envio date,
    CONSTRAINT pk_alt_envio PRIMARY KEY (id_alt_envio,id_proveedor_alt_envio,id_contrato_alt_envio,id_pais_alt_envio),
    CONSTRAINT unq_transporte_alt_envio UNIQUE (transporte_alt_envio) 
);

CREATE SEQUENCE ydm_secuencia_tlf
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_tlf
(
    id_tlf numeric NOT NULL DEFAULT nextval('ydm_secuencia_tlf'::regclass),
    cod_area_tlf varchar(5) NOT NULL,
    numero_tlf varchar(15) NOT NULL,
    id_productor_tlf numeric,
    id_proveedor_tlf numeric,
    CONSTRAINT pk_id_tlf PRIMARY KEY (id_tlf)
);

CREATE SEQUENCE ydm_secuencia_miembro_ifra
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_miembro_ifra
(
    id_miembro_ifra numeric NOT NULL DEFAULT nextval('ydm_secuencia_miembro_ifra'::regclass),
    fecha_ingreso_miembro_ifra date NOT NULL,
    nivel_miembro_ifra varchar(20) NOT NULL,
    tipo_miembro_ifra varchar(10) NOT NULL,
    fecha_exclusion_miembro_ifra date,
    id_proveedor numeric,
    id_productor numeric,
    CONSTRAINT pk_id_miembro_ifra PRIMARY KEY (id_miembro_ifra),
    CONSTRAINT chk_nivel_miembro_ifra CHECK(nivel_miembro_ifra in ('asociacion nacional', 'principal', 'secundario')),
    CONSTRAINT chk_tipo_miembro_ifra CHECK(tipo_miembro_ifra in ('proveedor', 'productor'))
);

CREATE SEQUENCE ydm_secuencia_cond_env_pago
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_cond_env_pago
(
    id_cond_env_pago numeric NOT NULL DEFAULT nextval('ydm_secuencia_cond_env_pago'::regclass),
    id_contrato_cond_env_pago numeric NOT NULL,
    descripcion_cond_env_pago varchar NOT NULL,
    id_condicion_pago_cond_env_pago numeric,
    id_alt_envio_cond_env_pago numeric,
    CONSTRAINT pk_id_cond_env_pago PRIMARY KEY (id_cond_env_pago)
);

CREATE TABLE ydm_evaluacion
(
    fecha_evaluacion date NOT NULL DEFAULT CURRENT_DATE,
    id_proveedor_evaluacion numeric NOT NULL,
    id_productor_evaluacion numeric NOT NULL,
    nota_evaluacion numeric NOT NULL,
    tipo_evaluacion varchar(10) NOT NULL,
    CONSTRAINT pk_fecha_evaluacion PRIMARY KEY (fecha_evaluacion, id_proveedor, id_productor),
    CONSTRAINT chk_tipo_evaluacion CHECK(tipo_evaluacion in ('inicial', 'evaluacion') 
);

CREATE SEQUENCE ydm_secuencia_clausula_prod
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_clausula_prod
(
    id_clausula_prod numeric NOT NULL DEFAULT nextval('ydm_secuencia_clausula_prod'::regclass),
    id_contrato_clausula_prod numeric NOT NULL,
    id_ingr_esencia_clausula_prod numeric NOT NULL,
    id_ingr_general_clausula_prod numeric NOT NULL,
    CONSTRAINT pk_id_clausula_prod PRIMARY KEY (id_clausula_prod, id_contrato)
);

CREATE SEQUENCE ydm_secuencia_presentacion
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_presentacion
(
    id_presentacion numeric NOT NULL DEFAULT nextval('ydm_secuencia_presentacion'::regclass),
    precio_presentacion numeric NOT NULL,
    volumen_presentacion numeric NOT NULL,
    id_ingr_esencia numeric NOT NULL,
    id_ingr_general numeric NOT NULL,
    id_proveedor_presentacion numeric,
    id_productor_presentacion numeric, 
    CONSTRAINT pk_id_clausula_prod PRIMARY KEY (id_clausula_prod, id_contrato)
);

CREATE SEQUENCE ydm_secuencia_pedido
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_pedido
(
    id_pedido numeric NOT NULL DEFAULT nextval('ydm_secuencia_pedido'::regclass),
    fecha_pedido date NOT NULL,
    monto_pedido numeric NOT NULL,
    estatus_pedido varchar NOT NULL,
    id_proveedor_pedido numeric NOT NULL,
    id_productor_pedido numeric NOT NULL,
    id_cond_env_pedido numeric,
    id_cond_pago_pedido numeric,
    fecha_confirmacion_pedido date,
    num_factura_pedido numeric,
    CONSTRAINT pk_id_pedido PRIMARY KEY (id_pedido),
    CONSTRAINT chk_estatus_pedido CHECK(estatus_pedido in ('por confirmar', 'confirmado', 'cancelado por productor', 'cancelado por proveedor'))
);
