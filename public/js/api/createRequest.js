/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    let formData;
    let param = '';
    if (options.method === 'POST') {
        formData = new FormData;

        if ('data' in options) {
            for (let key in options.data) {

                formData.set(key, options.data[key])
            };
        };
    } else {
        if ('data' in options) {
            
            param += '?';
            for (let key in options.data) {
                param += encodeURI(key) + '=';
                param += encodeURI(options.data[key]) + '&';
            }
        }
    };

    xhr.open(options.method, options.url + param)

    if ('headers' in options) {
        for (key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
    };

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === xhr.DONE && this.status === 200) {
            if(this.response.error) options.callback(err = this.response.error);
            else options.callback(err = null, this.response);
        }
    });

    if ('headers' in options) {
        for (let key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
    };
    xhr.responseType = options.responseType;
    xhr.withCredentials = true;
    
    try {
        if (formData !== undefined) xhr.send(formData)
        else xhr.send();
        return xhr;
    }
    catch (e) {
        options.callback(err = e);
    }
};