function Simulacao() {
    var status = "Parada"
    this.IniciarSimulacao = IniciarSimulacao;

    function IniciarSimulacao(tempo) {
        if (tempo > 0) {
            status = "Iniciada";
            sessionStorage.setItem("tempoperacao", tempo);
            document.getElementById('btnrelatorio').disabled = true;
            document.getElementById('startsimulacao').disabled = true;
            gb1.Ligar(tempo);
            gb2.Ligar(tempo);
            ag1.Ligar(tempo);
            ag2.Ligar(tempo);
            mfv.Ligar(tempo);
            csmd.Ligar(tempo);
            $('#progress-bar').attr('aria-valuenow', tempo);
            var intervalo = setInterval(function () {
                document.getElementById('progress-bar').style.width = tempo + "%";
                tempo = --tempo;
                document.getElementById('tempo').value = "             " + tempo + " horas";
                if (tempo <= 0) {
                    clearInterval(intervalo);
                    status = "Terminada";
                    document.getElementById('progress-bar').style.width = "0%";
                    document.getElementById('btnrelatorio').disabled = false;
                    document.getElementById('startsimulacao').disabled = false;
                    document.getElementById('tempo').value = "";
                }
            }, 1000);
        } else {
            alert("Valor de tempo invalido");
        }
    }
}