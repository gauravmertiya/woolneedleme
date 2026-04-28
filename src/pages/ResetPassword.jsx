import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data);
        return;
      }

      toast.success("Password reset successful 🎉");

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-center mb-2">
          Reset Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password below
        </p>

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 focus:border-black outline-none px-4 py-2 rounded-lg mb-4"
        />

        {/* Button */}
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </div>
    </div>
  );
}