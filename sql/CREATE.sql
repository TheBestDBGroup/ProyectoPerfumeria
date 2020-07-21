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
     CONSTRAINT chk_tipo_perfume CHECK(tipo_perfume in ('Monolítico', 'Por fases')),
     CONSTRAINT chk_genero_perfume CHECK(genero_perfume in ('Hombre', 'Mujer', 'Unisex')),
     CONSTRAINT chk_edad_perfume CHECK(edad_perfume in ('Adulto', 'Joven', 'Atemporal'))
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
     nombre_perfumista varchar(30) NOT NULL,
     apellido_perfumista varchar(30) NOT NULL,
     id_pais_perfumista numeric NOT NULL,
     email_perfumista varchar(50) UNIQUE DEFAULT NULL,
     sdo_nombre_perfumista varchar(30) DEFAULT '',
     sdo_apellido_perfumista varchar(30) DEFAULT '',
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
     nombre_familia_olfativa varchar(30) NOT NULL UNIQUE,
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
     nombre_palabra_clave varchar(30) NOT NULL UNIQUE,
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
    CONSTRAINT chk_tipo_condicion_pago CHECK(tipo_condicion_pago in ('Crédito', 'Contado'))
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
    cas_esencia_perfume varchar(15) UNIQUE DEFAULT NULL,
    id_proceso_esencia_perfume numeric,    
    CONSTRAINT pk_id_esencia_perfume PRIMARY KEY (id_esencia_perfume),
    CONSTRAINT chk_tipo_esencia_perfume CHECK(tipo_esencia_perfume in ('Natural', 'Sintética'))
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
    cas_ingrediente_general varchar(15) NOT NULL,
    nombre_ingrediente_general varchar(30) NOT NULL,
    tipo_ingrediente_general varchar(10) NOT NULL,
    descripcion_ingrediente_general varchar NOT NULL,
    id_proveedor_ingrediente_general numeric,    
    CONSTRAINT pk_id_ingrediente_general PRIMARY KEY (id_ingrediente_general),
    CONSTRAINT chk_tipo_ingrediente_general CHECK(tipo_ingrediente_general in ('Natural', 'Sintético'))
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
    tipo_criterio_eval varchar(30) NOT NULL,
    descripcion_criterio_eval varchar NOT NULL,
    peso_criterio_eval numeric NOT NULL, 
    CONSTRAINT pk_id_criterio_eval PRIMARY KEY (id_criterio_eval),
    CONSTRAINT chk_tipo_criterio_eval CHECK(tipo_criterio_eval in ('Ubicación geográfica', 'Costo', 'Alternativa de envío', 'Condición de pago', 'Cumplimiento'))
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
    cas_ingrediente_esencia varchar(15) NOT NULL UNIQUE,
    nombre_ingrediente_esencia varchar(30) NOT NULL UNIQUE,
    proceso_ingrediente_esencia varchar(15) NOT NULL,
    id_proveedor_ingrediente_esencia numeric NOT NULL,
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
    tipo_intensidad varchar(30) NOT NULL,
    descripcion_intensidad varchar NOT NULL,
    CONSTRAINT pk_id_intensidad PRIMARY KEY (id_intensidad, id_perfume_intensidad),
    CONSTRAINT chk_tipo_intensidad CHECK (tipo_intensidad in ('Perfume', 'Eau de perfume', 'Eau de toilette','Eau de cologne', 'Splash perfume'))
);

CREATE TABLE ydm_escala
(
    fecha_creacion_escala date NOT NULL DEFAULT CURRENT_DATE,
    min_escala numeric NOT NULL,
    max_escala numeric NOT NULL,
    id_productor_escala numeric NOT NULL,
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
    CONSTRAINT chk_tipo_eval_crit CHECK(tipo_eval_crit in ('Inicial', 'Renovación'))
);

CREATE TABLE ydm_monolitico 
(
    id_perfume_monolitico numeric NOT NULL,
    id_esencia_perfume_monolitico numeric NOT NULL,
    CONSTRAINT pk_monolitico PRIMARY KEY (id_perfume_monolitico, id_esencia_perfume_monolitico)
);

