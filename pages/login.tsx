import { Button } from "@mui/material";
import MyFormControl from "components/shared/MyFormControl";
import useForm from "hooks/useForm";
import { FormControls } from "types/auth/form-controls.type";
import { Validators } from "utils/Validators";

const initialInputs: FormControls = {
  email: {
    elementType: "text-input",
    type: "email",
    label: "Your email",
    value: "",
    validators: [Validators.required, Validators.email],
    required: true,
    valid: false,
    blurred: false,
    validationErrorMessage: "",
    touched: false,
  },
  password: {
    elementType: "text-input",
    type: "password",
    label: "Your password",
    value: "",
    validators: [Validators.required],
    required: true,
    valid: false,
    blurred: false,
    validationErrorMessage: "",
    touched: false,
  },
  rememberMe: {
    elementType: "checkbox",
    label: "Remember me",
    value: false,
    validators: [],
    required: false,
    valid: true,
    touched: false,
  },
};

const Login = () => {
  const { inputs, setInputs, formIsValid } = useForm(initialInputs);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-md m-auto ">
        <h3 className="text-2xl mb-8">Login</h3>
        <form className="w-full flex flex-col gap-4 justify-center ">
          {Object.entries(inputs).map(([key, formCtrl]) => (
            <MyFormControl
              type={formCtrl.type}
              key={key}
              elementType={formCtrl.elementType}
              required={formCtrl.required}
              value={formCtrl.value}
              label={formCtrl.label}
              error={!formCtrl.valid && formCtrl.touched && formCtrl.blurred}
              inputHandler={e => setInputs(e.target.value, key)}
              blurHandler={e => {setInputs(e.target.value, key, true)}}
              checkboxHandler={e => setInputs(!!e.target.checked, key)}
            />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled={!formIsValid}
            className="mt-4"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;