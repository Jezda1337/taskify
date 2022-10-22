import AuthForm from "@/components/shared/AuthForm";
import useForm from "hooks/useForm";
import { FormControls } from "types/auth/form-controls.type";
import { Validators } from "utils/Validators";
import { Button } from "@mui/material";

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

  const githubId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const githubRedirect = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL;
 
  const gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${githubId}&redirect_uri=${githubRedirect}`;
  return (
    <>
      <AuthForm
        title="Login"
        btnText="Login"
        inputs={inputs}
        setInputs={setInputs}
        formIsValid={formIsValid}
      />
      
      <Button component={'a'} href={gitHubUrl}>Github login</Button>
    </>
  );
};

export default Login;
