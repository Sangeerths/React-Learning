import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to the FAQ App</h1>
      <FaqSection />
    </div>
  );
}
const Item = ({ currentValue }) => {
  const [toggle, settoggle] = useState(false);

  return (
    <div key={currentValue.id} className="elements">
      <h3 className="question">
        {currentValue.question}
        <button
          onClick={function () {
            settoggle(!toggle);
          }}
          className="button"
          aria-expanded={toggle}
          aria-label={`${toggle ? "Close" : "Open"} ${currentValue.question}`}
        >
          {toggle ? "➖" : "➕"}
        </button>
      </h3>

      {toggle && <p className="answer"> {currentValue.answer} </p>}
    </div>
  );
};
 const questions = [
  {
    id: 1,
    question: "Is this a good project",
    answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    question: "How much does it cost?",
    answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 3,
    question: "When can i get it?",
    answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];
function FaqSection() {

 return (
    <div>
      <h1>FAQ</h1>
      {questions.map((item) => (
        <Item key={item.id} currentValue={item} />
      ))}
    </div>
  );
}

export default App;