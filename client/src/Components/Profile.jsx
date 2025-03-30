import React, { useState, useEffect } from "react";
import axios from "axios";
import AppNavbar from '../Components/User/Navbar';  // Import Navbar component
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';  // Bootstrap components

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedData, setUpdatedData] = useState({ username: "", email: "" });

    // Check if adminToken is available; otherwise, use userToken
    const token = localStorage.getItem("userToken") || localStorage.getItem("userToken");
    const isAdmin = localStorage.getItem("userToken") ? true : false;

    useEffect(() => {
        if (!token) {
            setError("No token found. Please log in.");
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/users/profile", {
                    headers: { "x-access-token": token },
                });
                setUser(response.data.data);
                setUpdatedData({ username: response.data.data.username, email: response.data.data.email });
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    // Update profile
    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put("http://localhost:5000/api/v1/users/update", updatedData, {
                headers: { "x-access-token": token },
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update profile");
        }
    };

    // Update password
    const handleUpdatePassword = async (oldPassword, newPassword) => {
        try {
            const response = await axios.put("http://localhost:5000/api/v1/users/updatePassword", {
                oldPassword,
                newPassword,
            }, {
                headers: { "x-access-token": token },
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update password");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <AppNavbar /> {/* Add Navbar here */}
            <Container className="mt-4">
                <Row>
                    <Col md={12}>
                        <Card className="shadow-lg p-4 rounded">
                            <Card.Body>
                                <h2 className="text-center mb-4">User Profile</h2>
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>User Type:</strong> {user.usertype}</p>

                                <hr />
                                <h3>Update Profile</h3>
                                <Form>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={updatedData.username} 
                                            onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })} 
                                            placeholder="Enter new username"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            value={updatedData.email} 
                                            onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })} 
                                            placeholder="Enter new email"
                                        />
                                    </Form.Group>

                                    <Button 
                                        variant="primary" 
                                        onClick={handleUpdateProfile} 
                                        className="mt-3 w-100"
                                    >
                                        Update Profile
                                    </Button>
                                </Form>

                                <hr />
                                <h3>Change Password</h3>
                                <Form>
                                    <Form.Group controlId="oldPassword">
                                        <Form.Label>Old Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Old Password"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="newPassword">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="New Password"
                                        />
                                    </Form.Group>

                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleUpdatePassword(document.getElementById("oldPass").value, document.getElementById("newPass").value)} 
                                        className="mt-3 w-100"
                                    >
                                        Change Password
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
