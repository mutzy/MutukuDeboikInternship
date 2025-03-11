"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard"); // Redirect if user is logged in
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        console.log("Login failed");
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Prevent rendering login form while checking session
  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      {/* Left Section - Image & Text */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 relative items-center justify-center p-10">
        <div className="relative z-10 text-white text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
          <p className="text-sm">Login to continue accessing your account.</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Don't have an account? <Link href="/register" className="text-green-500 font-semibold">Sign up</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-lg p-3 w-full"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border rounded-lg p-3 w-full"
            />

            <button type="submit" className="bg-green-500 text-white font-semibold py-3 rounded-lg w-full hover:bg-green-600">
              Sign In
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By signing in, you agree to our <a href="#" className="text-green-500">Terms</a> and <a href="#" className="text-green-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
