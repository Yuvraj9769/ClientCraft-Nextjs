import { FormDataType } from "@/app/signup/page";

type getValidationMessage = { isValid: boolean; message: string };

const signUpDataValidator = (data: FormDataType): getValidationMessage => {
  for (const key in data) {
    if (data[key as keyof FormDataType].trim() === "") {
      return {
        isValid: false,
        message: `Please fill in the ${key} field.`,
      };
    }
  }

  return {
    isValid: true,
    message: "Validation passed.",
  };
};

export default signUpDataValidator;
