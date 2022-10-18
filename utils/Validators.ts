const emailValidationPattern =
  /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{2,})+$/;

export const Validators = {
  required: (value: string) => {
    let isValid = true;
    let message = "";

    isValid = value.trim() !== "" && isValid;
    if (!isValid) {
      message = "This field is required";
      return { isValid, message };
    }

    return { isValid, message };
  },

  email: (value: any) => {
    let isValid = true;
    isValid = !!value.match(emailValidationPattern) && isValid;
    const message = !isValid && "Enter the correct email";
    return { isValid, message };
  },
};
