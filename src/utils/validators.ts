import { AppError } from "./app-error";

export const assertRequiredString = (value: unknown, field: string) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AppError(400, `${field} is required`);
  }
};

export const assertEmail = (email: unknown) => {
  assertRequiredString(email, "email");
  const value = String(email).trim().toLowerCase();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!valid) throw new AppError(400, "Invalid email format");
};

export const assertPassword = (password: unknown) => {
  assertRequiredString(password, "password");
  const value = String(password);
  if (value.length < 8) {
    throw new AppError(400, "Password must have at least 8 characters");
  }
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
    throw new AppError(
      400,
      "Password must include uppercase, lowercase and number"
    );
  }
};
