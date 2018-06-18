import CookieMessage from '../../main.js';

function initDemos() {
	document.addEventListener('DOMContentLoaded', () => {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});
}

initDemos();

setTimeout(hideCookieMessage, 500);

function hideCookieMessage() {
	const cookieMessage = document.querySelector('.o-cookie-message');
	const action = cookieMessage.querySelector('.o-cookie-message__action');
	action.addEventListener('click', () => {
		cookieMessage.innerHTML =`<div class="o-cookie-message__container">
				<p class="o-cookie-message__description">
					<strong>Hello!</strong> normally, clicking that button will hide the cookie message for 6 months. But that would mean you wouldn't be able to see this demo anymore, which might be quite annoying. You can refresh the page to get the proper cookie message back.
				</p>
			</div>`;
	});
}

document.body.addEventListener('oCookieMessage.view', () => {
	console.log('THE COOKIE MESSAGE HAS BEEN VIEWED');
});

document.body.addEventListener('oCookieMessage.act', () => {
	console.log('THE COOKIE MESSAGE HAS BEEN ACTED UPON');
});

document.body.addEventListener('oCookieMessage.close', () => {
	console.log('THE COOKIE MESSAGE HAS BEEN CLOSED');
});
