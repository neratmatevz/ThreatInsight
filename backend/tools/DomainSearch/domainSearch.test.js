const domainSearch = require('./domainSearch');

describe('domainSearch parameter checking', () => {
    test('throws an error if domainSearchJsonData is not provided', () => {
        expect(() => {
            domainSearch(null, 'userUID', 'searchUID');
        }).toThrow('Parameters for domainSearch not provided!');
    });

    test('throws an error if company is not provided', () => {
        expect(() => {
            domainSearch({ choosen: true }, 'userUID', 'searchUID');
        }).toThrow('Domain cannot be empty or must be in format: domain.tld!');
    });

    test('throws an error if company is an empty string', () => {
        expect(() => {
            domainSearch({ choosen: true, company: '' }, 'userUID', 'searchUID');
        }).toThrow('Domain cannot be empty or must be in format: domain.tld!');
    });

    test('throws an error if company is not in the correct format', () => {
        expect(() => {
            domainSearch({ choosen: true, company: 'invalid_domain' }, 'userUID', 'searchUID');
        }).toThrow('Domain cannot be empty or must be in format: domain.tld!');
    });
});
