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
    const newData = data;
    newData['_method'] = 'PUT';
    const options = {
      url: Entity.URL, // адрес
      data: newData,
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
    const newData = data;
    newData['id'] = id;
    const options = {
      url: Entity.URL, // адрес
      data: newData,
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
    const newData = data;
    newData['id'] = id;
    newData['_method'] = 'DELETE';
    const options = {
      url: Entity.URL, // адрес
      data: newData,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'POST', // метод запроса
      callback: callback,
    };
    return createRequest(options);
  }
}

