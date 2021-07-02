const open = document.getElementById("open");
const close = document.getElementById("close");
const container = document.querySelector(".container");
const nav = document.getElementById("nav-menu");
const navItems = document.getElementById("nav-lists");
const navItem = document.querySelectorAll(".nav-item");
const menuBurger = document.getElementById("burger");

open.addEventListener("click", () => container.classList.add("show-nav"));
close.addEventListener("click", () => container.classList.remove("show-nav"));

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && container.classList.contains("show-nav")) {
		container.classList.remove("show-nav");
	}
});

navItems.addEventListener("click", function (e) {
	if (e.target.classList.contains("nav-item")) {
		container.classList.remove("show-nav");
	}
});

const hello = document.querySelector(".into");
const text = document.querySelector(".title");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";

window.onload = function () {
	hello.classList.add("slide");

	for (let i = 0; i < splitText.length; i++) {
		text.innerHTML += `<span>${splitText[i]}</span>`;
	}

	let char = 0;
	let timer = setInterval(onTick, 100);

	function onTick() {
		const span = document.querySelectorAll("span")[char];
		span.classList.add("fade");
		char++;
		if (char === splitText.length) {
			clearInterval(timer);
			timer = null;
			return;
		}
	}
};

// Menu burger on smaller screens

menuBurger.addEventListener("click", function () {
	this.classList.toggle("active");
	nav.classList.toggle("active-small");
});

navItems.addEventListener("click", function () {
	nav.classList.toggle("active-small");
	menuBurger.classList.toggle("active");
});
