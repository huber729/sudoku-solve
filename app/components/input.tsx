"use client"
import { useState, useEffect } from "react";
import Solver from "./solver";
import { randomInt } from "crypto";

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

    //
    // const checkForDuplicates = (matrix: any[][]): boolean => {

    //     let duplicates = new Set();
    //     console.log("DUPE", duplicates)

    //     for (let i = 0; i < 9; i++) {
    //         let boxMap = new Map();
    //         for (let j = 0; j < 9; j++) {
    //             const boxVal = matrix[i][j];
    //             const key = `${i}-${j}`;
    //             if (boxVal !== '') {
    //                 if (boxMap.has(boxVal)) {
    //                     duplicates.add(key);
    //                     let originalKeys = boxMap.get(boxVal);
    //                     originalKeys.forEach((originalKey: string) => {
    //                         duplicates.add(originalKey);
    //                     });
    //                     originalKeys.push(key);
    //                     boxMap.set(boxVal, originalKeys);
    //                 } else {
    //                     boxMap.set(boxVal, [key]);
    //                 }
    //             }
    //         }
    //     }

    //     for (let i = 0; i < 3; i++) {
    //         for (let j = 0; j < 3; j++) {
    //             if (isDuplicateInCol(matrix, i, j)) return true;
    //         }
    //     }

    //     for (let i = 0; i < 9; i += 3) {
    //         for (let j = 0; j < 9; j += 3) {
    //             if (isDuplicateInRow(matrix, i, j)) return true;
    //         }
    //     }
        
    //     return false;
    // }

    // const isDuplicateInCol = (matrix: any[][], startRow: number, startCol: number): Object => {
    //     let duplicates = new Set();
    //     console.log("YUT",duplicates)
    //     for (let i = startRow; i < 9; i+=3) {
    //         let colMap = new Map();
    //         for (let j = startCol; j < 9; j+=3) {
    //             const colVal = matrix[i][j];
    //             const key = `${i}-${j}`;
    //             if (colVal !== '') {
    //                 if (colMap.has(colVal)) {
    //                     duplicates.add(key);
    //                     let originalKeys = colMap.get(colVal);
    //                     originalKeys.forEach((originalKey: string) => {
    //                         duplicates.add(originalKey);
    //                     });
    //                     originalKeys.push(key);
    //                     colMap.set(colVal, originalKeys);
    //                 } else {
    //                     colMap.set(colVal, [key]);
    //                 }
    //             }                
    //         }
    //     }
    //     return duplicates;
    // }

    // const isDuplicateInRow = (matrix: any[][], startRow: number, startCol: number): boolean => {
    //     let rowSet = new Set();
    //     for (let i = startRow; i < startRow + 3; i++) {
    //         for (let j = startCol; j < startCol + 3; j++) {
    //             const rowVal = matrix[i][j];
    //             if (rowVal !== '' && rowSet.has(rowVal)) return true;
    //             rowSet.add(rowVal);
    //         }
    //     }
    //     return false;
    // }
    //

    const checkForDuplicates = (matrix: any[][]): boolean => {

        for (let i = 0; i < 9; i++) {
            let boxSet = new Set();
            for (let j = 0; j < 9; j++) {
                const boxVal = matrix[i][j];
                if (boxVal !== '' && boxSet.has(boxVal)) return true;
                boxSet.add(boxVal);
            }
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (isDuplicateInCol(matrix, i, j)) return true;
            }
        }

        for (let i = 0; i < 9; i += 3) {
            for (let j = 0; j < 9; j += 3) {
                if (isDuplicateInRow(matrix, i, j)) return true;
            }
        }
        
        return false;
    }

    const isDuplicateInCol = (matrix: any[][], startRow: number, startCol: number): boolean => {
        let colSet = new Set();
        for (let i = startRow; i < 9; i+=3) {
            for (let j = startCol; j < 9; j+=3) {
                const rowVal = matrix[i][j];
                if (rowVal !== '' && colSet.has(rowVal)) return true;
                colSet.add(rowVal);
            }
        }
        return false;
    }

    const isDuplicateInRow = (matrix: any[][], startRow: number, startCol: number): boolean => {
        let rowSet = new Set();
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                const rowVal = matrix[i][j];
                if (rowVal !== '' && rowSet.has(rowVal)) return true;
                rowSet.add(rowVal);
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
                        {row.map((col, colIndex) =>
                            <div key={colIndex} className="grid-small-border">
                                <input 
                                    className="grid-item"
                                    value={col}
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