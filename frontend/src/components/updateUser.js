import React, { useState } from 'react';
import { TextField, Typography, Box, Button, CardContent, Card } from '@mui/material';
import axios from 'axios';

const UpdateUser = () => {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    console.log("In the function after definition")
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("In handleUpdate function")
        const updatedData = {};
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;

        try{
            console.log(updatedData);
            await axios.put(`http://127.0.0.1:8000/users/${userId}`, updatedData);
            setMessage("User updated successfully"); 
        } catch (error) {
            setMessage("Error updating user");
        }
    };
    return (
        <Card elevation={3}>
            <CardContent>
                <Box component="form" onSubmit={handleUpdate} sx={{ mt:2}}>
                    <Typography variant="h5"> Update User</Typography>
                    <TextField
                    label="User ID"
                    variant="outlined"
                    value={userId}
                    onChange={(e) =>setUserId(e.target.value)}
                    fullWidth
                    margin="normal"
                    />
                    <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    />
                    <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit">Update User</Button>
                    {message && (
                        <Typography variant="subtitle1" sx={{ mt:2}} color='text.secondary'>{message}</Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default UpdateUser;