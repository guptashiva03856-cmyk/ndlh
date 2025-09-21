export type Lesson = {
  id: string;
  title: string;
  description: string;
  videoId: string;
  keyTakeaways: string[];
};

export const lessonsBySubject: { [key: string]: Lesson[] } = {
  "English": [
    {
      id: "eng-1",
      title: "The Alphabet Song",
      description: "Learn the letters of the alphabet with a fun and catchy song.",
      videoId: "hq3yfQnllfQ",
      keyTakeaways: [
        "Recognize all 26 letters of the alphabet.",
        "Sing the alphabet song from memory.",
        "Identify the sound each letter makes.",
      ],
    },
    {
      id: "eng-2",
      title: "Basic Sentence Structure",
      description: "Understand the basic parts of a sentence: subject, verb, and object.",
      videoId: "n_T4-e9GgI0",
       keyTakeaways: [
        "Identify the subject, verb, and object in a simple sentence.",
        "Construct your own simple sentences.",
        "Understand the importance of word order in English.",
      ],
    },
    {
        id: "eng-3",
        title: "Introduction to Nouns",
        description: "Learn what a noun is and how to identify people, places, and things.",
        videoId: "f33y_eJ6K7k",
        keyTakeaways: [
            "Define what a noun is.",
            "Identify nouns in sentences.",
            "Categorize nouns as a person, place, or thing.",
        ],
    },
  ],
  "Mathematics": [
    {
        id: "math-1",
        title: "Counting Numbers 1 to 10",
        description: "A fun song to help young learners count from one to ten.",
        videoId: "DR-cfDsHCGA",
        keyTakeaways: [
            "Count from 1 to 10.",
            "Recognize the written numerals for 1-10.",
            "Associate numbers with quantities.",
        ],
    },
    {
        id: "math-2",
        title: "Addition for Kids",
        description: "A simple introduction to the concept of adding numbers together.",
        videoId: "Q0_JkF-6p_0",
        keyTakeaways: [
            "Understand the concept of addition.",
            "Solve simple addition problems.",
            "Use the '+' and '=' symbols correctly.",
        ],
    },
    {
        id: "math-3",
        title: "Learning Shapes",
        description: "Learn to identify and name common shapes like circles, squares, and triangles.",
        videoId: "OE_q_2iEpT4",
        keyTakeaways: [
            "Identify circles, squares, triangles, and rectangles.",
            "Describe the properties of basic shapes.",
            "Find shapes in everyday objects.",
        ],
    },
  ],
  "Science": [
    {
        id: "sci-1",
        title: "The Solar System Song",
        description: "Travel through space and learn the names of the planets in our solar system.",
        videoId: "F2prtmPEjOc",
        keyTakeaways: [
            "Name the planets in order from the Sun.",
            "Identify key features of different planets.",
            "Understand that planets orbit the Sun.",
        ],
    },
    {
        id: "sci-2",
        title: "What is a Life Cycle?",
        description: "Explore the different stages of life for plants and animals.",
        videoId: "raCbwIufqCg",
        keyTakeaways: [
            "Define what a life cycle is.",
            "Describe the life cycle of a butterfly.",
            "Understand that all living things have a life cycle.",
        ],
    },
     {
        id: "sci-3",
        title: "The Five Senses",
        description: "Learn about the five senses: sight, hearing, touch, taste, and smell.",
        videoId: "L-mw39d5M-M",
        keyTakeaways: [
            "List the five senses.",
            "Identify the body part associated with each sense.",
            "Describe how each sense helps us explore the world.",
        ],
    },
  ],
  "Punjabi": [],
  "History": [],
  "Geography": [],
};
