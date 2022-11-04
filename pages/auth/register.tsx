import AuthLayout from "@/components/pages/auth/AuthLayout";
import AuthForm from "@/components/shared/AuthForm";
import useForm from "hooks/useForm";
import { axiosClient } from "middleware/axios";
import { withNoAuthSSR } from "middleware/withNoAuthSSR";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormControls } from "types/auth/form-controls.type";
import { RegisterReq } from "types/auth/register-req.type";
import { createBody } from "utils/helpers";
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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerBody = createBody(inputs) as RegisterReq;
    try {
      await axiosClient.post("/auth/register", registerBody);
      router.replace("/");
    } catch (err) {
      console.log(err); //needs to replace with snackbar
    }
  };

  return (
      <AuthLayout>
        <AuthForm
          inputs={inputs}
          setInputs={setInputs}
          formIsValid={formIsValid}
          title="Create a new account"
          btnText="Sign up"
          handleSubmit={handleSubmit}
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
  );
};

export default Register;

export const getServerSideProps = withNoAuthSSR();