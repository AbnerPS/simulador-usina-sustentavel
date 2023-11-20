
function AeroGerador(tag) {
    this.tag = tag;
    this.modelo = "HF57.0";
    let frequencia = 60;
    let tensao;
    let corrente;
    let velocidadevento = 30;
    let status = "Desligado";
    let horimetro = 0;
    let energia = 0;
    let potencia;
    let energiaproduzida = 0;
    let temperatura;
    let segundos = 0;
    let minutos = 0;
    let horas = 0;
    this.Ligar = Ligar;
    this.relogio = relogio;

    function relogio() {
        ++segundos;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }
        if (minutos === 60) {
            minutos = 0;
            horas++;
        }
        return horas + ":" + minutos + ":" + segundos;
    }

    function Ligar(tempo) {
        if (tempo > 0 && status == "Desligado") {
            status = "Ligado"
            document.getElementById("img" + tag).src = "images/windmill color.png";
            document.getElementById('status' + tag).innerHTML = status;
            let tempototal = tempo; //diferencia de tempo inicial e final
            const intervalo = setInterval(() => {
                horimetro = ++horimetro;
                tempo = --tempo;
                // Parametros de exibição em tempo real
                document.getElementById('horimetro' + tag).innerHTML = horimetro;
                //-------------------------------------------------------------------
                if (tempo <= 0) { // Se o tempo acabou
                    clearInterval(intervalo);
                    status = "Desligado"
                    document.getElementById("img" + tag).src = "images/windmill.png";
                    document.getElementById('status' + tag).innerHTML = status;
                    document.getElementById('horimetro' + tag).innerHTML = horimetro;
                    energia = energiaproduzida / tempototal; // Gera valor de energia total produzida por hora

                    //Armagena os dados no Realime Database
                    firebase.database().ref("Geradores/" + tag).set({
                        tag: tag,
                        tensao: tensao,
                        horimetro: horimetro,
                        velocidadevento: velocidadevento,
                        energiaproduzida: energiaproduzida,
                        energia: energia.toFixed(2)
                    });

                } else { // Se o tempo ainda não acabou

                    // Gerando variação de temperatura
                    min = Math.ceil(50);
                    max = Math.floor(61);
                    temperatura = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    document.getElementById('temp' + tag).innerHTML = temperatura;

                    // Gerando variação de de tensão
                    min = Math.ceil(379);
                    max = Math.floor(383);
                    tensao = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    document.getElementById('tensao' + tag).innerHTML = tensao;

                    // Gerando variação de potencia
                    min = Math.ceil(490);
                    max = Math.floor(501);
                    potencia = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    energiaproduzida = energiaproduzida + potencia; // Adiciona valor para energia total produzida
                    document.getElementById('potencia' + tag).innerHTML = potencia;

                    // Gerando variação de corrente
                    corrente = (potencia * 100) / tensao; // gera valor de potencia atual
                    document.getElementById('corrente' + tag).innerHTML = corrente.toFixed(2);

                    document.getElementById('freq' + tag).innerHTML = frequencia;

                    // Gerando variação de velocidade dos ventos
                    min = Math.ceil(25);
                    max = Math.floor(31);
                    velocidadevento = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    document.getElementById('velocidadevento' + tag).innerHTML = velocidadevento;

                    //Armagena os dados no Realime Database
                    firebase.database().ref("Geradores/" + tag).set({
                        tag: tag,
                        tensao: tensao,
                        horimetro: horimetro,
                        velocidadevento: velocidadevento,
                        energiaproduzida: energiaproduzida,
                        energia: energia.toFixed(2)
                    });
                }
            }, 1000);
        } else {
            alert("Não foi possivel ligar o equipamento");
        }
    }
}