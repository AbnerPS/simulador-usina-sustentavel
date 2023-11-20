import PowerPlantRepository from "../repository/PowerPlantRepository";

export default class PowerPlant implements PowerPlantRepository {
    on: boolean;
    constructor() {
        this.on = false;
    }
    startSimulation(time: number): void {
        throw new Error("Method not implemented.");
    }
    
}