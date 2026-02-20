const listaClientes = document.getElementById("listaClientes");


fetch("https://crudcrud.com/api/c052e04212ee4fcfa0be5d71fc945dd0/Clientes")
.then(response => response.json())
.then(data => data.forEach(cliente => {
    const li = document.createElement("li");
    li.innerHTML = `<p>
                        <b>Nome do cliente:</b> ${cliente.Nome}
                        <br><b>Email do cliente:</b> ${cliente.Email}
                    </p> 
                    <button onclick="deletarCliente('${cliente._id}', this)">X</button>`;

    listaClientes.appendChild(li);
}))
.catch(error => console.log(error));

document.getElementById("cadastrar").addEventListener("click", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeCliente").value
    const email = document.getElementById("emailCliente").value

    fetch("https://crudcrud.com/api/c052e04212ee4fcfa0be5d71fc945dd0/Clientes", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                Nome: nome,
                Email: email
            })
        }
    ).then(response => response.json())
    .then(data => {
        const li = document.createElement("li");
        li.innerHTML = `<p>
                            <b>Nome do cliente:</b> ${nome}
                            <br><b>Email do cliente:</b> ${email}
                        </p> 
                        <button onclick="deletarCliente('${data._id}', this)">X</button>`;

        listaClientes.appendChild(li);
    });
});

function deletarCliente(id, button) {
    fetch(`https://crudcrud.com/api/c052e04212ee4fcfa0be5d71fc945dd0/Clientes/${id}`, {method: "DELETE"})

    button.parentElement.remove()
}