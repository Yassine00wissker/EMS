import React from "react";
import { useAuth } from "../../context/authContext";

function NavBar() {
    const { user, logout  } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning-subtle shadow-sm p-3 mb-4">
            <div className="container-fluid">
                <span className="navbar-brand fw-bold">Welcome, {user?.name}</span>

                <button className="btn btn-outline-danger ms-auto" onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
