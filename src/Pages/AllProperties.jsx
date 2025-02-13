import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaSearch, FaSortAmountDown } from 'react-icons/fa';

const AllProperties = () => {
    const axiosSecure = useAxiosSecure();
    const [searchLocation, setSearchLocation] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/status/verified`);
            return res.data;
        }
    });

    // Filter properties based on search input
    const filteredProperties = properties.filter(item =>
        item.property_location.toLowerCase().includes(searchLocation.toLowerCase())
    );

    // Sort properties based on price range
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        const priceA = a.price_range.minimum_price;
        const priceB = b.price_range.minimum_price;
        return sortOrder === 'asc' ? priceA - priceB : sortOrder === 'desc' ? priceB - priceA : 0;
    });

    return (
        <div className='container mx-auto px-4 py-6'>
            <h1 className="text-4xl font-bold mb-10 text-center">All Properties</h1>

            {/* Search Input & Sort Dropdown */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search by location..."
                        className="input input-bordered w-full pl-10"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>
                <div className="relative w-full md:w-1/4">
                    <select
                        className="select select-bordered w-full pl-10"
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Sort by Price</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                    <FaSortAmountDown className="absolute left-3 top-3 text-gray-500" />
                </div>
            </div>

            {/* No Data Message */}
            {sortedProperties.length === 0 && (
                <p className="text-center text-red-500 text-lg font-semibold">No properties found. Try a different search or sorting option.</p>
            )}


            {/* Properties Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {sortedProperties.map(item => (
                    <div key={item._id} className="card border border-gray-200 bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
                        <div className='relative flex justify-center pt-5'>
                            <img
                                src={item.agent_image}
                                alt={item.agent_name}
                                className="rounded-full border-4 border-green-400 w-16 h-16 shadow-md"
                            />
                        </div>

                        <figure className="px-5 pt-5">
                            <img
                                src={item.property_image}
                                alt={item.property_title}
                                className="rounded-lg w-full h-52 object-cover"
                            />
                        </figure>

                        <div className="card-body px-5 py-4">
                            <h2 className="text-xl font-semibold text-gray-800">{item.property_title}</h2>
                            <p className="text-gray-600"><span className='font-medium'>Location:</span> {item.property_location}</p>
                            <p className="text-gray-600"><span className='font-medium'>Agent Name:</span> {item.agent_name}</p>
                            <p className="text-gray-600"><span className='font-medium'>Price Range:</span> ${item.price_range.minimum_price} - ${item.price_range.maximum_price}</p>
                            <p className="text-green-500 font-medium border border-green-500 rounded-full text-center px-3 py-1 inline-block text-sm">
                                {item.verification_status}
                            </p>
                            <div className="card-actions mt-4">
                                <Link to={`/propertyDetails/${item._id}`} className="w-full">
                                    <button className="btn bg-green-500 text-white hover:bg-green-600 transition w-full py-2 rounded-lg">Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;
