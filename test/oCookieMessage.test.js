/*global describe, it */
import expect from 'expect.js';

import CookieMessage from './../src/js/cookieMessage';

describe("CookieMessage", () => {
	it('is defined', () => {
		expect(CookieMessage).to.be.a('function');
	});
	it('has a static init method', () => {
		expect(CookieMessage.init).to.be.a('function');
	});
});
