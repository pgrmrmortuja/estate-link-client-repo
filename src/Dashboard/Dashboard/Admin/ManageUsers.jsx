import React from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    // Fetch all products
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data;
        },
    });

    console.log(users);


    const handleRoleChange = async (id, role) => {

        const usersRes = await axiosSecure.patch(`/user-role/${id}`, { role: role });

        console.log("Response for Role from API:", usersRes.data);


        if (usersRes.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Role changed to ${role}`,
                showConfirmButton: false,
                timer: 1500
            });


            if (role === "Fraud" && usersRes.data.deletedProperties > 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Agent Marked as Fraud!",
                    text: `And his ${usersRes.data.deletedProperties} properties have been removed.`,
                    confirmButtonColor: "#d33",
                    confirmButtonText: "OK"
                });
            }



        } else {
            Swal.fire({
                icon: "info",
                title: "No Changes Made",
                text: "The role was already the same.",
            });
        }

    }

    const handleDelete = (id, uid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                console.log("user delete from firebase.");

                axiosSecure.delete(`/remove-user/${id}?uid=${uid}`)
                    .then(res => {
                        if (res.data.success) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }



    return (
        <div className="container mx-auto my-10 px-4">
            <h1 className="text-4xl font-bold mb-10 text-center">Manage Users</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>User Name</th>
                            <th className='text-center'>User Email</th>
                            <th className='text-center'>Actions</th>
                            <th className='text-center'>Remove User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>



                                <td className='text-center flex justify-center items-center gap-3'>
                                    <div>
                                        {
                                            (user.role === "User" || user.role === "Agent" || user.role === !"Fraud") ?
                                                (
                                                    <button
                                                        className='btn  bg-green-500 text-black hover:text-green-400 border-none '
                                                        onClick={() => handleRoleChange(user._id, 'Admin')}>
                                                        Make Admin
                                                    </button>
                                                )
                                                :
                                                (
                                                    user.role === "Admin" &&
                                                    <span className='text-green-400 border-2 border-green-400 rounded-xl p-2'>{user.role}</span>
                                                )
                                        }
                                    </div>



                                    <div>
                                        {
                                            (user.role === "User" || user.role === "Admin") ?
                                                (
                                                    <button
                                                        className='btn  bg-blue-500 text-black hover:text-blue-400 border-none '
                                                        onClick={() => handleRoleChange(user._id, 'Agent')}>
                                                        Make Agent
                                                    </button>
                                                )
                                                :
                                                (
                                                    user.role === "Agent" &&
                                                    <span className='text-blue-500 border-2 border-blue-400 rounded-xl p-2'>{user.role}</span>
                                                )
                                        }
                                    </div>


                                    <div>
                                        {
                                            (user.role === "User" || user.role === "Agent") ?
                                                (
                                                    <button
                                                        className='btn  bg-yellow-500 text-black hover:text-yellow-400 border-none'
                                                        onClick={() => handleRoleChange(user._id, 'Fraud')}>
                                                        Make as Fraud
                                                    </button>
                                                )
                                                :
                                                (
                                                    user.role === "Fraud" &&
                                                    <span className='text-yellow-600 border-2 border-yellow-400 rounded-xl p-2'>{user.role}</span>
                                                )
                                        }
                                    </div>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id, user.uid)}
                                        className="btn  bg-red-500 text-black hover:text-red-400 border-none">Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;