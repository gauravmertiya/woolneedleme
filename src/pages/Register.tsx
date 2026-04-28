import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data);
        return;
      }

      toast.success("Account created 🎉 Please login");

      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md border rounded-xl p-6 shadow-sm">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <div className="space-y-4">

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleRegister}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg"
          >
            Sign Up
          </button>

        </div>
      </div>
    </div>
  );
};

export default Register;