import { Gerador } from "./gerador.js";

export class AeroGerador extends Gerador {

    public ligar(tempo: number) {
        if (tempo > 0 && this.status == "Desligado") {
            this.status = "Ligado"
            document.getElementById("img" + this.tag).src = "images/windmill color.png";
            document.getElementById('status' + this.tag).innerHTML = this.status;
            let tempototal = tempo; //diferencia de tempo inicial e final
            const intervalo = setInterval(() => {
                this.horimetro = ++this.horimetro;
                tempo = --tempo;
                // Parametros de exibição em tempo real
                document.getElementById('this.horimetro' + this.tag).innerHTML = this.horimetro;
                //-------------------------------------------------------------------
                if (tempo <= 0) { // Se o tempo acabou
                    clearInterval(intervalo);
                    this.status = "Desligado";
                    document.getElementById("img" + this.tag).src = "images/windmill.png";
                    document.getElementById('status' + this.tag).innerHTML = this.status;
                    document.getElementById('this.horimetro' + this.tag).innerHTML = this.horimetro;
                    this.energia = this.energiaproduzida / tempototal; // Gera valor de energia total produzida por hora

                    //Armagena os dados no Realime Database
                    // firebase.database().ref("Geradores/" + this.tag).set({
                    //     this.tag: this.tag,
                    //     tensao: tensao,
                    //     this.horimetro: this.horimetro,
                    //     velocidadevento: velocidadevento,
                    //     energiaproduzida: energiaproduzida,
                    //     energia: energia.toFixed(2)
                    // });

                } else { // Se o tempo ainda não acabou

                    // Gerando variação de temperatura
                    let min = Math.ceil(50);
                    let max = Math.floor(61);
                    this.temperatura = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    document.getElementById('temp' + this.tag).innerHTML = this.temperatura;

                    // Gerando variação de de tensão
                    min = Math.ceil(379);
                    max = Math.floor(383);
                    this.tensao = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    document.getElementById('tensao' + this.tag).innerHTML = this.tensao;

                    // Gerando variação de potencia
                    min = Math.ceil(490);
                    max = Math.floor(501);
                    this.potencia = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    this.energiaproduzida = this.energiaproduzida + this.potencia; // Adiciona valor para energia total produzida
                    document.getElementById('potencia' + this.tag).innerHTML = this.potencia;

                    // Gerando variação de corrente
                    this.corrente = (this.potencia * 100) / this.tensao; // gera valor de potencia atual
                    document.getElementById('corrente' + this.tag).innerHTML = this.corrente.toFixed(2);

                    document.getElementById('freq' + this.tag).innerHTML = this.frequencia;

                    // Gerando variação de velocidade dos ventos
                    min = Math.ceil(25);
                    max = Math.floor(31);
                    this.velocidadevento = Math.floor(Math.random() * (max - min)) + min; // gera valor de potencia atual
                    document.getElementById('velocidadevento' + this.tag).innerHTML = this.velocidadevento;

                    //Armagena os dados no Realime Database
                    // firebase.database().ref("Geradores/" + this.tag).set({
                    //     this.tag: this.tag,
                    //     tensao: tensao,
                    //     this.horimetro: this.horimetro,
                    //     velocidadevento: velocidadevento,
                    //     energiaproduzida: energiaproduzida,
                    //     energia: energia.toFixed(2)
                    // });
                }
            }, 1000);
        } else {
            alert("Não foi possivel ligar o equipamento");
        }
    }
}
