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
  "Mathematics": [],
  "Science": [],
  "Punjabi": [],
  "History": [],
  "Geography": [],
};
