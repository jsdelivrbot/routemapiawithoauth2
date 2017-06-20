export class API{

public static API_ENDPOINT =  "http://localhost:4000";

public static API_REGISTER = API.API_ENDPOINT + "/users";

public static API_AccessToken = API.API_ENDPOINT + "/oauth/token";

public static API_AddCustomer = API.API_ENDPOINT + '/api/addcustomer';

public static API_UpdateCustomer = API.API_ENDPOINT + '/api/updatecustomer/';

public static API_GetCustomer = API.API_ENDPOINT + '/api/getcustomer/';

public static API_RemoveCustomer = API.API_ENDPOINT + '/api/removecustomer/';

}