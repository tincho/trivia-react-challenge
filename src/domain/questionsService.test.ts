import { getQuestions } from './questionsService';

const URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setupFetchStub(data: any) {
  return function fetchStub() {
    return Promise.resolve({
      json: () => Promise.resolve(data),
    } as Response);
  };
}

describe('questions service', () => {
  test('getQuestions should return response.results', async () => {
    const fakeData = {
      response_code: 0,
      results: [{}, {}, {}],
    };

    if (typeof global.fetch === 'function') {
      jest.spyOn(global, 'fetch').mockImplementation(setupFetchStub(fakeData));
    } else {
      global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData));
    }

    const ourResponse = await getQuestions();
    expect(ourResponse.length).toEqual(3);

    (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
  });
  test('getQuestions should throw error with message if no results', async () => {
    const fakeData = {
      response_code: 1,
      results: [],
    };
    if (typeof global.fetch === 'function') {
      jest.spyOn(global, 'fetch').mockImplementation(setupFetchStub(fakeData));
    } else {
      global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData));
    }

    const callGetQuestions = async () => {
      await getQuestions();
    };
    expect(callGetQuestions).rejects.toThrowError('No Results');

    (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
  });
  describe('getQuestions params', () => {
    test('without params should fetch default URL', async () => {
      const fakeData = {
        response_code: 0,
        results: [{}],
      };
      if (typeof global.fetch === 'function') {
        jest.spyOn(global, 'fetch').mockImplementation(setupFetchStub(fakeData));
      } else {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData));
      }

      await getQuestions();
      expect(global.fetch).toHaveBeenCalledWith(URL);
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });
    test('with params should fetch custom URL', async () => {
      const fakeData = {
        response_code: 0,
        results: [{}],
      };

      if (typeof global.fetch === 'function') {
        jest.spyOn(global, 'fetch').mockImplementation(setupFetchStub(fakeData));
      } else {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData));
      }

      await getQuestions({
        difficulty: 'easy',
        type: 'multiple',
      });
      expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');

      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });
  });
});
