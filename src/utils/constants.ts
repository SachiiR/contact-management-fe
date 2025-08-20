export const API_URL = "http://localhost:3000"; // backend base URL

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[A-Za-z\s]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
  PHONE: /^[+\d]?(?:[\d-.\s()]*)$/,
};

export const MESSAGES = {
  INVALID_EMAIL: "Invalid email format",
  INVALID_NAME: "Name can only contain letters and spaces",
  PASSWORD_REQUIREMENTS:
    "Password must be at least 8 chars, include uppercase, lowercase, number, and special char",
  PASSWORD_MISMATCH: "Passwords do not match",
  INVALID_PHONE: "Invalid phone number",
  INVALID_CREDENTIALS: "Invalid credentials",
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 2,
};

export const SORT = {
  ASC: "ASC",
  DESC: "DESC",
};

export const COMMON = {
  NAME: "name",
  TOKEN: "token",
  ROLE: "role",
};
