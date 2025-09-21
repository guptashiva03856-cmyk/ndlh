export type Question = {
  questionText: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export const quizzesBySubject: { [key: string]: Quiz[] } = {
  English: [
    {
      id: "eng-q1",
      title: "Vocabulary Basics",
      questions: [
        {
          questionText: "Which fruit grows on trees?",
          options: ["Carrot", "Apple", "Potato", "Onion"],
          correctAnswer: "Apple",
        },
        {
          questionText: "What does 'brave' mean?",
          options: ["Scared", "Ready to face danger", "Tired", "Hungry"],
          correctAnswer: "Ready to face danger",
        },
        {
          questionText: "What is the opposite of 'happy'?",
          options: ["Joyful", "Excited", "Sad", "Content"],
          correctAnswer: "Sad",
        },
        {
          questionText: "A very large expanse of sea is called an...",
          options: ["River", "Pond", "Lake", "Ocean"],
          correctAnswer: "Ocean",
        },
      ],
    },
  ],
  Mathematics: [
    {
      id: "math-q1",
      title: "Simple Addition",
      questions: [
        {
          questionText: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
        },
        {
          questionText: "What is 5 + 3?",
          options: ["7", "8", "9", "10"],
          correctAnswer: "8",
        },
        {
          questionText: "What is 1 + 0?",
          options: ["0", "1", "2", "10"],
          correctAnswer: "1",
        },
         {
          questionText: "What comes after 7?",
          options: ["6", "8", "9", "5"],
          correctAnswer: "8",
        },
      ],
    },
  ],
  Science: [
      {
        id: "sci-q1",
        title: "Our Solar System",
        questions: [
            {
                questionText: "Which is the smallest planet?",
                options: ["Earth", "Jupiter", "Mercury", "Mars"],
                correctAnswer: "Mercury",
            },
            {
                questionText: "Which is the 'Red Planet'?",
                options: ["Venus", "Mars", "Saturn", "Earth"],
                correctAnswer: "Mars",
            },
            {
                questionText: "Which is the largest planet?",
                options: ["Jupiter", "Uranus", "Neptune", "Earth"],
                correctAnswer: "Jupiter",
            },
            {
                questionText: "What is our home planet?",
                options: ["Mars", "Venus", "Earth", "Mercury"],
                correctAnswer: "Earth",
            },
        ]
      }
  ],
  Punjabi: [],
  History: [],
  Geography: [],
};
