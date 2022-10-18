import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { ChangeEvent, FocusEvent } from "react";
import { FormControl as MyFormControl } from "types/auth/form-control.type";

type MyControlProps = Partial<MyFormControl> & {
  inputHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  blurHandler?: (e: FocusEvent<HTMLInputElement>) => void;
  checkboxHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const MyFormControl = (props: MyControlProps) => {
  let inputElement = null;

  switch (props.elementType) {
    case "text-input":
      inputElement = (
        <FormControl fullWidth>
          <TextField
            type={props.type}
            fullWidth
            variant="outlined"
            onChange={props.inputHandler}
            onBlur={props.blurHandler}
            label={props.label}
            color="primary"
            required={props.required}
            spellCheck="false"
            value={props.value || ""}
            error={props.error}
          />
        </FormControl>
      );
      break;

    case "text-area":
      inputElement = (
        <FormControl fullWidth>
          <TextField
            fullWidth
            variant="outlined"
            onChange={props.inputHandler}
            onBlur={props.blurHandler}
            label={props.label}
            color="primary"
            multiline
            minRows={4}
            maxRows={6}
            required={props.required}
            spellCheck="false"
            value={props.value || ""}
            error={props.error}
          />
        </FormControl>
      );
      break;

    case "checkbox":
      inputElement = (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!props.value}
              onChange={props.checkboxHandler}
              color="primary"
            />
          }
          label={props.label}
        />
      );
      break;

    default:
      break;
  }

  return inputElement;
};

export default React.memo(MyFormControl);