CREATE TABLE ydm_otro_comp
(
   id_perfume_otro_comp numeric NOT NULL,
   id_ingrediente_general_otro_comp numeric NOT NULL,
   CONSTRAINT pk_otro_comp PRIMARY KEY (id_perfume_otro_comp,id_ingrediente_general_otro_comp)
);

CREATE SEQUENCE ydm_secuencia_pres_perf 
    start with 1
    increment 1
    minvalue 1
    maxvalue 100
;

CREATE TABLE ydm_pres_perf(
    id_pres_perf numeric NOT NULL DEFAULT nextval ('ydm_secuencia_pres_perf' ::regclass),
    id_intensidad_pres_perf numeric NOT NULL,
    id_perfume_intensidad_pres_perf numeric NOT NULL,
    CONSTRAINT pk_pres_perf PRIMARY KEY (id_pres_perf,id_intensidad_pres_perf, id_perfume_intensidad_pres_perf)
);
 
 CREATE TABLE ydm_pfm_pfmt(
     id_perfume_pfm_pfmt numeric NOT NULL,
     id_perfumista_pfm_pfmt numeric NOT NULL,
     CONSTRAINT pk_pfm_pfmt PRIMARY KEY (id_perfume_pfm_pfmt,id_perfumista_pfm_pfmt)
 );


CREATE TABLE ydm_principal
(
    id_perfume_principal numeric NOT NULL,
    id_familia_olfativa_principal numeric NOT NULL,
    fragrancia_principal boolean NOT NULL DEFAULT FALSE,
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
    id_nota numeric NOT NULL DEFAULT nextval ('ydm_secuencia_nota' ::regclass),
    id_perfume_nota numeric NOT NULL,
    id_esencia_perfume_nota numeric NOT NULL,
    tipo_nota varchar(8),
    CONSTRAINT pk_nota PRIMARY KEY (id_nota,id_perfume_nota,id_esencia_perfume_nota),
    CONSTRAINT chk_tipo_nota CHECK (tipo_nota in ('Salida','Corazón','Fondo'))
);

CREATE TABLE ydm_ep_fo
(
    id_esencia_perfume_ep_fo numeric NOT NULL,
    id_familia_olfativa_ep_fo numeric NULL,
    CONSTRAINT pk_ep_fo PRIMARY KEY (id_esencia_perfume_ep_fo,id_familia_olfativa_ep_fo)
);

CREATE TABLE ydm_ie_fo
(
    id_familia_olfativa_ie_fo numeric NOT NULL,
    id_ingrediente_esencia_ie_fo numeric NOT NULL,
    CONSTRAINT pk_ie_fo PRIMARY KEY (id_familia_olfativa_ie_fo,id_ingrediente_esencia_ie_fo)
);

CREATE TABLE ydm_ep_ig
(
    id_esencia_perfume_ep_ig numeric NOT NULL,
    id_ingrediente_general_ep_ig numeric NOT NULL,
    CONSTRAINT pk_ep_ig PRIMARY KEY (id_esencia_perfume_ep_ig,id_ingrediente_general_ep_ig)
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
    tipo_palabra_clave_fo_pc varchar(15) NOT NULL,
    CONSTRAINT pk_fo_pc PRIMARY KEY (id_familia_olfativa_fo_pc,id_palabra_clave_fo_pc),
    CONSTRAINT chk_tipo_palabra_clave_fo_pc CHECK(tipo_palabra_clave_fo_pc in ('Aroma', 'Carácter', 'Personalidad'))
);

CREATE TABLE ydm_g_pc
(
    id_ingrediente_general_g_pc numeric NOT NULL,
    id_palabra_clave_g_pc numeric NOT NULL,
    CONSTRAINT pk_g_pc PRIMARY KEY (id_ingrediente_general_g_pc,id_palabra_clave_g_pc)
);

CREATE SEQUENCE ydm_secuencia_pais
start with 1
    increment 1
    minvalue 1
    maxvalue 200
;

