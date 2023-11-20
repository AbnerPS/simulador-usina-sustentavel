export default interface Generator {
    tag: string,
    model: string;
    voltage: number;
    current: number;
    on: boolean;
    energy: number;
    power: number;
    energyProduced: number;
    temperature: number;
    hourMeter: number;

    powerOn(): void;
    powerOff(): void;
    timer(): string;
    simulateVariation(min: number, max: number): number;
}