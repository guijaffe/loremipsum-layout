document.addEventListener("DOMContentLoaded", () => {
	initCustomSelect();
	initFormHandling();
	initRangeInput();
	initFileUpload();
});

const messages = {
	selectError: "Пожалуйста, выберите тип системы!",
	emailError: "Этот email уже был использован!",
	fileError: "Можно выбрать не более 3 файлов!",
	successMessage: "Форма успешно отправлена! Данные сохранены в localStorage.",
};

function initCustomSelect() {
	const select = document.querySelector(".select");
	if (!select) return;

	const selected = select.querySelector(".select__selected");
	const dropdown = select.querySelector(".select__dropdown");
	const hiddenInput = document.getElementById("select-value");
	const selectWarning = document.getElementById("selectWarning");

	selected.addEventListener("click", () => select.classList.toggle("select--open"));

	dropdown.addEventListener("click", (event) => {
		const option = event.target.closest(".select__option");
		if (!option) return;

		selected.textContent = option.textContent;
		hiddenInput.value = option.dataset.value;
		select.classList.remove("select--open");
		selectWarning.style.display = "none";
	});

	document.addEventListener("click", (event) => {
		if (!select.contains(event.target)) {
			select.classList.remove("select--open");
		}
	});
}

function initFormHandling() {
	const form = document.querySelector(".order-form");
	if (!form) return;

	const hiddenInput = document.getElementById("select-value");
	const selectWarning = document.getElementById("selectWarning");
	const emailWarning = document.getElementById("emailWarning");

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!validateForm(form, hiddenInput, selectWarning, emailWarning)) return;

		saveFormData(form);
		alert(messages.successMessage);
		window.location.reload(); // Перезагружаем страницу после подтверждения
	});
}

function validateForm(form, hiddenInput, selectWarning, emailWarning) {
	return validateSelect(hiddenInput, selectWarning) && validateEmail(emailWarning, form);
}

function validateSelect(hiddenInput, warningElement) {
	if (!hiddenInput.value) {
		warningElement.textContent = messages.selectError;
		warningElement.style.display = "block";
		return false;
	}
	return true;
}

function validateEmail(warningElement, form) {
	const email = form.elements["email"].value;
	const existingData = JSON.parse(localStorage.getItem("formData")) || [];

	if (existingData.some(item => item.email === email)) {
		warningElement.textContent = messages.emailError;
		warningElement.style.display = "block";
		return false;
	}
	return true;
}

function saveFormData(form) {
	const formData = new FormData(form);
	const formObject = {};

	formData.forEach((value, key) => {
		formObject[key] = value instanceof File ? value.name : value;
	});

	const existingData = JSON.parse(localStorage.getItem("formData")) || [];

	try {
		existingData.push(formObject);
		localStorage.setItem("formData", JSON.stringify(existingData));
	} catch (error) {
		console.error("Ошибка при сохранении данных в localStorage:", error);
		alert("Не удалось сохранить данные. Пожалуйста, попробуйте ещё раз.");
	}
}

function initRangeInput() {
	const rangeInput = document.getElementById("percentage");
	const rangeValue = document.getElementById("percentage-value");
	if (!rangeInput || !rangeValue) return;

	rangeInput.addEventListener("input", () => {
		rangeValue.textContent = `${rangeInput.value}%`;
	});
}

function initFileUpload() {
	const fileInput = document.getElementById("file");
	const fileButton = document.getElementById("customFileButton");
	const fileButtonText = document.getElementById("fileButtonText");
	const fileWarning = document.getElementById("fileWarning");
	if (!fileInput || !fileButton || !fileButtonText || !fileWarning) return;

	fileButton.addEventListener("click", () => fileInput.click());

	fileInput.addEventListener("change", () => {
		const files = Array.from(fileInput.files);

		if (files.length > 3) {
			fileWarning.textContent = "Можно выбрать не более 3 файлов!";
			fileWarning.style.display = "block";
			fileInput.value = "";
			fileButtonText.textContent = "Прикрепить файл";
			return;
		}

		fileWarning.textContent = "";
		fileWarning.style.display = "none";

		fileButtonText.textContent = files.length > 0 ? `Выбрано файлов: ${files.length}` : "Прикрепить файл";
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const burger = document.createElement("div"); // Создаем бургер динамически
	burger.classList.add("menu__burger");
	burger.innerHTML = `<span></span>`;
	document.querySelector(".menu").prepend(burger); // Добавляем бургер в меню

	const menuList = document.querySelector(".menu__list");

	burger.addEventListener("click", () => {
		menuList.classList.toggle("menu__list--open"); // Открываем/закрываем меню
		burger.classList.toggle("menu__burger--open"); // Анимация бургера
	});
});