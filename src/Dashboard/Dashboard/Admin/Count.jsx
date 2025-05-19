import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const Count = () => {
    const [visitors, setVisitors] = useState([]);
    const [sortOrder, setSortOrder] = useState('oldest');
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/visitors?sort=${sortOrder}`)
            .then(res => {
                setVisitors(res.data.visitors);
            })
            .catch(err => console.log("Error:", err));
    }, [sortOrder]);

    // Today Date (YYYY-MM-DD)
    const todayDate = new Date().toISOString().slice(0, 10);

    // Filter today visitors
    const todayVisitors = visitors.filter(visitor => visitor.date === todayDate);

    const sortedVisitors = [...visitors].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else {
            return new Date(a.date) - new Date(b.date);
        }
    });

    return (
        <div className="container mx-auto my-10 px-4">
            <Helmet>
                <title>Visitors | EstateLink</title>
            </Helmet>
            <h2 className="text-4xl font-bold mb-2 text-center">Visitors Overview</h2>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 mb-6 gap-4">
                <div>
                    <p className="text-lg">Today's Visitors: <span className="font-semibold">{todayVisitors.length}</span></p>
                    <p className="text-lg">Total Visitors: <span className="font-semibold">{visitors.length}</span></p>
                </div>

                {/* Filter Button */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                        className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300"
                    >
                        <FaFilter />
                        {sortOrder === 'oldest' ? "Show Newest to Oldest" : "Show Oldest to Newest"}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-xs w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>IP Address</th>
                            <th className='text-center'>City</th>
                            <th className='text-center'>Country</th>
                            {/* <th className='text-center'>Date</th> */}
                            <th className='text-center'>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedVisitors.map((visitor, index) => (
                            <tr key={visitor._id}>
                                <th className='text-center'>{index + 1}</th>
                                <td className='text-center'>{visitor.ip}</td>
                                <td className='text-center'>{visitor.city}</td>
                                <td className='text-center'>{visitor.country}</td>
                                {/* <td className='text-center'>{visitor.date}</td> */}
                                <td className='text-center'>{visitor.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Count;