export default class FormValidator {
  constructor (obj, formClass) {
    this._obj = obj; // объект с настройками валидации (селекторы, классы)
    this._formClass = formClass; // форма, которую нужно валидировать
    this._inputs = Array.from(this._formClass.querySelectorAll(obj.inputSelector)); // собираем инпуты формы
    this._error = Array.from(this._formClass.querySelectorAll(obj.errorSelector)); // элементы для отображения ошибок
    this._button = this._formClass.querySelector(obj.buttonSelector); // находим кнопку отправки формы
  }

  // Включение валидации для формы
  enableValidation = () => {
    this._setEventListener(this._formClass); // добавляем слушатели событий для формы
  }

  // Обработка ввода в инпуты
  handleInput(evt, errorClass) {
    const input = evt.target; // получаем текущий инпут, с которым взаимодействуют
    const error = document.querySelector(`#${input.id}-error`); // находим элемент ошибки по ID инпута
    if (input.checkValidity()) { // если инпут валиден
      input.classList.remove(errorClass); // убираем класс ошибки
      error.textContent = ''; // очищаем текст ошибки
    } else { // если инпут не валиден
      input.classList.add(errorClass); // добавляем класс ошибки
      error.textContent = input.validationMessage; // выводим сообщение об ошибке
    }
  }

  // Переключение состояния кнопки сабмита в зависимости от валидности формы
  toggleValidButton(formElement, inactiveButtonClass) {
    const submitButton = formElement.querySelector('.popup__button'); // находим кнопку отправки формы
    const isFormValid = formElement.checkValidity(); // проверяем, валидна ли вся форма
    submitButton.disabled = !isFormValid; // если форма невалидна, блокируем кнопку
    submitButton.classList.toggle(inactiveButtonClass, !isFormValid); // добавляем/убираем класс неактивной кнопки
  }

  // Устанавливаем слушатели событий для инпутов и формы
  _setEventListener() {
    const formElements = Array.from(document.querySelectorAll(this._obj.formSelector)); // собираем все формы по селектору
    formElements.forEach(formElement => { // проходим по каждой форме
      const inputElements = Array.from(formElement.querySelectorAll(this._obj.inputSelector)); // собираем инпуты формы
      inputElements.forEach(input => { // для каждого инпута
        input.addEventListener('input', (e) => this.handleInput(e, this._obj.errorClass)); // добавляем слушатель ввода, чтобы валидировать инпут
      });
      formElement.addEventListener('input', (e) => this.toggleValidButton(formElement, this._obj.inactiveButtonClass)); // добавляем слушатель на форму для проверки кнопки отправки
    })
  }
}
