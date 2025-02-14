import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                navigate(response.data.user.role === "admin" ? "/admin-dashboard" : "/employee-dashboard");
            }
        } catch (error) {
            setError(error.response?.data?.error || "Server Error. Please try again later.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-light min-vh-100 w-100">
            <div className="bg-white shadow-lg p-4 rounded" style={{ width: "350px" }}>
                <h2 className="text-center">Login</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 position-relative">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
