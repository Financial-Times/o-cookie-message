export default CookieMessage;
declare class CookieMessage {
    static get defaultOptions(): {
        theme: any;
        acceptUrl: string;
        acceptUrlFallback: string;
        manageCookiesUrl: string;
        consentCookieName: string;
    };
    /**
     * Get the data attributes from the cookieMessageElement. If the cookie message is being set up
     * declaratively, this method is used to extract the data attributes from the DOM.
     * @param {HTMLElement} cookieMessageElement - The cookie message element in the DOM
     */
    static getOptionsFromDom(cookieMessageElement: HTMLElement): {};
    /**
     * Initialise cookie message components.
     * @param {(HTMLElement|String)} rootElement - The root element to intialise cookie messages in, or a CSS selector for the root element
     * @param {Object} [options={}] - An options object for configuring the cookie messages
     */
    static init(rootElement: (HTMLElement | string), options?: any): CookieMessage;
    constructor(cookieMessageElement: any, options: any);
    cookieMessageElement: any;
    options: any;
    createCookieMessage(): void;
    /**
     * Enables cookie setting behaviour from the FT consent service
     * https://github.com/Financial-Times/next-consent-proxy/tree/master/src
     */
    updateConsent(): void;
    /**
     * Checks whether cookie is set
     */
    shouldShowCookieMessage(): boolean;
    /**
     * Displays cookie message banner, based on existing cookies.
     */
    showCookieMessage(): void;
    /**
     * Removes cookie message banner.
     */
    removeCookieMessage(): void;
    dispatchEvent(eventName: any): void;
}
