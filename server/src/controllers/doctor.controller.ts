import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Diagnosis } from "../models/diagnosis.model";
import { v4, v4 as v4ID } from "uuid";
import bcrypt from "bcryptjs";

const getAllPatients = (req: Request, res: Response) => {
  const { usertoken } = req.body;
  const { id } = usertoken;

  // get all patients
  User.findOne({ id: id, usertype: "doctor" })
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "All patients",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          patients: user.doctor.patients,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "user_not_found",
            debug: "User not found",
          },
        });
      }
    })
    .catch((user_find_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: usertoken,
          token: usertoken.token,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: user_find_err,
        },
      });
    });
};

const getPatientById = (req: Request, res: Response) => {
  const { usertoken } = req.body;
  const { id: userId } = usertoken;

  const { id } = req.params;

  // get patient by id
  User.findOne({ id: id, usertype: "patient" })
    .then((user) => {
      if (user) {
        // remove personal information from patient
        const { password, patient, ...include } = user._doc;
        return res.status(200).json({
          success: true,
          message: "Patient found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          patient: include,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "user_not_found",
            debug: "User not found",
          },
        });
      }
    })
    .catch((user_find_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: usertoken,
          token: usertoken.token,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: user_find_err,
        },
      });
    });
};

const requestMedicalGlimpse = async (req: Request, res: Response) => {
  const { usertoken } = req.body;
  const { id: doctorId } = usertoken;

  const { id: patientId } = req.params;

  // request to view patient's medical history
  User.findOne({ id: doctorId, usertype: "doctor" })
    .then((doctor) => {
      if (doctor) {
        // add the doctor to the patient's list of pendingGlimpseRequests
        User.findOne({ id: patientId, usertype: "patient" }).then((patient) => {
          if (patient) {
            // check if the doctor is already in the patient's list of pendingGlimpseRequests
            if (patient.patient.pendingGlimpse.includes(doctorId)) {
              return res.status(400).json({
                success: false,
                message: "Doctor already requested to view medical history",
                usertoken: {
                  user: usertoken,
                  token: usertoken.token,
                },
                error: {
                  status: true,
                  code: "doctor_already_requested",
                  debug: "Doctor already requested to view medical history",
                },
              });
            } else {
              // add the doctor to the patient's list of pendingGlimpseRequests
              patient.patient.pendingGlimpse.push(doctorId);
              // add the patient to the doctor's list of pendingGlimpseRequests
              doctor.doctor.pendingMedicalGlimpseRequests.push(patientId);
              // save the doctor
              doctor
                .save()
                .then((doctor) => {
                  patient
                    .save()
                    .then((patient) => {
                      return res.status(200).json({
                        success: true,
                        message: "Doctor requested to view medical history",
                        usertoken: {
                          user: usertoken,
                          token: usertoken.token,
                        },
                        patient: patient,
                      });
                    })
                    .catch((patient_save_err) => {
                      return res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        usertoken: {
                          user: usertoken,
                          token: usertoken.token,
                        },
                        error: {
                          status: true,
                          code: "internal_server_error",
                          debug: patient_save_err,
                        },
                      });
                    });
                })
                .catch((doctor_save_err) => {
                  return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    usertoken: {
                      user: usertoken,
                      token: usertoken.token,
                    },
                    error: {
                      status: true,
                      code: "internal_server_error",
                      debug: doctor_save_err,
                    },
                  });
                });
            }
          } else {
            return res.status(404).json({
              success: false,
              message: "Patient not found",
              usertoken: {
                user: usertoken,
                token: usertoken.token,
              },
              error: {
                status: true,
                code: "patient_not_found",
                debug: "Patient not found",
              },
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "doctor_not_found",
            debug: "Doctor not found",
          },
        });
      }
    })
    .catch((doctor_find_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: usertoken,
          token: usertoken.token,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: doctor_find_err,
        },
      });
    });
};

