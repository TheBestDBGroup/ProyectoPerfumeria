const pool = require('../connectiondb')

module.exports = {
    perfumeList : (req, res) => {
        pool.query('SELECT * FROM ydm_perfume', (e, results) => {      
            if (e){throw e}         
            res.status(200).send({perfumes: results.rows})
        })
    },
    perfumeRead : (req, res) => {
    	const {id} = req.body
    	console.log('req', id)
        pool.query('SELECT * FROM ydm_perfume WHERE id_perfume = $1',[id], (e, results) => {      
            if (e){throw e}         
            res.status(200).send({perfume: results.rows})
        })
    },
    perfumeAdd: (req, res) => {
        const {nombre_perfume,tipo_perfume,genero_perfume,edad_perfume} = req.body;
       
        pool.query("INSERT INTO ydm_perfume (nombre_perfume,tipo_perfume,genero_perfume,edad_perfume) VALUES ($1,$2,$3,$4)",[nombre_perfume,tipo_perfume,genero_perfume,edad_perfume], (e, results) => {      
            if (e){throw e}         
            res.status(200).send({message: `El perfume ha sido creado exitosamente`})
        })
       
    },
    perfumeEdit: (req, res) => {
        const {nombre_perfume,tipo_perfume,genero_perfume,edad_perfume,id_perfume} = req.body;
        pool.query("UPDATE ydm_perfume SET nombre_perfume = $1, tipo_perfume= $2 ,genero_perfume= $3, edad_perfume=$4 WHERE id_perfume=$5",[nombre_perfume,tipo_perfume,genero_perfume,edad_perfume,id_perfume], (e, results) => {      
            if (e){throw e}         
            res.status(200).send({message: `El perfume ha sido modificado exitosamente`})
        })
    },
    perfumeDelete: (req, res) => {
        const {id} = req.body;
        pool.query('DELETE FROM ydm_perfume WHERE id_perfume = $1',[id], (e, results) => {      
            if (e){throw e}         
            res.status(200).send({message: `El perfume ha sido eliminado exitosamente`})
        })
    },
    //Esta no deberia ir aqui pero YOLO, luego borraremos este archivo de todos modos
    selectDictionary: (req, res) => {
        pool.query('SELECT * FROM pg_catalog.pg_stat_user_tables', (e, results) => {      
            if (e){throw e}         
            res.status(200).send(results)
        })
    },
}