CREATE TABLE ydm_pais
(
    id_pais numeric NOT NULL DEFAULT nextval ('ydm_secuencia_pais' ::regclass),
    nombre_pais varchar(60) NOT NULL,
    CONSTRAINT pk_id_pais PRIMARY KEY (id_pais)
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
    id_pi_pdt_env numeric NOT NULL DEFAULT nextval ('ydm_secuencia_pi_pdt_env' ::regclass),
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
    id_detalle_pedido numeric NOT NULL DEFAULT nextval ('ydm_secuencia_detalle_pedido'::regclass),
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
    id_productor numeric NOT NULL DEFAULT nextval ('ydm_secuencia_productor'::regclass),
    nombre_productor varchar(30) NOT NULL UNIQUE,
    web_productor varchar(60) NOT NULL, 
    email_productor varchar(60) NOT NULL,
    id_asociacion_nacional_productor numeric NOT NULL,
    CONSTRAINT pk_productor PRIMARY KEY (id_productor)
);

CREATE SEQUENCE ydm_secuencia_asociacion_nacional
start with 1
    increment 1
    minvalue 1
    maxvalue 100
;

CREATE TABLE ydm_asociacion_nacional 
(
    id_asociacion_nacional numeric NOT NULL DEFAULT nextval ('ydm_secuencia_asociacion_nacional'::regclass),
    nombre_asociacion_nacional varchar(100) NOT NULL UNIQUE,
    region_asociacion_nacional varchar(30) NOT NULL,
    id_pais_asociacion_nacional  numeric NOT NULL,
    CONSTRAINT pk_asociacion_nacional PRIMARY KEY (id_asociacion_nacional),
    CONSTRAINT chk_region_asociacion_nacional CHECK(region_asociacion_nacional in ('Asia-Pacífico', 'Europa', 'Latinoamérica', 'Norteamérica'))
);

CREATE SEQUENCE ydm_secuencia_proveedor
start with 1
    increment 1
    minvalue 1
    maxvalue 20
;

CREATE TABLE ydm_proveedor
(
    id_proveedor numeric NOT NULL DEFAULT nextval ('ydm_secuencia_proveedor'::regclass),
    nombre_proveedor varchar(60) NOT NULL,
    web_proveedor varchar(60) NOT NULL,
    email_proveedor varchar(60) NOT NULL,
    id_asociacion_nacional_proveedor numeric NOT NULL,
    id_pais_proveedor numeric NOT NULL, 
    CONSTRAINT pk_proveedor PRIMARY KEY (id_proveedor)
);

CREATE SEQUENCE ydm_secuencia_datos_pago
start with 1
    increment 1
    minvalue 1
    maxvalue 40
;

CREATE TABLE ydm_datos_pago
(
    id_datos_pago numeric NOT NULL DEFAULT nextval ('ydm_secuencia_datos_pago'::regclass),
    nombre_datos_pago varchar NOT NULL,
    cuenta_datos_pago varchar NOT NULL,
    tipo_datos_pago varchar NOT NULL,
    id_proveedor_datos_pago numeric NOT NULL,
    CONSTRAINT pk_datos_pago PRIMARY KEY (id_datos_pago),
    CONSTRAINT chk_tipo_datos_pago CHECK(tipo_datos_pago in ('Tarjeta de Debito', 'Tarjeta de Credito', 'Transferencia', 'Paypal'))
);


CREATE SEQUENCE ydm_secuencia_contrato
start with 1
    increment 1
    minvalue 1
    maxvalue 100
;