const revokeMedicalGlimpseRequest = (req: Request, res: Response) => {
  const { usertoken } = req.body;
  const { id: doctorId } = usertoken;

  const { id: patientId } = req.params;

  User.findOneAndUpdate(
    { id: doctorId, usertype: "doctor" },
    {
      $pull: {
        "doctor.pendingMedicalGlimpseRequests": patientId,
      },
    }
  )
    .then((doctor) => {
      if (doctor) {
        // remove the doctor to the patient's list of pendingGlimpseRequests
        User.findOneAndUpdate(
          { id: patientId, usertype: "patient" },
          {
            $pull: {
              "patient.pendingGlimpse": doctorId,
            },
          }
        )
          .then((patient) => {
            if (patient) {
              return res.status(200).json({
                success: true,
                message: "Medical glimpse request revoked",
                usertoken: {
                  user: usertoken,
                  token: usertoken.token,
                },
                patient: patient,
              });
            } else {
              return res.status(404).json({
                success: false,
                message: "Patient not found",
                usertoken: {
                  user: usertoken,
                  token: usertoken.token,
                },
                error: {
                  status: true,
                  code: "patient_not_found",
                  debug: "Patient not found",
                },
              });
            }
          })
          .catch((patient_update_err) => {
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              usertoken: {
                user: usertoken,
                token: usertoken.token,
              },
              error: {
                status: true,
                code: "internal_server_error",
                debug: patient_update_err,
              },
            });
          });
      } else {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "doctor_not_found",
            debug: "Doctor not found",
          },
        });
      }
    })
    .catch((doctor_update_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: usertoken,
          token: usertoken.token,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: doctor_update_err,
        },
      });
    });
};

// search for a doctor by name
const searchDoctorsByName = (req: Request, res: Response) => {
  const { usertoken } = req.body;

  const { name } = req.params;

  if (name === "*") {
    User.find({ usertype: "doctor" })
      .then((doctors) => {
        if (doctors) {
          return res.status(200).json({
            success: true,
            message: "Doctors found",
            usertoken: {
              user: usertoken,
              token: usertoken.token,
            },
            doctors: doctors.map((dt) => {
              const { password, doctor, ...include } = dt._doc;
              return include;
            }),
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "No doctors found",
            usertoken: {
              user: usertoken,
              token: usertoken.token,
            },
            error: {
              status: true,
              code: "no_doctors_found",
              debug: "No doctors found",
            },
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "internal_server_error",
            debug: err,
          },
        });
      });
    return;
  }

  User.find({ usertype: "doctor", name: { $regex: name, $options: "i" } })
    .then((doctors) => {
      if (doctors) {
        return res.status(200).json({
          success: true,
          message: "Doctors found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          doctors: doctors.map((dt) => {
            const { password, doctor, ...include } = dt._doc;
            return include;
          }),
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No doctors found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "no_doctors_found",
            debug: "No doctors found",
          },
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: usertoken,
          token: usertoken.token,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: err,
        },
      });
    });
};

// view patient's medical history
const getPatientMedicalHistory = (req: Request, res: Response) => {
  const { usertoken } = req.body;
  const { id: doctorId } = usertoken;

  const { id: patientId } = req.params;

  // check if doctor is allowed to view medical records
  User.findOne({ id: patientId, usertype: "patient" })
    .then((targetPatient) => {
      if (targetPatient) {
        const authorizedDoctors = targetPatient.patient.doctors;

        if (authorizedDoctors.includes(doctorId)) {
          // doctor is authorized
          const diagnoses = targetPatient.patient.diagnoses;

          Diagnosis.find({ diagnosisId: { $in: diagnoses } })
            .then((fetchedRecords) => {
              return res.status(200).json({
                success: true,
                message: "Medical records fetched successfully",
                medical_history: fetchedRecords,
                error: {
                  status: false,
                  code: null,
                },
              });
            })
            .catch((records_fetch_err) => {
              return res.status(400).json({
                success: false,
                message: "Error while retrieving records",
                usertoken: {
                  user: usertoken,
                  token: usertoken.token,
                },
                medical_history: null,
                error: {
                  status: true,
                  code: "internal_server_error",
                  debug: records_fetch_err,
                },
              });
            });
        } else {
          // doctor not authorized [not whitelisted]
          return res.status(403).json({
            success: false,
            message: "Not authorized to view records",
            usertoken: {
              user: usertoken,
              token: usertoken.token,
            },
            medical_history: null,
            error: {
              status: true,
              code: "not_authorized",
              debug: null,
            },
          });
        }
      } else {
        // patient not found
        return res.status(404).json({
          success: false,
          message: "Patient not found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "patient_not_found",
            debug: "Patient not found",
          },
        });
      }
    })
    .catch((user_find_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: usertoken,
          token: usertoken.token,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: user_find_err,
        },
      });
    });
};

