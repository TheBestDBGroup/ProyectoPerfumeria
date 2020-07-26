const pool = require("../connectiondb");
var pg = require("pg");
var types = pg.types;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

const getCriteriosEvaluacion = (response) => {
  const query = "SELECT * from ydm_criterio_eval";

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


const getEscala = (request, response) =>{
  let values = [request.body.id_productor]

  const query = "SELECT e.min_escala, e.max_escala FROM ydm_escala e WHERE e.id_productor_escala = $1\
  AND e.fecha_expiracion_escala IS NULL"

  pool.query(query,values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });

}

const getEvalCrits = (request,response) => {
  
  let values = [
    request.body.id_productor, 
    request.body.tipo
  ]

  const query = "SELECT ec.peso_prctj_eval_crit, ce.descripcion_criterio_eval, ce.tipo_criterio_eval\
  FROM ydm_eval_crit ec INNER JOIN ydm_criterio_eval ce\
  ON ce.id_criterio_eval = ec.id_criterio_eval_eval_crit\
  WHERE id_productor_eval_crit = $1 AND fecha_final_eval_crit IS NULL AND tipo_eval_crit = $2"

  pool.query(query,values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}



const getValidarEvaluacion = (request, response) => {
  let valuesValidarEvaluacion = [
    request.body.id_productor,
    request.body.tipo_eval_crit,
  ];
  const queryValidarEvaluacion =
    "SELECT * FROM ydm_eval_crit\
  WHERE id_productor_eval_crit = $1\
    AND tipo_eval_crit = $2 AND fecha_final_eval_crit is null";

  pool.query(
    queryValidarEvaluacion,
    valuesValidarEvaluacion,
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows != "") {
        response.status(200).send(true);
      } else {
        response.status(200).send(false);
      }
    }
  );
};


const postCrearEvalCrit = (request, response) => {

  console.log('req.body', request.body)

  let valuesAntiguoEvalCrit = [
    request.body.id_productor,
    request.body.tipo_eval_crit,
    request.body.id_criterio_eval,
  ];
  const queryAntiguoEvalCrit =
    "SELECT * FROM ydm_eval_crit ec\
  WHERE ec.id_productor_eval_crit = $1 AND ec.tipo_eval_crit=$2 AND ec.fecha_final_eval_crit is null\
  AND ec.id_criterio_eval_eval_crit IN (SELECT ce.id_criterio_eval FROM ydm_criterio_eval ce\
    WHERE ce.id_criterio_eval = $3)";

  pool.query(queryAntiguoEvalCrit, valuesAntiguoEvalCrit, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows != "") {
      fecha_inicial_eval_crit = results.rows[0].fecha_inicial_eval_crit;
      console.log("ACA:" + fecha_inicial_eval_crit);
    } else {
      fecha_inicial_eval_crit = null;
    }
    let valuesFinalizarEvalCrit = [
      request.body.id_criterio_eval,
      fecha_inicial_eval_crit,
      request.body.id_productor,
    ];
    const queryFinalizarEvalCrit =
      "UPDATE ydm_eval_crit ec SET fecha_final_eval_crit = localtimestamp\
      WHERE ec.id_criterio_eval_eval_crit = $1 AND ec.fecha_inicial_eval_crit = $2 AND ec.id_productor_eval_crit=$3";
    pool.query(
      queryFinalizarEvalCrit,
      valuesFinalizarEvalCrit,
      (error, results) => {
        if (error) {
          throw error;
        }
        let valuesCrearEvalCrit = [
          request.body.id_productor,
          request.body.id_criterio_eval,
          request.body.peso,
          request.body.tipo_eval_crit,
        ];
        const queryCrearEvalCrit =
          "INSERT INTO ydm_eval_crit VALUES (localtimestamp, $1, $2, $3, $4, null) RETURNING *";

        pool.query(
          queryCrearEvalCrit,
          valuesCrearEvalCrit,
          (error, results) => {
            if (error) {
              throw error;
            }
            response.status(201).send(results.rows);
          }
        );
      }
    );
  });
};

const postCrearEscala = (request, response) => {
  let valuesAntiguaEscala = [request.body.id_productor];
  const queryAntiguaEscala =
    "SELECT * FROM ydm_escala e WHERE id_productor_escala = $1\
  AND fecha_expiracion_escala is null";

  pool.query(queryAntiguaEscala, valuesAntiguaEscala, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows != "") {
      fecha_creacion_escala = results.rows[0].fecha_creacion_escala;
    } else {
      fecha_creacion_escala = null;
    }
    let valuesFinalizarEscala = [
      fecha_creacion_escala,
      request.body.id_productor,
    ];
    const queryFinalizarEscala =
      "UPDATE ydm_escala e SET fecha_expiracion_escala = localtimestamp\
    WHERE e.fecha_creacion_escala = $1 AND e.id_productor_escala = $2";

    pool.query(queryFinalizarEscala, valuesFinalizarEscala, (error) => {
      if (error) {
        throw error;
      }
      let valuesCrearEscala = [
        request.body.id_productor,
        request.body.min,
        request.body.max,
      ];
      const queryCrearEscala =
        "INSERT INTO ydm_escala VALUES (DEFAULT, $1, $2, $3, null) RETURNING *";

      pool.query(queryCrearEscala, valuesCrearEscala, (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(results.rows);
      });
    });
  });
};

const postCrearEvaluacion = (request, response) => {
  let valuesCrearEvaluacion = [
    request.body.id_proveedor,
    request.body.id_productor,
    request.body.nota,
    request.body.tipo,
  ];
  const queryCrearEvaluacion =
    "INSERT INTO ydm_evaluacion VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *";

  pool.query(queryCrearEvaluacion, valuesCrearEvaluacion, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

module.exports = {
  getCriteriosEvaluacion,
  getValidarEvaluacion,
  postCrearEvalCrit,
  postCrearEscala,
  getEscala,
  getEvalCrits,
  postCrearEvaluacion,
};