CREATE TABLE ydm_contrato
(
    id_contrato numeric NOT NULL DEFAULT nextval ('ydm_secuencia_contrato'::regclass),
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
    id_renueva numeric NOT NULL DEFAULT nextval ('ydm_secuencia_renueva'::regclass),
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
    id_alt_envio numeric NOT NULL DEFAULT nextval ('ydm_secuencia_alt_envio'::regclass),
    id_proveedor_alt_envio numeric NOT NULL,
    id_contrato_alt_envio numeric NOT NULL,
    id_pais_alt_envio numeric NOT NULL,
    transporte_alt_envio varchar NOT NULL,
    costo_alt_envio numeric NOT NULL,
    tiempo_estimado_alt_envio date,
    CONSTRAINT pk_alt_envio PRIMARY KEY (id_alt_envio,id_proveedor_alt_envio,id_contrato_alt_envio,id_pais_alt_envio)
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
    nivel_miembro_ifra varchar(30) NOT NULL,
    tipo_miembro_ifra varchar(10) NOT NULL,
    fecha_exclusion_miembro_ifra date,
    id_proveedor_miembro_ifra numeric,
    id_productor_miembro_ifra numeric,
    CONSTRAINT pk_id_miembro_ifra PRIMARY KEY (id_miembro_ifra),
    CONSTRAINT chk_nivel_miembro_ifra CHECK(nivel_miembro_ifra in ('Asociación nacional', 'Principal', 'Secundario')),
    CONSTRAINT chk_tipo_miembro_ifra CHECK(tipo_miembro_ifra in ('Proveedor', 'Productor'))
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
    id_proveedor_condicion_pago_cond_env_pago numeric,
    id_alt_envio_cond_env_pago numeric,
    id_proveedor_alt_envio_cond_env_pago numeric,
    id_contrato_alt_envio_cond_env_pago numeric,
    id_pais_alt_envio_cond_env_pago numeric,
    CONSTRAINT pk_id_cond_env_pago PRIMARY KEY (id_cond_env_pago, id_contrato_cond_env_pago)
);                          

CREATE TABLE ydm_evaluacion
(
    fecha_evaluacion date NOT NULL DEFAULT CURRENT_DATE,
    id_proveedor_evaluacion numeric NOT NULL,
    id_productor_evaluacion numeric NOT NULL,
    nota_evaluacion numeric NOT NULL,
    tipo_evaluacion varchar(10) NOT NULL,
    CONSTRAINT pk_fecha_evaluacion PRIMARY KEY (fecha_evaluacion, id_proveedor_evaluacion, id_productor_evaluacion),
    CONSTRAINT chk_tipo_evaluacion CHECK(tipo_evaluacion in ('Inicial', 'Renovación')) 
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
    CONSTRAINT pk_id_clausula_prod PRIMARY KEY (id_clausula_prod, id_contrato_clausula_prod)
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
    id_ingr_esencia_presentacion numeric NOT NULL,
    id_ingr_general_presentacion numeric NOT NULL,
    id_pres_perf_presentacion numeric NOT NULL,
    id_intensidad_pres_perdf_presentacion numeric NOT NULL,
    id_perfume_intensidad_pres_perdf_presentacion numeric NOT NULL,
    id_proveedor_presentacion numeric,
    id_productor_presentacion numeric, 
    CONSTRAINT pk_id_presentacion PRIMARY KEY (id_presentacion)
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
    id_cond_env_pago_pedido numeric,
    id_contrato_cond_env_pago_pedido numeric,
    id_condicion_pago_pedido numeric,
    id_proveedor_condicion_pago_pedido numeric,
    fecha_confirmacion_pedido date,
    num_factura_pedido numeric,
    CONSTRAINT pk_id_pedido PRIMARY KEY (id_pedido),
    CONSTRAINT chk_estatus_pedido CHECK(estatus_pedido in ('Por confirmar', 'Confirmado', 'Cancelado por productor', 'Cancelado por proveedor'))
);

CREATE SEQUENCE ydm_secuencia_pago 
     start with 1
     increment 1
     minvalue 1
     maxvalue 100
;

CREATE TABLE ydm_pago
(
    id_pago numeric NOT NULL DEFAULT nextval('ydm_secuencia_pago'::regclass),
    id_pedido_pago numeric NOT NULL,
    fecha_pago date NOT NULL,
    monto_pago numeric NOT NULL,
    CONSTRAINT pk_id_pago PRIMARY KEY (id_pago,id_pedido_pago)
);

ALTER TABLE ydm_perfumista
    ADD CONSTRAINT fk_id_pais_perfumista FOREIGN KEY (id_pais_perfumista) REFERENCES ydm_pais(id_pais)
