import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase.js";
import LogoHeader from "./components/LogoHeader";
import AuthForm from "./components/AuthForm";
import "./index.css";
import InputField from "./components/InputField";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    onLogin({
      ...data.user,
      name: name || data.user.email,
    });

    navigate("/Feed");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    onLogin(data.user);
    navigate("/Feed");
  };

  return (
    <div className="login-page">
      <LogoHeader />

      <AuthForm
        title="Sign In Below"
        buttonText="Login"
        onSubmit={handleLogin}
      >
        <InputField
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Enter your name"
        />
        <InputField
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="Email address"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
        />
      </AuthForm>

      <h3>Don't have an account? Sign Up Here!</h3>

      <AuthForm
        buttonText="Sign Up"
        onSubmit={handleSignUp}
      >
        <InputField
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="Your email"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Your password"
        />
      </AuthForm>
    </div>
  );
}
