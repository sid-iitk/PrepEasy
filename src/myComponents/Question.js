import React, { useState, useEffect } from "react";
import './Question.css';

const Question = ({ display }) => {
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

    const item = [title, option1, option2, option3, option4, correctans];
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

  const checkAnswer = (index) => {
    const userAnswer = document.getElementById(`answer-${index}`).value;
    const correctAnswer = items[index][5];

    let newAnswer = [...answers];
    if (userAnswer === correctAnswer) {
      newAnswer[index] = "correct";
    } else {
      newAnswer[index] = "wrong";
    }

    setAnswer(newAnswer);
  };

  const style = { display: display ? "" : "none" };
  return (
    <div >
      <div>
        <div class='addques'>
        <div><h2>Add a question</h2></div>

        <div>
          <label htmlFor="title">Question</label>
          <input
            type="text"
            id="title"
            aria-describedby="emailHelp"
          />
        </div>

        <div>
          <label htmlFor="description">Option 1</label>
          <input
            type="text"
            id="option1"
          />
          
          <label htmlFor="description">Option 2</label>
          <input
            type="text"
            id="option2"
          />
          <label htmlFor="description">Option 3</label>
          <input
            type="text"
            id="option3"
          />
          <label htmlFor="description">Option 4</label>
          <input
            type="text"
            id="option4"
          />
          <br />
          <label type="text">Enter correct option (type 1, 2, 3, or 4, only one correct)</label>
          <input type="text" id="correctans" />
        </div>
        
        <button
          id="add"
          onClick={getAndUpdate}
        >
          Add
        </button>
        <button
          id="clear"
          onClick={clearStorage}
        >
          Clear all
        </button>
        </div>


        <div id="items" style={style}>
          <div><h2>Questions</h2></div>
          {items.map((element, index) => (
            <div key={index} class='ques' >
              <div className="question">Ques{index+1}. {element[0]}</div>
              <div className="options"><ol>
                <li>{element[1]}</li>
                <li>{element[2]}</li>
                <li>{element[3]}</li>
                <li>{element[4]}</li>
                </ol>
              </div>
              <div>
                <label class='type'>Type your answer here: </label>
                <input type="text" id={`answer-${index}`} />
              </div>
              <button class='check'
                onClick={() => checkAnswer(index)}
              >
                Check answer
              </button>
              <div>
                {answers[index]}
              </div>
              <button class='delete'
                onClick={() => deleted(index)}
              >
                Delete Question
              </button>
              <hr></hr>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;


