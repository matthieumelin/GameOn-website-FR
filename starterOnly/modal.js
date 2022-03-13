function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelector(".close");
const modalSubmitBtn = document.querySelector(".btn-submit");
const formData = document.querySelectorAll(".formData");

// Evenements des boutons du modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.addEventListener("click", closeModal);

// Fonction d'ouverture du modal
function launchModal() {
  modalBg.style.display = "block";
}

// Fonction de fermeture du modal
function closeModal() {
  modalBg.style.display = "none";
}

// Ajout de l'événement d'envoi du formulaire
const reserveForm = document.getElementById("reserve");
reserveForm.addEventListener("submit", (event) => validate(event));

// Fonction qui permet d'envoyer le formulaire
function validate(event) {
  // Tableau d'erreurs vide
  const errors = new Array();

  // Entrées du formulaire
  const first = document.getElementById("first").value;
  const last = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthDate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  const locations = document.querySelectorAll('input[name="location"]');
  const conditions = document.getElementById("checkbox1").checked;
  const currentDate = new Date(Date.now());
  const selectedBirthDate = new Date(
    document.getElementById("birthdate").value
  );
  const isLocationChecked = Array.from(locations).filter(
    (input) => input.checked
  );

  // Vérification de chaque entrée
  // Un prénom est renseigner et a un minimum de 2 caractères.
  if (!first || first.length < 2) errors.push({ id: "first", active: true });
  else errors.push({ id: "first", active: false });
  // Un nom est renseigner et a un minimum de 2 caractères.
  if (!last || last.length < 2) errors.push({ id: "last", active: true });
  else errors.push({ id: "last", active: false });
  // Une email est bien renseigner.
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    errors.push({ id: "email", active: true });
  else errors.push({ id: "email", active: false });
  // Une date d'anniversaire est bien remplie et au moins agé de 16 ans.
  if (!birthDate || selectedBirthDate.getFullYear() > currentDate.getFullYear() - 16) errors.push({ id: "birthdate", active: true });
  else errors.push({ id: "birthdate", active: false });
  // Une quantité est bien remplie et correspond bien à une valeure numérique
  if (!quantity || !quantity.match(/^\d+$/) || quantity < 0)
    errors.push({ id: "quantity", active: true });
  else errors.push({ id: "quantity", active: false });
  // Une location est bien renseigner.
  if (isLocationChecked.length <= 0)
    errors.push({ id: "location", active: true });
  else errors.push({ id: "location", active: false });
  // La case conditions d'utilisations est bien cochée.
  if (!conditions) errors.push({ id: "cgu", active: true });
  else errors.push({ id: "cgu", active: false });

  // Si le formulaire ne posséde aucune erreur.
  if (errors.every((error) => !error.active)) {
    const modalBody = document.querySelector(".modal-body");
    const modalContent = document.querySelector(".content");
    if (modalBody && modalContent) {
      // Création des nouveaux éléments
      const title = document.createElement("p");
      const closeButton = document.createElement("button");

      // Intégration des textes sur chaque élément.
      title.innerText = "Merci ! Votre réservation a été reçue.";
      closeButton.innerText = "Fermer";

      // Ajout des événements sur les éléments
      closeButton.addEventListener("click", closeModal);

      // Tous les sous-éléments sont supprimés.
      modalBody.innerHTML = "";

      // Création du style de chaque élément
      const modalContentStyle = {
        margin: "20px auto",
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      };
      const titleStyle = {
        fontSize: "22px",
        fontWeight: "normal",
        textAlign: "center",
      };
      const buttonStyle = {
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#FE142F",
        color: "white",
        padding: "5px 10px",
        cursor: "pointer",
        display: "block",
        margin: "0 auto",
        position: "absolute",
        bottom: "20px",
        left: "0",
        right: "0",
        width: "max-content",
      };

      // Ajout du style sur les éléments
      Object.assign(title.style, titleStyle);
      Object.assign(closeButton.style, buttonStyle);
      Object.assign(modalContent.style, modalContentStyle);

      // Ajout des éléments dans le corps du modal
      modalBody.appendChild(title);
      modalBody.appendChild(closeButton);
    }
  } else {
    // Aucun rafraichissement de page
    event.preventDefault();

    // Affichage de toutes les erreurs
    errors.forEach((error) => {
      // Récupération de tous les éléments servant à l'affichage des erreurs
      const element = document.getElementById(`${error.id}_error`);
      // L'élément existe
      if (element != null) {
        if (error.active) {
          element.style.display = "block";
          element.parentNode.setAttribute("data-error-visible", true);
        } else {
          element.style.display = "none";
          element.parentNode.setAttribute("data-error-visible", false);
        }
      }
    });
  }
}
