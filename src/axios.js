import _default from './default';
import { merge, assert, clone } from './common';
import request from './request';
const urlLib = require('url');
class Axios {
    constructor(){
        const self = this;
        return new Proxy(request, {
            get(data, name){
                return self[name];
            },
            set(data, name, val){
                self[name] = val;
                return true;
            },
            apply(fn, thisArg, args){
                let options = self._preprocessArgs(undefined, args);
                if(!options){
                    if(args.length == 2){
                        assert(typeof args[0] == 'string', 'args[0] must is string');
                        assert(typeof args[1] == 'object' && args[1] && args[1].constructor == Object, 'args[1] must is JSON');
                        options = {
                            ...args[1],
                            url: args[0]
                        }
                        self.request(options);
                    }else{
                        assert(false, 'invaild argments');
                    }
                }
            }
        })
    }
    _preprocessArgs(method, args){
        let options;
        if(args.length == 1 && typeof args[0] == 'string'){
            options = { method, url: args[0] };
            this.request(options);
        }else if(args.length == 1 && args[0].constructor == Object){
            options = {
                ...args[0],
                method
            };
            this.request(options)
        }else {
            return undefined;
        }
        return options;
    }
    request(options){
        let _headers = this.default.headers;
        delete this.default.headers;
        let result = clone(this.default);
        merge(result, this.default);
        merge(result, options);
        this.default.headers = _headers;
        options = result;

        let headers = {};
        merge(headers, this.default.headers.common);
        merge(headers, this.default.headers[options.method.toLowerCase()]);
        merge(headers, options.headers);

        options.headers = headers;

        assert(options.method, 'no method');
        assert(typeof options.method == 'string', 'method must be string');
        assert(options.url, 'no url');
        assert(typeof options.url == 'string', 'url must be string');

        options.url = urlLib.resolve(options.baseUrl, options.url);
        delete options.baseUrl;

        console.log(options)
        request(options);
    }
    get(...args){
        let options = this._preprocessArgs('get', args);
        if(!options){
            if(args.length == 2){
                assert(typeof args[0] == 'string', 'args[0] must is string');
                assert(typeof args[1] == 'object' && args[1] && args[1].constructor == Object, 'args[1] must is JSON');
                options = {
                    ...args[1],
                    url: args[0],
                    method: 'get'
                }
                this.request(options);
            }else{
                assert(false, 'invaild argments');
            }
        }
    }
    post(...args){
        let options = this._preprocessArgs('post', args);
        if(!options){
            if(args.length ==2){
                assert(typeof args[0] == 'string', 'args[0] must is string');
                options = {
                    url: args[0],
                    data: args[1],
                    method: 'post'
                }
                this.request(options);
            }else if(args.length ==3){
                assert(typeof args[0] == 'string', 'args[0] must is string');
                assert(typeof args[2] == 'object' && args[2] && args[2].constructor == Object, 'args[2] must is JSON');
                options = {
                    ...args[2],
                    url: args[0],
                    data: args[1],
                    method: 'post'
                }
                this.request(options);
            }else{
                assert(false, 'invaild argments');
            }
        }
    }
    delete(...args){
        let options = this._preprocessArgs('delete', args);
        if(!options){
            assert(typeof args[0] == 'string', 'args[0] must is string');
            assert(typeof args[1] == 'object' && args[1].constructor == Object, 'args[1] must is JSON');
            options = {
                ...args[1],
                url: args[0],
                method: 'delete'
            }
            this.request(options);
        }
    }
}
Axios.create = Axios.prototype.create = function(options = {}){
    let axios = new Axios();
    let res = JSON.parse(JSON.stringify(_default));
    merge(res, options);
    axios.default = res;
    return axios;
}
export default Axios.create();