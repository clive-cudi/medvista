import { Request, Response } from "express";

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
}