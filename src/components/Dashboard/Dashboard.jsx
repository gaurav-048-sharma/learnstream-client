import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../ui/button';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/show/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl">Welcome, {user.name}!</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Role: {user.role}</p>
                    <p>Verified: {user.isVerified ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;