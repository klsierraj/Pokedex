import { useState } from "react";
import { saveSession } from "../../auth";
import { useNavigate } from "react-router-dom";
import { LoginUseCase } from "../../core/application/use-cases/login.usecase";
import pokeball from "../../assets/pokeball.png";

export function LoginPage({ loginUseCase }: { loginUseCase: LoginUseCase }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const result = await loginUseCase.execute({ username, password });

      saveSession({
        token: result.token.value,
        username: result.user.username
      });

      navigate("/pokemons");
    } catch {
      setError("Login failed");
    }
  }

  return (
    <div className="min-h-screen w-full bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative pokeball background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          src={pokeball}
          alt="pokeball"
          className="w-96 h-96 object-contain"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-[0px_8px_24px_rgba(0,0,0,0.25)] p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
              <img
                src={pokeball}
                alt="pokeball"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-dark mb-2">Pokédex</h1>
            <p className="text-gray-medium text-sm">Sign in to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-background border-2 border-transparent rounded-xl text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-background border-2 border-transparent rounded-xl text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm font-medium text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-600 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
