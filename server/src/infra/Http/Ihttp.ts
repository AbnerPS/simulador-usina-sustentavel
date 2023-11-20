export default interface Ihttp {
    route (method: string, url: string, callback: Function): void;
    listen (port: number): void;
}