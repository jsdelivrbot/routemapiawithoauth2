"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API = (function () {
    function API() {
    }
    return API;
}());
API.API_ENDPOINT = "http://localhost:4000";
API.API_REGISTER = API.API_ENDPOINT + "/users";
API.API_AccessToken = API.API_ENDPOINT + "/oauth/token";
API.API_AddCustomer = API.API_ENDPOINT + '/api/addcustomer';
API.API_AddAreacode = API.API_ENDPOINT + '/api/addareacode';
API.API_AddEmployee = API.API_ENDPOINT + '/api/addemployee';
API.API_AddClient = API.API_ENDPOINT + '/api/addclient';
API.API_UpdateCustomer = API.API_ENDPOINT + '/api/updatecustomer/';
API.API_GetCustomer = API.API_ENDPOINT + '/api/getcustomer/';
API.API_GetAreacode = API.API_ENDPOINT + '/api/getareacode/';
API.API_RemoveCustomer = API.API_ENDPOINT + '/api/removecustomer/';
API.API_UpdatePassword = API.API_ENDPOINT + '/api/updatepassword';
exports.API = API;
//# sourceMappingURL=api_config.js.map