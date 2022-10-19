import { Button } from "@mui/material";
import MyFormControl from "./MyFormControl";

type props = {
  inputs: any;
  btnText: string;
  title: string;
  blur: boolean;
  setInputs: any;
  formIsValid: boolean;
};

export default function({
  inputs,
  setInputs,
  formIsValid,
  btnText,
  title,
  blur,
}: props) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-md m-auto ">
        <h3 className="text-2xl mb-8">{title}</h3>
        <form className="w-full flex flex-col gap-4 justify-center ">
          {Object.entries(inputs).map(([key, formCtrl]: any) => (
            <MyFormControl
              type={formCtrl.type}
              key={key}
              elementType={formCtrl.elementType}
              required={formCtrl.required}
              value={formCtrl.value}
              label={formCtrl.label}
              error={!formCtrl.valid && formCtrl.touched && formCtrl.blurred}
              inputHandler={(e) => setInputs(e.target.value, key)}
              blurHandler={(e) => {
                setInputs(e.target.value, key, blur);
              }}
              checkboxHandler={(e) => setInputs(!!e.target.checked, key)}
            />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled={!formIsValid}
            className="mt-4"
          >
            {btnText}
          </Button>
        </form>
      </div>
    </>
  );
}
