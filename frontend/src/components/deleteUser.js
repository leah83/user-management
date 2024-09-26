import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Card, CardContent } from "@mui/material";

const DeleteUser = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/users/${userId}`);
      setMessage("User deleted successfully");
    } catch (error) {
      setMessage("Error deleting user");
    }
  };

  return (
    <Card elevation={3}>
        <CardContent>
            <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Delete User</Typography>
            <TextField
                label="User ID"
                variant="outlined"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt:2}}>
                Delete User
            </Button>
            {message && (
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                {message}
                </Typography>
            )}
            </Box>
        </CardContent>
    </Card>
  );
};

export default DeleteUser;
