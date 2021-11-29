const func_model = (matricula, nome, data_desligamento, ultimo_salario, aliquota) => {
    let data = (data_desligamento + '').split('T')
    let json = {
        "matricula": matricula,
        "nome": nome,
        "desligamento": data[0],
        "ultimo_salario": ultimo_salario,
        "aliquota": aliquota,
        "irrf": (ultimo_salario * aliquota).toFixed(2)
    }
    return json
}

const calc_aliquota = (nome, ultimo_salario, aliquota) => {
    let irrf = (ultimo_salario * aliquota)
    let json = {
        'nome': nome,
        'ultimo_salario': ultimo_salario,
        'aliquota': aliquota,
        'irrf': irrf.toFixed(2)
    }
    if (ultimo_salario < 1980) {
        json.status("Isento")
        aliquota = 0;
    } else if (1980.91 < ultimo_salario < 2940.85) {
        json.status("7,50$")
        aliquota = 0.075
    } else if (2940.86 < ultimo_salario < 3902.59) {
        json.status("15,00%")
        aliquota = 0.15
    } else if (3902.60 < ultimo_salario < 4853.13) {
        json.status("22,50%")
        aliquota = 0.225
    } else {
        json.status("22,50%")
        aliquota = 0.275
    }
    return json

}
module.exports = {
    calc_aliquota,
    func_model
}