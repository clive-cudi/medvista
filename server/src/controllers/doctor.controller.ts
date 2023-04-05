import { Request, Response,  } from "express";
import { User } from "../models/user.model";

const getAllPatients = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id } = usertoken; 
    
    // get all patients
    User.findOne({id: id, usertype: "doctor"}).then((user) => {
        if (user) {
            return res.status(200).json({
                success: true,
                message: "All patients",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                patients: user.doctor.patients
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "user_not_found",
                    debug: "User not found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            usertoken: {
                user: usertoken,
                token: usertoken.token
            },
            error: {
                status: true,
                code: "internal_server_error",
                debug: user_find_err
            }
        });
    });
};

const getPatientById = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userId } = usertoken;

    const { id } = req.params;    
    
    // get patient by id
    User.findOne({id: id, usertype: "patient"}).then((user) => {
        if (user) {
            // remove personal information from patient
            const { password, patient, ...include } = user;
            return res.status(200).json({
                success: true,
                message: "Patient found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                patient: include
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "user_not_found",
                    debug: "User not found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            usertoken: {
                user: usertoken,
                token: usertoken.token
            },
            error: {
                status: true,
                code: "internal_server_error",
                debug: user_find_err
            }
        });
    });
};

export { getAllPatients, getPatientById };