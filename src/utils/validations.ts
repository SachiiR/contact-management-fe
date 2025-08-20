import { REGEX } from "./constants";

export const validateEmail = (email: string): boolean => {
    const regex = REGEX.EMAIL;
    return regex.test(email);
  };
  
  // Password validation (example: min 8 chars, at least one number, one special char)
  export const validatePassword = (password: string): boolean => {
    const regex = REGEX.PASSWORD;
    return regex.test(password);
  };
  
  // Name validation (example: only letters, spaces, and between 2–30 chars)
  export const validateName = (name: string): boolean => {
    const regex = REGEX.NAME;
    return regex.test(name);
  };

  export const validatePhone = (phone: string): boolean => {
    const regex = REGEX.PHONE;
    return regex.test(phone);
  };