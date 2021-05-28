document.addEventListener("DOMContentLoaded", () => {
	let pledgeAmount = 5000;
	const pledgeTarget = 100000;
	let backers = 150;

	const hamburger = document.querySelector(".navigation__hamburger");
	const contentWrapper = document.querySelector(".content-wrapper");
	const navigationItems = document.querySelector(".navigation__items");
	const backProjectButton = document.getElementById("back-project-button");
	const modalBackground = document.querySelector(".overlay");
	const modal = document.querySelector(".modal__wrapper");
	const modalPledgeSection = document.querySelector(".modal__pledge-section");
	const modalCloseButton = document.querySelector(".modal__close-icon");
	const thanksModal = document.querySelector(".modal__thanks");
	const modalThanksButton = document.getElementById("modal-thanks-button");
	const selectRewards = Array.from(
		document.querySelectorAll(".button__select-reward")
	);
	const modalPledgeCards = Array.from(
		document.querySelectorAll(".modal-pledge-card")
	);
	const entrySections = Array.from(
		document.querySelectorAll(".modal-pledge-card-entry")
	);
	const pledgeSelects = Array.from(
		document.querySelectorAll(".modal-pledge-card__select input[type=radio]")
	);
	const pledgeSelectLabels = Array.from(
		document.querySelectorAll(".modal-pledge-card__select-label")
	);
	const pledgeSubmitButtons = Array.from(
		document.querySelectorAll(".pledge__submit-button")
	);

	const pledgeSelectInputs = Array.from(
		document.querySelectorAll("input[type='radio']")
	);
	const pledgeTotal = document.getElementById("pledge-total");
	document.getElementById("pledge-target-amount").innerHTML = pledgeTarget
		.toFixed(0)
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

	pledgeTotal.innerHTML = pledgeAmount
		.toFixed(0)
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

	const backersTotal = document.getElementById("backers-total");
	backersTotal.innerHTML = backers;

	const pledgeTracker = document.querySelector(".progress-bar-inner");
	pledgeTracker.setAttribute(
		"style",
		`width: ${(pledgeAmount / pledgeTarget) * 100}%`
	);

	const openModal = () => {
		modal.classList.add("modal__wrapper--show");
		modalBackground.classList.add("overlay--show");
		modalPledgeSection.classList.remove("modal__pledge-section--hide");
		contentWrapper.setAttribute("tabindex", -1);
		contentWrapper.setAttribute("aria-hidden", "true");
		modalPledgeSection.setAttribute("tabindex", 0);
		modalPledgeSection.focus();
	};

	const resetRewards = () => {
		entrySections.forEach((section) =>
			section.classList.remove("modal-pledge-card-entry--open")
		);

		modalPledgeCards.forEach((card) =>
			card.classList.remove("modal-pledge-card--open")
		);
	};

	const openSelectedReward = (index) => {
		resetRewards();

		entrySections[index].classList.add("modal-pledge-card-entry--open");
		modalPledgeCards[index].classList.add("modal-pledge-card--open");
		entrySections[index].scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "nearest",
		});
	};

	const closeModal = () => {
		modal.classList.remove("modal__wrapper--show");
		modalBackground.classList.remove("overlay--show");

		resetRewards();
	};

	const setPledgeAmount = (amount) => {
		pledgeAmount += amount;
		pledgeTotal.innerHTML = pledgeAmount
			.toFixed(0)
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

		pledgeTracker.setAttribute(
			"style",
			`width: ${(pledgeAmount / pledgeTarget) * 100}%`
		);
	};

	const getFormValue = (evt) => {
		evt.preventDefault();
		const form = evt.target.closest("form");
		const formDataValue = parseInt(new FormData(form).get("value"));

		console.log(formDataValue);

		if (!formDataValue) return;

		setPledgeAmount(formDataValue);
	};

	const showThanksModal = () => {
		thanksModal.classList.add("modal__thanks--open");
		modalPledgeSection.classList.add("modal__pledge-section--hide");
	};

	const submitPledge = (evt) => {
		getFormValue(evt);
		resetRewards();
		showThanksModal();

		backers += 1;
		backersTotal.innerHTML = backers;
	};

	const closeThanksModal = () => {
		thanksModal.classList.remove("modal__thanks--open");
		resetRewards();
		closeModal();
	};

	hamburger.addEventListener("click", () => {
		navigationItems.classList.toggle("navigation__items--active");
		let expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
		hamburger.setAttribute("aria-expanded", !expanded);
	});

	backProjectButton.addEventListener("click", openModal);

	modalCloseButton.addEventListener("click", closeModal);

	selectRewards.forEach((item, index) => {
		item.addEventListener("click", () => {
			resetRewards();
			openModal();
			openSelectedReward(index + 1);
		});
	});

	pledgeSelects.forEach((item, index) => {
		item.addEventListener("click", () => {
			openSelectedReward(index);
		});
	});

	pledgeSelectLabels.forEach((label, index) => {
		label.addEventListener("keydown", (e) => {
			if (e.keyCode === 13) {
				pledgeSelectInputs[index].checked = true;
				openSelectedReward(index);
			}
		});
	});

	pledgeSubmitButtons.forEach((button) =>
		button.addEventListener("click", (evt) => submitPledge(evt))
	);

	modalThanksButton.addEventListener("click", () => closeThanksModal());
});
