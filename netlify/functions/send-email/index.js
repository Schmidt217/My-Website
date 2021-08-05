const sgMail = require("@sendgrid/mail");

const A = [
	"SG",
	"A6iDl_HsQYSC3qbMNlp8aQ",
	"fM0lHGMIyQg9ljgJRy8Y9Nsi4nOrjVOkUNm64iiRNZw",
];

const API_KEY = A.join(".");

sgMail.setApiKey(API_KEY);

exports.handler = async function (event, context) {
	try {
		if (event.httpMethod !== "POST") {
			throw Error(
				`Expecting a POST request, but received a ${event.httpMethod} request instead.`
			);
		}
		if (!event.body) {
			throw Error("Body is empty. Are you trying to send an email?");
		}

		const data = JSON.parse(event.body);

		if (!data.name) {
			throw Error("Name is required!");
		}

		const textMessage = `
        A new form was submitted by ${data.email}.
        Message: ${data.message}
        `;

		const htmlMessage = `
            <p>A new form was submitted by ${data.email}.</p>
            <p> Message: <br/> ${data.message}</p>
        `;

		const email = {
			to: "schmidt217@gmail.com",
			from: "mike@mikeschmidt.dev", // Use the email address or domain you verified above
			subject: `New Contact Form: ${data.subject}`,
			text: textMessage,
			html: htmlMessage,
		};

		await sgMail.send(email);

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ success: false, message: error.message }),
		};
	}
};
