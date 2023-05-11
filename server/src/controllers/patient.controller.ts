import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Diagnosis } from "../models/diagnosis.model";
import { Appointment } from "../models/appointment.model";
import { v4 as uuid } from "uuid";
import { filterNonNullKeyValuePairs } from "../helpers";
import { DATE_CHOICE_REGEX, TIME_CHOICE_REGEX } from "../helpers/regex";
import { Doctor } from "../models/doctor.model";
import { UserType } from "../models/user.model";

const getMedicalHistory = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id } = usertoken;

    User.findOne({id: id, usertype: "patient"}).then((user) => {
        if (user) {
            // get diagnoses ids
            const diagnoses_ids = user.patient.diagnoses;

            Diagnosis.find({diagnosisId: {$in: diagnoses_ids}}).then((diagnoses) => {
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
                    medical_history: diagnoses
                });
            }).catch((diagnoses_find_err) => {
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

const getMyDoctorsIDs = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userId } = usertoken;

    User.findOne({id: userId, usertype: "patient"}).then((user) => {
        if (user) {
            // const doctors = user.patient.doctors;
            const activeDoctors = user.patient.activeDoctors;
            const inActiveDoctors = user.patient.inActiveDoctors;
            const archivedDoctors = user.patient.archivedDoctors;
            type doctorStatus = "active" | "inactive" | "archived";
            // doctors: {id: string, status: "active" | "inactive" | "archived"}[]
            const doctors = [...activeDoctors.map((a_doc) => ({id: a_doc, status: "active"})), ...inActiveDoctors.map((i_doc) => ({id: i_doc, status: "inactive"})), ...archivedDoctors.map((ar_doc) => ({id: ar_doc, status: "archived"}))];

            User.find({id: {$in: doctors.map((doc) => doc.id)}, usertype: "doctor"}).then((found_doctors) => {
                // remove the password from the doctors
                const doctorStatusConstruct: {[key: string]: string[]} = {
                  active: [],
                  inactive: [],
                  archived: []  
                };

                for (let i = 0; i < found_doctors.length; i++) {
                    const targetDoctor = doctors.find((dctr) => dctr.id === found_doctors[i].id);
                    
                    if (targetDoctor) {
                        doctorStatusConstruct[targetDoctor.status] = [...doctorStatusConstruct[targetDoctor.status], targetDoctor.id];
                    }
                }

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
                    // doctors: doctors.map((doc) => {
                    //     const { password, doctor, ...allowedData } = doc._doc;
                    //     const { specialty } = doctor;
                    //     return {...allowedData, doctor: { specialty }};
                    // })
                    doctors: doctorStatusConstruct
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
            });
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
            // const doctors = user.patient.doctors;
            const activeDoctors = user.patient.activeDoctors;
            const inActiveDoctors = user.patient.inActiveDoctors;
            const archivedDoctors = user.patient.archivedDoctors;
            type doctorStatus = "active" | "inactive" | "archived";
            // doctors: {id: string, status: "active" | "inactive" | "archived"}[]
            const doctors = [...activeDoctors.map((a_doc) => ({id: a_doc, status: "active"})), ...inActiveDoctors.map((i_doc) => ({id: i_doc, status: "inactive"})), ...archivedDoctors.map((ar_doc) => ({id: ar_doc, status: "archived"}))];

            User.find({id: {$in: doctors.map((doc) => doc.id)}, usertype: "doctor"}).then((found_doctors) => {
                // remove the password from the doctors
                const doctorStatusConstruct: {[key: string]: UserType[]} = {
                  active: [],
                  inactive: [],
                  archived: []  
                };

                for (let i = 0; i < found_doctors.length; i++) {
                    const targetDoctor = doctors.find((dctr) => dctr.id === found_doctors[i].id);
                    const { doctor, password, ...doc } = {...found_doctors[i]._doc, doctor: {}, password: "", specialty: found_doctors[i].doctor.speciality};
                    
                    if (targetDoctor) {
                        doctorStatusConstruct[targetDoctor.status] = [...doctorStatusConstruct[targetDoctor.status], doc];
                    }
                }

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
                    // doctors: doctors.map((doc) => {
                    //     const { password, doctor, ...allowedData } = doc._doc;
                    //     const { specialty } = doctor;
                    //     return {...allowedData, doctor: { specialty }};
                    // })
                    doctors: doctorStatusConstruct
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
            });
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

// search patient by name
const searchPatient = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userId } = usertoken;

    const { name } = req.params;

    User.find({usertype: "patient", name: {$regex: name, $options: "i"}}).then((patients) => {
        if (patients) {
            return res.status(200).json({
                success: true,
                message: "patients found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                patients: patients.map((dt) => {
                    const { password, patient, ...include } = dt._doc;
                    return include;
                })
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No patients found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "no_patients_found",
                    debug: "No patients found"
                }
            })
        }
    }).catch((err) => {
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
                debug: err
            }
        });
    });
};

