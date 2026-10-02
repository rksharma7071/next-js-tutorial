"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please accept the Terms and Conditions.");
      return;
    }

    try {
      setLoading(true);

      // Connect your registration API here.
      console.log("Registration data:", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <section className="grid min-h-screen lg:grid-cols-2">

        <div className="relative hidden items-center justify-center overflow-hidden bg-teal-50 p-10 dark:bg-slate-900 lg:flex">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/30" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-900/20" />

          <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white xl:text-4xl">Start your journey with us</h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">Create your account and enjoy a simple, secure, and seamless experience.</p>
            </div>

            <div className="relative aspect-square w-full max-w-md">
              <Image
                src="/images/login-illustration.png"
                alt="Person using a laptop with digital security elements"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
              />
            </div>

            <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">Your account. Your workspace. Your possibilities.</p>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <span className="text-xs font-extrabold uppercase tracking-[3px] text-teal-600 dark:text-teal-400">Create Account</span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Join us today</h1>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Create your account to get started with us.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute inset-y-0 right-4 flex items-center text-teal-600 hover:text-teal-700 dark:text-teal-400"
                    >
                      {showPassword ? (<FaEyeSlash size={18} />) : (<FaEye size={18} />)}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">Use at least 8 characters.</p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-teal-600 focus:ring-teal-500"
                  />

                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm leading-5 text-slate-600 dark:text-slate-400"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400">Terms and Conditions</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400">Privacy Policy</Link>.
                  </label>
                </div>

                {error && (<p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">{error}</p>)}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">Already have an account?{" "}<Link href="/login" className="font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400">Sign in</Link></p>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">Join us and start building something great.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;