# Open Trivia Database API

## Response codes

**Code 0**: Success

Returned results successfully.


**Code 1**: No Results

Could not return results. 

The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)

**Code 2**: Invalid Parameter

Contains an invalid parameter. Arguements passed in aren't valid. 

(Ex. Amount = Five)


**Code 3**: Token Not Found

Session Token does not exist.


**Code 4**: Token Empty

Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
