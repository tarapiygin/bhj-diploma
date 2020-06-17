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
    if (this.lastOptions !== null) {
      this.render(this.lastOptions);
    } else {
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
        transactionsPage.removeTransaction(removeTransactionButton.dataset.id);
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
        this.clear();
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
          transactionsPage.renderTitle(response.data.name);
        };
      };
      Account.get(options.account_id, {}, getAccount);

      function getTransactionList(err, response) {
        if (response && response.data) {
          const formatData = response.data.map(item =>{
            return {
              "id": item.id,
              "type": item.type.toLowerCase(),
              "name": item.name,
              "date": item.created_at,
              "sum": item.sum
            }
          })
          transactionsPage.renderTransactions(formatData);
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
    this.lastOptions = null;
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
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
    const nameMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const dateObj = new Date(date);
    const hours = `${(dateObj.getHours() < 10) ? '0' + dateObj.getHours() : dateObj.getHours()}`;
    const minutes = `${(dateObj.getMinutes() < 10) ? '0' + dateObj.getMinutes() : dateObj.getMinutes()}`;
    const formatDate = `${dateObj.getDate()} ${nameMonth[dateObj.getMonth()]} ${dateObj.getFullYear()} г. в ${hours}:${minutes}`;
    return formatDate;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    const TransactionHTML = `
    <div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <!-- дата -->
            <div class="transaction__date">${this.formatDate(item.date)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        <!--  сумма -->
            ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>`
    return TransactionHTML;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    let commonTransactionHTML = '';
    data.forEach(transaction => {
      commonTransactionHTML += this.getTransactionHTML(transaction);
    });
    const contentElement = this.element.querySelector('.content');
    contentElement.innerHTML = commonTransactionHTML;
  }
}
