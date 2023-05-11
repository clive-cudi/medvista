export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const FULLNAME_SPACED_REGEX = /\s/;
export const ALL_INTEGERS_REGEX = /^\d+$/;
export const TIME_CHOICE_REGEX = /(0?[0-9]|1[0-9]|2[0-3])_(0?[0-9]|1[0-9]|2[0-3])/;
export const DATE_CHOICE_REGEX = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;