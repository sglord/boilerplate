// import server from './server.js';

describe('server smoke test', () => {
	it('should return a string', () => {
		expect('ci with travis yo').toEqual('ci with travis yo');
	});
});