const bookAppointment = async (req: Request, res: Response) => {
    const { usertoken, date, doctorID, note, time } = req.body;
    const { id: userID } = usertoken;
    let appointmentExists: boolean = false;

    if (!date || ! doctorID || !note || !time) {
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
    };

    // check if the time given is valid
    if (!TIME_CHOICE_REGEX.test(time)) {
        return res.status(400).json({
            success: false,
            message: "Invalid time format provided! => HH_HH",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "invalid_request"
            }
        });
    }

    if (!DATE_CHOICE_REGEX.test(date)) {
        return res.status(400).json({
            success: false,
            message: "Invalid date format provided! => YY-MM-DD",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "invalid_request"
            }
        });
    }

    await Appointment.find({
        date: new Date(date).toISOString(),
        time: time
    }).then((existing_appointment) => {
        if (existing_appointment.length > 0) {
            appointmentExists = true;
            return res.status(400).json({
                success: false,
                message: "Appointment slot already allocated",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "invalid_request"
                }
            })
        }
    }).catch((appointment_find_err) => {
        console.log(appointment_find_err);
        return res.status(400).json({
            success: false,
            message: "Error while searching for appointment slot availability",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "invalid_request"
            }
        })
    });

    if (appointmentExists) {
        return;
    }

    // check if the doctor exists
    User.findOne({id: doctorID, usertype: "doctor"}).then((doctor) => {
        if (doctor) {
            // create a new appointment
            const appointment_id = `at_${uuid()}`;
            const newAppointment = new Appointment({
                appointmentId: appointment_id,
                date: date,
                doctor: doctorID,
                patient: userID,
                time: time,
                note: note
            });
            
            newAppointment.save().then((new_appointment) => {
                // add appointment reference to doctor and patient objects
                doctor.doctor.appointments.push(new_appointment.appointmentId);
                console.log("checks.....")
                if (!doctor.doctor.patients.includes(userID)) {
                    doctor.doctor.patients.push(userID);
                }
                if (!doctor.doctor.activePatients.includes(userID)) {
                    doctor.doctor.activePatients.push(userID);
                }
                if (doctor.doctor.inActivePatients.includes(userID)) {
                    // remove from inactive patients
                    doctor.doctor.inActivePatients = [...doctor.doctor.inActivePatients].filter((target_patient_id) => target_patient_id !== userID)
                }
                if (doctor.doctor.archivedPatients.includes(userID)) {
                    // remove from inactive patients
                    doctor.doctor.archivedPatients = [...doctor.doctor.archivedPatients].filter((target_patient_id) => target_patient_id !== userID)
                }
                console.log("saving")
                doctor.save().then((updated_doctor) => {
                    // update patient ref
                    console.log("SAVED")
                    User.findOneAndUpdate({id: userID, usertype: "patient"}, {
                        $addToSet: {
                            "patient.appointments": new_appointment.appointmentId,
                            "patient.doctors": doctor.id,
                            "patient.activeDoctors": doctor.id
                        },
                        $pullAll: {
                            "patient.inActiveDoctors": [doctor.id],
                            "patient.archivedDoctors": [doctor.id]
                        }
                    }).then((updated_patient) => {
                        return res.status(200).json({
                            success: true,
                            message: `Added appointment ${new_appointment.appointmentId} to doctor: ${updated_doctor.name} and patient: ${updated_patient?.name} successfully`,
                            usertoken: {
                                user: usertoken,
                                token: usertoken.token
                            },
                            appointment: new_appointment._doc
                        });
                    }).catch((patient_update_err) => {
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
                                debug: patient_update_err
                            }
                        });
                    })
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
                })
            }).catch((new_appointment_creation_err) => {
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
                        debug: new_appointment_creation_err
                    }
                });
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "No Doctor found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "no_doctor_found",
                    debug: "No doctor found"
                }
            })
        }
    }).catch((doctor_find_err) => {
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
                debug: doctor_find_err
            }
        });
    })
};

const updateAppointment = (req: Request, res: Response) => {
    const { usertoken, date, note, time } = req.body;
    const { id: userID, usertype } = usertoken;

    const { id: appointmentId } = req.params;

    const appointment_template = {
        date: date ?? null,
        note: note ?? null,
        time: time ?? null
    };

    console.log({appointmentId: appointmentId, [usertype]: userID})

    Appointment.findOneAndUpdate({appointmentId: appointmentId, [usertype]: userID}, {
        $set: filterNonNullKeyValuePairs(appointment_template)
    }).then((updated_appointment) => {
        console.log(updated_appointment);
        if (updated_appointment) {
            return res.status(200).json({
                success: true,
                message: `updated appointment ${updated_appointment.appointmentId} to doctor: ${updated_appointment.doctor} and patient: ${updated_appointment.patient} successfully`,
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                appointment: updated_appointment._doc
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Target Appointment not found",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "appointment_not_found",
                    debug: "Appointment not found"
                }
            });
        }
    }).catch((appointment_update_err) => {
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
                debug: appointment_update_err
            }
        });
    })
};

