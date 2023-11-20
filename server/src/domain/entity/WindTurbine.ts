import GeneratorRepository from "../repository/GeneratorRepository";

export default class WindTurbine implements GeneratorRepository {
    tag: string;
    model: string;
    voltage: number;
    current: number;
    on: boolean;
    energy: number;
    power: number;
    energyProduced: number;
    temperature: number;
    hourMeter: number;

    constructor(tag: string) {
        this.tag = tag;
        this.model = "HF57.0";
        this.voltage = 0;
        this.current = 0;
        this.on = false;
        this.energy = 0;
        this.power = 0;
        this.energyProduced = 0;
        this.temperature = 0;
        this.hourMeter = 0;
    }

    powerOn(): void {
        if (this.on) return;
        this.on = true;
    }

    powerOff(): void {
        if (!this.on) return;
    }

    timer(): string {
        throw new Error("Method not implemented.");
    }

    simulateVariation(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}