;

ALTER TABLE ydm_condicion_pago 
    ADD CONSTRAINT fk_id_proveedor_condicion_pago FOREIGN KEY (id_proveedor_condicion_pago) REFERENCES ydm_proveedor(id_proveedor)
;

ALTER TABLE ydm_esencia_perfume 
    ADD CONSTRAINT fk_id_proceso_esencia_perfume FOREIGN KEY (id_proceso_esencia_perfume) REFERENCES ydm_proceso(id_proceso)
;

ALTER TABLE ydm_ingrediente_general 
    ADD CONSTRAINT fk_id_proveedor_ingrediente_general FOREIGN KEY (id_proveedor_ingrediente_general) REFERENCES ydm_proveedor(id_proveedor)
;

ALTER TABLE ydm_ingrediente_esencia 
    ADD CONSTRAINT fk_id_proveedor_ingrediente_esencia FOREIGN KEY (id_proveedor_ingrediente_esencia) REFERENCES ydm_proveedor(id_proveedor)
;

ALTER TABLE ydm_intensidad 
    ADD CONSTRAINT fk_id_perfume_intensidad FOREIGN KEY (id_perfume_intensidad) REFERENCES ydm_perfume(id_perfume)
;

ALTER TABLE ydm_escala 
    ADD CONSTRAINT fk_id_productor_escala FOREIGN KEY (id_productor_escala) REFERENCES ydm_productor(id_productor)
;

ALTER TABLE ydm_eval_crit 
    ADD CONSTRAINT fk_id_productor_eval_crit FOREIGN KEY (id_productor_eval_crit) REFERENCES ydm_productor(id_productor),
    ADD CONSTRAINT fk_id_criterio_eval_eval_crit FOREIGN KEY (id_criterio_eval_eval_crit) REFERENCES ydm_criterio_eval(id_criterio_eval)
;

ALTER TABLE ydm_tlf
    ADD CONSTRAINT fk_id_productor_tlf FOREIGN KEY (id_productor_tlf) REFERENCES ydm_productor(id_productor),
    ADD CONSTRAINT fk_id_proveedor_tlf FOREIGN KEY (id_proveedor_tlf) REFERENCES ydm_proveedor(id_proveedor)
;

ALTER TABLE ydm_monolitico 
    ADD CONSTRAINT fk_monolitico_perfume FOREIGN KEY (id_perfume_monolitico) REFERENCES ydm_perfume(id_perfume),
    ADD CONSTRAINT fk_monolitico_esencia_perfume FOREIGN KEY (id_esencia_perfume_monolitico) REFERENCES ydm_esencia_perfume(id_esencia_perfume)
;

ALTER TABLE ydm_otro_comp 
    ADD CONSTRAINT fk_otro_comp_perfume FOREIGN KEY (id_perfume_otro_comp) REFERENCES ydm_perfume(id_perfume),
    ADD CONSTRAINT fk_otro_comp_ingrediente_general FOREIGN KEY (id_ingrediente_general_otro_comp) REFERENCES ydm_ingrediente_general(id_ingrediente_general)
;

ALTER TABLE ydm_pres_perf  
    ADD CONSTRAINT fk_pres_perf_intensidad FOREIGN KEY (id_intensidad_pres_perf, id_perfume_intensidad_pres_perf) references ydm_intensidad(id_intensidad, id_perfume_intensidad)
;

ALTER TABLE ydm_pfm_pfmt
    ADD CONSTRAINT fk_pfm_pfmt_perfume FOREIGN KEY (id_perfume_pfm_pfmt) REFERENCES ydm_perfume(id_perfume),
    ADD CONSTRAINT fk_pfm_pfmt_perfimista FOREIGN KEY (id_perfumista_pfm_pfmt) REFERENCES ydm_perfumista(id_perfumista)
;

