/* Formulaires sans backend : ouverture du client mail du visiteur
   avec un message pre-rempli vers contact@armdgroup.com.
   A remplacer par un vrai endpoint (Formspree ou equivalent) des qu'il existe. */
(function () {
  var DEST = "contact@armdgroup.com";

  var contact = document.querySelector(".contact-form");
  if (contact) {
    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contact.reportValidity()) return;
      var f = new FormData(contact);
      var mandat = contact.querySelector('[name="mandat"] option:checked');
      var subject = "Contact ARMD - " + (mandat ? mandat.textContent : "Demande");
      var body =
        "Nom : " + (f.get("nom") || "") + "\n" +
        "Email : " + (f.get("email") || "") + "\n" +
        "Organisation : " + (f.get("organisation") || "-") + "\n" +
        "Type de mandat : " + (mandat ? mandat.textContent : "-") + "\n\n" +
        (f.get("message") || "");
      window.location.href =
        "mailto:" + DEST +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  var news = document.querySelector(".newsletter__form");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = news.querySelector('input[type="email"]');
      if (!input || !input.reportValidity()) return;
      window.location.href =
        "mailto:" + DEST +
        "?subject=" + encodeURIComponent("Inscription newsletter ARMD") +
        "&body=" + encodeURIComponent("Merci de m'inscrire à la newsletter ARMD.\nEmail : " + input.value);
      var btn = news.querySelector("button");
      if (btn) btn.textContent = "Bienvenue";
    });
  }
})();
