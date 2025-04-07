import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('customer');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/signup`, {
                name,
                email,
                password,
                phone,
                role
            });
            
            if (response.status === 201) {
                setShowOtpInput(true);
            }
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.error || 'Signup failed');
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
                alert('Signup and verification successful!');
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
                    {showOtpInput ? 'Verify OTP' : 'Sign Up'}
                </h2>
                {!showOtpInput ? (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            type="email"
                            placeholder="Email (Gmail only)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="tel"
                            placeholder="Phone (10 digits)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            pattern="\d{10}"
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                            <option value="seller">Seller</option>
                        </select>
                        <Button type="submit" className="w-full">Sign Up</Button>
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
                    Already have an account?{' '}
                    <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;