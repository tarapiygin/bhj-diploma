/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const user = localStorage.getItem('user');
    if (user !== null) {
      return user;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    const url = User.URL + '/current';
    const modifiedCallback = (err, response) => {
      if (response && response.user) {
        User.setCurrent(response.user);
      } else {
        User.unsetCurrent();
      }
      callback(err, response);
    }
    const options = {
      url: url, // адрес
      data: data,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'GET', // метод запроса
      callback: modifiedCallback,
    };
    return createRequest(options);
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    const url = User.URL + '/login';
    const modifiedCallback = (err, response) => {
      if (response && response.user) {
        User.setCurrent(response.user);
      };
      callback(err, response);
    }
    const options = {
      url: url, // адрес
      data: data,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'POST', // метод запроса
      callback: modifiedCallback,
    };
    return createRequest(options);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = f => f) {
    const url = User.URL + '/register';
    const modifiedCallback = (err, response) => {
      if (response && response.user) {
        User.setCurrent(response.user);
      }
      callback(err, response);
    }
    const options = {
      url: url, // адрес
      data: data,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'POST', // метод запроса
      callback: modifiedCallback,
    };
    return createRequest(options);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f) {
    const url = User.URL + '/logout';
    const modifiedCallback = (err, response) => {
      if (response && response.success === true) {
        User.unsetCurrent;
      }
      callback(err, response);
    }
    const options = {
      url: url, // адрес
      data: data,
      responseType: 'json', // формат, в котором необходимо выдать результат
      method: 'POST', // метод запроса
      callback: modifiedCallback,
    };
    return createRequest(options);
  }
}
