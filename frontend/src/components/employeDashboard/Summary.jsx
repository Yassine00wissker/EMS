import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
function SummaryCard(){

    const {user} = useAuth()
return(
    <div className="card shadow-sm rounded p-1 bg-light">
            <div className="d-flex align-items-center">
                <div className="mr-3 p-3 rounded-circle text-white bg-primary" style={{fontSize: '2rem'}}>
                    <FaUser/>
                </div>
                <div>
                    <p className="font-weight-bold m-2">Welcome back</p>
                    <p className="h6 m-1">{user.name}</p>
                </div>
            </div>
        </div>
)
}
export default SummaryCard