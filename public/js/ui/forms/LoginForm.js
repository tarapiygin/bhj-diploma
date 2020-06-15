/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    const form = this;
    function checkLogin(err, response) {
      if (response && response.user) {
        form.element.reset();
        App.setState('user-logged');
        const modal = new Modal(App.getModal('login').element);
        modal.close();
      }
    }
    User.login(options.data, checkLogin);
  }
}

