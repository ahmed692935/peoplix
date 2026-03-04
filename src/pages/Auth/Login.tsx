import LoginImage from "../../assets/images/login.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../../assets/images/Vector.png";
import { loginApi } from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 Generic change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await loginApi(formData);

      // 🔥 Correct keys from backend
      const token = response.access_token;
      const user = response.user;
      const role = response.user?.role?.toLowerCase();

      if (!token || !role) {
        toast.error("Invalid server response");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login successful 🎉");

      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      toast.error(err || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F4F4F4]">
      {/* LEFT SIDE - 55% */}
      <div className="hidden md:block w-[55%] pt-5 pb-5 px-10">
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
          <img
            src={LoginImage}
            alt="Login Visual"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>

      {/* RIGHT SIDE - 45% */}
      <div className="w-full md:w-[45%] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-gray-400 rounded-full"></div> */}
            <img src={Logo} alt="Logo" className="mt-3 w-10" />
            <h1 className="text-4xl font-bold text-[#313538]">Peoplix</h1>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-gray-900">Log In</h2>
          <p className="text-gray-900 mt-2 mb-8 font-medium">
            Welcome back! Please enter your details
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            {/* <div className="text-right mb-6">
            <button className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </button>
          </div> */}

            {/* Login Button */}
            {/* <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#0F172A] to-[#080808] cursor-pointer text-white font-medium shadow-lg hover:opacity-90 transition">
            Log In
          </button> */}
            <button
              className="w-full mt-10 py-3 rounded-full 
bg-gradient-to-r from-[#0F172A] to-[#080808] 
cursor-pointer text-white font-medium 
hover:shadow-[0_10px_20px_rgba(0,0,0,0.35)] 
shadow-[0_15px_30px_rgba(0,0,0,0.45)] 
transition-all duration-300"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Signup */}
          {/* <p className="text-center text-sm text-gray-900 mt-6">
            Haven’t got an account?{" "}
            <span className="font-semibold underline cursor-pointer">
              Sign up
            </span>
          </p> */}

          {/* Terms */}
          <p className="text-sm text-gray-900 text-center mt-10">
            By Logging in, you agree to our{" "}
            <span className="underline cursor-pointer font-bold text-black">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer font-bold text-black">
              Privacy policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
