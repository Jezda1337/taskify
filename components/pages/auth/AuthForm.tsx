import { Button } from "@mui/material";
import { InputHandler } from "hooks/useForm";
import { FormControls } from "types/shared/form-controls.type";
import MyFormControl from "../../shared/MyFormControl";

type Props = {
  inputs: FormControls;
  btnText: string;
  title: string;
  setInputs: InputHandler;
  formIsValid: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<unknown>;
};

export default function ({
  inputs,
  setInputs,
  formIsValid,
  btnText,
  title,
  handleSubmit,
}: Props) {
  return (
    <>
      <h3 className="text-2xl mb-8">{title}</h3>

      <form
        className="w-full flex flex-col gap-4 justify-center"
        onSubmit={handleSubmit}
      >
        {Object.entries(inputs).map(([key, formCtrl]) => (
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
              setInputs(e.target.value, key, true);
            }}
            checkboxHandler={(e) => setInputs(!!e.target.checked, key)}
          />
        ))}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!formIsValid}
          className="mt-4 "
        >
          {btnText}
        </Button>
      </form>
    </>
  );
}
