// Alaa Ahmad

const fs = require('fs/promises');
const { getRawFileContent } = require('./fileReader');

// Tell Jest to automatically mock the entire 'fs/promises' module.
jest.mock('fs/promises');

describe('getRawFileContent with mocking', () => {

  test('should return the mocked content instead of reading a real file', async () => {
    
    // Define the fake return value for fs.readFile.
    const mockContent = 'hello from mocked file by Alaa Ahmad';
    fs.readFile.mockResolvedValue(mockContent);

    // Call the function It will use the mocked fs.readFile.
    const result = await getRawFileContent('any/fake/path.txt');

    //Check if the function returned our mocked content.
    expect(result).toBe(mockContent);

    // Verify that the mock was called correctly.
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith('any/fake/path.txt', 'utf8');
  });

});