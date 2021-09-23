const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

console.log(process.env.SENDGRID_API_KEY);

const api_key = process.env.SENDGRID_API_KEY;

// const A = [
// 	"SG",
// 	"QMkoHwckT9WaiuiN4LsZjw",
// 	"Xr2UDzCeHumsIRRZKmtQ3c8WlB9WqetUAjqjBOvhoM0",
// ];

// const API_KEY = A.join(".");

sgMail.setApiKey(api_key);

exports.handler = async function (event, context) {
	try {
		if (event.httpMethod !== "POST") {
			throw new Error(
				`Expecting a POST request, but received a ${event.httpMethod} request instead.`
			);
		}
		if (!event.body) {
			throw new Error("Body is empty. Are you trying to send an email?");
		}

		const data = JSON.parse(event.body);

		if (!data.name) {
			throw new Error("Name is required!");
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
			from: "schmidt217@mikeschmidt.dev", // Use the email address or domain you verified above
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
		alert(error);
		return {
			body: JSON.stringify({ success: false, message: error }),
		};
	}
};
