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