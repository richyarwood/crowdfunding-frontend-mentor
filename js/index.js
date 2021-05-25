document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.querySelector(".navigation__hamburger");
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
	const pledgeSubmitButtons = Array.from(
		document.querySelectorAll(".pledge__submit-button")
	);
	const pledgeTotal = document.getElementById("pledge-total");
	let pledgeAmount = 0;
	const pledgeTarget = 10000;
	document.getElementById("pledge-target-amount").innerHTML = pledgeTarget
		.toFixed(0)
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

	let backers = 0;
	const backersTotal = document.getElementById("backers-total");

	const openModal = () => {
		modal.classList.add("modal__wrapper--show");
		modalBackground.classList.add("overlay--show");
		modalPledgeSection.classList.remove("modal__pledge-section--hide");
	};

	const resetRewards = () => {
		entrySections.forEach((section) =>
			section.classList.remove("modal-pledge-card-entry--open")
		);

		modalPledgeCards.forEach((card) =>
			card.classList.remove("modal-pledge-card--open")
		);
	};

	const openSelectedReward = (evt, items) => {
		resetRewards();
		console.log(evt.target.id, "TARGET");
		console.log(items);

		const pledgeIndex = items.findIndex((item) => {
			console.log(evt.target.id, "TARGET");
			console.log(item.id, "ITEM");
			return item.id === evt.target.id;
		});

		console.log(entrySections[pledgeIndex]);

		entrySections[pledgeIndex].classList.add("modal-pledge-card-entry--open");
		modalPledgeCards[pledgeIndex].classList.add("modal-pledge-card--open");
		entrySections[pledgeIndex].scrollIntoView({
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
		const pledgeTracker = document.querySelector(".progress-bar-inner");
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

	hamburger.addEventListener("click", () =>
		navigationItems.classList.toggle("navigation__items--active")
	);
	backProjectButton.addEventListener("click", openModal);
	modalCloseButton.addEventListener("click", closeModal);
	pledgeSelects.forEach((item) =>
		item.addEventListener("click", (e) => openSelectedReward(e, pledgeSelects))
	);
	selectRewards.forEach((item) => {
		item.addEventListener("click", (e) => {
			openModal();
			openSelectedReward(e, selectRewards);
		});
	});
	pledgeSubmitButtons.forEach((button) =>
		button.addEventListener("click", (evt) => submitPledge(evt))
	);
	modalThanksButton.addEventListener("click", () => closeThanksModal());
});
