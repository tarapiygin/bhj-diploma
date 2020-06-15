/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    const options = {
      url: Entity.URL, // адрес
      data: data,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'GET', // метод запроса
      callback: callback,
    };
    return createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    const modifiedData = Object.assign({ _method: 'PUT' }, data );
    const options = {
      url: Entity.URL, // адрес
      data: modifiedData,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'POST', // метод запроса
      callback: callback,
    };
    return createRequest(options);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    const modifiedData = Object.assign({id}, data );
    const options = {
      url: Entity.URL, // адрес
      data: modifiedData,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'GET', // метод запроса
      callback: callback,
    };
    return createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    const modifiedData = Object.assign({id, _method: 'DELETE'}, data);
    const options = {
      url: Entity.URL, // адрес
      data: modifiedData,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'POST', // метод запроса
      callback: callback,
    };
    return createRequest(options);
  }
}

