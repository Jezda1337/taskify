import MyFormControl from "@/components/shared/MyFormControl";
import { Button } from "@mui/material";
import useForm from "hooks/useForm";
import { Validators } from "utils/Validators";

const initialInputs = {
  fullname: {
    elementType: "text-input",
    type: "text",
    label: "Full name",
    value: "",
    validators: [Validators.required],
    required: true,
    valid: false,
    blurred: false,
    validationErrorMessage: "",
    touched: false,
  },
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
};

const confirmPasswordInput = {
  confirmPassword: {
    elementType: "text-input",
    type: "password",
    label: "Confirm password",
    value: "",
    validators: [Validators.required],
    required: true,
    valid: false,
    blurred: false,
    validationErrorMessage: "",
    touched: false,
  },
};

const Register = () => {
  const { inputs, setInputs, formIsValid } = useForm(initialInputs);
  const {
    inputs: { confirmPassword },
    setInputs: setConfirmInputs,
  } = useForm(confirmPasswordInput);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-md m-auto ">
        <h3 className="text-2xl mb-8">Register</h3>
        <form className="w-full flex flex-col gap-4 justify-center ">
          {Object.entries(inputs).map(([key, formCtrl]: any) => (
            <MyFormControl
              type={formCtrl.type}
              key={key}
              elementType={formCtrl.elementType}
              required={formCtrl.required}
              value={formCtrl.value}
              label={formCtrl.label}
              fullWidth
              error={!formCtrl.valid && formCtrl.touched && formCtrl.blurred}
              inputHandler={(e: any) => setInputs(e.target.value, key)}
              blurHandler={(e: any) => setInputs(e.target.value, key, true)}
              checkboxHandler={(e: any) => setInputs(!!e.target.checked, key)}
            />
          ))}
          <MyFormControl
            type={confirmPassword.type}
            elementType={confirmPassword.elementType}
            required={confirmPassword.required}
            value={confirmPassword.value}
            label={confirmPassword.label}
            fullWidth
            error={
              confirmPassword.touched &&
              confirmPassword.blurred &&
              (confirmPassword.value !== inputs.password.value ||
                confirmPassword.value === "")
            }
            inputHandler={(e: any) =>
              setConfirmInputs(e.target.value, "confirmPassword")
            }
            blurHandler={(e: any) =>
              setConfirmInputs(e.target.value, "confirmPassword", true)
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled={
              !formIsValid || confirmPassword.value !== inputs.password.value
            }
            className="mt-4"
          >
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;
