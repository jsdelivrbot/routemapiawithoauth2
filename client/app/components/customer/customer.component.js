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
        this.lat1 = 51.673858;
        this.lng1 = 7.815982;
        this.markers = [
            {
                lat: 51.673858,
                lng: 7.815982,
                label: 'source',
                draggable: true
            },
            {
                lat: 51.373858,
                lng: 7.215982,
                label: 'centre',
                draggable: false
            },
            {
                lat: 51.723858,
                lng: 7.895982,
                label: 'destination',
                draggable: true
            }
        ];
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd/mm/yyyy',
        };
        this.date();
    }
    CustomerComponent.prototype.reinitializeall = function () {
        this.name = "";
        this.password = "";
        this.location = "";
        this.code = "";
        this.areaname = "";
        this.accesstoken = "";
        this.areacode = "";
        this.address = "";
        this.phone = "";
        this.mobile = "";
        this.extraroadpoints = "";
        this.aphone = "";
        this.currentpassword = "";
        this.newpassword = "";
        this.cnewpassword = "";
        this.planareacode = "";
        this.planemployee = "";
    };
    CustomerComponent.prototype.clickedMarker = function (label, index) {
        console.log("clicked the marker: " + (label || index));
        this.locationname = label;
    };
    CustomerComponent.prototype.plansearch = function () {
        var _this = this;
        console.log('plan search');
        var dates2 = this.model.date.day + '-' + this.model.date.month + '-' + this.model.date.year;
        console.log(dates2);
        var url = api_config_1.API.API_GetServiceRequestPlan + this.planareacode + '/' + dates2;
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
            console.log(data);
            _this.markers = Array();
            for (var i = 0; i < data.length; i++) {
                var temp_array = (data[i].location).split(',');
                _this.markers.push({
                    lat: Number(temp_array[0]),
                    lng: Number(temp_array[1]),
                    draggable: false,
                    label: data[i].clientname + '\n' + data[i]._id
                });
            }
            window.dispatchEvent(new Event("resize"));
            console.log(_this.markers);
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.markerDragEnd = function (m, $event) {
        console.log('dragEnd', m, $event);
    };
    CustomerComponent.prototype.mapClicked = function ($event) {
        this.markers2 = new Array();
        this.markers2.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng
        });
        console.log(this.markers2[this.markers2.length - 1].lat, this.markers2[this.markers2.length - 1].lng);
        this.location = this.markers2[this.markers2.length - 1].lat + ',' + this.markers2[this.markers2.length - 1].lng;
        if (this.lastlocation == 1) {
            this.addareacode();
        }
        else if (this.lastlocation == 3) {
            this.addclient();
        }
        else if (this.lastlocation == 4) {
            this.addservice();
        }
        else if (this.lastlocation == 5) {
            this.editarea(sessionStorage.getItem('tempid'));
        }
        else if (this.lastlocation == 6) {
            this.editclient(sessionStorage.getItem('tempid'));
        }
        else if (this.lastlocation == 7) {
            this.editservice(sessionStorage.getItem('tempid'));
        }
    };
    CustomerComponent.prototype.ngOnInit = function () {
        //called after the constructor and called  after the first ngOnChanges() 
        this.date();
        $("#alerttag").show();
        setTimeout(function () { $("#alerttag").hide(); }, 5000);
        this.loadareacode();
    };
    CustomerComponent.prototype.ngAfterViewInit = function () {
        this.initDatatable();
    };
    CustomerComponent.prototype.initDatatable = function () {
        var exampleId = $('#example');
        this.tableWidget = exampleId.DataTable({
            destroy: true,
            select: true
        });
        var exampleId1 = $('#example1');
        this.tableWidget2 = exampleId1.DataTable({
            destroy: true,
            select: true
        });
        var exampleId2 = $('#example2');
        this.tableWidget3 = exampleId2.DataTable({
            destroy: true,
            select: true
        });
        var exampleId3 = $('#example3');
        this.tableWidget4 = exampleId3.DataTable({
            destroy: true,
            select: true
        });
        var exampleId4 = $('#example4');
        this.tableWidget5 = exampleId4.DataTable({
            destroy: true,
            select: true
        });
    };
    CustomerComponent.prototype.reInitDatatable = function () {
        var _this = this;
        if (this.tableWidget) {
            this.tableWidget.destroy();
            this.tableWidget = null;
        }
        if (this.tableWidget2) {
            this.tableWidget2.destroy();
            this.tableWidget2 = null;
        }
        if (this.tableWidget3) {
            this.tableWidget3.destroy();
            this.tableWidget3 = null;
        }
        if (this.tableWidget4) {
            this.tableWidget4.destroy();
            this.tableWidget4 = null;
        }
        if (this.tableWidget5) {
            this.tableWidget5.destroy();
            this.tableWidget5 = null;
        }
        setTimeout(function () { return _this.initDatatable(); }, 0);
    };
    CustomerComponent.prototype.selectRow = function (index, row) {
        this.selectedName = "row#" + index + " " + row.name;
    };
    CustomerComponent.prototype.date = function () {
        var today = new Date();
        this.dd = today.getDate();
        this.mm = today.getMonth() + 1; //January is 0!
        this.yyyy = today.getFullYear();
        this.model = { date: { year: this.yyyy, month: this.mm, day: this.dd } };
        this.servicedate = { date: { year: this.yyyy, month: this.mm, day: this.dd } };
        this.bookingdate = { date: { year: this.yyyy, month: this.mm, day: this.dd } };
    };
    CustomerComponent.prototype.requestcode = function () {
        this.loadclientcodedetail();
    };
    CustomerComponent.prototype.onNone = function () {
        var client = document.getElementById('client');
        var employee = document.getElementById('employee');
        var servicereq = document.getElementById('servicereq');
        var serviceplan = document.getElementById('serviceplan');
        var locationpicker = document.getElementById('locationpicker');
        var servicelist = document.getElementById('servicelist');
        var addserviceplan = document.getElementById('addserviceplan');
        var areacode = document.getElementById('addareacode');
        var addemployee = document.getElementById('addemployees');
        var addclient = document.getElementById('addclient');
        var notify = document.getElementById('alerttag');
        var service = document.getElementById('addservice');
        var editareacode = document.getElementById('editareacode');
        var editemployee = document.getElementById('editemployee');
        var editclient = document.getElementById('editclient');
        var editservice = document.getElementById('editservice');
        var popup = document.getElementById('popup');
        popup.style.display = 'none';
        var mapform = document.getElementById('mapform');
        mapform.style.display = "none";
        var changepassword = document.getElementById('changepassword');
        changepassword.style.display = 'none';
        locationpicker.style.display = 'none';
        // serviceaddlist.style.display = 'none'
        editareacode.style.display = 'none';
        editemployee.style.display = 'none';
        editclient.style.display = 'none';
        editservice.style.display = 'none';
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
        employee.style.display = "none";
        if (this.selective == 1)
            this.reinitializeall();
    };
    CustomerComponent.prototype.onAreacode = function () {
        this.selective = 1;
        this.onNone();
        var area = document.getElementById('area');
        area.style.display = "block";
        this.loadareacode();
    };
    CustomerComponent.prototype.addAreacodestyle = function () {
        this.onNone();
        var areacode = document.getElementById('addareacode');
        areacode.style.display = 'block';
    };
    CustomerComponent.prototype.popupshow = function () {
        var popup = document.getElementById('popup');
        popup.style.display = 'block';
    };
    CustomerComponent.prototype.popuphide = function () {
        var popup = document.getElementById('popup');
        popup.style.display = 'none';
    };
    CustomerComponent.prototype.addemployestyle = function () {
        this.onNone();
        var addemployee = document.getElementById('addemployees');
        addemployee.style.display = 'block';
    };
    CustomerComponent.prototype.addLocation = function (name) {
        this.selective = 2;
        this.onNone();
        this.lastlocation = name;
        var locationpicker = document.getElementById('locationpicker');
        locationpicker.style.display = 'block';
        window.dispatchEvent(new Event("resize"));
    };
    CustomerComponent.prototype.addclientstyle = function () {
        this.selective = 2;
        this.onNone();
        var addclient = document.getElementById('addclient');
        addclient.style.display = 'block';
    };
    CustomerComponent.prototype.addservicestyle = function () {
        this.selective = 2;
        this.onNone();
        var service = document.getElementById('addservice');
        service.style.display = 'block';
    };
    CustomerComponent.prototype.onEmployee = function () {
        this.selective = 1;
        this.onNone();
        var employee = document.getElementById('employee');
        employee.style.display = "block";
        this.loademployee();
    };
    CustomerComponent.prototype.onClient = function () {
        this.selective = 1;
        var client = document.getElementById('client');
        this.onNone();
        client.style.display = "block";
        this.loadclientsdetail();
    };
    CustomerComponent.prototype.onServicereq = function () {
        this.selective = 1;
        var servicereq = document.getElementById('servicereq');
        this.onNone();
        servicereq.style.display = "block";
        this.loadservicerequestdetail();
    };
    CustomerComponent.prototype.onServiceplan = function () {
        this.selective = 1;
        var serviceplan = document.getElementById('serviceplan');
        this.onNone();
        serviceplan.style.display = "block";
    };
    CustomerComponent.prototype.servicePlanClick = function () {
        this.selective = 2;
        var servicelist = document.getElementById('servicelist');
        this.onNone();
        servicelist.style.display = "block";
    };
    CustomerComponent.prototype.addserviceplan = function () {
        this.selective = 2;
        var addserviceplan = document.getElementById('addserviceplan');
        this.onNone();
        addserviceplan.style.display = "block";
        setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
        }, 1);
        var mapform = document.getElementById('mapform');
        mapform.style.display = "block";
        this.planemployee = '';
        this.loademployee();
        // var serviceaddlist = document.getElementById('serviceaddlist')
        // serviceaddlist.style.display = 'block'
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
        if (this.code != null && this.areaname != null && this.location != null) {
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
                if (e.status === 422) {
                    return Observable_1.Observable.throw('duplicate');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onAreacode();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                if (error == 'duplicate') {
                    _this.message = 'username already exist';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                    console.log(error + 'reached duplicate');
                }
                else {
                    _this.message = 'unknown error';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                console.log(error);
            });
        }
        else {
            this.message = 'parameters not send properly';
            $("#popup").show();
            setTimeout(function () { $("#popup").hide(); }, 5000);
        }
    };
    CustomerComponent.prototype.addemployes = function () {
        this.addemployestyle();
    };
    CustomerComponent.prototype.employeeForm = function () {
        // add employee
        var _this = this;
        if (this.code != null && this.areacode != null && this.password != null && this.name != null && this.phone != null && this.address != null) {
            if (this.password == this.cnewpassword) {
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
                    if (e.status === 422) {
                        return Observable_1.Observable.throw('duplicate');
                    }
                    // do any other checking for statuses here
                })
                    .subscribe(function (data) {
                    _this.onEmployee();
                    _this.router.navigate(['/customer']);
                }, function (error) {
                    if (error == "Unauthorized") {
                        console.log(error);
                        _this.message = 'unauthorized user';
                        $("#popup").show();
                        setTimeout(function () { $("#popup").hide(); }, 5000);
                    }
                    if (error == 'duplicate') {
                        _this.message = 'username already exist';
                        $("#popup").show();
                        setTimeout(function () { $("#popup").hide(); }, 5000);
                    }
                    else {
                        _this.message = 'unknown error';
                        $("#popup").show();
                        setTimeout(function () { $("#popup").hide(); }, 5000);
                    }
                    console.log(error);
                });
            }
            else {
                this.message = 'password mismatch';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
            }
        }
        else {
            this.message = 'parameters not send properly';
            $("#popup").show();
            setTimeout(function () { $("#popup").hide(); }, 5000);
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
    CustomerComponent.prototype.onChangeplan = function (val) {
        console.log(val);
        this.planareacode = val;
    };
    CustomerComponent.prototype.clientForm = function () {
        // add client
        var _this = this;
        if (this.code != null && this.areacode != null && this.name != null && this.phone != null && this.address != null && this.mobile != null) {
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
                if (e.status === 422) {
                    return Observable_1.Observable.throw('duplicate');
                }
                else {
                    return Observable_1.Observable.throw('unknown');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onClient();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                if (error == 'duplicate') {
                    _this.message = 'username already exist';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                else {
                    _this.message = 'unkown error';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                console.log(error);
            });
        }
        else {
            console.log('parameters not found');
            this.message = 'parameters not send properly';
            $("#popup").show();
            setTimeout(function () { $("#popup").hide(); }, 5000);
        }
    };
    CustomerComponent.prototype.addservice = function () {
        this.addservicestyle();
    };
    CustomerComponent.prototype.serviceForm = function () {
        var _this = this;
        // post service form
        console.log('loaddata service form');
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
                _this.message = 'unauthorized user';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.loadclientcodedetail = function () {
        var _this = this;
        // load area code
        console.log('loaddata client code detail');
        var url = api_config_1.API.API_GetClientcodedetail + this.code;
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
            if (data == null) {
                _this.message = 'no users found';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
            }
            else {
                _this.name = data.clientname;
                _this.phone = data.phone;
                _this.aphone = data.mobile;
                _this.address = data.address;
                _this.location = data.location;
                _this.areacode = data.areacode;
            }
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                _this.message = 'unauthorized user';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
            }
            else {
                _this.message = 'users not found';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
            }
        });
    };
    CustomerComponent.prototype.loadclientsdetail = function () {
        var _this = this;
        // load area code
        console.log('loaddata clients detail');
        var url = api_config_1.API.API_GetClients;
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
            _this.reInitDatatable();
        }, function (error) {
            if (error == "Unauthorized") {
                _this.message = 'unauthorized user';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
            }
            else {
                _this.message = 'no user found';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
            }
        });
    };
    CustomerComponent.prototype.loadservicerequestdetail = function () {
        var _this = this;
        // load area code
        console.log('loaddata service request detail');
        var url = api_config_1.API.API_GetServicerequest;
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
            _this.reInitDatatable();
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
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
            _this.reInitDatatable();
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.loademployee = function () {
        var _this = this;
        // load area code
        console.log('loaddata employee');
        var url = api_config_1.API.API_GetEmployee;
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
            _this.reInitDatatable();
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.onDateChanged2 = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        this.servicedate = event.date;
    };
    CustomerComponent.prototype.onDateChanged = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        this.bookingdate = event.formatted;
    };
    CustomerComponent.prototype.servicereqstForm = function () {
        var _this = this;
        var dates = this.bookingdate.date.day + '/' + this.bookingdate.date.month + '/' + this.bookingdate.date.year;
        var dates2 = this.servicedate.date.day + '/' + this.servicedate.date.month + '/' + this.servicedate.date.year;
        if (this.code != '') {
            var url = api_config_1.API.API_AddServicerequest;
            console.log(this.selectedvalue);
            var body2 = "clientcode=" + this.code + "&areacode=" + this.areacode + '&clientname=' + this.name + '&address=' + this.address + '&phone=' + this.phone + '&mobile=' + this.aphone + '&location=' + this.location + '&requesttype=' + this.requesttype + '&bookingdate=' + dates + '&servicedate=' + dates2;
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
                if (e.status === 422) {
                    return Observable_1.Observable.throw('duplicate');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onServicereq();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                if (error == 'duplicate') {
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                else {
                    _this.message = 'unknown error';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                console.log(error);
            });
        }
        else {
            this.message = 'parameters not send properly ';
            $("#popup").show();
            setTimeout(function () { $("#popup").hide(); }, 5000);
        }
    };
    CustomerComponent.prototype.removearea = function (id) {
        var _this = this;
        console.log('deletedata');
        console.log(id);
        var url = api_config_1.API.API_RemoveArea + id;
        this.accesstoken = sessionStorage.getItem('access_token');
        var head2 = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accesstoken
        });
        this.http.delete(url, {
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
            _this.loadareacode();
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.removeemployee = function (id) {
        var _this = this;
        console.log('deletedata');
        console.log(id);
        var url = api_config_1.API.API_RemoveCustomer + id;
        this.accesstoken = sessionStorage.getItem('access_token');
        var head2 = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accesstoken
        });
        this.http.delete(url, {
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
            _this.loademployee();
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.removeclient = function (id) {
        var _this = this;
        console.log('deletedata');
        console.log(id);
        var url = api_config_1.API.API_RemoveCustomer + id;
        this.accesstoken = sessionStorage.getItem('access_token');
        var head2 = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accesstoken
        });
        this.http.delete(url, {
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
            _this.loadclientsdetail();
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.removeservice = function (id) {
        var _this = this;
        console.log('deletedata');
        console.log(id);
        var url = api_config_1.API.API_RemoveService + id;
        this.accesstoken = sessionStorage.getItem('access_token');
        var head2 = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accesstoken
        });
        this.http.delete(url, {
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
            _this.loadservicerequestdetail();
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.editarea = function (id) {
        this.selective = 2;
        console.log('reached edit');
        sessionStorage.setItem('tempid', id);
        this.onNone();
        var editareacode = document.getElementById('editareacode');
        editareacode.style.display = 'block';
        this.loadsingleareadata(id);
    };
    CustomerComponent.prototype.editemployee = function (id) {
        this.selective = 2;
        console.log('reached edit');
        sessionStorage.setItem('tempid', id);
        this.onNone();
        var editemployee = document.getElementById('editemployee');
        editemployee.style.display = 'block';
        this.loadsingleemployeedata(id);
    };
    CustomerComponent.prototype.editclient = function (id) {
        this.selective = 2;
        console.log('reached edit');
        sessionStorage.setItem('tempid', id);
        this.onNone();
        var editclient = document.getElementById('editclient');
        editclient.style.display = 'block';
        this.loadsingleclientdata(id);
    };
    CustomerComponent.prototype.editservice = function (id) {
        this.selective = 2;
        console.log('reached edit');
        sessionStorage.setItem('tempid', id);
        this.onNone();
        var editservice = document.getElementById('editservice');
        editservice.style.display = 'block';
        this.loadsingleservicedata(id);
    };
    CustomerComponent.prototype.loadsingleareadata = function (id) {
        var _this = this;
        console.log('loadareadata');
        var url = api_config_1.API.API_GetAreacode + id;
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
            _this.code = data.areacode;
            _this.areaname = data.areaname;
            _this.location = data.location;
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.loadsingleemployeedata = function (id) {
        var _this = this;
        console.log('loaddata');
        var url = api_config_1.API.API_GetCustomer + id;
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
            _this.code = data.code;
            _this.name = data.username;
            _this.areacode = data.areacode;
            _this.address = data.address;
            _this.phone = data.phone;
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.loadsingleclientdata = function (id) {
        var _this = this;
        console.log('loaddata');
        var url = api_config_1.API.API_GetCustomer + id;
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
            _this.code = data.code;
            _this.name = data.clientname;
            _this.mobile = data.mobile;
            _this.extraroadpoints = data.extraroadpoints;
            _this.address = data.address;
            _this.location = data.location;
            _this.phone = data.phone;
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.loadsingleservicedata = function (id) {
        var _this = this;
        console.log('loaddata');
        var url = api_config_1.API.API_GetServicerequest + id;
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
            _this.code = data.code;
            _this.name = data.clientname;
            _this.aphone = data.mobile;
            _this.areacode = data.areacode;
            _this.address = data.address;
            _this.phone = data.phone;
            _this.location = data.location;
            _this.requesttype = data.requesttype;
            var array = new Array();
            var array2 = new Array();
            //  split string and store it into array
            array = _this.servicedate.split('/');
            array2 = _this.bookingdate.split('/');
            _this.servicedate = { date: { year: array[2], month: array[1], day: array[0] } };
            _this.bookingdate = { date: { year: array2[2], month: array2[1], day: array2[0] } };
            _this.servicedate = data.servicedate;
            _this.bookingdate = data.bookingdate;
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    CustomerComponent.prototype.updateServiceForm = function () {
        var _this = this;
        var dates = this.bookingdate.date.day + '/' + this.bookingdate.date.month + '/' + this.bookingdate.date.year;
        var dates2 = this.servicedate.date.day + '/' + this.servicedate.date.month + '/' + this.servicedate.date.year;
        var id = sessionStorage.getItem('tempid');
        if (this.code != '') {
            var url = api_config_1.API.API_UpdateServicerequest + id;
            console.log(this.selectedvalue);
            var body2 = "clientcode=" + this.code + "&areacode=" + this.areacode + '&clientname=' + this.name + '&address=' + this.address + '&phone=' + this.phone + '&mobile=' + this.aphone + '&location=' + this.location + '&requesttype=' + this.requesttype + '&bookingdate=' + dates + '&servicedate=' + dates2;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.put(url, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onServicereq();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                else {
                    _this.message = 'unknown error';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                    console.log(error);
                }
            });
        }
    };
    CustomerComponent.prototype.updateEmployeeForm = function () {
        var _this = this;
        var id = sessionStorage.getItem('tempid');
        if (this.code != '' && this.areacode != '' && this.password != '' && this.name != '' && this.phone != '' && this.address != '') {
            var url = api_config_1.API.API_UpdateEmployee + id;
            var body2 = "code=" + this.code + "&areacode=" + this.areacode + '&name=' + this.name + '&password=' + this.password + '&phone=' + this.phone + '&address=' + this.address;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.put(url, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                if (e.status === 422) {
                    return Observable_1.Observable.throw('duplicate');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onEmployee();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                if (error == 'duplicate') {
                    _this.message = 'username already present';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                else {
                    _this.message = 'unknown error';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                    console.log(error);
                }
            });
        }
        else {
            this.message = 'parameters not send properly';
            $("#popup").show();
            setTimeout(function () { $("#popup").hide(); }, 5000);
        }
    };
    CustomerComponent.prototype.updateClientForm = function () {
        var _this = this;
        var id = sessionStorage.getItem('tempid');
        if (this.code != null && this.areacode != null && this.name != null && this.phone != null && this.address != null && this.mobile != null) {
            var url = api_config_1.API.API_UpdateClient + id;
            console.log(this.selectedvalue);
            var body2 = "clientcode=" + this.code + "&areacode=" + this.selectedvalue + '&clientname=' + this.name + '&address=' + this.address + '&phone=' + this.phone + '&mobile=' + this.mobile + '&location=' + this.location + '&extraroadpoints=' + this.extraroadpoints;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.put(url, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                if (e.status === 422) {
                    return Observable_1.Observable.throw('duplicate');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.onClient();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                if (error == 'duplicate') {
                    _this.message = 'username already exist';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                _this.message = 'unknown error';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
                console.log(error);
            });
        }
        else {
            this.message = 'parameter not send properly';
            $("#popup").show();
            setTimeout(function () { $("#popup").hide(); }, 5000);
        }
    };
    CustomerComponent.prototype.updateAreaForm = function () {
        var _this = this;
        var id = sessionStorage.getItem('tempid');
        if (this.code != '' && this.areaname != '' && this.location != '') {
            var url = api_config_1.API.API_UpdateAreacode + id;
            var body2 = "code=" + this.code + "&areaname=" + this.areaname + '&location=' + this.location;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.put(url, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                // do any other checking for statuses here
                if (e.status === 422) {
                    return Observable_1.Observable.throw('duplicate');
                }
            })
                .subscribe(function (data) {
                _this.onAreacode();
                _this.router.navigate(['/customer']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error + "dislaying error");
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                if (error == 'duplicate') {
                    console.log(error);
                    _this.message = 'username already exist';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                // var notify = document.getElementById('notifyss');
                //    notify.style.display = 'block';
                console.log(error);
                _this.message = 'unknown error';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
            });
        }
        else {
            this.message = 'parameter not send properly';
            $("#popup").show();
            setTimeout(function () { $("#popup").hide(); }, 5000);
        }
    };
    CustomerComponent.prototype.changepassword = function () {
        this.selective = 1;
        this.onNone();
        var changepassword = document.getElementById('changepassword');
        changepassword.style.display = 'block';
    };
    CustomerComponent.prototype.passwordForm = function () {
        var _this = this;
        var names = sessionStorage.getItem('currentUser');
        if (this.cnewpassword == this.newpassword) {
            var urlaccess = api_config_1.API.API_UpdatePassword;
            var body2 = "name=" + names + "&password=" + this.newpassword + '&oldpassword=' + this.currentpassword;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.put(urlaccess, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                console.log(data);
                _this.onAreacode();
                _this.router.navigate(['/customer']);
                console.log("reached here");
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    _this.message = 'unauthorized user';
                    $("#popup").show();
                    setTimeout(function () { $("#popup").hide(); }, 5000);
                }
                _this.message = 'unknown error';
                $("#popup").show();
                setTimeout(function () { $("#popup").hide(); }, 5000);
                console.log(error);
            });
        }
        else {
            this.message = 'parameters not send properly';
            $("#popup").show();
            setTimeout(function () { $("#popup").hide(); }, 5000);
        }
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        templateUrl: './customer.component.html',
        styles: ["\n    .sebm-google-map-container {\n       height: 70%;\n       width:60%;\n     },\n     \"styles.css\",\n   \"../node_modules/bootstrap/dist/css/bootstrap.min.css\",\n   \"../node_modules/bootstrap/dist/css/bootstrap-theme.min.css\",\n   \"../node_modules/datatables.net-bs/css/dataTables.bootstrap.css\",\n   \"../node_modules/datatables.net-select-bs/css/select.bootstrap.css\"\n  "]
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map