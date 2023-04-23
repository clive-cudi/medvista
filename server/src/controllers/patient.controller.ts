import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Diagnosis } from "../models/diagnosis.model";
import { Doctor } from "../models/doctor.model";

const getMedicalHistory = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id } = usertoken;

    User.findOne({id: id, usertype: "patient"}).then((user) => {
        if (user) {
            // get diagnoses ids
            const diagnoses_ids = user.patient.diagnoses;

            Diagnosis.find({diagnosisId: {$in: diagnoses_ids}}).then((diagnoses) => {
                return res.status(200).json({
                    message: "Medical history found",
                    usertoken: {
                        user: user,
                        token: usertoken.token
                    },
                    error: {
                        status: false,
                        code: null
                    },
                    medical_history: diagnoses
                });
            }).catch((diagnoses_find_err) => {
                return res.status(500).json({
                    message: "Internal Server Error",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "internal_server_error",
                        debug: diagnoses_find_err
                    }
                });
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "internal_server_error",
                debug: user_find_err
            }
        });
    });
}

const getMedicalHistoryByDoctor = (req: Request, res: Response) => {};

const getMedicalHistoryByID = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userId } = usertoken;

    const { id } = req.params;

    User.findOne({id: userId, usertype: "patient"}).then((user) => {
        if (user) {
            // check if the diagnosis id is in the patient's diagnoses
            const diagnosis_id = user.patient.diagnoses.filter((diagnosis_id) => diagnosis_id === id);

            if (diagnosis_id.length > 0) {
                Diagnosis.findOne({diagnosisId: id}).then((diagnosis) => {
                    return res.status(200).json({
                        success: true,
                        message: "Medical history found",
                        usertoken: {
                            user: user,
                            token: usertoken.token
                        },
                        error: {
                            status: false,
                            code: null
                        },
                        medical_history: diagnosis
                    });
                }).catch((diagnosis_find_err) => {
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error",
                        usertoken: {
                            user: null,
                            token: null
                        },
                        error: {
                            status: true,
                            code: "internal_server_error",
                            debug: diagnosis_find_err
                        }
                    });
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Medical history not found",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "medical_history_not_found"
                    }
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "internal_server_error",
                debug: user_find_err
            }
        });
    });
};

// create a new medical history
const createMedicalHistory = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userId } = usertoken;

    const { diagnosisId, doctor, patient, date, symptoms, diagnosis, treatment } = req.body;

    // check if all the fields are present
    if (!diagnosisId || !doctor || !patient || !date || !symptoms || !diagnosis || !treatment) {
        return res.status(400).json({
            success: false,
            message: "Bad Request. All fields are required",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "bad_request"
            }
        });
    }

    User.findOne({id: userId, usertype: "patient"}).then((user) => {
        if (user) {
            // create a new diagnosis object
            const newDiagnosis = new Diagnosis({
                diagnosisId: diagnosisId,
                doctor: doctor,
                patient: patient,
                date: date,
                symptoms: symptoms,
                diagnosis: diagnosis,
                treatment: treatment,
                isApproved: false
            });

            // save the diagnosis
            newDiagnosis.save().then((diagnosis) => {
                // if the diagnosis is not approved, then it should not be added to the patient's diagnoses
                
                // update the doctor's pending approvals
                User.findOneAndUpdate({id: doctor, usertype: "doctor"}, {$push: {"doctor.pendingApprovals": diagnosisId}}).then((doctor) => {
                    return res.status(200).json({
                        success: true,
                        message: "Medical history created and pending approval",
                        usertoken: {
                            user: user,
                            token: usertoken.token
                        },
                        error: {
                            status: false,
                            code: null
                        },
                        medical_history: diagnosis
                    });
                }).catch((doctor_update_err) => {
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error",
                        usertoken: {
                            user: null,
                            token: null
                        },
                        error: {
                            status: true,
                            code: "internal_server_error",
                            debug: doctor_update_err
                        }
                    });
                });        
            }).catch((diagnosis_save_err) => {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "internal_server_error",
                        debug: diagnosis_save_err
                    }
                });
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "internal_server_error",
                debug: user_find_err
            }
        });
    });
};

const updateMedicalHistory = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userId } = usertoken;

    const { id } = req.params;

    const { diagnosisId = "_", doctor, patient, date, symptoms, diagnosis, treatment } = req.body;

    // check if all the fields are present
    if (!diagnosisId || !doctor || !patient || !date || !symptoms || !diagnosis || !treatment) {
        return res.status(400).json({
            message: "Bad Request. All fields are required",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "bad_request"
            }
        });
    }

    User.findOne({id: userId, usertype: "patient"}).then((user) => {
        if (user) {
            // check if the diagnosis exists
            const diagnosisExists = user.patient.diagnoses.find((diagnosis) => diagnosis === id);

            if (!diagnosisExists) {
                return res.status(404).json({
                    message: "Medical history not found",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "medical_history_not_found"
                    }
                });
            };

            // update the diagnosis object and reset the isApproved flag to false
            Diagnosis.findOneAndUpdate({diagnosisId: id}, {
                diagnosisId: diagnosisId,
                doctor: doctor,
                patient: patient,
                date: date,
                symptoms: symptoms,
                diagnosis: diagnosis,
                treatment: treatment,
                isApproved: false
            }).then((diagnosis) => {
                if (diagnosis) {
                    // update the doctor's pending approvals
                    User.findOneAndUpdate({id: doctor, usertype: "doctor"}, {$push: {"doctor.pendingApprovals": diagnosisId}}).then((doctor) => {
                        return res.status(200).json({
                            success: true,
                            message: "Medical history updated and pending approval",
                            usertoken: {
                                user: user,
                                token: usertoken.token
                            },
                            error: {
                                status: false,
                                code: null
                            },
                            medical_history: diagnosis
                        });
                    }).catch((doctor_update_err) => {
                        return res.status(500).json({
                            success: false,
                            message: "Internal Server Error",
                            usertoken: {
                                user: null,
                                token: null
                            },
                            error: {
                                status: true,
                                code: "internal_server_error",
                                debug: doctor_update_err
                            }
                        });
                    });
                }
            }).catch((diagnosis_update_err) => {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "internal_server_error",
                        debug: diagnosis_update_err
                    }
                });
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "internal_server_error",
                debug: user_find_err
            }
        });
    });
};

