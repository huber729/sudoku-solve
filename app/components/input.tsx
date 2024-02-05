"use client"
import { useState } from "react";
import Solver from "./solver";

export default function Input() {

    const [inputs, setInputs] = useState(Array(9).fill(null).map(() => Array(9).fill('')));
    const [submit, setSubmit] = useState(false);

    const handleInput = (row: number, col: number, value: string) => {
        if (value === '' || (value.length === 1 && /^[1-9]$/.test(value))) {
            const newInputs = [...inputs];
            newInputs[row][col] = value;
            setInputs(newInputs);
        };
    }

    const resetInputs = () => {
        setInputs(Array(9).fill(null).map(() => Array(9).fill('')));
    }

    const toggleSubmit = () => {
        setSubmit(!submit);
    }

    return (
        <div>
            {!submit ? <div className="grid-container">
                {inputs.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-container">
                        {row.map((cell, colIndex) =>
                            <div key={colIndex} className="grid-small-border">
                                <input 
                                    className="grid-item"
                                    value={cell}
                                    onChange={(e) => handleInput(rowIndex, colIndex, e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div> : <Solver inputs={inputs}/>}
            <div className="center">
                {!submit ? <button className="button" onClick={toggleSubmit}>
                    Solve</button>: 
                <button className="button" onClick={toggleSubmit}>Change Values</button>}
                {!submit ? <button className="button" onClick={resetInputs}>Clear Inputs</button>:null}
            </div>
        </div>
    )
}