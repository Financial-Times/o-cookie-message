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
		policyMessageEl.innerHTML = `
			<header class="fuuuuuuu__heading">
				<h1>Privacy</h1>
			</header>
			<p>
				We take your privacy as seriously as we take our journalism. Please review our updated
				<a href="">privacy</a> and <a href="">cookie</a> policies.
			</p>
		`;

		return policyMessageEl;
	}

	render () {
		//cookieMessageEl.visible?
		if (this.position === 'top') {
			// yes — position over message
			this.policyMessageEl.style.position = 'fixed';
			this.policyMessageEl.style.bottom = this.cookieMessageEl.clientHeight + 'px';
			this.policyMessageEl.style.margin = '20px';
			this.policyMessageEl.style.width = '50%';

			document.body.insertBefore(this.policyMessageEl, this.cookieMessageEl)
		} else {
			//no — position in place of messages
			// yes — position over message
			this.policyMessageEl.style.position = 'fixed';
			this.policyMessageEl.style.bottom = 0;
			this.policyMessageEl.style.margin = '20px';
			this.policyMessageEl.style.width = '50%';
			document.body.append(this.policyMessageEl);
		}
	}
}

export default PrivacyPolicyMessage;
