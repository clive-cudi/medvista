import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            message: "No Authorization header.\n An Authorization header is required for this route request",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "authorization_header"
            }
        });
    }

    try {
        const decoded_token = jwt.verify(token, (process.env.JWT_TOKEN_KEY ?? "jfs29jfsoi4-jdwiehfri"));

        console.log(req.body);


        req.body = {...req.body, usertoken: decoded_token};


    } catch {
        return res.status(401).json({
            message: "Invalid Token",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "invalid_auth_token"
            }
        })
    }

    return next();
};

export { verifyToken };