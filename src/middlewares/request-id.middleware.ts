import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (!req.headers["x-request-id"]) {
            const requestId = randomUUID();
            req.headers["x-request-id"] = requestId;
        }
        next();
    }
}