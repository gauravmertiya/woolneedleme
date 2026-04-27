import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // 🔒 Email validation function
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    setError("");

    if (!name || !email) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    // 🔥 Optional restriction (uncomment if needed)
    // if (!email.endsWith("@gmail.com")) {
    //   setError("Only Gmail accounts allowed");
    //   return;
    // }

    login(email, name);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md border rounded-xl p-6 shadow-sm">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <div className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;