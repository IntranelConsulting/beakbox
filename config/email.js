/**
 * @param {string} email The email address itself
 * @param {boolean=} forceNoCss If `text` is an email address, do not add CSS to hide the fake `<span>`. You will need to manage this yourself.
 * @param {string=} text The text of the link. If empty, the email will be used instead.
 * @returns {string} HTML string
 */
function emailObfuscater(email, forceNoCss = false, text = "") {
	email = email.trim();
	text = text.trim();
	text = text || email;

	let useCss = false;

	const emailEncoded = encode("mailto:" + email);

	let textEncoded = text;

	if (text.includes("@")) {
		const parts = text.split("@");
		const domainTld = parts[1].split(/(\..+?$)/);

		textEncoded =
			encode(parts[0] + "@") +
			"<span>email.</span>" +
			encode(domainTld[0]) +
			"<!--.totallyreal-->" +
			encode(domainTld[1]);

		useCss = !forceNoCss;
	}

	return `<a class="email-enc" href="${emailEncoded}">${textEncoded}</a>${
		useCss
			? '<style type="text/css">a.email-enc span { display: none; }</style>'
			: ""
	}`;
}

/**
 * Convert a string to HTML entities
 * @param {string} str
 * @returns {string} HTML entities representation of `str`
 */
function encode(str) {
	return str.replace(/./g, i => "&#" + i.charCodeAt(0) + ";");
}

/**
 * Build a `mailto:` link in a way that protects the email address from spammers.
 * @param {string} email The email address itself
 * @param {boolean=} forceNoCss Do not add CSS to hide the fake `<span>`. You will need to manage this yourself.
 * @returns {string} HTML string
 * @example {% email "me@example.com" %}
 * @example {% email "me@example.com", true %}
 * @see https://spencermortensen.com/articles/email-obfuscation/#text-display
 */
export const emailShortcode = (email, forceNoCss = false) =>
	emailObfuscater(email, forceNoCss);

/**
 * Build a `mailto:` link in a way that protects the email address from spammers.
 * @param {string} content The text of the link. This is wrapped by the pair shortcode tags.
 * @param {string} email The email address itself
 * @param {boolean=} forceNoCss If `content` contains an email address, do not add CSS to hide the fake `<span>`. You will need to manage this yourself.
 * @returns {string} HTML string
 * @example {% emailPair "me+site@example.com" %} me@example.com {% endemailPair %}
 * @example {% emailPair "me@example.com" %} contact me {% endemailPair %}
 * @example {% emailPair "me+site@example.com", true %} me@example.com {% endemailPair %}
 * @see https://spencermortensen.com/articles/email-obfuscation/#text-display
 */
export const emailPairedShortcode = (content, email, forceNoCss = false) =>
	emailObfuscater(email, forceNoCss, content);
