import { quizReducer, initialValue, QuizState } from './quizReducer';

describe('quizReducer actions', () => {
  test('loading', () => {
    const action = {
      type: 'loading',
    };
    const newState = quizReducer(initialValue, action);
    expect(newState).toMatchObject({
      errorMessage: '',
      status: 'loading',
    });
  });

  test('error', () => {
    const action = {
      type: 'error',
      payload: 'Some message',
    };
    const newState = quizReducer(initialValue, action);
    expect(newState).toMatchObject({
      errorMessage: 'Some message',
      status: 'error',
    });
  });

  test('reset', () => {
    const action = {
      type: 'reset',
    };
    const newState = quizReducer({} as QuizState, action);
    expect(newState).toBe(initialValue);
  });

  test('loadQuestions', () => {
    const action = {
      type: 'loadQuestions',
      payload: [
        {
          category: 'Entertainment: Video Games',
          type: 'boolean',
          difficulty: 'hard',
          question: 'Unturned originally started as a Roblox game.',
          correct_answer: 'True',
          incorrect_answers: ['False'],
        },
      ],
    };
    const newState = quizReducer(initialValue, action);
    expect(newState).toMatchObject({
      errorMessage: '',
      status: 'success',
      questions: action.payload,
    });
  });

  describe('answers', () => {
    const action = {
      type: 'loadQuestions',
      payload: [
        {
          category: 'Entertainment: Video Games',
          type: 'boolean',
          difficulty: 'hard',
          question: 'Unturned originally started as a Roblox game.',
          correct_answer: 'True',
          incorrect_answers: ['False'],
        },
        {
          category: 'Entertainment: Video Games',
          type: 'boolean',
          difficulty: 'hard',
          question: 'Some question.',
          correct_answer: 'False',
          incorrect_answers: ['True'],
        },
      ],
    };
    let state = quizReducer(initialValue, action);

    test('answerCorrectly', () => {
      state = quizReducer(state, {
        type: 'answerCorrectly',
        payload: 'True',
      });
      expect(state).toMatchObject({
        currentQuestion: 1,
        answers: ['True'],
        answeredCorrectly: [0],
      });
    });
    test('answerIncorrectly', () => {
      state = quizReducer(state, {
        type: 'answerIncorrectly',
        payload: 'True',
      });
      expect(state).toMatchObject({
        currentQuestion: 2,
        answers: ['True', 'True'],
        answeredCorrectly: [0],
        answeredIncorrectly: [1],
      });
    });
  });
});
