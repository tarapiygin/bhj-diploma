/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebar = document.querySelector('.sidebar-mini');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-open');
      sidebar.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerItem = document.querySelector('.menu-item_register');
    registerItem.addEventListener('click', function registerHandler() {
      const modal = new Modal(App.getModal('register').element);
      modal.open();
    });

    const loginItem = document.querySelector('.menu-item_login');
    loginItem.addEventListener('click', function loginHandler() {
      const modal = new Modal(App.getModal('login').element);
      modal.open();
    });

    const logoutItem = document.querySelector('.menu-item_logout');
    logoutItem.addEventListener('click', function logoutHandler() {
      function resetState(err, response) {
        if (response.success === true) App.setState('init');
      };
      User.logout(data = {}, callback = resetState);
    });
  }

}
