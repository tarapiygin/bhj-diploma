/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const form = this;
    let accountList;
    function getAccountList(err, response) {
      if (response && response.data) {
        accountList = response.data;
        let itemsHTML = ''
        accountList.forEach(item => {
          itemsHTML += `<option value="${item.id}">${item.name}</option>`
        });
        const accountsSelectElement = form.element.querySelector('.accounts-select');
        accountsSelectElement.innerHTML = itemsHTML;
      };
    };
    Account.list({}, getAccountList);
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    const form = this;
    function checkCreateTransaction(err, response) {
      if (response && response.success) {
        
        App.update();
        form.element.reset();
        const modal = new Modal(form.element.closest('.modal'));
        modal.close();
        App.update();
      };
    };
    Transaction.create(options.data, checkCreateTransaction)
  }
}
