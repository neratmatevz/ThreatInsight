const domainSearch = require('./domainSearch');

describe('domainSearch parameter checking', () => {
    test('throws an error if domainSearchJsonData is not provided', async () => {
        expect(domainSearch(null, 'userUID', 'searchUID')).rejects.toThrow('Parameters for domainSearch not provided!');
    });

    test('throws an error if company is not provided', async () => {
        expect(domainSearch({ choosen: true }, 'userUID', 'searchUID')).rejects.toThrow('Domain cannot be empty or must be in format: domain.tld!');
    });

    test('throws an error if company is an empty string', async () => {
        expect(domainSearch({ choosen: true, company: '' }, 'userUID', 'searchUID')).rejects.toThrow('Domain cannot be empty or must be in format: domain.tld!');
    });

    test('throws an error if company is not in the correct format', async () => {
        expect(domainSearch({ choosen: true, company: 'invalid_domain' }, 'userUID', 'searchUID')).rejects.toThrow('Domain cannot be empty or must be in format: domain.tld!');
    });
});
