import Ihttp from "./IHttp";
import express, { Request, Response, NextFunction } from 'express';

export default class ExpressAdapter implements Ihttp {
    app: any;

    constructor () {
        this.app = express();
        this.app.use(express.json());
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
			res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
    }

    route(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: Request, res: Response) {
            const output = await callback(req.params, req.body);
            res.json(output);
        })
    }

    listen(port: number): void {
        this.app.listen(port, () => console.info(`Server init port: ${port}`));
    }

}