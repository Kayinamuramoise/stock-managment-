import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            login(response.data.token, response.data.username);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            
            {/* Left Side - Description */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative z-10">
                <div className="max-w-md px-8">
                    <div className="mb-8">
                        <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6">
                            <span className="text-5xl">📚</span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">Inventory Pro</h1>
                        <p className="text-xl text-indigo-100 leading-relaxed mb-6">
                            Manage your inventory with ease and efficiency
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/20 text-white">
                                    <span className="text-lg">✓</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Real-Time Tracking</h3>
                                <p className="text-indigo-100 text-sm mt-1">Track inventory changes instantly across your organization</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/20 text-white">
                                    <span className="text-lg">✓</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Detailed Reports</h3>
                                <p className="text-indigo-100 text-sm mt-1">Generate comprehensive insights and analytics on your inventory</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/20 text-white">
                                    <span className="text-lg">✓</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Secure & Fast</h3>
                                <p className="text-indigo-100 text-sm mt-1">Enterprise-grade security with lightning-fast performance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
                <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                            <span className="text-3xl">📚</span>
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">Welcome Back</h2>
                    <p className="mt-2 text-indigo-100">Sign in to manage your inventory</p>
                </div>
                <form className="mt-8 space-y-6 bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl" onSubmit={handleSubmit}>
                    {error && <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-center text-sm font-medium">{error}</div>}
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all transform hover:scale-105 shadow-lg"
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600 text-sm">Don't have an account? <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">Sign up</Link></p>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default Login;
