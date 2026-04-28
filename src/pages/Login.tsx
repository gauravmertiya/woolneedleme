import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ added
  const [error, setError] = useState("");

  // 🔒 Email validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data);
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ SAVE USER IN CONTEXT
      login(data.email, "User"); // name optional now

      toast.success("Login successful 🎉");

      navigate("/");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md border rounded-xl p-6 shadow-sm">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <div className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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