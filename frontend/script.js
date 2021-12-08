function enviar() {
    let body = document.querySelector("body")
    let tipo = document.querySelector("#tipo").value
    let mensagem = document.querySelector("#msg").value
    let link = document.querySelector("#link").value
    console.log(tipo, mensagem, link)

    let div = document.createElement("div")
    let criartipo = document.createElement("p")
    let criarmensagem = document.createElement("p")
    let criarLink = document.createElement("a")
    let excluir = document.createElement("h2")

    div.className = "card"
    excluir.className = "delete"
    criartipo.className = 'tipo'
    criarLink.href = link
    criarmensagem.className = 'msg'

    criartipo.innerHTML = tipo
    criarmensagem.innerHTML = "Tipo da mensagem: " + mensagem
    criarLink.innerHTML = link
    excluir.innerHTML = "X"

    excluir.addEventListener("click", () => {
        div.remove()
    })

    if (tipo == "Urgente") {
        div.style.backgroundColor = "red"
        criartipo.style.color = "white"
        criarmensagem.style.color = "white"
    } else if (tipo == "Normal") {
        div.style.backgroundColor = "lightgrey"
        criartipo.style.color = "black"
        criarmensagem.style.color = "black"
    } else {
        div.style.backgroundColor = "yellow"
    }

    div.appendChild(criartipo)
    div.appendChild(criarmensagem)
    div.appendChild(criarLink)
    div.appendChild(excluir)
    body.appendChild(div)




}