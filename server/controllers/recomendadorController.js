const pool = require("../connectiondb");

const getPerfumesRecomendador = (request, response) => {
  console.log(request.body);
  valuesPerfumesRecomendador = [
    request.body.verde,
    request.body.citrico,
    request.body.flores,
    request.body.frutas,
    request.body.aromaticos,
    request.body.helechos,
    request.body.chipre,
    request.body.maderas,
    request.body.orientales,
    request.body.otros,
    request.body.genero,
    request.body.edad,
    request.body.intensidad,
    request.body.caracter,
    request.body.aroma,
    request.body.preferencia,
    request.body.personalidad,
  ];
  const queryPerfumesRecomendador =
    "SELECT pe.id_perfume, pe.nombre_perfume, 'Familia olfativa' as tipo_palabra,\
  fo.nombre_familia_olfativa as palabra_clave, cuenta.ocurrencia\
  FROM ydm_perfume pe ,ydm_familia_olfativa fo, ydm_principal pr,\
    (SELECT pe.id_perfume, count(*) as ocurrencia\
    FROM ydm_perfume pe ,ydm_familia_olfativa fo, ydm_principal pr\
    WHERE pe.id_perfume = pr.id_perfume_principal AND fo.id_familia_olfativa = pr.id_familia_olfativa_principal\
    AND (fo.nombre_familia_olfativa = $1 OR fo.nombre_familia_olfativa = $2 OR fo.nombre_familia_olfativa = $3\
    OR fo.nombre_familia_olfativa = $4 OR fo.nombre_familia_olfativa = $5 OR fo.nombre_familia_olfativa = $6\
    OR fo.nombre_familia_olfativa = $7 OR fo.nombre_familia_olfativa = $8 OR fo.nombre_familia_olfativa = $9\
    OR fo.nombre_familia_olfativa = $10)\
    GROUP BY pe.id_perfume) cuenta\
  WHERE pe.id_perfume = pr.id_perfume_principal AND fo.id_familia_olfativa = pr.id_familia_olfativa_principal\
   AND cuenta.id_perfume = pe.id_perfume AND (fo.nombre_familia_olfativa = $1 OR fo.nombre_familia_olfativa = $2\
    OR fo.nombre_familia_olfativa = $3 OR fo.nombre_familia_olfativa = $4 OR fo.nombre_familia_olfativa = $5\
    OR fo.nombre_familia_olfativa = $6 OR fo.nombre_familia_olfativa = $7 OR fo.nombre_familia_olfativa = $8\
    OR fo.nombre_familia_olfativa = $9 OR fo.nombre_familia_olfativa = $10)\
    \
    UNION\
    \
    SELECT pe.id_perfume, pe.nombre_perfume, 'Genero' as tipo_palabra, pe.genero_perfume as palabra_clave, cuenta.ocurrencia\
    FROM ydm_perfume pe, (SELECT pe.id_perfume, count(*) as ocurrencia\
      FROM ydm_perfume pe WHERE genero_perfume = $11\
      GROUP BY pe.id_perfume) cuenta\
    WHERE pe.genero_perfume = $11\
    \
    UNION\
    \
    SELECT pe.id_perfume, pe.nombre_perfume, 'Edad' as tipo_palabra, pe.edad_perfume as palabra_clave, cuenta.ocurrencia\
    FROM ydm_perfume pe, (SELECT pe.id_perfume, count(*) as ocurrencia\
      FROM ydm_perfume pe WHERE edad_perfume=$12 GROUP BY pe.id_perfume) cuenta\
    WHERE pe.edad_perfume = $12\
    \
    UNION\
    \
    SELECT pe.id_perfume, pe.nombre_perfume, 'Intensidad' as tipo_palabra, i.tipo_intensidad as palabra_clave, cuenta.ocurrencia\
    FROM ydm_perfume pe, ydm_intensidad i, (SELECT id_perfume, count(*) as ocurrencia\
    FROM ydm_perfume, ydm_intensidad WHERE id_perfume = id_perfume_intensidad\
    AND tipo_intensidad = ANY ($13) GROUP BY id_perfume) cuenta\
    WHERE pe.id_perfume = i.id_perfume_intensidad AND tipo_intensidad = ANY ($13)\
    \
    UNION\
    \
    SELECT pe.id_perfume, pe.nombre_perfume, 'Carácter' as tipo_palabra, pc.nombre_palabra_clave as palabra_clave, cuenta.ocurrencia\
    FROM ydm_perfume pe, ydm_palabra_clave pc, ydm_fo_pc fp, ydm_principal pr, ydm_familia_olfativa fo,\
      (SELECT id_perfume, count (*) as ocurrencia\
      FROM ydm_perfume, ydm_palabra_clave, ydm_fo_pc, ydm_principal, ydm_familia_olfativa\
      WHERE id_perfume = id_perfume_principal AND id_familia_olfativa_principal = id_familia_olfativa\
      AND id_familia_olfativa = id_familia_olfativa_fo_pc AND id_palabra_clave_fo_pc = id_palabra_clave\
      AND nombre_palabra_clave = ANY ($14) AND fragrancia_principal = true\
    GROUP BY id_perfume) cuenta\
    WHERE pe.id_perfume = pr.id_perfume_principal AND pr.id_familia_olfativa_principal = fo.id_familia_olfativa\
    AND fo.id_familia_olfativa = fp.id_familia_olfativa_fo_pc AND fp.id_palabra_clave_fo_pc = pc.id_palabra_clave\
    AND nombre_palabra_clave = ANY ($14) AND fragrancia_principal = true\
    AND cuenta.id_perfume = pe.id_perfume\
    \
    UNION\
    \
    SELECT pe.id_perfume, pe.nombre_perfume, 'Aroma' as tipo_palabra, pc.nombre_palabra_clave as palabra_clave, cuenta.ocurrencia\
    FROM ydm_perfume pe, ydm_palabra_clave pc, ydm_fo_pc fp, ydm_principal pr, ydm_familia_olfativa fo,\
      (SELECT id_perfume, count (*) as ocurrencia\
      FROM ydm_perfume, ydm_palabra_clave, ydm_fo_pc, ydm_principal, ydm_familia_olfativa\
      WHERE id_perfume = id_perfume_principal AND id_familia_olfativa_principal = id_familia_olfativa\
      AND id_familia_olfativa = id_familia_olfativa_fo_pc AND id_palabra_clave_fo_pc = id_palabra_clave\
      AND nombre_palabra_clave = ANY ($15) AND fragrancia_principal = true\
      GROUP BY id_perfume) cuenta\
    WHERE pe.id_perfume = pr.id_perfume_principal AND pr.id_familia_olfativa_principal = fo.id_familia_olfativa\
    AND fo.id_familia_olfativa = fp.id_familia_olfativa_fo_pc AND fp.id_palabra_clave_fo_pc = pc.id_palabra_clave\
    AND nombre_palabra_clave = ANY ($15) AND fragrancia_principal = true\
    AND cuenta.id_perfume = pe.id_perfume\
    \
    UNION\
    \
    SELECT pe.id_perfume, pe.nombre_perfume, 'Preferencia uso' as tipo_palabra,\
    pc.nombre_palabra_clave as palabra_clave, cuenta.ocurrencia\
    FROM ydm_perfume pe, ydm_palabra_clave pc, ydm_fo_pc fp, ydm_principal pr, ydm_familia_olfativa fo,\
      (SELECT id_perfume, count (*) as ocurrencia\
      FROM ydm_perfume, ydm_palabra_clave, ydm_fo_pc, ydm_principal, ydm_familia_olfativa\
      WHERE id_perfume = id_perfume_principal AND id_familia_olfativa_principal = id_familia_olfativa\
      AND id_familia_olfativa = id_familia_olfativa_fo_pc AND id_palabra_clave_fo_pc = id_palabra_clave\
      AND nombre_palabra_clave = ANY ($16) AND fragrancia_principal = true\
      GROUP BY id_perfume) cuenta\
    WHERE pe.id_perfume = pr.id_perfume_principal AND pr.id_familia_olfativa_principal = fo.id_familia_olfativa\
    AND fo.id_familia_olfativa = fp.id_familia_olfativa_fo_pc AND fp.id_palabra_clave_fo_pc = pc.id_palabra_clave\
    AND nombre_palabra_clave = ANY ($16) AND fragrancia_principal = true \
    AND cuenta.id_perfume = pe.id_perfume\
    \
    UNION\
    \
    SELECT pe.id_perfume, pe.nombre_perfume, 'Personalidad' as tipo_palabra,\
    pc.nombre_palabra_clave as palabra_clave, cuenta.ocurrencia\
    FROM ydm_perfume pe, ydm_palabra_clave pc, ydm_fo_pc fp, ydm_principal pr, ydm_familia_olfativa fo,\
      (SELECT id_perfume, count (*) as ocurrencia\
      FROM ydm_perfume, ydm_palabra_clave, ydm_fo_pc, ydm_principal, ydm_familia_olfativa\
      WHERE id_perfume = id_perfume_principal AND id_familia_olfativa_principal = id_familia_olfativa\
      AND id_familia_olfativa = id_familia_olfativa_fo_pc AND id_palabra_clave_fo_pc = id_palabra_clave\
      AND nombre_palabra_clave = ANY ($17) AND fragrancia_principal = true\
      GROUP BY id_perfume) cuenta\
    WHERE pe.id_perfume = pr.id_perfume_principal AND pr.id_familia_olfativa_principal = fo.id_familia_olfativa\
    AND fo.id_familia_olfativa = fp.id_familia_olfativa_fo_pc AND fp.id_palabra_clave_fo_pc = pc.id_palabra_clave\
    AND nombre_palabra_clave = ANY ($17) AND fragrancia_principal = true \
    AND cuenta.id_perfume = pe.id_perfume\
    ORDER BY id_perfume, tipo_palabra, palabra_clave";
  pool.query(
    queryPerfumesRecomendador,
    valuesPerfumesRecomendador,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getOpPalabraClave = (request, response) => {
  let values = [request.body.tipo];
  console.log("req body aroma", request.body.tipo);
  const query =
    "SELECT DISTINCT pc.nombre_palabra_clave FROM ydm_palabra_clave pc, ydm_fo_pc fopc\
    WHERE fopc.tipo_palabra_clave_fo_pc = $1 \
    AND fopc.id_palabra_clave_fo_pc = pc.id_palabra_clave";
  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getPerfumesRecomendador,
  getOpPalabraClave,
};