const removeAppointment = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userID} = usertoken;

    const { id: appointmentId } = req.params;

    Appointment.findOneAndDelete({appointmentId: appointmentId}).then((deleted_appointment_result) => {
        // update appointment refs in doctor and patient
        if (deleted_appointment_result) {
            User.findOneAndUpdate({id: deleted_appointment_result.patient, usertype: "patient"}, {
                $pullAll: {
                    "patient.appointments": [deleted_appointment_result.appointmentId],
                    "patient.activeDoctors": [deleted_appointment_result.doctor]
                },
                $addToSet: {
                    "patient.inActiveDoctors": deleted_appointment_result.doctor
                }
            }).then((updated_patient) => {
                User.findOneAndUpdate({id: deleted_appointment_result.doctor, usertype: "doctor"}, {
                    $pullAll: {
                        "doctor.appointments": [deleted_appointment_result.appointmentId]
                    }
                }).then((updated_doctor) => {
                    console.log(updated_doctor)
                    return res.status(200).json({
                        success: true,
                        message: `Successfully unscheduled appointment with ID: ${deleted_appointment_result.appointmentId}`,
                        usertoken: {
                            user: usertoken,
                            token: usertoken.token
                        },
                        appointment: deleted_appointment_result,
                        error: {
                            status: false,
                            code: null,
                            debug: null
                        }
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
            }).catch((patient_update_err) => {
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
                        debug: patient_update_err
                    }
                });
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Target Appointment not found. No reference to appointment",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "appointment_not_found",
                    debug: "Appointment not found"
                }
            });
        }
    }).catch((appointment_update_err) => {
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
                debug: appointment_update_err
            }
        });
    })
};

const getAppointments = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userID, usertype } = usertoken;

    User.findOne({id: userID}).then((user) => {
        // get appointment
        if (user) {
            const appointments = usertype === 'doctor' ? user.doctor.appointments : user.patient.appointments;

            Appointment.find({appointmentId: {
                $in: appointments
            }}).then((found_appointments) => {
                return res.status(200).json({
                    success: true,
                    message: "Found Appointments",
                    usertoken: {
                        user: usertoken,
                        token: usertoken.token
                    },
                    appointments: found_appointments,
                    error: {
                        status: false,
                        code: null,
                        debug: null
                    }
                });
            }).catch((appointments_find_err) => {
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
                        debug: appointments_find_err
                    }
                });
            })
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
            });
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
    })
};

const getAppointmentByID = (req: Request, res: Response) => {
    const { usertoken } = req.body;
    const { id: userID, usertype } = usertoken;

    const { id: appointment_id } = req.params;

    User.findOne({id: userID}).then((user) => {
        if (user) {
            const appointments = usertype === 'doctor' ? user.doctor.appointments : user.patient.appointments;
            
            if (appointments.includes(appointment_id)) {
                // appointment belongs to the dang user
                // retrieve appointment
                Appointment.findOne({appointmentId: appointment_id}).then((found_appointment) => {
                    if (found_appointment) {
                        return res.status(200).json({
                            success: true,
                            message: "Found Appointment",
                            usertoken: {
                                user: usertoken,
                                token: usertoken.token
                            },
                            appointment: found_appointment,
                            error: {
                                status: false,
                                code: null,
                                debug: null
                            }
                        });
                    } else {
                        return res.status(404).json({
                            success: false,
                            message: "Appointment not found",
                            usertoken: {
                                user: null,
                                token: null
                            },
                            error: {
                                status: true,
                                code: "appointment_not_found"
                            }
                        })
                    }
                }).catch((appointment_find_err) => {
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
                            debug: appointment_find_err
                        }
                    });
                })
            } else {
                return res.status(403).json({
                    message: "Not Authorized to view appointment or the appointment wasn't found",
                    usertoken: {
                        user: usertoken,
                        token: usertoken.token
                    },
                    error: {
                        status: true,
                        code: "not_authorized_or_found"
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
    })
}

export { getMedicalHistory, getMedicalHistoryByID, createMedicalHistory, updateMedicalHistory, deleteMedicalHistory, getMyDoctors, getMyDoctorsIDs, getPatientById, approveMedicalGlimpseRequest, searchPatient, bookAppointment, updateAppointment, removeAppointment, getAppointments, getAppointmentByID };