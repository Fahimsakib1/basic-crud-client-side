import React, { useEffect } from 'react';
import { useState } from 'react';

const AddUsers = () => {

    const [user, setUser] = useState({});

    const handleAddUser = (event) => {
        event.preventDefault();

        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        .then(res => res.json())
        .then(data => {
            
            if(data.acknowledged){
                console.log(data)
                alert('User Added Successfully');
                event.target.reset();
            }
        })

    }

    const handleInputBlur = (event) => {
        const fieldName = event.target.name;
        const value = event.target.value;

        const newUser = { ...user };
        newUser[fieldName] = value;
        setUser(newUser)

    }


    return (
        <div>
            <h2>Please Add a new User</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type="text" placeholder='enter name' name='name' required />
                <br /> <br />
                <input onBlur={handleInputBlur} type="text" placeholder='enter address' name='address' required />
                <br /> <br />
                <input onBlur={handleInputBlur} type="email" name='email' placeholder='enter email' required />
                <br /> <br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUsers;