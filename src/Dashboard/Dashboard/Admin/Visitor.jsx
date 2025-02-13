import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Visitor = () => {

    const [visitData, setVisitData] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosSecure = useAxiosSecure(); // Use axiosSecure instance for secure API calls

    useEffect(() => {
        const fetchVisitData = async () => {
            try {
                const response = await axiosSecure.get("/admin/visit-data");  // Make secure request
                setVisitData(response.data.data);
            } catch (error) {
                console.error("Error fetching visit data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Total Visits</th>
                        <th>Daily Visits</th>
                        <th>First Visit</th>
                        <th>Last Visit</th>
                        <th>IP Addresses</th>
                    </tr>
                </thead>
                <tbody>
                    {visitData.map((data) => (
                        <tr key={data._id}>
                            <td>{data._id}</td>
                            <td>{data.totalVisits}</td>
                            <td>{data.dailyVisits}</td>
                            <td>{new Date(data.firstVisit).toLocaleString()}</td>
                            <td>{new Date(data.lastVisit).toLocaleString()}</td>
                            <td>{data.ipAddresses.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Visitor;