import { Checkbox, FormControlLabel, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

const MyFormControl = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "text-input":
      inputElement = (
        <FormControl fullWidth>
          <TextField
            fullWidth
            variant="outlined"
            onChange={props.inputHandler}
            onBlur={props.blurHandler}
            label={props.label}
            color="primary"
            required={props.required}
            spellCheck="false"
            value={props.value || ""}
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
          />
        </FormControl>
      );
      break;

    case "checkbox":
      inputElement = (
        <FormControlLabel
          control={
            <Checkbox
              checked={props.value || false}
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
