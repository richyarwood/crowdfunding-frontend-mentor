document.addEventListener("DOMContentLoaded", () => {
	const modal = document.querySelector(".modal-wrapper");
	const modalBackground = document.querySelector(".modal-background");
	const backProjectButton = document.getElementById("back-project-button");

	// OPEN MODAL
	const openPledgeModal = () => {
		modal.classList.add("modal-wrapper--show");
		modalBackground.classList.add("modal-background--show");
	};

	backProjectButton.addEventListener("click", openPledgeModal);

	// EXPAND MODAL PLEDGE ENTRY =============================
	const modalPledgeCards = Array.from(
		document.querySelectorAll(".modal-pledge-cards-container .pledge-card")
	);
	const entrySections = Array.from(
		document.querySelectorAll(".modal-pledge-card-entry")
	);
	const pledgeSelects = Array.from(
		document.querySelectorAll(".modal-pledge-select input[type=radio]")
	);

	pledgeSelects.forEach((item) =>
		item.addEventListener("click", (e) => openPledgeEntry(e))
	);

	const openPledgeEntry = (e) => {
		const pledgeIndex = pledgeSelects.findIndex((item) => {
			return item.id === e.target.id;
		});

		entrySections.forEach((section) =>
			section.classList.remove("modal-pledge-card-entry--open")
		);

		modalPledgeCards.forEach((card) =>
			card.classList.remove("pledge-card--selected")
		);

		entrySections[pledgeIndex].classList.add("modal-pledge-card-entry--open");
		modalPledgeCards[pledgeIndex].classList.add("pledge-card--selected");
	};
});
