function ModuloFotovoltaico(tag) {
    this.tag = tag;
    this.modelo = "CS3W-400P";
    let quantidade = 250;
    let frequencia = 60; //Hz
    let tensao = 38; //DC
    let corrente = 10; //A
    let eficiencia = 18; //%
    let status = "Desligado";
    let irradiacaosolar;  // W/m³
    let temperatura = 65;
    let potencia; // W
    let energiaproduzida = 0;
    let horimetro = 0; // Horas
    let energia;
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
            document.getElementById("img" + tag).src = "images/solar-panel color.png";
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
                    document.getElementById("img" + tag).src = "images/solar-panel.png";
                    document.getElementById('status' + tag).innerHTML = status;
                    document.getElementById('horimetro' + tag).innerHTML = horimetro;

                    energia = energiaproduzida / tempototal; // Gera valor de energia total produzida por hora

                    //Armagena os dados no Realime Database
                    firebase.database().ref("Geradores/" + tag).set({
                        tag: tag,
                        tensao: tensao,
                        horimetro: horimetro,
                        quantidade: quantidade,
                        irradiacaosolar: irradiacaosolar,
                        energiaproduzida: energiaproduzida,
                        energia: energia.toFixed(2)
                    });

                } else { // Se o tempo ainda não acabou

                    // Gerando variação de temperatura
                    min = Math.ceil(25);
                    max = Math.floor(31);
                    temperatura = Math.floor(Math.random() * (max - min)) + min;
                    document.getElementById('temperatura' + tag).innerHTML = temperatura;

                    // Gerando variação de de tensão
                    min = Math.ceil(379);
                    max = Math.floor(382);
                    tensao = Math.floor(Math.random() * (max - min)) + min;
                    document.getElementById('tensao' + tag).innerHTML = tensao;

                    // Gerando variação de irradiação solar
                    min = Math.ceil(860);
                    max = Math.floor(901);
                    irradiacaosolar = Math.floor(Math.random() * (max - min)) + min;
                    document.getElementById('irradiacao' + tag).innerHTML = irradiacaosolar;

                    // Gerando variação de potencia, porém esse valor esta em kW e precisa ficar em W
                    min = Math.ceil(90);
                    max = Math.floor(101);
                    potencia = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    energiaproduzida = energiaproduzida + potencia; // Adiciona valor para energia total produzida
                    document.getElementById('potencia' + tag).innerHTML = potencia;

                    // Gerando variação de corrente
                    corrente = (potencia * 100) / tensao;
                    document.getElementById('corrente' + tag).innerHTML = corrente.toFixed(2);

                    document.getElementById('quantidade' + tag).innerHTML = quantidade;

                    firebase.database().ref("Geradores/" + tag).set({
                        tag: tag,
                        tensao: tensao,
                        horimetro: horimetro,
                        quantidade: quantidade,
                        irradiacaosolar: irradiacaosolar,
                        energiaproduzida: energiaproduzida
                    });
                }
            }, 1000);
        } else {
            alert("Não foi possivel ligar o equipamento");
        }
    }
}