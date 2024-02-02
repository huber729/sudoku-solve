"use client"

export default function Input() {

    return (
        <div className="grid-container">
            {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="grid-container">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="grid-small-border">
                            <input className="grid-item"/>   
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}