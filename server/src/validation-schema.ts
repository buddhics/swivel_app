import { Schema } from "express-validator";
export const validationSchema: Schema = {
  first_name: {
    notEmpty: {
      errorMessage: "First name should not be empty.",
      bail: true,
    },
    isAlpha: {
      errorMessage: "First name should only contains alphabets.",
      bail: true,
    },
    isLength: {
      errorMessage: "First name should have 6-10 characters.",
      options: { min: 6, max: 10 },
      bail: true,
    },
  },
  last_name: {
    notEmpty: {
      errorMessage: "Last name should not be empty.",
      bail: true,
    },
    isAlpha: {
      errorMessage: "Last name should only contains alphabets.",
      bail: true,
    },
    isLength: {
      errorMessage: "Last name should have 6-10 characters.",
      options: { min: 6, max: 10 },
      bail: true,
    },
  },
  email: {
    isEmail: {
      errorMessage: "Email is invalid.",
      bail: true,
    },
  },
  number: {
    isMobilePhone: {
      errorMessage: "Mobile phone number is invalid.",
      options: ["si-LK"],
    },
  },
  gender: {
    matches: {
      errorMessage: "Value should be either 'F' or 'M'.",
      options: new RegExp("^[F|M]$"),
    },
  },
};
