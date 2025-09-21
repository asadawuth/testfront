import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutBeforeLogin from "../../component/login/LayoutBeforeLogin";
import { useAuth } from "../../hook/user-auth";
import TextOnInput from "../../component/TextOnInput";
import FormInput from "../../component/FormInput";
import Input from "../../component/Input";
import ButtonSubmit from "../../component/ButtonSubmit";
import Button from "../../component/Register/Button";
import TextError from "../../component/TextError";
import ModelRegister from "../../model/ModelRegister";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailOrMobile: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openModelRegister, setOpenModelRegister] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.emailOrMobile) {
      setErrorMsg("Please enter your email or mobile.");
      return;
    }
    if (!form.password) {
      setErrorMsg("Please enter your password.");
      return;
    }
    try {
      setSubmitting(true);
      await login(form);
      navigate("/booking", { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message;
      setErrorMsg("Authentication failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <LayoutBeforeLogin text="login">
        <FormInput className="space-y-4" onSubmit={onSubmit}>
          <TextOnInput text="Email or phone" />
          <Input
            name="emailOrMobile"
            placeholder="Email address or phone number"
            value={form.emailOrMobile}
            onChange={(e) =>
              setForm({ ...form, emailOrMobile: e.target.value })
            }
          />
          <TextOnInput text="Password" />
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <ButtonSubmit
            submitting={submitting}
            label="Login"
            className="disabled:opacity-60 w-full"
            type="submit"
          />
        </FormInput>
        <Button
          style="flex justify-end cursor-pointer"
          text="register"
          actionModel={() => {
            setOpenModelRegister(true);
          }}
          className="text-red-800 cursor-pointer hover:text-red-950"
        />
        {errorMsg && <TextError text={errorMsg} className="text-center pt-2" />}
      </LayoutBeforeLogin>
      {openModelRegister && (
        <>
          <ModelRegister onClose={() => setOpenModelRegister(false)} />
        </>
      )}
    </>
  );
}
