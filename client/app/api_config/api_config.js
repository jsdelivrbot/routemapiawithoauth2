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
API.API_UpdateAreacode = API.API_ENDPOINT + '/api/updateareacode/';
API.API_AddEmployee = API.API_ENDPOINT + '/api/addemployee';
API.API_UpdateEmployee = API.API_ENDPOINT + '/api/updateemployee/';
API.API_AddClient = API.API_ENDPOINT + '/api/addclient';
API.API_UpdateClient = API.API_ENDPOINT + '/api/updateclient/';
API.API_AddServicerequest = API.API_ENDPOINT + '/api/addservicerequest';
API.API_UpdateServicerequest = API.API_ENDPOINT + '/api/updateservicerequest/';
API.API_UpdateCustomer = API.API_ENDPOINT + '/api/updatecustomer/';
API.API_GetCustomer = API.API_ENDPOINT + '/api/getcustomer/';
API.API_GetEmployee = API.API_ENDPOINT + '/api/getemployee/';
API.API_GetAreacode = API.API_ENDPOINT + '/api/getareacode/';
API.API_GetClients = API.API_ENDPOINT + '/api/getclients/';
API.API_GetServicerequest = API.API_ENDPOINT + '/api/getservicerequest/';
API.API_GetClientcodedetail = API.API_ENDPOINT + '/api/getclientcodedetails/';
API.API_RemoveCustomer = API.API_ENDPOINT + '/api/removecustomer/';
API.API_RemoveArea = API.API_ENDPOINT + '/api/removearea/';
API.API_RemoveService = API.API_ENDPOINT + '/api/removeservice/';
API.API_UpdatePassword = API.API_ENDPOINT + '/api/updatepassword';
exports.API = API;
//# sourceMappingURL=api_config.js.map