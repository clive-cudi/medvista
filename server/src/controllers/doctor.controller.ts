import { Request, Response,  } from "express";
import { User } from "../models/user.model";
import { Doctor } from "../models/doctor.model";

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

const requestMedicalGlimpse = async (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: doctorId } = usertoken;

    const { id: patientId } = req.params;

    // request to view patient's medical history
    User.findOne({id: doctorId, usertype: "doctor"}).then((doctor) => {
        if (doctor) {
            // add the doctor to the patient's list of pendingGlimpseRequests
            User.findOne({id: patientId, usertype: "patient"}).then((patient) => {
                if (patient) {
                    // check if the doctor is already in the patient's list of pendingGlimpseRequests
                    if (patient.patient.pendingGlimpse.includes(doctorId)) {
                        return res.status(400).json({
                            success: false,
                            message: "Doctor already requested to view medical history",
                            usertoken: {
                                user: usertoken,
                                token: usertoken.token
                            },
                            error: {
                                status: true,
                                code: "doctor_already_requested",
                                debug: "Doctor already requested to view medical history"
                            }
                        });
                    } else {
                        // add the doctor to the patient's list of pendingGlimpseRequests
                        patient.patient.pendingGlimpse.push(doctorId);
                        // add the patient to the doctor's list of pendingGlimpseRequests
                        doctor.doctor.pendingMedicalGlimpseRequests.push(patientId);
                        // save the doctor
                        doctor.save().then((doctor) => {
                            patient.save().then((patient) => {
                                return res.status(200).json({
                                    success: true,
                                    message: "Doctor requested to view medical history",
                                    usertoken: {
                                        user: usertoken,
                                        token: usertoken.token
                                    },
                                    patient: patient
                                });
                            }).catch((patient_save_err) => {
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
                                        debug: patient_save_err
                                    }
                                });
                            });
                        }).catch((doctor_save_err) => {
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
                                    debug: doctor_save_err
                                }
                            });
                        });
                    }
                } else {
                    return res.status(404).json({
                        success: false,
                        message: "Patient not found",
                        usertoken: {
                            user: usertoken,
                            token: usertoken.token
                        },
                        error: {
                            status: true,
                            code: "patient_not_found",
                            debug: "Patient not found"
                        }
                    })
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "doctor_not_found",
                    debug: "Doctor not found"
                }
            })
        }
    }).catch((doctor_find_err) => {
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
                debug: doctor_find_err
            }
        });
    });
}

const revokeMedicalGlimpseRequest = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: doctorId } = usertoken;

    const { id: patientId } = req.params;

    User.findOneAndUpdate({id: doctorId, usertype: "doctor"}, {
        $pull: {
            "doctor.pendingMedicalGlimpseRequests": patientId
        }
    }).then((doctor) => {
        if (doctor) {
            // remove the doctor to the patient's list of pendingGlimpseRequests
            User.findOneAndUpdate({id: patientId, usertype: "patient"}, {
                $pull: {
                    "patient.pendingGlimpse": doctorId
                }
            }).then((patient) => {
                if (patient) {
                    return res.status(200).json({
                        success: true,
                        message: "Medical glimpse request revoked",
                        usertoken: {
                            user: usertoken,
                            token: usertoken.token
                        },
                        patient: patient
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        message: "Patient not found",
                        usertoken: {
                            user: usertoken,
                            token: usertoken.token
                        },
                        error: {
                            status: true,
                            code: "patient_not_found",
                            debug: "Patient not found"
                        }
                    });
                }
            }).catch((patient_update_err) => {
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
                        debug: patient_update_err
                    }
                });
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "doctor_not_found",
                    debug: "Doctor not found"
                }
            })
        }
    }).catch((doctor_update_err) => {
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
                debug: doctor_update_err
            }
        });
    })
}

export { getAllPatients, getPatientById, requestMedicalGlimpse, revokeMedicalGlimpseRequest };