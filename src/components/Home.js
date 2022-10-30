import React, { useDeferredValue, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData()
    const [displayUsers, setDisplayUsers] = useState(users);


    const handleDelete = (_id, user) => {

        // console.log("User Name",user.name, "and ID: ",_id);

        const agree = window.confirm(`Are you sure you want to delete ${user.name}`);

        if (agree) {
            // console.log(`Deleting ${user.name} with ID: ${user._id}`)

            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data)
                    if (data.deletedCount > 0) {
                        const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUsers);
                        alert('User deleted successfully')
                    }

                })



        }
    }




    return (
        <div>
            <h2> This is Users Data fetched from Server Side</h2>
            <h4> Total Users: {displayUsers.length}</h4>

            <div>
                {
                    displayUsers.map(user => <h4 key={user._id}>Name: {user.name} Email: {user.email} Address: {user?.address}

                        <Link to={`update/${user._id}`}>
                            <button
                                style={
                                    { backgroundColor: "blue", color: 'white' }
                                }>
                                Update
                            </button>
                        </Link>


                        <button
                            onClick={() => handleDelete(user._id, user)}
                            style={
                                { backgroundColor: "red", color: 'white' }
                            }>Delete</button>

                    </h4>)
                }
            </div>
        </div>
    );
};

export default Home;