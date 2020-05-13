const editProfilePopup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileButton = document.querySelector(".popup__close-button");
const nameInput = document.querySelector(".popup__user-name");
const jobInput = document.querySelector(".popup__user-description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function openPopup() {
  editProfilePopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}
function closePopup() {
  editProfilePopup.classList.remove("popup_opened");
}

editProfileButton.addEventListener("click", openPopup);
closeProfileButton.addEventListener("click", closePopup);

const formElement = document.querySelector(".popup__container");

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
