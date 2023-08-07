import React, { useState } from "react";
import "./QuestionComponent.css";

const questions = [
  {
    id: 1,
    question: "Which of the following best describes your personality?",
    options: [
      { id: "a", text: "Outgoing and social" },
      { id: "b", text: "Introverted and independent" },
      { id: "c", text: "Thoughtful and reflective" },
      { id: "d", text: "Spontaneous and adventurous" },
    ],
  },
  {
    id: 2,
    question: "How do you like to spend your weekends",
    options: [
      { id: "a", text: "Exploring new places and trying new things" },
      {
        id: "b",
        text: "Relaxing at home and catching up on reading or TV shows",
      },
      {
        id: "c",
        text: "Hanging out with friends and attending parties or events",
      },
      {
        id: "d",
        text: "Pursuing your hobbies or interests,such as playing sports or creating art",
      },
    ],
  },
  {
    id: 3,
    question: "What is your favorite type of food?",
    options: [
      { id: "a", text: "Fast food and junk food" },
      { id: "b", text: "Healthy and organic" },
      { id: "c", text: "International cuisine, such as sushi or indian food" },
      { id: "d", text: "Comfort food,such as pizza or mac and cheese" },
    ],
  },
  {
    id: 4,
    question: "What is your favorite type of movie or TV show?",
    options: [
      { id: "a", text: "Action and adventure" },
      { id: "b", text: "Drama and romance" },
      { id: "c", text: "Comedy and humour" },
      { id: "d", text: "Thriller and suspense" },
    ],
  },
  {
    id: 5,
    question: "What are your thoughts on politics and social issues?",
    options: [
      { id: "a", text: "Very interested and engaged" },
      { id: "b", text: "Somewhat interested, but not very politically active" },
      {
        id: "c",
        text: "Neutral or apathetic towards politics and social issues",
      },
      {
        id: "d",
        text: "Disinterested or actively opposed to political and social activism",
      },
    ],
  },
  {
    id: 6,
    question:
      "Which of the following best describes your preferred work environment?",
    options: [
      { id: "a", text: "Collaborative and team-oriented" },
      { id: "b", text: "Independent and self directed" },
      { id: "c", text: "Structured and organized" },
      { id: "d", text: "Flexible and adaptable" },
    ],
  },
  {
    id: 7,
    question: "What is your favourite way to exercise or stay active?",
    options: [
      { id: "a", text: "Running or jogging" },
      { id: "b", text: "Yoga or pilates" },
      { id: "c", text: "Weightlifting or strength training" },
      { id: "d", text: "NOTA" },
    ],
  },
  {
    id: 8,
    question:
      "Which of the following best describes your preferred communication style?",
    options: [
      { id: "a", text: "Direct and straightforward" },
      { id: "b", text: "Diplomatic and tactful" },
      { id: "c", text: "Indirect or passive-aggressive" },
      { id: "d", text: "Varied,depending on the situation" },
    ],
  },
  {
    id: 9,
    question: "What kind of books do you enjoy reading the most?",
    options: [
      { id: "a", text: "Fiction/fantasy novels or short stories" },
      { id: "b", text: "Non-fiction, such as biographies or history books" },
      { id: "c", text: "Self-help or personal development books" },
      { id: "d", text: "NOTA" },
    ],
  },
  {
    id: 10,
    question: "Which of the following best describes your sense of style?",
    options: [
      { id: "a", text: "Trendy and fashionable" },
      { id: "b", text: "Casual and comfortable" },
      { id: "c", text: "Alternative or grunge" },
      { id: "d", text: "Calssic or timeless" },
    ],
  },
  {
    id: 11,
    question: "What is your favorite type of social media platform?",
    options: [
      { id: "a", text: "Instagram" },
      { id: "b", text: "Youtube" },
      { id: "c", text: "Twitter" },
      { id: "d", text: "Facebook" },
    ],
  },
  {
    id: 12,
    question: "What is your favorite type of music?",
    options: [
      { id: "a", text: "Pop or mainstream" },
      { id: "b", text: "Rock or alternative" },
      { id: "c", text: "Hip hop or rap" },
      { id: "d", text: "EDM or electronic msuic" },
    ],
  },
  {
    id: 13,
    question:
      "Which of the following best describes your attitude towards school and education?",
    options: [
      { id: "a", text: "Academically driven and abitious" },
      { id: "b", text: "Relaxed and easygoing" },
      { id: "c", text: "Creative and artistic" },
      { id: "d", text: "Disinterested or bored" },
    ],
  },
  {
    id: 14,
    question: "What is your favourite anime or manga series?",
    options: [
      { id: "a", text: "Naruto" },
      { id: "b", text: "One Piece" },
      { id: "c", text: "Death Note" },
      { id: "d", text: "NOTA" },
    ],
  },
  {
    id: 15,
    question: "What is your favourite K-pop group or artist?",
    options: [
      { id: "a", text: "BTS" },
      { id: "b", text: "BlackPink" },
      { id: "c", text: "EXO" },
      { id: "d", text: "NOTA" },
    ],
  },
  {
    id: 16,
    question:
      "Which of the following best describes your social life and relationships?",
    options: [
      { id: "a", text: "Very social and extroverted" },
      { id: "b", text: "Selective and close-knit" },
      { id: "c", text: "Introverted or shy" },
      { id: "d", text: "varied,depending on the situation" },
    ],
  },
  {
    id: 17,
    question: "What is your favourite type of video game?",
    options: [
      { id: "a", text: "First-person shooters or action games" },
      { id: "b", text: "Role-playing games or MMOs" },
      { id: "c", text: "Sports or racing games" },
      { id: "d", text: "NOTA" },
    ],
  },
  {
    id: 18,
    question:
      "Which of the following best describes your ideal entertainment or leisure activity?",
    options: [
      { id: "a", text: "Movies or TV shows" },
      { id: "b", text: "Music or concerts" },
      { id: "c", text: "Reading or writing" },
      { id: "d", text: "Gaming or streaming" },
    ],
  },
];

const QuestionComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleOptionSelect = (optionId) => {
    setSelectedOptionId(optionId);
  };

  const handleNextClick = () => {
    setSelectedOptionId(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBackClick = () => {
    setSelectedOptionId(null);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-container text-white">
      <div className="question-box">
        <p className="text-[18px]">{currentQuestion.question}</p>
        <div className="options-container text-[18px]">
          {currentQuestion.options.map((option) => (
            <div
              key={option.id}
              className={`option ${
                selectedOptionId === option.id ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <input
                type="radio"
                id={option.id}
                name="option"
                value={option.id}
                checked={selectedOptionId === option.id}
                onChange={() => {}}
              />
              <label htmlFor={option.id}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button
            className="back-button"
            onClick={handleBackClick}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button className="next-button" onClick={handleNextClick}>
              Finish
            </button>
          ) : (
            <button
              className="next-button"
              onClick={handleNextClick}
              disabled={selectedOptionId === null}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
