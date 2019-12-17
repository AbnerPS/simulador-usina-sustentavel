function GeradorBiogas(tag) {
    this.tag = tag;
    this.modelo = "G3512E";
    var frequencia = 60;
    var tensao;
    var corrente;
    var status = "Desligado";
    var horimetro = 0;
    var temperatura;
    var consumogas = 3;
    var energia = 0;
    var potencia;
    var energiaproduzida = 0;
    var segundos = 0;
    var minutos = 0;
    var horas = 0;
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
            document.getElementById("img" + tag).src = "images/generator color.png";
            document.getElementById('status' + tag).innerHTML = status;
            var tempototal = tempo; //diferencia de tempo inicial e final
            var intervalo = setInterval(function () {
                horimetro = ++horimetro
                tempo = --tempo;
                // Parametros de exibição em tempo real
                document.getElementById('horimetro' + tag).innerHTML = horimetro;
                //-------------------------------------------------------------------
                if (tempo <= 0) { // Se o tempo acabou
                    clearInterval(intervalo);
                    status = "Desligado";
                    document.getElementById("img" + tag).src = "images/generator.png";
                    document.getElementById('status' + tag).innerHTML = status;
                    document.getElementById('horimetro' + tag).innerHTML = horimetro;
                    energia = energiaproduzida / tempototal; // Gera valor de energia total produzida por hora

                    //Armagena os dados no Realime Database
                    firebase.database().ref("Geradores/" + tag).set({
                        tag: tag,
                        tensao: tensao,
                        horimetro: horimetro,
                        consumogas: consumogas,
                        energiaproduzida: energiaproduzida,
                        energia: energia.toFixed(2)
                    });

                    //-------------------------------------------------------------------
                } else { // Se o tempo ainda não acabou
                    // Gerando variação de temperatura
                    min = Math.ceil(110);
                    max = Math.floor(121);
                    temperatura = Math.floor(Math.random() * (max - min)) + min; // gera valor de temperatura atual
                    document.getElementById('temp' + tag).innerHTML = temperatura;

                    // Gerando variação de de tensão
                    min = Math.ceil(380);
                    max = Math.floor(383);
                    tensao = Math.floor(Math.random() * (max - min)) + min; // gera valor de tensão atual
                    document.getElementById('tensao' + tag).innerHTML = tensao;

                    // Gerando variação de potencia
                    min = Math.ceil(990);
                    max = Math.floor(1001);
                    potencia = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    energiaproduzida = parseInt(energiaproduzida) + parseInt(potencia); // Adiciona valor para energia total produzida
                    document.getElementById('potencia' + tag).innerHTML = potencia;

                    // Gerando variação de corrente
                    corrente = (potencia * 100) / tensao;
                    document.getElementById('corrente' + tag).innerHTML = corrente.toFixed(2);

                    document.getElementById('freq' + tag).innerHTML = frequencia;

                    // Gerando variação de potencia
                    min = Math.ceil(2);
                    max = Math.floor(4);
                    consumogas = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    document.getElementById('consumogas' + tag).innerHTML = consumogas;

                    //Armagena os dados no Realime Database
                    firebase.database().ref("Geradores/" + tag).set({
                        tag: tag,
                        tensao: tensao,
                        horimetro: horimetro,
                        consumogas: consumogas,
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