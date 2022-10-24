import AuthLayout from "@/components/pages/auth/AuthLayout";
import AuthForm from "@/components/shared/AuthForm";
import useForm from "hooks/useForm";
import Link from "next/link";
import { FormControls } from "types/auth/form-controls.type";
import { Validators } from "utils/Validators";

const initialInputs: FormControls = {
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
  confirmPassword: {
    elementType: "text-input",
    type: "password",
    label: "Confirm password",
    value: "",
    validators: [
      Validators.required,
      Validators.passwordsMatch("password", "confirmPassword"),
    ],
    required: true,
    valid: false,
    blurred: false,
    validationErrorMessage: "",
    touched: false,
  },
};

const Register = () => {
  const { inputs, setInputs, formIsValid } = useForm(initialInputs);

  return (
    <div className="flex min-h-screen bg-no-repear bg-cover bg-[url('/images/blob.svg')]">
      <AuthLayout>
        <AuthForm
          inputs={inputs}
          setInputs={setInputs}
          formIsValid={formIsValid}
          title="Create a new account"
          btnText="Sign up"
        />
        <div>
          <p>
            Already have an account?{" "}
            <Link href="/auth/login">
              <a className="text-primary">Sign in</a>
            </Link>
          </p>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Register;
