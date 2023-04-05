import { Request, Response, NextFunction } from 'express';

const patient_verify = (req: Request, res: Response, next: NextFunction) => {
    const { usertoken } = req.body;

    if (usertoken.usertype === "patient") {
        return next();
    } else {
        return res.status(403).json({
            message: "Forbidden. You should be logged in as a patient",
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

export { patient_verify };