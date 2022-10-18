import { useCallback, useState } from "react";
import { checkValidity } from "utils/helpers";

export default function (initialInputs: any) {
  const [inputs, setInputs] = useState(initialInputs);
  const [formIsValid, setFormIsValid] = useState(false);

  const inputHandler = useCallback(
    (value: any, currentInputKey: string, blurred?: boolean) => {
      // Update input value
      const allInputs = { ...inputs };
      const currentInput = { ...allInputs[currentInputKey] };
      currentInput.value = value;
      currentInput.touched = true;
      if (blurred) {
        currentInput.blurred = true;
      }
      allInputs[currentInputKey] = currentInput;

      // Validate all fields
      Object.values(allInputs).forEach((input: any) => {
        if (input.validators?.length) {
          const validity = checkValidity(input.value, input.validators, allInputs);
          input.valid = validity.isValid;
          input.validationErrorMessage = validity.message;
        }
      });

      // Check form validity
      let formIsValid = true;
      for (let element in allInputs) {
        formIsValid =
          allInputs[element].valid &&
          allInputs[element].touched &&
          formIsValid;
      }

      // Set new state
      setInputs(allInputs);
      setFormIsValid(formIsValid);
    },
    [inputs]
  );

  return { inputs, setInputs: inputHandler, formIsValid };
}
