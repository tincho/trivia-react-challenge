import { getQuestions } from './questionsService';

const URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

describe('questions service', () => {
  test('getQuestions should return response.results', async () => {
    const globalFetch = global.fetch;
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            response_code: 0,
            results: [{}],
          }),
      } as Response),
    );
    global.fetch = mockFetch;
    const ourResponse = await getQuestions();
    expect(ourResponse.length).toEqual(1);
    global.fetch = globalFetch;
  });
  test('getQuestions should throw error with message if no results', async () => {
    const globalFetch = global.fetch;
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            response_code: 1,
            results: [],
          }),
      } as Response),
    );
    global.fetch = mockFetch;
    const callGetQuestions = async () => {
      await getQuestions();
    };
    expect(callGetQuestions).rejects.toThrowError('No Results');
    // expect ?
    global.fetch = globalFetch;
  });
  describe('getQuestions params', () => {
    test('without params should fetch default URL', async () => {
      const globalFetch = global.fetch;
      const mockFetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              response_code: 0,
              results: [{}],
            }),
        } as Response),
      );

      global.fetch = mockFetch;
      await getQuestions();
      expect(mockFetch).toHaveBeenCalledWith(URL);
      global.fetch = globalFetch;
    });
    test('with params should fetch custom URL', async () => {
      const globalFetch = global.fetch;
      const mockFetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              response_code: 0,
              results: [{}],
            }),
        } as Response),
      );

      global.fetch = mockFetch;
      await getQuestions({
        difficulty: 'easy',
        type: 'multiple',
      });
      expect(mockFetch).toHaveBeenCalledWith('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
      global.fetch = globalFetch;
    });
  });
});
