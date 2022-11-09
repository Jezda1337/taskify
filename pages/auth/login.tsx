import AuthLayout from "@/components/pages/auth/AuthLayout";
import AuthForm from "@/components/pages/auth/AuthForm";
import useForm from "hooks/useForm";
import { axiosClient } from "middleware/axios";
import { withNoAuthSSR } from "middleware/withNoAuthSSR";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormControls } from "types/shared/form-controls.type";
import { LoginReq } from "types/auth/login-req.type";
import { createBody } from "utils/helpers";
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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginBody = createBody(inputs) as LoginReq;
    try {
      await axiosClient.post("/auth/login", loginBody);
      router.replace("/");
    } catch (err) {
      console.log(err); //needs to replace with snackbar
    }
  };

  return (
      <AuthLayout>
        <AuthForm
          title="Welcome back"
          btnText="Sign in"
          inputs={inputs}
          setInputs={setInputs}
          formIsValid={formIsValid}
          handleSubmit={handleSubmit}
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
  );
};

export default Login;

export const getServerSideProps = withNoAuthSSR();