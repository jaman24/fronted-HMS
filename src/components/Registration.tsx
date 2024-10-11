import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const navigate = useNavigate(); // Add this hook

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form from submitting by default

        // Validate password confirmation
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const userData = { fullname, email, phone, password };

        try {
            const response = await fetch("http://192.168.0.110:8000/auth/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userData, full_name: userData.fullname }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const result = await response.json();
            setSuccess("Registration successful!");

            // Set the token in local storage
            if (result.token) {
                localStorage.setItem("authToken", result.token); // Store the token
            }

            // Redirect to the login page
            navigate("/login");

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message); // Now we are sure it's an instance of Error
            } else {
                setError("An unknown error occurred."); // Fallback for other types
            }
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Registration</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        placeholder="Enter your full name"
                        required
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter your phone number"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <div className="mt-3">
                <p>Already have an account? <a href="/login">Login here</a>.</p>
            </div>
        </div>
    );
};

export default Registration;
