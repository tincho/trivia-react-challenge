const API_URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

const API_RESPONSE_CODES = [
  // 0:
  'Success',
  // 1:
  'No Results',
  // 2:
  'Invalid parameter',
];

export type QuestionData = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type ApiResponse = {
  response_code: number;
  results: QuestionData[];
};

export async function getQuestions() {
  const response: ApiResponse = await fetch(API_URL).then((res) => res.json());
  if (response.response_code !== 0) {
    throw new Error(API_RESPONSE_CODES[response.response_code]);
  }
  return response.results;
}
