import Axios from './axios';

Axios.get('test.txt');
Axios.get('test.txt',{ headers: { aaa: 123 } });

Axios.post('test.txt');
Axios.post('test.txt', { a: 123, b: 12 });
Axios.post('test.txt', [12,45,78]);

let form = new FormData();
Axios.post('test.txt', form);
Axios.post('test.txt', 'asfasfas');
Axios.post('test.txt', form, { headers: { a: 12, b: 45 } });


Axios.delete('test.txt');
Axios.delete('test.txt', { parmas: { a: 12, b: 45 } });

Axios('test.txt');
Axios({url: 'test.txt', params: { a: 12, b: 15 }, headers: { a: 78 }});
Axios('test.txt',{baseUrl: 'http://www.baidu.com/', params: { a: 12, b: 15 }, headers: { a: 78 }});