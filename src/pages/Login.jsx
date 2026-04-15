import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-700 rounded-lg shadow-2xl p-8 border border-zinc-600">
          <h1 className="text-3xl font-bold text-amber-50 mb-8 text-center">Login</h1>

          {error && (
            <div className="mb-6 p-3 bg-red-900 border border-red-700 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-amber-50 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-600 border border-zinc-500 rounded text-amber-50 placeholder-zinc-400 focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-amber-50 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-600 border border-zinc-500 rounded text-amber-50 placeholder-zinc-400 focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded font-medium transition ${
                loading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-600 text-zinc-900 hover:bg-yellow-500 active:bg-yellow-700'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-zinc-300 text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-yellow-500 hover:text-yellow-400 font-medium transition"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
