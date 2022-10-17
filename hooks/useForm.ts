import { useCallback, useState } from "react";
import { checkValidity } from "utils/helpers";

export default function (initialInputs: any) {
  const [inputs, setInputs] = useState(initialInputs);
  const [formIsValid, setFormIsValid] = useState(false);

  const inputHandler = useCallback(
    (value: any, inputIdentifier: any) => {
      const updatedInputs = { ...inputs };
      const updatedElement = { ...updatedInputs[inputIdentifier] };

      if (updatedElement.validators.length) {
        const validity = checkValidity(value, updatedElement.validators);
        updatedElement.valid = validity.isValid;
        updatedElement.validationErrorMessage = validity.message;
      }
      updatedElement.value = value;
      updatedElement.touched = true;
      updatedInputs[inputIdentifier] = updatedElement;

      let formIsValid = true;
      for (let element in updatedInputs) {
        formIsValid =
          updatedInputs[element].valid &&
          updatedInputs[element].touched &&
          formIsValid;
      }

      setInputs(updatedInputs);
      setFormIsValid(formIsValid);
    },
    [inputs]
  );

  return { inputs, setInputs: inputHandler, formIsValid };
}
