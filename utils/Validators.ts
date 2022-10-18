const emailValidationPattern =
  /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{2,})+$/;

export const Validators = {
  required: (value: string, formState: any) => {
    let isValid = true;
    let message = "";

    isValid = value.trim() !== "" && isValid;
    if (!isValid) {
      message = "This field is required";
      return { isValid, message };
    }

    return { isValid, message };
  },

  email: (value: any, formState: any) => {
    let isValid = true;
    isValid = !!value.match(emailValidationPattern) && isValid;
    const message = !isValid && "Enter the correct email";
    return { isValid, message };
  },

  passwordsMatch: (passKey: string, confirmPassKey: string) => (value: any, formState: any) => {
    const isValid = formState[passKey].value === formState[confirmPassKey].value;
    const message = isValid ? '' : 'Passwords do not match';
    
    return { isValid, message };
  }
};
