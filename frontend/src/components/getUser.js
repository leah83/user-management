import React, { useState} from "react";
import axios from "axios";
import { Typography, Box, Button, TextField } from '@mui/material';

const GetUser = () => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");


    const handleInputChange = (event) => {
        setUserId(event.target.value); 
      };

    const handleGetUser = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`);
            setUser(response.data);
            setMessage("");
        } catch (error) {
            setMessage("User not found");
        }
    };

    return (
        <Box sx={{ mt:3 }}>
            <Typography variant="h5">Get User</Typography>
            <TextField
            label="User ID"
            variant="outlined"
            value = {userId}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb:2 }}
            />
            <Button variant="contained" color="primary" onClick={handleGetUser}>Get User</Button>
            {user && (
                <Box sx={{ mt:2 }}>
                    <Typography> ID: {user.id}</Typography>
                    <Typography> Name: {user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                </Box>
            )}
            {message && (
                <Typography variant="body1" sx={{ mt: 2}}>{message}</Typography>
            )}
        </Box>
    );
};

export default GetUser;