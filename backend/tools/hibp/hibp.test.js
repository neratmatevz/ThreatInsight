const hibpStructureResponse = require('./hibpStructureResponse');

describe('hibpStructureResponse function', () => {

  test('includes email in the structured response', () => {
    const email = 'example@example.com';
    const rawData = [
      {
        Name: 'Adobe',
        Domain: 'adobe.com',
        BreachDate: '2013-10-04',
        PwnCount: 152445165,
        Description: 'In October 2013, 153 million Adobe accounts were breached...',
        LogoPath: 'https://logos.haveibeenpwned.com/Adobe.png',
        DataClasses: ['Email addresses', 'Password hints', 'Passwords', 'Usernames'],
        IsVerified: true,
        IsFabricated: false,
        IsMalware: false
      }
    ];

    const expectedResponse = [
      {
        email: email,
        name: 'Adobe',
        domain: 'adobe.com',
        breachDate: '2013-10-04',
        pwnCount: 152445165,
        description: 'In October 2013, 153 million Adobe accounts were breached...',
        logoPath: 'https://logos.haveibeenpwned.com/Adobe.png',
        dataClasses: ['Email addresses', 'Password hints', 'Passwords', 'Usernames'],
        isVerified: true,
        isFabricated: false,
        isMalware: false
      }
    ];

    const structuredResponse = hibpStructureResponse(rawData, email);

    expect(structuredResponse).toEqual(expectedResponse);
  });

});
