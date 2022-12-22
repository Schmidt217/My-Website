const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");
const btnOpenModal = document.querySelectorAll(".contact");
const contactName = document.querySelector(".name");
const submitBtn = document.getElementById("submit-button");

const openModal = function (e) {
	e.preventDefault();
	document.body.style = "overflow: hidden";
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
	contactName.focus();
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
	document.body.style = "overflow: auto";
};

btnOpenModal.forEach((btn) => {
	btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	submitBtn.innerHTML = `
	<div>
		<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
		<path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
			<animateTransform attributeType="xml"
			attributeName="transform"
			type="rotate"
			from="0 25 25"
			to="360 25 25"
			dur="0.6s"
			repeatCount="indefinite"/>
			</path>
		</svg>
	</div>
	`;
	let _name = form.querySelector(".name").value;
	let _email = form.querySelector(".email").value;
	let _subject = form.querySelector(".subject").value;
	let _message = form.querySelector("#message-field").value;

	const params = new URLSearchParams();
	params.append("name", _name);
	params.append("email", _email);
	params.append("subject", _subject);
	params.append("message", _message);
	const urlEncodedData = params.toString();

	fetch("/", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: urlEncodedData,
	})
		.then((res) => {
			if (res.ok) {
				alert("message sent!");
				submitBtn.innerHTML = "Submit";
				form.reset();
			} else {
				console.error(res);
			}
		})
		.then(closeModal)
		.catch((err) => {
			alert(err.message);
		});
});