ALTER TABLE ydm_principal  
    ADD CONSTRAINT fk_principal_perfume FOREIGN KEY (id_perfume_principal) REFERENCES ydm_perfume(id_perfume),
    ADD CONSTRAINT fk_principal_familia_olfativa FOREIGN KEY (id_familia_olfativa_principal) REFERENCES ydm_familia_olfativa(id_familia_olfativa)
;

ALTER TABLE ydm_nota  
    ADD CONSTRAINT fk_nota_perfume FOREIGN KEY (id_perfume_nota) REFERENCES ydm_perfume(id_perfume),
    ADD CONSTRAINT fk_nota_esencia_perfume FOREIGN KEY (id_esencia_perfume_nota) REFERENCES ydm_esencia_perfume(id_esencia_perfume)
;

ALTER TABLE ydm_ep_fo  
    ADD CONSTRAINT fk_ep_fo_esencia_perfume FOREIGN KEY (id_esencia_perfume_ep_fo) REFERENCES ydm_esencia_perfume(id_esencia_perfume),
    ADD CONSTRAINT fk_ep_fo_familia_olfativa FOREIGN KEY (id_familia_olfativa_ep_fo) REFERENCES ydm_familia_olfativa(id_familia_olfativa)
;

ALTER TABLE ydm_ie_fo  
    ADD CONSTRAINT fk_ie_fo_familia_olfativa FOREIGN KEY (id_familia_olfativa_ie_fo) REFERENCES ydm_familia_olfativa(id_familia_olfativa),
    ADD CONSTRAINT fk_ie_fo_ingrediente_esencia FOREIGN KEY (id_ingrediente_esencia_ie_fo) REFERENCES ydm_ingrediente_esencia(id_ingrediente_esencia)
;

ALTER TABLE ydm_ep_ig  
    ADD CONSTRAINT fk_ep_ig_esencia_perfume FOREIGN KEY (id_esencia_perfume_ep_ig) REFERENCES ydm_esencia_perfume(id_esencia_perfume),
    ADD CONSTRAINT fk_ep_ig_ingrediente_general FOREIGN KEY (id_ingrediente_general_ep_ig) REFERENCES ydm_ingrediente_general(id_ingrediente_general)
;

ALTER TABLE ydm_otro  
    ADD CONSTRAINT fk_otro_ingrediente_esencia FOREIGN KEY (id_ingrediente_esencia_otro) REFERENCES ydm_ingrediente_esencia(id_ingrediente_esencia),
    ADD CONSTRAINT fk_otro_ingrediente_general FOREIGN KEY (id_ingrediente_general_otro) REFERENCES ydm_ingrediente_general(id_ingrediente_general)
;

ALTER TABLE ydm_fo_pc  
    ADD CONSTRAINT fk_fo_pc_familia_olfativa FOREIGN KEY (id_familia_olfativa_fo_pc) REFERENCES ydm_familia_olfativa(id_familia_olfativa),
    ADD CONSTRAINT fk_fo_ppc_palabra_clave FOREIGN KEY (id_palabra_clave_fo_pc) REFERENCES ydm_palabra_clave(id_palabra_clave)
;  

ALTER TABLE ydm_g_pc  
    ADD CONSTRAINT fk_g_pc_ingrediente_general FOREIGN KEY (id_ingrediente_general_g_pc) REFERENCES ydm_ingrediente_general(id_ingrediente_general),
    ADD CONSTRAINT fk_g_pc_palabra_clave FOREIGN KEY (id_palabra_clave_g_pc) REFERENCES ydm_palabra_clave(id_palabra_clave)
;  

ALTER TABLE ydm_pc_ep  
    ADD CONSTRAINT fk_pc_ep_palabra_clave FOREIGN KEY (id_palabra_clave_pc_ep) REFERENCES ydm_palabra_clave(id_palabra_clave),
    ADD CONSTRAINT fk_pc_ep_esencia_perfume FOREIGN KEY (id_esencia_perfume_pc_ep) REFERENCES ydm_esencia_perfume(id_esencia_perfume)
;

