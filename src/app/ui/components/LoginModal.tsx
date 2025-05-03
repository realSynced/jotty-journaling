"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/login/action";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // For login, use the server action
      const response = await login(undefined, email, password);
      console.log("Response: ", response);

      if (response.toString().includes("Invalid")) {
        setError(response);
        setLoading(false);
        return;
      } else if (response === "DNE") {
        setError("User does not exist. Please sign up first.");
        setLoading(false);
        return;
      }

      // If we got here, login was successful
      if (!response) {
        setLoading(false);
        router.refresh();
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div
        className="relative bg-cream rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all"
        style={{ boxShadow: "0 10px 25px -5px rgba(212, 163, 115, 0.3)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-caramel hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal header */}
        <div className="text-center mb-6">
          <h2
            className="text-4xl font-bold text-caramel"
            style={{ WebkitTextStroke: "0.05px black" }}
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-gray-600">Sign in to continue journaling</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-caramel mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-jotty-sage rounded-lg focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-caramel mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-jotty-sage rounded-lg focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-3 bg-caramel hover:bg-caramel/75 text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors shadow-md disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Toggle between sign in and sign up */}
          <div className="text-center mt-4 text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="ml-2 text-caramel hover:underline focus:outline-none"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {/* Forgot password */}
          {!isSignUp && (
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-caramel focus:outline-none"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
