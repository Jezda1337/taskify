import React from "react";
import { Button } from "@mui/material";
import useForm from "hooks/useForm";
import { FormControls } from "types/auth/form-controls.type";
import { Validators } from "utils/Validators";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const initialInputs: FormControls = {
  search: {
    elementType: "text-input",
    type: "text",
    label: "",
    placeholder: "Find projects, people...",
    value: "",
    validators: [Validators.required],
    required: true,
    valid: false,
    blurred: false,
    validationErrorMessage: "",
    touched: false,
  },
};

const SearchBarMenu = () => {
  const { inputs, setInputs, formIsValid } = useForm(initialInputs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted");
  };

  return (
    <>
      <form
        className="w-[470px] hidden md:flex items-end justify-center "
        onSubmit={handleSubmit}
      >
        {Object.entries(inputs).map(([key, formCtrl]: any) => (
          <TextField
            key={key}
            fullWidth
            spellCheck="false"
            variant="standard"
            type={formCtrl.elementType}
            value={formCtrl.value}
            placeholder={formCtrl.placeholder}
            onChange={(e) => setInputs(e.target.value, key)}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formIsValid}
          className="rounded-none shadow-none hover:shadow-none focus:shadow-none"
        >
          <SearchIcon />
        </Button>
      </form>
    </>
  );
};

export default SearchBarMenu;
