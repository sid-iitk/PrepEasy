import React, { useState, useEffect } from "react";
import './Question.css'

const Question = ({ display, isAdmin }) => {
  const [items, setItems] = useState([]);
  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    update();
  }, []);

  const getAndUpdate = () => {
    const title = document.getElementById("title").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;
    const correctans = document.getElementById("correctans").value;

    const newItem = [
      title,
      option1,
      option2,
      option3,
      option4,
      correctans
    ];

    let updatedItems = [];

    if (localStorage.getItem("quesJson") === null) {
      updatedItems = [newItem];
    } else {
      const existingItems = JSON.parse(localStorage.getItem("quesJson"));
      updatedItems = [...existingItems, newItem];
    }

    localStorage.setItem("quesJson", JSON.stringify(updatedItems));
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

  return (
    <div>
      {isAdmin && (
        <div className="question-section">
          <div className="question-heading">Add question</div>

          <div className="question-inputs">
            <label htmlFor="title">Question</label>
            <input type="text" id="title" aria-describedby="emailHelp" />
          </div>

          <div className="question-inputs">
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
              correct option (type 1, 2, 3, or 4, only one correct)
            </label>
            <input type="text" id="correctans" />
          </div>

          <div className="question-buttons">
            <button id="add" onClick={getAndUpdate}>
              Add
            </button>
            <button id="clear" onClick={clearStorage}>
              Clear all
            </button>
          </div>
        </div>
      )}

      <div id="items" style={{ display: display ? "" : "none" }}>
        <div className="question-heading">Questions</div>
        <table className="question-table">
          <thead>
            <tr>
              <th scope="col">S No</th>
              <th scope="col">Question</th>
              <th scope="col">Option 1</th>
              <th scope="col">Option 2</th>
              <th scope="col">Option 3</th>
              <th scope="col">Option 4</th>
              <th scope="col">Answer</th>
              <th scope="col">Check answer</th>
              <th scope="col">Result</th>
              {isAdmin && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((element, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element[0]}</td>
                <td>{element[1]}</td>
                <td>{element[2]}</td>
                <td>{element[3]}</td>
                <td>{element[4]}</td>
                <td>
                  <label>type answer here</label>
                  <input type="text" id={`answer-${index}`} />
                </td>
                <td>
                  <button
                    onClick={() => {
                      let newanswer = [...answers];
                      if (
                        element[5] ===
                        document.getElementById(`answer-${index}`).value
                      ) {
                        newanswer[index] = "correct";
                        setAnswer(newanswer);
                      } else {
                        newanswer[index] = "wrong";
                        setAnswer(newanswer);
                      }
                    }}
                  >
                    check answer
                  </button>
                </td>
                <td>{answers[index]}</td>

                {isAdmin&&<td>
                  <button onClick={() => deleted(index)}>Delete</button>
                </td>
}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Question;
