export abstract class Gerador {
    protected tag: string;
    protected modelo: string = "HF57.0";
    protected frequencia: number = 60;
    protected tensao: number;
    protected corrente: number;
    protected velocidadevento: number = 30;
    protected status: string = "Desligado";
    protected horimetro: number = 0;
    protected energia: number = 0;
    protected potencia: number;
    protected energiaproduzida: number = 0;
    protected temperatura: number;
    protected segundos: number = 0;
    protected minutos:number = 0;
    protected horas: number = 0;

    constructor(tag: string) {
        this.tag = tag;
    }

    private relogio(): string {
        ++this.segundos;
        if (this.segundos === 60) {
            this.segundos = 0;
            this.minutos++;
        }

        if (this.minutos === 60) {
            this.minutos = 0;
            this.horas++;
        }

        return this.horas + ":" + this.minutos + ":" + this.segundos;
    }

    protected abstract ligar(tempo: number): void;
}