// create medical record/diagnosis
const createMedicalRecord = async (req: Request, res: Response) => {
  const { usertoken, patientId, date, symptoms, diagnosis, treatment } =
    req.body;
  const { id: doctorId } = usertoken;
  let patientExists = false;

  if (!patientId || !date || !symptoms || !diagnosis) {
    return res.status(403).json({
      success: false,
      message: "Missing inputs",
      usertoken: {
        user: usertoken,
        token: usertoken.token,
      },
      error: {
        status: true,
        code: "invalid_inputs",
        debug: null,
      },
    });
  }

  await User.findOne({ id: patientId, usertype: "patient" })
    .then((usr) => {
      if (usr) {
        patientExists = true;
        return;
      } else {
        // patient not found
        return res.status(404).json({
          success: false,
          message: "Patient not found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "patient_not_found",
            debug: "Patient not found",
          },
        });
      }
    })
    .catch((usr_find_error) => {
      return res.status(400).json({
        success: false,
        message: "Error Fetching user from DB!!",
        usertoken: {
          user: usertoken,
          token: usertoken.token,
        },
        error: {
          status: true,
          code: "db_error",
          debug: usr_find_error,
        },
      });
    });

  if (!patientExists) {
    return;
  }

  // random id for diagnosis
  const diagnosisId = `diagnosis_${v4ID()}`;

  // check if the patient exists
  User.findOneAndUpdate(
    { id: patientId, usertype: "patient" },
    {
      $addToSet: {
        "patient.diagnoses": diagnosisId,
      },
    }
  )
    .then((target_patient) => {
      if (target_patient) {
        // construct new Diagnosis
        const newDiagnosis = new Diagnosis({
          diagnosisId: diagnosisId,
          patient: patientId,
          doctor: doctorId,
          date: date,
          symptoms: symptoms,
          treatment: treatment ?? "_",
          whitelisted: [doctorId],
        });

        newDiagnosis
          .save()
          .then((ndoc) => {
            return res.status(200).json({
              success: true,
              message: "Successfully created new record",
              usertoken: {
                user: usertoken,
                token: usertoken.token,
              },
              medical_history: ndoc,
              error: {
                status: false,
                code: null,
              },
            });
          })
          .catch((new_diagnosis_save_err) => {
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              usertoken: {
                user: usertoken,
                token: usertoken.token,
              },
              error: {
                status: true,
                code: "internal_server_error",
                debug: new_diagnosis_save_err,
              },
            });
          });
      } else {
        return res.status(404).json({
          success: false,
          message: "Patient not found",
          usertoken: {
            user: usertoken,
            token: usertoken.token,
          },
          error: {
            status: true,
            code: "patient_not_found",
            debug: "Patient not found",
          },
        });
      }
    })
    .catch((user_find_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: usertoken,
          token: usertoken.token,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: user_find_err,
        },
      });
    });
};

