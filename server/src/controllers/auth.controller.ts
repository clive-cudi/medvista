import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface registerCredentials {
    name: string;
    id: number;
    email: string;
    password: string;
    confirmPassword: string;
    usertype: "doctor" | "patient"
}
const register = (req: Request, res: Response) => {
    const { name, id, email, password, confirmPassword, usertype }: registerCredentials = req.body;

    if (!name || !id || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Missing credentials",
            usertoken: {
              user: null,
              token: null,
            },
            error: {
              status: true,
              code: "missing_credentials",
            },
          });
    }

    if (password !== confirmPassword) {
        return res.status(403).json({
          success: false,
          message: "Passwords do not match",
          usertoken: {
            user: null,
            token: null,
          },
          error: {
            status: true,
            code: "password_mismatch",
          },
        });
      }
    
    // check if user exists
    // if user exists, return error
    // if user does not exist, create user
    User.findOne({$or: [{id: id}, {email: email}]}).then(async (user) => {
      if (user) {
        return res.status(409).json({
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
            [usertype === "patient" ? "patient" : "doctor" ]: {
              name,
              id,
              [usertype === "patient" ? "doctors" : "patients"]: []
            } 
          }
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
        } catch(e) {
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
              debug: e
            }
          })
        }
      }
    }).catch((user_find_err) => {
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
            debug: user_find_err
          }
        });
    })
}

const login = (req: Request, res: Response) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "missing_credentials",
      },
    });
  }

  User.findOne({id: id}).then(async (user) => {
    console.log(user);
    if (user) {
      // user exists
      if (user?.password && (await bcrypt.compare(password, user?.password))) {
        // generate JWT token
        const token = jwt.sign(
          {
            id: user.id,
            email: `${user.email}`,
            name: `${user.name}`,
            usertype: `${user.usertype}`
          },
          process.env.JWT_TOKEN_KEY ?? "jfs29jfsoi4-jdwiehfri",
          {
            expiresIn: "2h"
          }
        );

        const { ...dataToInclude } = user;
        console.log(dataToInclude);

        return res.status(200).json({
          success: true,
          message: "Successful Login",
          usertoken: {
            user: { ...dataToInclude },
            token: token,
          },
          error: {
            status: false,
            message: null || "",
            code: null,
          },
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Invalid credentials",
          usertoken: {
            user: null,
            token: null,
          },
          error: {
            status: true,
            code: "invalid_credentials",
          },
        });
      }
    } else {
      return res.status(200).json({
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
  }).catch((user_find_err) => {
    console.log(user_find_err);
    return res.status(200).json({
      success: false,
      message: "An error occurred",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "db_error",
        debug: user_find_err,
      },
    });
  })

}

export { register, login };