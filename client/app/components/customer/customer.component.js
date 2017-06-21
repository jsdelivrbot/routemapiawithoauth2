"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var Observable_1 = require("rxjs/Observable");
var api_config_1 = require("./../../api_config/api_config");
require("jquery");
require("datatables.net");
var CustomerComponent = (function () {
    function CustomerComponent(router, http) {
        this.router = router;
        this.http = http;
        // google maps zoom level
        this.zoom = 8;
        // initial center position for the map
        this.lat = 51.673858;
        this.lng = 7.815982;
        this.markers = [
            {
                lat: 51.673858,
                lng: 7.815982,
                label: 'A',
                draggable: true
            },
            {
                lat: 51.373858,
                lng: 7.215982,
                label: 'B',
                draggable: false
            },
            {
                lat: 51.723858,
                lng: 7.895982,
                label: 'C',
                draggable: true
            }
        ];
        // just an interface for type safety.
        //  mapClicked($event: MouseEvent) {
        //     this.markers.push({
        //       lat: $event.coords.lat,
        //       lng: $event.coords.lng
        //     });
        //   }
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd/mm/yyyy',
        };
        this.date();
        $(document).ready(function () {
            $('#example').DataTable();
        });
        $(document).ready(function () {
            $('#areaexample').DataTable();
        });
        $(document).ready(function () {
            $('#example3').DataTable();
        });
        $(document).ready(function () {
            $('#example4').DataTable();
        });
        $(document).ready(function () {
            $('#example5').DataTable();
        });
    }
    CustomerComponent.prototype.clickedMarker = function (label, index) {
        console.log("clicked the marker: " + (label || index));
    };
    CustomerComponent.prototype.markerDragEnd = function (m, $event) {
        console.log('dragEnd', m, $event);
    };
    CustomerComponent.prototype.ngOnInit = function () {
        //called after the constructor and called  after the first ngOnChanges() 
        this.date();
        var notify = document.getElementById('alerttag');
        notify.style.display = 'block';
    };
    CustomerComponent.prototype.date = function () {
        var today = new Date();
        this.dd = today.getDate();
        this.mm = today.getMonth() + 1; //January is 0!
        this.yyyy = today.getFullYear();
        this.model = { date: { year: this.yyyy, month: this.mm, day: this.dd } };
    };
    CustomerComponent.prototype.onAreacode = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'none';
        areacode.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "block";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.addAreacodestyle = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var notify = document.getElementById('alerttag');
        notify.style.display = 'none';
        addemployee.style.display = 'none';
        areacode.style.display = 'block';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.addemployestyle = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'block';
        areacode.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.addclientstyle = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addclient.style.display = 'block';
        addemployee.style.display = 'none';
        areacode.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.addservicestyle = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        service.style.display = 'block';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'none';
        areacode.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.onEmployee = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'none';
        areacode.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "block";
    };
    CustomerComponent.prototype.onClient = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        employee.style.display = "none";
        client.style.display = "block";
    };
    CustomerComponent.prototype.onServicereq = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'none';
        areacode.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "block";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.onServiceplan = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'none';
        areacode.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "block";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.servicePlanClick = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'none';
        areacode.style.display = 'none';
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "block";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.addserviceplan = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        service.style.display = 'none';
        notify.style.display = 'none';
        addclient.style.display = 'none';
        addemployee.style.display = 'none';
        areacode.style.display = 'none';
        addserviceplan.style.display = "block";
        var area = document.getElementById('area');
        area.style.display = "none";
        servicelist.style.display = "none";
        serviceplan.style.display = "none";
        servicereq.style.display = "none";
        client.style.display = "none";
        employee.style.display = "none";
    };
    CustomerComponent.prototype.logout = function () {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/login']);
    };
    CustomerComponent.prototype.dismiss = function () {
        var notify = document.getElementById('alerttag');
        notify.style.display = 'none';
    };
    CustomerComponent.prototype.addareacode = function () {
        this.addAreacodestyle();
    };
    CustomerComponent.prototype.areaForm = function () {
        var _this = this;
        // update area code form
        if (this.code != '' && this.areaname != '' && this.location != '') {
            var url = api_config_1.API.API_AddAreacode;
            var body2 = "code=" + this.code + "&areaname=" + this.areaname + '&location=' + this.location;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.post(url, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onAreacode();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    alert(error);
                }
                // var notify = document.getElementById('notifyss');
                //    notify.style.display = 'block';
                $("#notifyss1").show();
                setTimeout(function () { $("#notifyss1").hide(); }, 5000);
                console.log(error);
            });
        }
    };
    CustomerComponent.prototype.addemployes = function () {
        this.addemployestyle();
    };
    CustomerComponent.prototype.employeeForm = function () {
        // add employee
        var _this = this;
        if (this.code != '' && this.areacode != '' && this.password != '' && this.name != '' && this.phone != '' && this.address != '') {
            var url = api_config_1.API.API_AddEmployee;
            var body2 = "code=" + this.code + "&areacode=" + this.areacode + '&name=' + this.name + '&password=' + this.password + '&phone=' + this.phone + '&address=' + this.address;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.post(url, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onEmployee();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    alert(error);
                }
                // var notify = document.getElementById('notifyss');
                //    notify.style.display = 'block';
                $("#notifyss1").show();
                setTimeout(function () { $("#notifyss1").hide(); }, 5000);
                console.log(error);
            });
        }
    };
    CustomerComponent.prototype.addclient = function () {
        this.addclientstyle();
        this.loadareacode();
        this.selectedvalue = 'please select area code';
    };
    CustomerComponent.prototype.onChange = function (newValue) {
        console.log(newValue);
        this.selectedvalue = newValue;
    };
    CustomerComponent.prototype.clientForm = function () {
        // add client
        var _this = this;
        if (this.code != '' && this.areacode != '' && this.name != '' && this.phone != '' && this.address != '' && this.mobile != '') {
            var url = api_config_1.API.API_AddClient;
            console.log(this.selectedvalue);
            var body2 = "clientcode=" + this.code + "&areacode=" + this.selectedvalue + '&clientname=' + this.name + '&address=' + this.address + '&phone=' + this.phone + '&mobile=' + this.mobile + '&location=' + this.location + '&extraroadpoints=' + this.extraroadpoints;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.post(url, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onClient();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    alert(error);
                }
                // var notify = document.getElementById('notifyss');
                //    notify.style.display = 'block';
                $("#notifyss1").show();
                setTimeout(function () { $("#notifyss1").hide(); }, 5000);
                console.log(error);
            });
        }
    };
    CustomerComponent.prototype.addservice = function () {
        this.addservicestyle();
    };
    CustomerComponent.prototype.serviceForm = function () {
    };
    CustomerComponent.prototype.loadareacode = function () {
        var _this = this;
        // load area code
        console.log('loaddata arae code');
        var url = api_config_1.API.API_GetAreacode;
        this.accesstoken = sessionStorage.getItem('access_token');
        var head2 = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accesstoken
        });
        this.http.get(url, {
            headers: head2
        })
            .map(function (res) {
            return res.json();
        }).catch(function (e) {
            if (e.status === 401) {
                return Observable_1.Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(function (data) {
            console.log(JSON.stringify(data));
            _this.areacodearray = Array();
            _this.areacodearray = data;
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        templateUrl: './customer.component.html',
        styles: ["\n    .sebm-google-map-container {\n       height: 300px;\n     }\n  "]
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map