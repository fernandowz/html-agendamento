function gravar() {

    if (document.getElementById("nomecli").value.length > 0 
        && document.getElementById("emailcli").value.length > 0 
        && document.getElementById("celcli").value.length > 0) {

        if (document.getElementById("inputAg").value > 0) {

            if (compareDates(document.getElementById("dateagenda").value) == true) {

                var data = document.getElementById("dateagenda").value;
                var ano = data.substring(0, 4);
                var mes = data.substring(5, 7);
                var dia = data.substring(8, 10);

                var databrasil = dia + "/" + mes + "/" + ano
                
                var objeto = {
                    nomecli: document.getElementById("nomecli").value,
                    emailcli: document.getElementById("emailcli").value,
                    celularcli: document.getElementById("celcli").value,
                    dataagendamento: databrasil,
                    horaagendamento: document.getElementById("timehorainicio").value,



                    agencia: {
                        id: document.getElementById("inputAg").value

                    }
                }

                var cabecalho = {
                    method: "POST",
                    body: JSON.stringify(objeto),
                    headers: {
                        "Content-type": "application/json"
                    }
                }

                fetch("http://localhost:8080/novoagendamento", cabecalho)
                    .then(res => res.json())
                    .then(res => { window.alert("Gravado com sucesso") })
                    .catch(err => { window.alert("ocorreu um erro") });

            } else {
                document.getElementById("alertdata").innerHTML =
                    "<div class='alert alert-danger' role='alert'> Data invalida </div>";
                document.getElementById("dateagenda").focus();

            }
        }
        else {
            document.getElementById("alertdata").innerHTML =
                "<div class='alert alert-danger' role='alert'> Selecione uma Agencia </div>";
            document.getElementById("inputAg").focus();

        }

    } else {
        document.getElementById("alertdata").innerHTML =
            "<div class='alert alert-danger' role='alert'> Preencha todos os campos </div>";

    }
}

function preencheragencias(lista) {
    var saida = "<option value ='0'>Selecione uma agencia...</option>";

    for (cont = 0; cont < lista.length; cont++) {
        saida +=
            "<option value='" + lista[cont].id + "'>" + lista[cont].nomeAgencia + "</option>";
    }
    document.getElementById("inputAg").innerHTML = saida;
}

function carregaragencias() {
    fetch("http://localhost:8080/agencia")
        .then(res => res.json())
        .then(res => preencheragencias(res));
}


function compareDates(date) {
    let parts = date.split('-'); // separa a data pelo caracter '/'
    let today = new Date();      // pega a data atual

    date = new Date(parts[0], parts[1] - 1, parts[2]); // formata 'date'

    // compara se a data informada é maior que a data atual
    // e retorna true ou false
    return date > today ? true : false;
}

function comparahorario(horarioinicio, horariofim){

    

}