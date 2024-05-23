const whois = require('./whois'); // Adjust the path if necessary

describe('whois function', () => {

  test('throws an error if parameters for whois are not provided', async () => {
    await expect(whois(null, "UserUID", "SearchUID")).rejects.toThrow("Parameters for whois not provided!");
  });

  test('throws an error if both ip and domain are not provided', async () => {
    const testData = { choosen: true };
    await expect(whois(testData, "UserUID", "SearchUID")).rejects.toThrow('At least one parameter (ip or domain) must be provided.');
  });

  test('throws an error if ip is not a non-empty string', async () => {
    const testData = { choosen: true, ip: 12345, domain: "example.com" };
    await expect(whois(testData, "UserUID", "SearchUID")).rejects.toThrow('Invalid parameter: ip must be a non-empty string');
  });

  test('throws an error if domain is not a non-empty string', async () => {
    const testData = { choosen: true, ip: "62.72.37.169", domain: 12345 };
    await expect(whois(testData, "UserUID", "SearchUID")).rejects.toThrow('Invalid parameter: domain must be a non-empty string');
  });

});
