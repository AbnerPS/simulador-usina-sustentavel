export default interface PowerPlantRepository {
    on: boolean;
    startSimulation(time: number): void;
}