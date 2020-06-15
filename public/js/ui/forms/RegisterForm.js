/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    debugger;
    const form = this;
    function checkRegistration(err, response) {
      if (response && response.user) {
        form.element.reset();
        App.setState('user-logged');
        const modal = new Modal(App.getModal('register').element);
        modal.close();
      }
    }
    User.register(options.data, checkRegistration);
  }
}
