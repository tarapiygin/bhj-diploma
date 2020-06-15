/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */
class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (document.body.contains(element)) {
      this.element = element;
    } else {
      const error = 'Переданный элемент не существует';
      throw error;
    };
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update() {
    if (User.current() !== undefined) {
      const userNameElement = document.querySelector('.user-name');
      userNameElement.textContent = User.current().name;
    }
  }
}
