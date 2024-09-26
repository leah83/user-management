import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';

const CreateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://127.0.0.1:8000/users/", {
                name, 
                email,
            });
            setMessage(`User created with ID: ${response.data.id}`);
        } catch (error) {
            setMessage(" There was an error creating a new user");
        }
    };

    return (
        <Card elevation={3}>
            <CardContent>
             <Box component="form" onSubmit={handleSubmit} sx={{mt:2}}>
                <Typography variant="h5">Create User</Typography>
                 <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    />
                <Button variant="contained" color="primary" type="submit"> Create User </Button>
                {message && (
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 5}}>{message}</Typography>
                )}
          </Box>
            </CardContent>
        </Card>
        
    );
};

export default CreateUser;