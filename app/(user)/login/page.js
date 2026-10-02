"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Connect your login API here.
      console.log("Login data:", formData);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side - Illustration */}
        <div className="relative hidden items-center justify-center overflow-hidden bg-teal-50 p-10 dark:bg-slate-900 lg:flex">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/30" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-900/20" />

          <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white xl:text-4xl">
                Welcome back!
              </h2>

              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
                Sign in to access your account and continue where you left off.
              </p>
            </div>

            <div className="relative aspect-square w-full max-w-md">
              <Image
                src="/images/login-illustration.png"
                alt="Person working on a laptop with digital security elements"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
              />
            </div>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Simple, secure, and seamless access.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile Heading */}
            <div className="mb-8 text-center lg:text-left">
              <span className="text-xs font-extrabold uppercase tracking-[3px] text-teal-600 dark:text-teal-400">
                Welcome Back
              </span>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Login to your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Enter your credentials to access your account.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                      className="absolute inset-y-0 right-4 flex items-center text-teal-600 hover:text-teal-700 dark:text-teal-400"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 accent-teal-600 focus:ring-teal-500"
                  />

                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    Remember me
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400"
                  >
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400"
                >
                  Create account
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Secure access to your account.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;