ALTER TABLE ydm_pi_pdt_env  
    ADD CONSTRAINT fk_pi_pdt_env_productor FOREIGN KEY (id_productor_pi_pdt_env) REFERENCES ydm_productor(id_productor),
    ADD CONSTRAINT fk_pi_pdt_env_pais FOREIGN KEY (id_pais_pi_pdt_env) REFERENCES ydm_pais(id_pais)
; 

ALTER TABLE ydm_origen  
    ADD CONSTRAINT fk_origen_ingrediente_esencia FOREIGN KEY (id_ingrediente_esencia_origen) REFERENCES ydm_ingrediente_esencia(id_ingrediente_esencia),
    ADD CONSTRAINT fk_origen_pais FOREIGN KEY (id_pais_origen) REFERENCES ydm_pais(id_pais)
;

ALTER TABLE ydm_detalle_pedido  
    ADD CONSTRAINT fk_detalle_pedido_presentacion FOREIGN KEY (id_presentacion_detalle_pedido) REFERENCES ydm_presentacion(id_presentacion),
    ADD CONSTRAINT fk_detalle_pedido_pedido FOREIGN KEY (id_pedido_detalle_pedido) REFERENCES ydm_pedido(id_pedido)
;

ALTER TABLE ydm_productor  
    ADD CONSTRAINT fk_productor_asociacion_nacional FOREIGN KEY (id_asociacion_nacional_productor) REFERENCES ydm_asociacion_nacional(id_asociacion_nacional)
;

ALTER TABLE ydm_asociacion_nacional  
    ADD CONSTRAINT fk_asociacion_nacional_pais FOREIGN KEY (id_pais_asociacion_nacional) REFERENCES ydm_pais(id_pais)
;

ALTER TABLE ydm_proveedor  
    ADD CONSTRAINT fk_proveedor_asociacion_nacional FOREIGN KEY (id_asociacion_nacional_proveedor) REFERENCES ydm_asociacion_nacional(id_asociacion_nacional),
    ADD CONSTRAINT fk_proveedor_pais FOREIGN KEY (id_pais_proveedor) REFERENCES ydm_pais(id_pais)
;

ALTER TABLE ydm_datos_pago
    ADD CONSTRAINT fk_id_proveedor_datos_pago FOREIGN KEY (id_proveedor_datos_pago) REFERENCES ydm_proveedor(id_proveedor)
;  

ALTER TABLE ydm_contrato  
    ADD CONSTRAINT fk_contrato_productor FOREIGN KEY (id_productor_contrato) REFERENCES ydm_productor(id_productor),
    ADD CONSTRAINT fk_contrato_proveedor FOREIGN KEY (id_proveedor_contrato) REFERENCES ydm_proveedor(id_proveedor)
;

ALTER TABLE ydm_renueva  
    ADD CONSTRAINT fk_renueva_contrato FOREIGN KEY (id_contrato_renueva) REFERENCES ydm_contrato(id_contrato)
;

ALTER TABLE ydm_alt_envio  
    ADD CONSTRAINT fk_alt_envio_proveedor FOREIGN KEY (id_proveedor_alt_envio) REFERENCES ydm_proveedor(id_proveedor),
    ADD CONSTRAINT fk_alt_envio_contrato FOREIGN KEY (id_contrato_alt_envio) REFERENCES ydm_contrato(id_contrato),
    ADD CONSTRAINT fk_alt_envio_pais FOREIGN KEY (id_pais_alt_envio) REFERENCES ydm_pais(id_pais)
;

ALTER TABLE ydm_miembro_ifra
    ADD CONSTRAINT fk_id_productor_miembro_ifra FOREIGN KEY (id_productor_miembro_ifra) REFERENCES ydm_productor(id_productor),
    ADD CONSTRAINT fk_id_proveedor_miembro_ifra FOREIGN KEY (id_proveedor_miembro_ifra) REFERENCES ydm_proveedor(id_proveedor)
;

