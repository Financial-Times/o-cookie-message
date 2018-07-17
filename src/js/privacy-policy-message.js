//TODO: remove file when time is up — https://github.com/Financial-Times/o-cookie-message/issues/65

class PrivacyPolicyMessage {
	constructor (cookieMessageElement, position) {
		this.cookieMessageEl = cookieMessageElement;
		this.policyMessageEl = this.buildElement();
		this.position = position;

		this.render();
	}

	buildElement () {
		let policyMessageEl = document.createElement('div');
		policyMessageEl.classList.add('privacy-policy-message', 'o-cookie-message__inner');
		policyMessageEl.innerHTML = `
			<h5>Privacy</h5>
			<p>
				We take your privacy as seriously as we take our journalism. Please review our updated
				<a href="https://help.ft.com/help/legal-privacy/privacy/" class="o-cookie-message__link o-cookie-message__link--external" target="_blank" rel="noopener">privacy</a> and
				<a href="https://help.ft.com/help/legal-privacy/cookies/" class="o-cookie-message__link o-cookie-message__link--external" target="_blank" rel="noopener">cookie</a> policies.
			</p>
		`;

		return policyMessageEl;
	}

	render () {
		//cookieMessageEl visible?
		if (this.position === 'top') {
			// yes — position over cookie message
			this.policyMessageEl.style.bottom = this.cookieMessageEl.clientHeight + 'px';
			document.body.insertBefore(this.policyMessageEl, this.cookieMessageEl)
		} else {
			//no — position in place of cookie message
			this.policyMessageEl.style.bottom = 0;
			document.body.append(this.policyMessageEl);
		}
	}
}

export default PrivacyPolicyMessage;
