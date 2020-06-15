/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(options) {
    const form = this;
    function checkCreateAccount(err, response) {
      if (response && response.account) {
        form.element.reset();
        const modal = new Modal(App.getModal('createAccount').element);
        modal.close();
        App.update();
      }
    }
    Account.create(options.data, checkCreateAccount);
  }
}

