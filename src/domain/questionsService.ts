const API_BASE_URL = 'https://opentdb.com/api.php';

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

type ApiParams = {
  amount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'boolean' | 'multiple';
  category?: number;
};

function paramsToStr(params: ApiParams): string {
  return Object.entries(params)
    .reduce((urlParams: string[], [key, value]) => [...urlParams, `${key}=${value}`], [])
    .join('&');
}

export async function getQuestions(params: Partial<ApiParams> = {}) {
  const defaultParams: ApiParams = {
    amount: 10,
    difficulty: 'hard',
    type: 'boolean',
  };
  const url = `${API_BASE_URL}?${paramsToStr({
    ...defaultParams,
    ...params,
  })}`;
  const response: ApiResponse = await fetch(url).then((res) => res.json());
  if (response.response_code !== 0) {
    throw new Error(API_RESPONSE_CODES[response.response_code]);
  }
  return response.results;
}
