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
        addserviceplan.style.display = "none";
        var area = document.getElementById('area');
        area.style.display = "block";
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
        this.router.navigate(['/login']);
    };
    CustomerComponent.prototype.dismiss = function () {
        var notify = document.getElementById('alerttag');
        notify.style.display = 'none';
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