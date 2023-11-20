function Simulacao() {
    let status = "Parada"
    this.IniciarSimulacao = IniciarSimulacao;

    function IniciarSimulacao(tempo) {
        if (tempo > 0) {
            status = "Iniciada";
            sessionStorage.setItem("tempoperacao", tempo);
            document.getElementById('btnrelatorio').disabled = true;
            document.getElementById('startsimulacao').disabled = true;
            document.getElementById('progressbar').max = tempo;
            document.getElementById('progressbar').value = tempo;
            gb1.Ligar(tempo);
            gb2.Ligar(tempo);
            ag1.Ligar(tempo);
            ag2.Ligar(tempo);
            mfv.Ligar(tempo);
            csmd.Ligar(tempo);
            const intervalo = setInterval(() => {
                document.getElementById('progressbar').value = tempo;
                tempo = --tempo;
                document.getElementById('tempo').value = "             " + tempo + " horas";
                if (tempo <= 0) {
                    clearInterval(intervalo);
                    status = "Terminada";
                    document.getElementById('progressbar').value = tempo;
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