const mockDoctor = (req: Request, res: Response) => {
  const { name, id, phone, location, email, speciality } = req.body;
  const usertype = "doctor";
  const password = "Pass1234!";

  if (!name || !id || !phone || !location || !email || !speciality) {
    return res.status(400).json({
      success: false,
      message: "Bad Request. All fields are required",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "bad_request",
      },
    });
  }

  User.findOne({ $or: [{ id: id }, { email: email }] })
    .then(async (user) => {
      if (user) {
        return res.status(200).json({
          success: false,
          message: "User already exists",
          usertoken: {
            user: null,
            token: null,
          },
          error: {
            status: true,
            code: "user_exists",
          },
        });
      } else {
        try {
          // encrypt password
          const encryptedPassword = await bcrypt.hash(password, 10);
          const newUserConstruct = {
            name,
            id,
            email,
            password: encryptedPassword,
            usertype,
            ["doctor"]: {
              name,
              id,
              speciality,
              ["patients"]: [],
            },
            location,
            phoneNumber: phone,
          };
          const newUser = new User(newUserConstruct);

          console.log(newUserConstruct);

          await newUser.save();

          return res.status(201).json({
            success: true,
            message: "User created successfully",
            usertoken: {
              user: newUser,
              token: null,
            },
            error: {
              status: false,
              code: null,
            },
          });
        } catch (e) {
          console.log(e);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
            usertoken: {
              user: null,
              token: null,
            },
            error: {
              status: true,
              code: "internal_server_error",
              debug: e,
            },
          });
        }
      }
    })
    .catch((user_find_err) => {
      console.log(user_find_err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: user_find_err,
        },
      });
    });
};
const mockPatient = (req: Request, res: Response) => {
  const { name, id, phone, location, email, speciality } = req.body;
  const usertype = "patient";
  const password = "Pass1234!";

  if (!name || !id || !phone || !location || !email || !speciality) {
    return res.status(400).json({
      success: false,
      message: "Bad Request. All fields are required",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "bad_request",
      },
    });
  }

  User.findOne({ $or: [{ id: id }, { email: email }] })
    .then(async (user) => {
      if (user) {
        return res.status(200).json({
          success: false,
          message: "User already exists",
          usertoken: {
            user: null,
            token: null,
          },
          error: {
            status: true,
            code: "user_exists",
          },
        });
      } else {
        try {
          // encrypt password
          const encryptedPassword = await bcrypt.hash(password, 10);
          const newUserConstruct = {
            name,
            id,
            email,
            password: encryptedPassword,
            usertype,
            ["doctor"]: {
              name,
              id,
              speciality,
              ["patients"]: [],
            },
            location,
            phoneNumber: phone,
          };
          const newUser = new User(newUserConstruct);

          console.log(newUserConstruct);

          await newUser.save();

          return res.status(201).json({
            success: true,
            message: "User created successfully",
            usertoken: {
              user: newUser,
              token: null,
            },
            error: {
              status: false,
              code: null,
            },
          });
        } catch (e) {
          console.log(e);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
            usertoken: {
              user: null,
              token: null,
            },
            error: {
              status: true,
              code: "internal_server_error",
              debug: e,
            },
          });
        }
      }
    })
    .catch((user_find_err) => {
      console.log(user_find_err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: user_find_err,
        },
      });
    });
};
const mockDiagnosis = (req: Request, res: Response) => {
  const diagnosisId = v4();

  const { doctor, patient, date, symptoms, diagnosis, treatment } = req.body;

  // check if all the fields are present
  if (
    !diagnosisId ||
    !doctor ||
    !patient ||
    !date ||
    !symptoms ||
    !diagnosis ||
    !treatment
  ) {
    return res.status(400).json({
      success: false,
      message: "Bad Request. All fields are required",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "bad_request",
      },
    });
  }

  User.findOne({ id: patient, usertype: "patient" })
    .then((user) => {
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
          isApproved: true,
        });

        // save the diagnosis
        newDiagnosis
          .save()
          .then((diagnosis) => {
            // !if the diagnosis is not approved, then it should not be added to the patient's diagnoses
            user.patient.diagnoses.push(diagnosis.diagnosisId);

            user
              .save()
              .then((saved_patient) => {
                // update the doctor's pending approvals
                User.findOneAndUpdate(
                  { id: doctor, usertype: "doctor" },
                  { $push: { "doctor.pendingApprovals": diagnosisId } }
                )
                  .then((doctor) => {
                    return res.status(200).json({
                      success: true,
                      message: "Medical history created and pending approval",
                      usertoken: {
                        user: user,
                        token: null,
                      },
                      error: {
                        status: false,
                        code: null,
                      },
                      medical_history: diagnosis,
                    });
                  })
                  .catch((doctor_update_err) => {
                    return res.status(500).json({
                      success: false,
                      message: "Internal Server Error",
                      usertoken: {
                        user: null,
                        token: null,
                      },
                      error: {
                        status: true,
                        code: "internal_server_error",
                        debug: doctor_update_err,
                      },
                    });
                  });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: "Internal Server Error",
                  usertoken: {
                    user: null,
                    token: null,
                  },
                  error: {
                    status: true,
                    code: "internal_server_error",
                    debug: err,
                  },
                });
              });
          })
          .catch((diagnosis_save_err) => {
            return res.status(500).json({
              success: false,
              message: "Internal Server Error",
              usertoken: {
                user: null,
                token: null,
              },
              error: {
                status: true,
                code: "internal_server_error",
                debug: diagnosis_save_err,
              },
            });
          });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
          usertoken: {
            user: null,
            token: null,
          },
          error: {
            status: true,
            code: "user_not_found",
          },
        });
      }
    })
    .catch((user_find_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: user_find_err,
        },
      });
    });
};

const mockAllPatients = (req: Request, res: Response) => {
  User.find({ usertype: "patient" })
    .then((patients) => {
      return res.status(200).json({
        success: true,
        message: "all patients",
        patients,
        error: null,
      });
    })
    .catch((user_find_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: user_find_err,
        },
      });
    });
};

const mockAllDoctors = (req: Request, res: Response) => {
  User.find({ usertype: "doctor" })
    .then((doctors) => {
      return res.status(200).json({
        success: true,
        message: "all doctors",
        doctors,
        error: null,
      });
    })
    .catch((usr_find_err) => {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "internal_server_error",
          debug: usr_find_err,
        },
      });
    });
};

export {
  getAllPatients,
  getPatientById,
  requestMedicalGlimpse,
  revokeMedicalGlimpseRequest,
  searchDoctorsByName,
  getPatientMedicalHistory,
  mockDoctor,
  mockDiagnosis,
  mockAllPatients,
  mockAllDoctors,
  mockPatient,
};
