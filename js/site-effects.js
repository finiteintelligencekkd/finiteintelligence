(function () {
  var whatsappNumber = "919497838394";
  var whatsappText = encodeURIComponent(
    "Hello Finite Intelligence, I would like to know more about workshop booking."
  );
  var workshopLinks = document.querySelectorAll(".workshop_link");

  if (!document.querySelector(".whatsapp_float")) {
    var whatsappLink = document.createElement("a");
    whatsappLink.className = "whatsapp_float";
    whatsappLink.href = "https://wa.me/" + whatsappNumber + "?text=" + whatsappText;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.textContent = "WhatsApp Us";
    document.body.appendChild(whatsappLink);
  }

  if (workshopLinks.length) {
    var workshopPopup = document.createElement("div");
    workshopPopup.className = "workshop_popup";
    workshopPopup.innerHTML =
      '<div class="workshop_popup_card" role="dialog" aria-modal="true" aria-labelledby="workshopPopupTitle">' +
      '<h4 id="workshopPopupTitle">Book Workshop</h4>' +
      '<p class="workshop_popup_text"></p>' +
      '<div class="workshop_popup_actions">' +
      '<button type="button" class="workshop_popup_cancel">Cancel</button>' +
      '<button type="button" class="workshop_popup_continue">Continue</button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(workshopPopup);

    var popupText = workshopPopup.querySelector(".workshop_popup_text");
    var popupCancel = workshopPopup.querySelector(".workshop_popup_cancel");
    var popupContinue = workshopPopup.querySelector(".workshop_popup_continue");
    var pendingUrl = "";

    function openWorkshopPopup(label, url) {
      pendingUrl = url;
      popupText.textContent = "You selected " + label + ". Continue to WhatsApp?";
      workshopPopup.classList.add("show");
      document.body.classList.add("popup_open");
    }

    function closeWorkshopPopup() {
      workshopPopup.classList.remove("show");
      document.body.classList.remove("popup_open");
      pendingUrl = "";
    }

    popupCancel.addEventListener("click", closeWorkshopPopup);
    popupContinue.addEventListener("click", function () {
      if (pendingUrl) {
        window.open(pendingUrl, "_blank", "noopener,noreferrer");
      }
      closeWorkshopPopup();
    });

    workshopPopup.addEventListener("click", function (event) {
      if (event.target === workshopPopup) {
        closeWorkshopPopup();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && workshopPopup.classList.contains("show")) {
        closeWorkshopPopup();
      }
    });

    workshopLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var item = link.querySelector(".workshop_item h5");
        var card = link.querySelector(".workshop_item");
        var workshopName = item ? item.textContent.trim() : "";
        var label = workshopName || link.getAttribute("data-workshop") || "a workshop";
        var text = encodeURIComponent(
          "Hello Finite Intelligence, I want to book " + label + " workshop."
        );
        var url = "https://wa.me/" + whatsappNumber + "?text=" + text;

        if (card) {
          card.classList.remove("workshop-selected");
          void card.offsetWidth;
          card.classList.add("workshop-selected");
        }

        setTimeout(function () {
          openWorkshopPopup(label, url);
        }, 220);
      });
    });
  }

  var revealItems = document.querySelectorAll(".reveal");
  revealItems.forEach(function (item) {
    item.classList.add("in-view");
  });
})();
