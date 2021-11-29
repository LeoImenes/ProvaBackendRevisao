const { con } = require("./mysql_controll.js")
const modelo = require('../model/funcionario_model.js')

const all = (req, res) => {
    let string = 'select * from funcionario'
    con.query(string, (err, result) => {
        res.json(result)
    })
}
const get_id = (req, res) => {
    let string = 'select * from funcionario where matricula = ' + req.params.id
    con.query(string, (err, result) => {
        res.json(result)
    })
}
const add_funcionario = (req, res) => {
    let nome = '\'' + req.body.nome + '\'';
    let data_desligamento = req.body.data_desligamento;
    let ultimo_salario = req.body.ultimo_salario;
    let aliquota = req.body.aliquota;
    let irrf = req.body.irrf;
    let string = `insert into funcionario (nome, data_desligamento, ultimo_salario, aliquota, irrf) values (${nome},${data_desligamento},${ultimo_salario},${aliquota},${irrf})`
    con.query(string, (err, result) => {
        if (err != null) {
            res.status(400).end()
        } else {
            res.status(200).end()
        }
    })
}
const delete_funcionario = (req, res) => {
    let string = 'delete from funcionario where matricula = ' + req.params.id
    con.query(string, (err, result) => {
        if (result.affectedRows == 0) {
            res.status(400).end()
        } else {
            res.status(200).end()
        }
    })
}
const uptd_funcionario = (req, res) => {

    let nome = '\'' + req.body.nome + '\'';
    let data_desligamento = '\'' + req.body.data_desligamento + '\'';
    let ultimo_salario = req.body.ultimo_salario;
    let aliquota = req.body.aliquota;
    let irrf = req.body.irrf;
    let matricula = req.body.matricula
    let string = `update funcionario set nome = ${nome}, data_desligamento = ${data_desligamento }, ultimo_salario=${ultimo_salario},aliquota= ${aliquota}, Irrf = ${irrf} where matricula = ${matricula}`
    con.query(string, (err, result) => {
        if (result.affectedRows == 1) {
            con.query('select * from funcionario where matricula = ' + matricula, (err, result) => {
                res.json(result)
            })
        } else {
            res.send(400).end()
        }

    })
}



module.exports = {
    all,
    get_id,
    add_funcionario,
    delete_funcionario,
    uptd_funcionario
}