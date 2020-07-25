const pool = require("../connectiondb");

const getCriteriosEvaluacion = (request, response) => {
  let values = [request.body.id_proveedor, request.body.tipo_evaluacion];

  const query = "SELECT * from ydm_criterio_evaluacion";

  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const postCrearCriterioEvaluacion = (request, response) => {
  let valuesAntiguoCriterio = [
    request.body.id_productor,
    request.body.tipo_eval_crit,
    request.body.tipo_criterio_eval,
  ];
  const queryAntiguoCriterio =
    "SELECT * FROM ydm_eval_crit ec\
  WHERE ec.id_productor_eval_crit = $1 AND ec.tipo_eval_crit=$2 AND ec.fecha_final_eval_crit is null\
  AND ec.id_criterio_eval_eval_crit IN (SELECT ce.id_criterio_eval FROM ydm_criterio_eval ce\
    WHERE ce.tipo_criterio_eval = $3)";

  pool.query(queryAntiguoCriterio, valuesAntiguoCriterio, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows != "") {
      fecha_inicial_eval_crit = results.rows[0].fecha_inicial_eval_crit;
      id_criterio_eval_eval_crit = results.rows[0].id_criterio_eval_eval_crit;
    } else {
      fecha_inicial_eval_crit = null;
      id_criterio_eval_eval_crit = null;
    }
    let valuesFinalizarCriterio = [
      id_criterio_eval_eval_crit,
      fecha_inicial_eval_crit,
      request.body.id_productor,
    ];
    const queryFinalizarCriterio =
      "UPDATE ydm_eval_crit ec SET fecha_final_eval_crit = localtimestamp\
      WHERE ec.id_criterio_eval_eval_crit = $1 AND ec.fecha_inicial_eval_crit = $2 AND ec.id_productor_eval_crit=$3";
    pool.query(
      queryFinalizarCriterio,
      valuesFinalizarCriterio,
      (error, results) => {
        if (error) {
          throw error;
        }
        let valuesCrearCriterio = [
          request.body.tipo_criterio_eval,
          request.body.descripcion,
        ];
        const queryCrearCriterio =
          "INSERT INTO ydm_criterio_eval(id_criterio_eval, tipo_criterio_eval, descripcion_criterio_eval)\
      VALUES (DEFAULT, $1, $2) RETURNING *";

        pool.query(
          queryCrearCriterio,
          valuesCrearCriterio,
          (error, results) => {
            if (error) {
              throw error;
            }
            id_criterio_eval = results.rows[0].id_criterio_eval;

            let valuesEvalCrit = [
              request.body.id_productor,
              id_criterio_eval,
              request.body.peso,
              request.body.tipo_eval_crit,
            ];
            const queryEvalCrit =
              "INSERT INTO ydm_eval_crit VALUES (localtimestamp, $1, $2, $3, $4, null) RETURNING *";

            pool.query(queryEvalCrit, valuesEvalCrit, (error, results) => {
              if (error) {
                throw error;
              }
              response.status(201).send(results.rows);
            });
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

    pool.query(
      queryFinalizarEscala,
      valuesFinalizarEscala,
      (error, results) => {
        if (error) {
          throw error;
        }
        let valuesCrearEscala = [request.body.id_productor, min, max];
        const queryCrearEscala =
          "INSERT INTO ydm_escala VALUES (DEFAULT, $1, $2, $3, null) RETURNING *";

        pool.query(queryCrearEscala, valuesCrearEscala, (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).send(results.rows);
        });
      }
    );
  });
};

module.exports = {
  getCriteriosEvaluacion,
  postCrearCriterioEvaluacion,
  postCrearEscala,
};
