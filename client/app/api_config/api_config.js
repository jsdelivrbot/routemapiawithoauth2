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
API.API_UpdateCustomer = API.API_ENDPOINT + '/api/updatecustomer/';
API.API_GetCustomer = API.API_ENDPOINT + '/api/getcustomer/';
API.API_RemoveCustomer = API.API_ENDPOINT + '/api/removecustomer/';
exports.API = API;
//# sourceMappingURL=api_config.js.map