/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (document.body.contains(element)) {
      this.element = element;
    } else {
      const error = 'Переданный элемент не существует';
      throw error;
    };
    this.lastOptions = null;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if(this.lastOptions !== null){
      this.render(this.lastOptions);
    } else{
      this.render();
    };
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const transactionsPage = this;

    this.element.addEventListener('click', function transactionHandler(e) {
      const removeAccountButton = e.target.closest('.remove-account');
      const removeTransactionButton = e.target.closest('.transaction__remove');
      if (removeAccountButton !== null) {
        e.stopPropagation();
        transactionsPage.removeAccount();
      }

      if (removeTransactionButton !== null) {
        e.stopPropagation();
        transactionsPage.removeTransaction(this.dataset.id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions !== null) {
      const result = confirm('Вы действительно хотите удалить счёт?');
      if (result) {
        function removeAccount(err, response) {
          if (response && response.success) {
            App.update();
          };
        };
        Account.remove(this.lastOptions.account_id, {}, removeAccount);
      };
    };
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    if (this.lastOptions !== null) {
      const result = confirm('Вы действительно хотите удалить эту транзакцию?');
      if (result) {
        function removeTransaction(err, response) {
          if (response && response.success) {
            App.update();
          };
        };
        Transaction.remove(id, {}, removeTransaction);
      };
    };
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options && options.account_id) {

      const transactionsPage = this;
      this.lastOptions = options;
      function getAccount(err, response) {
        if (response && response.data) {
          const account = response.data.find(item => item.id === options.account_id);
          transactionsPage.renderTitle(account.name);
        };
      };
      Account.get(options.account_id, {}, getAccount);

      function getTransactionList(err, response) {
        if (response && response.data) {
          transactionsPage.renderTransactions(response.data);
        };
      };
      Transaction.list(options, getTransactionList);
    };
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const contentTitle = this.element.querySelector('.content-title');
    contentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {

  }
}
