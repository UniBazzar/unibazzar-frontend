import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");

    const resultAction = await dispatch(
      registerUser({ fullName, email, password, role })
    );

    if (registerUser.fulfilled.match(resultAction)) {
      const redirectPath = role === "merchant" ? "/dashboard" : "/listings";
      navigate(redirectPath);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 items-center justify-center rounded-tr-[256px] rounded-br-[256px] px-10 text-white text-center">
        <div>
          <h2 className="text-4xl font-extrabold mb-3">Join UniBazzar</h2>
          <p className="text-base max-w-md mx-auto leading-relaxed">
            Buy, sell, and support fellow students with Ethiopia's most trusted campus marketplace.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="bg-yellow-400 p-3 rounded-full mb-4 shadow-md mx-auto w-fit">
            <span className="text-blue-900 font-bold text-base">UB</span>
          </div>

          <h1 className="text-2xl font-bold mb-1 text-center text-blue-900">Create Account</h1>
          <p className="text-sm text-gray-600 mb-4 text-center">Start using your university email</p>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., Samuel Dawit"
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="University email"
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          {/* Role selection */}
          <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1">Register As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              required
            >
              <option value="student">Student</option>
              <option value="merchant">Merchant</option>
            </select>
          </div>

          <div className="mb-3 relative">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Strong password"
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <FaEyeSlash className="w-4 h-4 mt-7" /> : <FaEye className="w-4 h-4 mt-7" />}
            </button>
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash className="w-4 h-4 mt-7" /> : <FaEye className="w-4 h-4 mt-7" />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 rounded-md text-sm font-semibold mb-3"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-xs text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
