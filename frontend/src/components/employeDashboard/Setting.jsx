import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

function Setting() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error on new submission

        if (setting.newPassword !== setting.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            console.log("Sending request to API...");
            console.log("Request Data:", setting);

            const response = await axios.put(
                "http://localhost:3000/api/setting/change-password",
                setting,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );

            console.log("Response:", response.data);

            if (response.data.success) {
                setError(""); // Clear error message
                navigate("/admin-dashboard/employees");
            } else {
                setError("Password change failed. Please try again.");
            }
        } catch (error) {
            console.error("Error Response:", error.response);
            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "An unexpected error occurred. Please try again."
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>Change Password</h3>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Old Password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        className="form-control"
                                        placeholder="Enter Old Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="form-control"
                                        placeholder="Enter New Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm New Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
