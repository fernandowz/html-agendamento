function carregarusuario() {
    var usuariologado = localStorage.getItem("logado");
    if (usuariologado == null) {
        window.location = "login.html";
    } else {
        var usuariojson = JSON.parse(usuariologado);
        document.getElementById("foto").innerHTML =
            "<img width='25%' heigth='25%' alt='Foto não encontrada'src=imagens/" + usuariojson.foto + ">";
        document.getElementById("dados").innerHTML =
            "<h3>" + usuariojson.nome + "<br>" + usuariojson.email + "<br>ID:" + usuariojson.id + "<br> </h3>"
    }
}

function logar() {

    var flag = 0;

    if (document.getElementById("txtemail").value.indexOf("@") > -1) {

        flag = "login";
        var objeto = {
            "email": document.getElementById("txtemail").value,
            "senha": document.getElementById("txtsenha").value
        }
    }


    else {
        flag = "loginracf";
        var objeto = {
            "racf": document.getElementById("txtemail").value,
            "senha": document.getElementById("txtsenha").value
        }

    }
    var cabecalho = {
        method: "POST",
        body: JSON.stringify(objeto),
        headers: {
            "Content-type": "application/json"
        }
    }

    fetch("http://localhost:8080/"+flag, cabecalho)
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("logado", JSON.stringify(res));
            window.location = "relatorio.html";
        })
        .catch(err => {
        
            document.getElementById("submit").innerHTML=
            "<div class='alert alert-danger' role='alert'> Usuario/senha invalidos </div>";
            document.getElementById("txtemail").focus();
         



        });
}