const deleteMedicalHistory = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userId } = usertoken;

    const { id } = req.params;
    
    User.findOne({id: userId, usertype: "patient"}).then((user) => {
        if (user) {
            // check if the diagnosis exists
            const diagnosisExists = user.patient.diagnoses.find((diagnosis) => diagnosis === id);

            if (!diagnosisExists) {
                return res.status(404).json({
                    success: false,
                    message: "Medical history not found",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "medical_history_not_found"
                    }
                });
            }

            // flag the diagnosis for deletion awaiting approval from the doctor
            Diagnosis.findOneAndUpdate({diagnosisId: id}, {isPendingDelete: true, isApproved: false}).then((diagnosis) => {
                if (diagnosis) {
                    // update the doctor's pending approvals
                    User.findOneAndUpdate({id: diagnosis.doctor, usertype: "doctor"}, {$push: {"doctor.pendingDeletions": id}}).then((doctor) => {
                        return res.status(200).json({
                            success: true,
                            message: "Medical history flagged for deletion and pending approval",
                            usertoken: {
                                user: user,
                                token: usertoken.token
                            },
                            error: {
                                status: false,
                                code: null
                            },
                            medical_history: diagnosis
                        });
                    }).catch((doctor_update_err) => {
                        return res.status(500).json({
                            success: false,
                            message: "Internal Server Error",
                            usertoken: {
                                user: null,
                                token: null
                            },
                            error: {
                                status: true,
                                code: "internal_server_error",
                                debug: doctor_update_err
                            }
                        });
                    });
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "internal_server_error",
                debug: user_find_err
            }
        });
    });
};

const getMyDoctors = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userId } = usertoken;

    User.findOne({id: userId, usertype: "patient"}).then((user) => {
        if (user) {
            const doctors = user.patient.doctors;

            User.find({id: {$in: doctors}, usertype: "doctor"}).then((doctors) => {
                // remove the password from the doctors

                return res.status(200).json({
                    success: true,
                    message: "Doctors found",
                    usertoken: {
                        user: user,
                        token: usertoken.token
                    },
                    error: {
                        status: false,
                        code: null
                    },
                    doctors: doctors.map((doc) => {
                        const { password, doctor, ...allowedData } = doc._doc;
                        return allowedData;
                    })
                });
            }).catch((doctors_find_err) => {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "internal_server_error",
                        debug: doctors_find_err
                    }
                });
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            usertoken: {
                user: null,
                token: null
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

    User.findOne({id: id, usertype: "patient"}).then((user) => {
        if (user) {
            // omit personal information
            const { password, patient, ...include } = user;
            return res.status(200).json({
                success: true,
                message: "Patient found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: false,
                    code: null
                },
                patient: include
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "patient_not_found"
                }
            })
        }
    }).catch((user_find_err) => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "internal_server_error",
                debug: user_find_err
            }
        });
    });
};

const approveMedicalGlimpseRequest = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: patientId} = usertoken;

    const { id: doctorId }  = req.body;

    User.findOneAndUpdate({id: patientId, usertype: "patient"}, {
        $pull: {
            "patient.pendingGlimpse": doctorId
        },
        $addToSet: {
            "patient.activeDoctors": doctorId,
            "patient.doctors": doctorId
        }
    }).then((patient) => {
        if (patient) {
            // update the diagnosis whitelist
            User.findOneAndUpdate({id: doctorId, usertype: "doctor"}, {
                $pull: {
                    "doctor.pendingMedicalGlimpseRequests": patientId
                },
                $addToSet: {
                    "doctor.activePatients": patientId
                }
            }).then((doctor) => {
                if (doctor) {
                    return res.status(200).json({
                        success: true,
                        message: "Medical glimpse request approved",
                        usertoken: {
                            user: usertoken,
                            token: usertoken.token
                        },
                        error: {
                            status: false,
                            code: null
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
    }).catch((patient_update_error) => {
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
                debug: patient_update_error
            }
        });
    })
}

export { getMedicalHistory, getMedicalHistoryByID, createMedicalHistory, updateMedicalHistory, deleteMedicalHistory, getMyDoctors, getPatientById, approveMedicalGlimpseRequest };