const editProfilePopup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileButton = document.querySelector(".popup__close-button");
let nameInput = document.querySelector(".popup__user_value_name");
let jobInput = document.querySelector(".popup__user_value_description");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__container");

function popup() {
  editProfilePopup.classList.toggle("popup_opened");
  if (editProfilePopup.classList.contains("popup_opened")) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popup();
}

editProfileButton.addEventListener("click", popup);
closeProfileButton.addEventListener("click", popup);
formElement.addEventListener("submit", formSubmitHandler);
