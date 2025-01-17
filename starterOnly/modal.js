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
// Tableau d'erreurs vide
const errors = new Array();

// Fonction permettant la mise à zero du formulaire
function resetForm() {
  reserveForm.reset();
  errors.forEach((error) => {
    // Récupération de tous les éléments servant à l'affichage des erreurs
    const element = document.getElementById(`${error.id}_error`);
    // L'élément existe
    if (element != null) {
      if (error.active) {
        element.style.display = "none";
        element.parentNode.setAttribute("data-error-visible", false);
      }
    }
  });
}

// Fonction d'ouverture du modal
function launchModal() {
  modalBg.style.display = "block";
}

// Fonction de fermeture du modal
function closeModal() {
  modalBg.style.display = "none";
  resetForm();
}
// Fonction qui permet d'envoyer le formulaire
function validate(event) {
  event.preventDefault();

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
  if (
    !birthDate ||
    selectedBirthDate.getFullYear() > currentDate.getFullYear() - 16
  )
    errors.push({ id: "birthdate", active: true });
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
      reserveForm.style.display = "none";

      // Création des nouveaux éléments
      const title = document.createElement("p");
      const closeButton = document.createElement("input");
      closeButton.type = "submit";
      closeButton.value = "Fermer";

      // Intégration des textes sur chaque élément.
      title.innerText = "Merci ! Votre réservation a été reçue.";

      // Ajout des événements sur les éléments
      closeButton.addEventListener("click", reserveForm.submit());

      // Ajout des classes de style sur les éléments
      modalContent.classList.add("content_success");
      title.classList.add("title");
      closeButton.classList.add("btn_submit_success");

      // Ajout des éléments dans le corps du modal
      modalBody.appendChild(title);
      modalBody.appendChild(closeButton);
    }
  } else {
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

// Evenements des boutons du modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.addEventListener("click", closeModal);
// Ajout de l'événement d'envoi du formulaire
const reserveForm = document.getElementById("reserve");
reserveForm.addEventListener("submit", (event) => validate(event));