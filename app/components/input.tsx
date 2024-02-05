"use client"
import { useState, useEffect } from "react";
import Solver from "./solver";

export default function Input() {

    const [inputs, setInputs] = useState(Array(9).fill(null).map(() => Array(9).fill('')));
    const [submit, setSubmit] = useState(false);
    const [hasDuplicates, setHasDuplicates] = useState(false);

    const handleInput = (row: number, col: number, value: string) => {
        if (value === '' || (value.length === 1 && /^[1-9]$/.test(value))) {
            const newInputs = [...inputs];
            newInputs[row][col] = value;
            setInputs(newInputs);
        };
    }

    useEffect(() => {
        setHasDuplicates(checkForDuplicates(inputs));
    }, [inputs]);

    const checkForDuplicates = (matrix: any[][]): boolean => {
        for (let i = 0; i < 9; i++) {
            let rowSet = new Set();
            let boxSet = new Set();
            for (let j = 0; j < 9; j++) {
                const rowVal = matrix[i][j];
                const boxVal = matrix[j][i];
                if (rowVal !== '' && rowSet.has(rowVal)) return true;
                if (boxVal !== '' && boxSet.has(boxVal)) return true;
                rowSet.add(rowVal);
                boxSet.add(boxVal);
            }
            for (let row = 0; row < 9; row += 3) {
                for (let col = 0; col < 9; col += 3) {
                    if (isDuplicateInSquare(matrix, row, col)) return true;
                }
            }
        }
        return false;
    }

    const isDuplicateInSquare = (matrix: any[][], startRow: number, startCol: number): boolean => {
        let squareSet = new Set<string>();
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                const val = matrix[i][j];
                if (val !== '' && squareSet.has(val)) return true;
                squareSet.add(val);
            }
        }
        return false;
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
                {!submit && hasDuplicates ? <button className="disabled-button" disabled={hasDuplicates}>
                    Solve</button>: !submit && !hasDuplicates ? <button className="button" onClick={toggleSubmit}>
                    Solve</button> :
                <button className="button" onClick={toggleSubmit}>Change Values</button>}
                {!submit ? <button className="button" onClick={resetInputs}>Clear Inputs</button>:null}
            </div>
        </div>
    )
}