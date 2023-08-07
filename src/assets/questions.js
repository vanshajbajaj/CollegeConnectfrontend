const questions = [
  {
    id: 1,
    question: "Which of the following best describes your personality?",
    options: [
      { id: "1", text: "Outgoing and social" },
      { id: "2", text: "Introverted and independent" },
      { id: "3", text: "Thoughtful and reflective" },
      { id: "4", text: "Spontaneous and adventurous" },
    ],
  },
  {
    id: 2,
    question: "How do you like to spend your weekends",
    options: [
      { id: "1", text: "Exploring new places and trying new things" },
      {
        id: "2",
        text: "Relaxing at home and catching up on reading or TV shows",
      },
      {
        id: "3",
        text: "Hanging out with friends and attending parties or events",
      },
      {
        id: "4",
        text: "Pursuing your hobbies or interests,such as playing sports or creating art",
      },
    ],
  },
  {
    id: 3,
    question: "What is your favorite type of food?",
    options: [
      { id: "1", text: "Fast food and junk food" },
      { id: "2", text: "Healthy and organic" },
      { id: "3", text: "International cuisine, such as sushi or indian food" },
      { id: "4", text: "Comfort food,such as pizza or mac and cheese" },
    ],
  },
  {
    id: 4,
    question: "What is your favorite type of movie or TV show?",
    options: [
      { id: "1", text: "Action and adventure" },
      { id: "2", text: "Drama and romance" },
      { id: "3", text: "Comedy and humour" },
      { id: "4", text: "Thriller and suspense" },
    ],
  },
  {
    id: 5,
    question: "What are your thoughts on politics and social issues?",
    options: [
      { id: "1", text: "Very interested and engaged" },
      { id: "2", text: "Somewhat interested, but not very politically active" },
      {
        id: "3",
        text: "Neutral or apathetic towards politics and social issues",
      },
      {
        id: "4",
        text: "Disinterested or actively opposed to political and social activism",
      },
    ],
  },
  {
    id: 6,
    question:
      "Which of the following best describes your preferred work environment?",
    options: [
      { id: "1", text: "Collaborative and team-oriented" },
      { id: "2", text: "Independent and self directed" },
      { id: "3", text: "Structured and organized" },
      { id: "4", text: "Flexible and adaptable" },
    ],
  },
  {
    id: 7,
    question: "What is your favourite way to exercise or stay active?",
    options: [
      { id: "1", text: "Running or jogging" },
      { id: "2", text: "Yoga or pilates" },
      { id: "3", text: "Weightlifting or strength training" },
      { id: "4", text: "NOTA" },
    ],
  },
  {
    id: 8,
    question:
      "Which of the following best describes your preferred communication style?",
    options: [
      { id: "1", text: "Direct and straightforward" },
      { id: "2", text: "Diplomatic and tactful" },
      { id: "3", text: "Indirect or passive-aggressive" },
      { id: "4", text: "Varied,depending on the situation" },
    ],
  },
  {
    id: 9,
    question: "What kind of books do you enjoy reading the most?",
    options: [
      { id: "1", text: "Fiction/fantasy novels or short stories" },
      { id: "2", text: "Non-fiction, such as biographies or history books" },
      { id: "3", text: "Self-help or personal development books" },
      { id: "4", text: "NOTA" },
    ],
  },
  {
    id: 10,
    question: "Which of the following best describes your sense of style?",
    options: [
      { id: "1", text: "Trendy and fashionable" },
      { id: "2", text: "Casual and comfortable" },
      { id: "3", text: "Alternative or grunge" },
      { id: "4", text: "Calssic or timeless" },
    ],
  },
  {
    id: 11,
    question: "What is your favorite type of social media platform?",
    options: [
      { id: "1", text: "Instagram" },
      { id: "2", text: "Youtube" },
      { id: "3", text: "Twitter" },
      { id: "4", text: "Facebook" },
    ],
  },
  {
    id: 12,
    question: "What is your favorite type of music?",
    options: [
      { id: "1", text: "Pop or mainstream" },
      { id: "2", text: "Rock or alternative" },
      { id: "3", text: "Hip hop or rap" },
      { id: "4", text: "EDM or electronic msuic" },
    ],
  },
  {
    id: 13,
    question:
      "Which of the following best describes your attitude towards school and education?",
    options: [
      { id: "1", text: "Academically driven and abitious" },
      { id: "2", text: "Relaxed and easygoing" },
      { id: "3", text: "Creative and artistic" },
      { id: "4", text: "Disinterested or bored" },
    ],
  },
  {
    id: 14,
    question: "What is your favourite anime or manga series?",
    options: [
      { id: "1", text: "Naruto" },
      { id: "2", text: "One Piece" },
      { id: "3", text: "Death Note" },
      { id: "4", text: "NOTA" },
    ],
  },
  {
    id: 15,
    question: "What is your favourite K-pop group or artist?",
    options: [
      { id: "1", text: "BTS" },
      { id: "2", text: "BlackPink" },
      { id: "3", text: "EXO" },
      { id: "4", text: "NOTA" },
    ],
  },
  {
    id: 16,
    question:
      "Which of the following best describes your social life and relationships?",
    options: [
      { id: "1", text: "Very social and extroverted" },
      { id: "2", text: "Selective and close-knit" },
      { id: "3", text: "Introverted or shy" },
      { id: "4", text: "varied,depending on the situation" },
    ],
  },
  {
    id: 17,
    question: "What is your favourite type of video game?",
    options: [
      { id: "1", text: "First-person shooters or action games" },
      { id: "2", text: "Role-playing games or MMOs" },
      { id: "3", text: "Sports or racing games" },
      { id: "4", text: "NOTA" },
    ],
  },
  {
    id: 18,
    question:
      "Which of the following best describes your ideal entertainment or leisure activity?",
    options: [
      { id: "1", text: "Movies or TV shows" },
      { id: "2", text: "Music or concerts" },
      { id: "3", text: "Reading or writing" },
      { id: "4", text: "Gaming or streaming" },
    ],
  },
];

export default questions;
