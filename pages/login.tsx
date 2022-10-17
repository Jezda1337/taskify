import { Button, TextField } from "@mui/material";
import useForm from "hooks/useForm";
import { Validators } from "utils/Validators";

type Login = {
  email: null | string;
  password: null | string;
  keepMeLogin: boolean;
};

const initialInputs = {
  email: {
    elementType: "text-input",
    label: "Your email",
    value: "",
    validators: [Validators.email, Validators.required],
    validation: {
      required: true,
      email: true,
    },
    valid: false,
    touched: false,
  },
  password: {
    elementType: "text-input",
    label: "Your password",
    value: "",
    validators: [Validators.required],
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  // rememberMe: {
  //   elementType: "text-input",
  //   label: "Remember me",
  //   value: "",
  //   validators: [],
  //   validation: {},
  //   valid: false,
  //   touched: false,
  // },
};

const Login = () => {
  const { inputs, setInputs, formIsValid } = useForm(initialInputs);
  console.log(inputs);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="text-2xl mb-8">Login</h3>
        <form className="w-full flex flex-col items-center gap-4 justify-center ">
          {/* {inputs.map((input: any) => (
            <TextField
              key={input.id}
              required={input.validation.required}
              value={input.value}
              label={input.label}
              onChange={(e) => setInputs(e.target.value, inputs.id)}
            />
          ))} */}
          {Object.entries(inputs).map(([key, value]: any) => (
            <TextField
              key={key}
              required={value.validation.required}
              value={value.value || ""}
              label={value.label}
              error={!value.valid && value.touched}
              onChange={(e) => setInputs(e.target.value, key)}
            />
          ))}
          {/* <FormGroup className="w-6/12">
            <FormControlLabel control={<Checkbox />} label="Remember me" />
          </FormGroup> */}
          <Button type="submit" className="w-6/12" variant="outlined">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
