import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {

    const storedUser = useLoaderData();
    const { _id, name, email, address } = storedUser;


    const [user, setUser] = useState(storedUser);


    const handleUpdateUser = (event) => {
        event.preventDefault();
        console.log(user);

        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {
                    alert("user updated successfully");
                    console.log(data)
                    // event.target.reset()
                }

            })

    }

    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[fieldName] = value;
        setUser(newUser);
    }


    return (
        <div>
            <h3>Previous User Info of {name}</h3>
            <div>
                <p>User ID: {_id}</p>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
            </div>

            <h3>Please Update</h3>


            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} type="text" placeholder='enter name' name='name' required defaultValue={name} />
                <br /> <br />
                <input onChange={handleInputChange} type="text" placeholder='enter address' name='address' required defaultValue={address} />
                <br /> <br />
                <input onChange={handleInputChange} type="email" name='email' placeholder='enter email' required defaultValue={email} />
                <br /> <br />
                <button type="submit">Update User</button>
            </form>

        </div>
    );
};

export default Update;