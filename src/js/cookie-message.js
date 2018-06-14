
const store = require('superstore-sync');
const Banner = require('o-banner/src/js/banner');

// GABI: This is the new cookie message code, which currently creates an o-banner instance and fills
// in appropriate cookie data. The cookie setting behaviour isn't in place at the moment, and there
// are some changes to how it should behave which are outlined in:
// https://github.com/Financial-Times/o-cookie-message/issues/57
//
// For now I think ignore the flipped button positions and green colours, as this will probably end
// up being a theme. So leave in the teal button/accent.
//
// Because the new way of doing cookie acceptance requires a form, there _may_ still be one more
// change to o-banner which allows a form to be used for the button instead of a link. Speak to
// James about this if you're not sure what's expected.

class CookieMessage {

	constructor (cookieMessageElement, options) {
		this.cookieMessageElement = cookieMessageElement;
		this.domain = window.location.hostname.replace('www.', '');

		const redirect = window.location.href;
		// Create a banner element
		const cookieMessageClass = (options && options.cookieMessageClass ? options.cookieMessageClass : 'o-cookie-message');
		this.banner = new Banner(this.cookieMessageElement, {
			autoOpen: true,
			suppressCloseButton: true,

			bannerClass: cookieMessageClass,
			bannerClosedClass: `${cookieMessageClass}--closed`,
			outerClass: `${cookieMessageClass}__outer`,
			innerClass: `${cookieMessageClass}__inner`,
			contentClass: `${cookieMessageClass}__content`,
			contentLongClass: `${cookieMessageClass}__content--long`,
			contentShortClass: `${cookieMessageClass}__content--short`,
			actionsClass: `${cookieMessageClass}__actions`,
			actionClass: `${cookieMessageClass}__action`,
			actionSecondaryClass: `${cookieMessageClass}__action--secondary`,
			buttonClass: `${cookieMessageClass}__button`,
			linkClass: `${cookieMessageClass}__link`,
			contentLong: `
				<header class="${cookieMessageClass}__heading">
					<h1>Cookies on the FT</h1>
				</header>
				<p>
					We use <a href="http://help.ft.com/help/legal-privacy/cookies/" class="o-cookie-message__link o-cookie-message__link--external" target="_blank" rel="noopener">cookies</a>
					for a number of reasons, such as keeping FT Sites reliable and secure, personalising
					content and ads, providing social media features and to analyse how our Sites are used.
				</p>
			`,
			buttonLabel: 'Accept & continue',
			buttonUrl: `https://consent.${this.domain}/__consent/consent-record-cookie?redirect=${redirect}&cookieDomain=.${this.domain}`,
			linkLabel: 'Manage cookies',
			linkUrl: 'https://www.ft.com/preferences/manage-cookies'
		});

		this.showCookieMessage.bind(this)();
	}

	/**
	 * Enables cookie setting behaviour from the FT consent service
	 * https://github.com/Financial-Times/next-consent-proxy/tree/master/src
	 */

	updateConsent () {
		const button = document.querySelector(`.${this.banner.options.buttonClass}`);
		if (button) {
			button.addEventListener('click', (e) => {
				e.preventDefault();

				return fetch(`https://consent.${this.domain}/__consent/consent-record-cookie`, {
					method: 'get',
					credentials: 'include'
				})
				.then(this.removeCookieMessage.bind(this))
				.catch(error => {
					return { error };
				});
			});
		}
	}

	/**
	 * Displays cookie message banner, based on existing cookies.
	 */

	showCookieMessage () {
			if (!document.cookie.includes("FTCookieConsentGDPR=true")) {
			this.cookieMessageElement.classList.add(`${this.banner.options.bannerClass}--active`);
			this.updateConsent.bind(this)();
		} else {
			this.removeCookieMessage.bind(this)();
		}
	}

	/**
	 * Removes cookie message banner.
	 */

	removeCookieMessage () {
		this.cookieMessageElement.parentNode.removeChild(this.cookieMessageElement);
	}

	/**
	 * Initialise cookie message components.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise cookie messages in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the cookie messages
	 */
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}

		// If the rootElement isnt an HTMLElement, treat it as a selector
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}

		// If the rootElement is an HTMLElement (ie it was found in the document anywhere)
		// AND the rootElement has the data-o-component=o-banner then initialise just 1 banner (this one)
		if (rootElement instanceof HTMLElement && /\bo-cookie-message\b/.test(rootElement.getAttribute('data-o-component'))) {
			return new CookieMessage(rootElement, options);
		}

		// If the rootElement wasn't itself a cookie message, then find ALL of the child things that have the data-o-component=oCookieMessage set
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-cookie-message"]'), rootElement => new CookieMessage(rootElement, options));
	}

}

export default CookieMessage;
