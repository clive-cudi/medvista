import { Request, Response, NextFunction } from 'express';

const doctor_verify = (req: Request, res: Response, next: NextFunction) => {
    const { usertoken } = req.body;

    if (usertoken.usertype === "doctor") {
        return next();
    } else {
        return res.status(403).json({
            message: "Forbidden. You should be logged in as a doctor",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "forbidden"
            }
        });
    }
};

export { doctor_verify };