ALTER TABLE ydm_cond_env_pago
    ADD CONSTRAINT fk_id_contrato_cond_env_pago FOREIGN KEY (id_contrato_cond_env_pago) REFERENCES ydm_contrato(id_contrato),
    ADD CONSTRAINT fk_id_condicion_pago_cond_env_pago FOREIGN KEY (id_condicion_pago_cond_env_pago, id_proveedor_condicion_pago_cond_env_pago) REFERENCES ydm_condicion_pago(id_condicion_pago, id_proveedor_condicion_pago),
    ADD CONSTRAINT fk_alt_envio_cond_env_pago FOREIGN KEY (id_alt_envio_cond_env_pago, id_proveedor_alt_envio_cond_env_pago, id_contrato_alt_envio_cond_env_pago, id_pais_alt_envio_cond_env_pago) REFERENCES ydm_alt_envio(id_alt_envio, id_proveedor_alt_envio, id_contrato_alt_envio, id_pais_alt_envio)
;

ALTER TABLE ydm_evaluacion
    ADD CONSTRAINT fk_id_proveedor_evaluacion FOREIGN KEY (id_proveedor_evaluacion) REFERENCES ydm_proveedor(id_proveedor),
    ADD CONSTRAINT fk_id_productor_evaluacion FOREIGN KEY (id_productor_evaluacion) REFERENCES ydm_productor(id_productor)
;

ALTER TABLE ydm_clausula_prod
    ADD CONSTRAINT fk_id_contrato_clausula_prod FOREIGN KEY (id_contrato_clausula_prod) REFERENCES ydm_contrato(id_contrato),
    ADD CONSTRAINT fk_id_ingr_esencia_clausula_prod FOREIGN KEY (id_ingr_esencia_clausula_prod) REFERENCES ydm_ingrediente_esencia(id_ingrediente_esencia),
    ADD CONSTRAINT fk_id_ingr_general_clausula_prod FOREIGN KEY (id_ingr_general_clausula_prod) REFERENCES ydm_ingrediente_general(id_ingrediente_general)
;

ALTER TABLE ydm_presentacion
    ADD CONSTRAINT fk_id_ingr_esencia_presentacion FOREIGN KEY (id_ingr_esencia_presentacion) REFERENCES ydm_ingrediente_esencia(id_ingrediente_esencia),
    ADD CONSTRAINT fk_id_ingr_general_presentacion FOREIGN KEY (id_ingr_general_presentacion) REFERENCES ydm_ingrediente_general(id_ingrediente_general),
    ADD CONSTRAINT fk_id_pres_perf_presentacion FOREIGN KEY (id_pres_perf_presentacion, id_intensidad_pres_perdf_presentacion, id_perfume_intensidad_pres_perdf_presentacion) REFERENCES ydm_pres_perf(id_pres_perf, id_intensidad_pres_perf,id_perfume_intensidad_pres_perf),
    ADD CONSTRAINT fk_id_proveedor_presentacion FOREIGN KEY (id_proveedor_presentacion) REFERENCES ydm_proveedor(id_proveedor),
    ADD CONSTRAINT fk_id_productor_presentacion FOREIGN KEY (id_productor_presentacion) REFERENCES ydm_productor(id_productor)
;


ALTER TABLE ydm_pedido
    ADD CONSTRAINT fk_id_proveedor_pedido FOREIGN KEY (id_proveedor_pedido) REFERENCES ydm_proveedor(id_proveedor),
    ADD CONSTRAINT fk_id_productor_pedido FOREIGN KEY (id_productor_pedido) REFERENCES ydm_productor(id_productor),
    ADD CONSTRAINT fk_id_cond_env_pedido FOREIGN KEY (id_cond_env_pago_pedido, id_contrato_cond_env_pago_pedido) REFERENCES ydm_cond_env_pago(id_cond_env_pago, id_contrato_cond_env_pago),
    ADD CONSTRAINT fk_cond_pago_pedido FOREIGN KEY (id_condicion_pago_pedido, id_proveedor_condicion_pago_pedido) REFERENCES ydm_condicion_pago(id_condicion_pago, id_proveedor_condicion_pago)
;

ALTER TABLE ydm_pago
    ADD CONSTRAINT fk_id_pedido_pago FOREIGN KEY (id_pedido_pago) REFERENCES ydm_pedido(id_pedido)
;
