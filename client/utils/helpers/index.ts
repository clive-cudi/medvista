import { EMAIL_REGEX } from "./regex";

interface checkFormInputs_Props<T, K> {
    data: T;
    exclude: K[];
  }
  
  export function checkFormInputs<
    T extends { [key: string]: any },
    K extends keyof T
  >({ data, exclude }: checkFormInputs_Props<T, K>): boolean {
    const data_include = Object.keys(data)
      .filter((key) => exclude.includes(key as any) === false)
      .map((inclusion_key) => [inclusion_key, data[inclusion_key]])
      .reduce(function (prev: any, curr: any) {
          // cover boolean exception with a conditional since value false evaluates to false (hence empty) when passed through Boolean instance
        prev[curr[0]] = typeof curr[1] == "boolean" ? String(curr[1]) : curr[1];
        return prev;
      }, {});
  
    if ([...Object.values(data_include)].every(Boolean)) {
      return true;
    } else {
      return false;
    }
  }

export const validateEmail = (email: string) => {
  return email.match(
      EMAIL_REGEX
  );
};
  
  // console.log(checkFormInputs({data: {cool: true, wow: "hello"}, exclude: ["cool"]}))

  export { EMAIL_REGEX, PASSWORD_REGEX, FULLNAME_SPACED_REGEX, ALL_INTEGERS_REGEX } from "./regex";
  export { api } from "./axios.config";