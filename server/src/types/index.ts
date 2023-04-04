export interface JWTDecodedEmailVerificationToken {
    id: string;
    email: string;
    name: string;
    usertype: "doctor" | "patient";
}