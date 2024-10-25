import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Home = ({ onLogout }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login'); // Redirect to login if token is missing
        } else {
            // Simulate loading effect
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000); // 3 seconds loading time

            return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        onLogout();
        navigate('/login'); // Redirect to login page
    };

    if (loading) {
        return (
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        );
    }

    // Dummy attendance data
    const attendanceData = [
        { studentName: 'John Doe', date: '2024-10-01', status: 'Present', comments: 'N/A' },
        { studentName: 'Jane Smith', date: '2024-10-01', status: 'Absent', comments: 'Sick' },
        { studentName: 'Sam Brown', date: '2024-10-01', status: 'Present', comments: 'N/A' },
        { studentName: 'Alice Johnson', date: '2024-10-01', status: 'Late', comments: 'Traffic' },
        { studentName: 'Bob Lee', date: '2024-10-01', status: 'Present', comments: 'N/A' },
    ];

    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <h1 className="text-xl">Attendance System</h1>
                <div>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </nav>
            <div className="p-4">
                <h1 className="text-3xl mb-6">Welcome to Attendance System</h1>
                <Table>
                    <TableCaption>A list of student attendance records.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Comments</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.studentName}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.comments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

// PropTypes validation
Home.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Home;
