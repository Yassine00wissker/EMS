import React from 'react'

function SummaryCard({ icon, text, number, color }) {
    return(
        <div className="card shadow-sm rounded p-1 bg-light">
            <div className="d-flex align-items-center">
                <div className="mr-3 p-3 rounded-circle text-white" style={{fontSize: '2rem', backgroundColor:`${color}`}}>
                    {icon}
                </div>
                <div>
                    <p className="font-weight-bold m-2">{text}</p>
                    <p className="h6 m-1">{number}</p>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard
