import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaUser, FaLock } from 'react-icons/fa'; // Import icons from react-icons
import userProfileLogo from '@/assets/user-profile.png';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast(); // Hook for toast notifications

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json(); // Get the JSON response

        if (data.success) {
            localStorage.setItem('token', data.token); // Store the token
            onLogin(); // Call the onLogin prop to update the auth state
            toast({ title: 'Login successful!', description: 'Welcome back!', variant: 'success' });
            navigate('/home'); // Redirect to home page
        } else {
            toast({ title: 'Login failed', description: data.message, variant: 'error' });
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Card className="w-1/3">
                <CardHeader>
                    <img src={userProfileLogo} alt="User Profile Logo" className="mx-auto mb-4 w-20" />
                    <CardTitle className="text-2xl text-center">Welcome to Student Attendance Managing System</CardTitle>
                    <CardDescription>Enter your credentials to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="flex items-center border mb-4">
                            <FaUser className="ml-2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Username"
                                className="border-none p-2 w-full"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center border mb-4">
                            <FaLock className="ml-2 text-gray-500" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="border-none p-2 w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <CardFooter>
                            <Button type="submit" className="text-white w-full">
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

// PropTypes validation
Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;
