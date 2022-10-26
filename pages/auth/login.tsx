import AuthLayout from "@/components/pages/auth/AuthLayout";
import AuthForm from "@/components/shared/AuthForm";
import useForm from "hooks/useForm";
import Link from "next/link";
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
};

const Login = () => {
  const { inputs, setInputs, formIsValid } = useForm(initialInputs);

  return (
    <div className="flex min-h-screen bg-no-repeat bg-cover bg-[url('/images/blob.svg')]">
      <AuthLayout>
        <AuthForm
          title="Welcome back"
          btnText="Sign in"
          inputs={inputs}
          setInputs={setInputs}
          formIsValid={formIsValid}
        />
        <div>
          <p>
            New to Taskify?{" "}
            <Link href="/auth/register">
              <a className="text-primary">Sign up</a>
            </Link>
          </p>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Login;
