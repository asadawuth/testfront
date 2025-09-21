import { useState } from "react";
import LayoutModelButtonRegister from "../component/Register/LayoutModelButtonRegister";
import LayoutModelRegister from "../component/Register/LayoutModelRegister";
import { useAuth } from "../hook/user-auth";
import FormInput from "../component/FormInput";
import Input from "../component/Input";
import Button from "../component/Register/Button";
import ButtonSubmit from "../component/ButtonSubmit";
import TextOnInput from "../component/TextOnInput";
import TextError from "../component/TextError";
import { registerSchema } from "../validate/user-validate";
import ModelSuccess from "./ModelSuccess";

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  console.dir(error);
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};
export default function ModelRegister({ onClose }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    tel: "",
    password: "",
    confirm_password: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({});
  const [errorHaveEmailOrNumber, setErrorHaveEmailOrNumber] = useState("");
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const handleChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateRegister(form);
    if (validationError) {
      return setError(validationError);
    }

    setError({});
    setErrorHaveEmailOrNumber("");
    try {
      setSubmitting(true);
      const res = await register(form);
      setSuccess(true);
      setForm({
        first_name: "",
        last_name: "",
        tel: "",
        password: "",
        confirm_password: "",
        email: "",
      });
    } catch (err) {
      if (err.response?.status === 409) {
        setErrorHaveEmailOrNumber("Email or phone already exists");
      } else {
        setErrorHaveEmailOrNumber("Register failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <LayoutModelRegister text="Register">
        <FormInput onSubmit={onSubmit} className="flex flex-col gap-1">
          <TextOnInput text="Firstname" />
          <Input
            name="first_name"
            placeholder="Guess your firstname"
            value={form.first_name}
            onChange={handleChangeInput}
          />
          {error.first_name && (
            <TextError className="text-start" text={error.first_name} />
          )}
          <TextOnInput text="Lastname" />
          <Input
            name="last_name"
            placeholder="Guess your lastname"
            value={form.last_name}
            onChange={handleChangeInput}
          />
          {error.last_name && (
            <TextError className="text-start" text={error.last_name} />
          )}
          <TextOnInput text="Tel" />
          <Input
            name="tel"
            type="tel"
            placeholder="Guess your phone"
            value={form.tel}
            onChange={handleChangeInput}
          />
          {error.tel && <TextError className="text-start" text={error.tel} />}
          <TextOnInput text="Email" />
          <Input
            name="email"
            type="email"
            placeholder="Guess your email"
            value={form.email}
            onChange={handleChangeInput}
          />
          {error.email && (
            <TextError className="text-start" text={error.email} />
          )}
          <TextOnInput text="Password" />
          <Input
            name="password"
            type="password"
            placeholder="Guess your password"
            value={form.password}
            onChange={handleChangeInput}
          />
          {error.password && (
            <TextError className="text-start" text={error.password} />
          )}
          <TextOnInput text="Confirm Password" />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Guess your Confirmpassword"
            value={form.confirm_password}
            onChange={handleChangeInput}
          />
          {error.confirm_password && (
            <TextError className="text-start" text={error.confirm_password} />
          )}
          <LayoutModelButtonRegister>
            <ButtonSubmit
              submitting={submitting}
              label="Register"
              className="transition-all"
            />
            <Button
              actionModel={onClose}
              text="Cancel"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-all cursor-pointer"
            />
          </LayoutModelButtonRegister>
        </FormInput>
        {errorHaveEmailOrNumber && (
          <TextError
            className="text-center mt-2"
            text={errorHaveEmailOrNumber}
          />
        )}
      </LayoutModelRegister>
      {success && (
        <ModelSuccess
          message="Your account has been registered successfully."
          onClose={() => {
            setSuccess(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
