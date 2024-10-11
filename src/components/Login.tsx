import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = { email, password };

        try {
            const response = await fetch("http://192.168.0.110:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const result = await response.json();
            setSuccess("Login successful!");

            // Optionally, store tokens in localStorage
            if (result.token) {
                localStorage.setItem("authToken", result.token); // Store the token
            }

            // Redirect to home page after successful login
            navigate("/"); // Redirect to path "/"

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Login</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
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
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>
            <div className="text-center mt-3">
                <a href="#">Forgot password?</a>
                <span className="mx-2">|</span>
                <a href="registration">Register</a>
            </div>
        </div>
    );
};

export default Login;
