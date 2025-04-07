import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email,
                password
            });
            
            if (response.status === 200) {
                setShowOtpInput(true);
            }
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.error || 'Login failed');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
                email,
                otp
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Login and verification successful!');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.error || 'OTP verification failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">
                    {showOtpInput ? 'Verify OTP' : 'Login'}
                </h2>
                {!showOtpInput ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email (Gmail only)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full">Verify OTP</Button>
                    </form>
                )}
                <p className="text-center">
                    Don't have an account?{' '}
                    <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;