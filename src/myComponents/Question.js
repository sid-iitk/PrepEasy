import React, { useState, useEffect } from "react";

const Question = ({display}) => {
    const [items, setItems] = useState([]);
    const [answers, setAnswer] = useState([]);

    useEffect(() => {
        update();
    }, []);

    const getAndUpdate = () => {
        const title = document.getElementById("title").value;
        const answerType = document.getElementById("answerType").value;
        const option1 = document.getElementById("option1").value;
        const option2 = document.getElementById("option2").value;
        const option3 = document.getElementById("option3").value;
        const option4 = document.getElementById("option4").value;
        const correctans = document.getElementById("correctans").value;
        const lowerBound = document.getElementById("lowerBound").value;
        const upperBound = document.getElementById("upperBound").value;

        const item = [title, answerType, option1, option2, option3, option4, correctans, lowerBound, upperBound];
        let quesJsonArray = [];

        if (localStorage.getItem("quesJson") === null) {
            quesJsonArray.push(item);
            localStorage.setItem("quesJson", JSON.stringify(quesJsonArray));
        } else {
            const quesJsonArrayStr = localStorage.getItem("quesJson");
            quesJsonArray = JSON.parse(quesJsonArrayStr);
            quesJsonArray.push(item);
            localStorage.setItem("quesJson", JSON.stringify(quesJsonArray));
        }
        update();
    };

    const update = () => {
        let quesJsonArray = [];

        if (localStorage.getItem("quesJson") === null) {
            quesJsonArray = [];
            localStorage.setItem("quesJson", JSON.stringify(quesJsonArray));
        } else {
            const quesJsonArrayStr = localStorage.getItem("quesJson");
            quesJsonArray = JSON.parse(quesJsonArrayStr);
        }

        setItems(quesJsonArray);
    };

    const deleted = (itemIndex) => {
        const quesJsonArrayStr = localStorage.getItem("quesJson");
        let quesJsonArray = JSON.parse(quesJsonArrayStr);
        quesJsonArray.splice(itemIndex, 1);
        localStorage.setItem("quesJson", JSON.stringify(quesJsonArray));
        update();
    };

    const clearStorage = () => {
        if (window.confirm("Do you really want to clear?")) {
            localStorage.clear();
            update();
        }
    };
    const style={"display": display?"":"none"};
    return (
        <div>

            <div >
                <div>Add question</div>
                <div>
                    <label htmlFor="title">Question</label>
                    <input type="text" id="title" aria-describedby="emailHelp" />
                </div>
                <div>
                    <label htmlFor="answerType">Answer Type</label>
                    <select id="answerType">
                        <option value="mcq">Multiple Choice</option>
                        <option value="numerical">Numerical</option>
                    </select>

                    {/* MCQ */}
                    For MCQ type question<br></br>
                    <div id="mcqOptions">
                        <label htmlFor="description">Option 1</label>
                        <input type="text" id="option1" />
                        <label htmlFor="description">Option 2</label>
                        <input type="text" id="option2" />
                        <label htmlFor="description">Option 3</label>
                        <input type="text" id="option3" />
                        <label htmlFor="description">Option 4</label>
                        <input type="text" id="option4" />
                        <br />
                        <label htmlFor="description">
                            Correct option (type 1, 2, 3, or 4, only one correct)
                        </label>
                        <input type="text" id="correctans" />
                    </div>

                    {/* Numerical range */}
                    For Numberical type question only<br></br>
                    <div id="numericalRange">
                        <label htmlFor="lowerBound">Lower Bound</label>
                        <input type="text" id="lowerBound" />
                        <label htmlFor="upperBound">Upper Bound</label>
                        <input type="text" id="upperBound" />
                    </div>

                </div>             

                {/* Add and clear buttons */}
                <button id="add" onClick={getAndUpdate}>
                    Add
                </button>
                <button id="clear" onClick={clearStorage}>
                    Clear all
                </button>

                <div id="items" style={style}>
                    <div>Questions</div>
                    <table border="">
                        <thead>
                            <tr>
                                <td scope="col">S No</td>
                                <td scope="col">Question</td>
                                <td scope="col">Options</td>
                                <td scope="col">Answer</td>
                                <td scope="col">Check answer</td>
                                <td scope="col">Result</td>
                                <td scope="col">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((element, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element[0]}</td>
                                    <td>
                                        {element[1] === "numerical" ? (
                                            <>
                                                Numerical Type
                                            </>
                                        ) : (
                                            <>
                                                Option 1: {element[2]}, Option 2: {element[3]}, Option
                                                3: {element[4]}, Option 4: {element[5]}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <label>type answer here</label>
                                        <input type="text" id={`answer-${index}`} />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                let newanswer=[...answers]
                                                    console.log(document.getElementById(`answer-${index}`).value)
                                                    if(element[1]==="numerical")
                                                    {
                                                        if(parseFloat(element[7]) > parseFloat(document.getElementById(`answer-${index}`).value) || parseFloat(element[8]) < parseFloat(document.getElementById(`answer-${index}`).value))
                                                        {
                                                            newanswer[index]="wrong"
                                                            setAnswer(newanswer)
                                                        }
                                                        else
                                                        {
                                                            newanswer[index]="correct"
                                                            setAnswer(newanswer)
                                                        }
                                                    }

                                                    else
                                                    {
                                                        if(element[6]===document.getElementById(`answer-${index}`).value)
                                                        {
                                                            newanswer[index]="correct"
                                                            setAnswer(newanswer)
                                                        }
                                                        else
                                                        {
                                                            newanswer[index]="wrong"
                                                            setAnswer(newanswer)
                                                        }
                                                    }
                                                    
                                                }}
                                        >
                                            check answer
                                        </button>                                            
                                    </td>
                                    <td>
                                        <div>
                                            {
                                                answers[index]
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => deleted(index)}
                                            >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Question;

// if(element[4]===document.getElementById(`answer-${index}`).value)
// {
//     const newanswer=answers
//     newanswer[index]="correct"
//     setAnswer(newanswer)
// }
// else
// {
//     const newanswer=answers
//     newanswer[index]="correct"
//     setAnswer(newanswer)
// }