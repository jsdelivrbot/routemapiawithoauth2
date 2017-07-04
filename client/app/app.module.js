"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var customer_component_1 = require("./components/customer/customer.component");
var admin_component_1 = require("./components/admin/admin.component");
var mydatepicker_1 = require("mydatepicker");
var core_2 = require("angular2-google-maps/core");
var router_1 = require("@angular/router");
var pagenotfound_component_1 = require("./components/pagenotfound/pagenotfound.component");
var auth_guard_1 = require("./components/security/auth.guard");
var auth_guard_admin_1 = require("./components/security/auth.guard.admin");
var auth_deguard_1 = require("./components/security/auth.deguard");
var auth_service_1 = require("./components/security/auth.service");
var appRoutes = [
    { path: 'customer', component: customer_component_1.CustomerComponent, canActivate: [
            auth_guard_1.CanActivateViaAuthGuard
        ] },
    { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [
            auth_guard_admin_1.CanActivateViaAuthGuardAdmin
        ] },
    { path: 'login', component: tasks_component_1.TasksComponent },
    { path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: '**', component: pagenotfound_component_1.pageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, mydatepicker_1.MyDatePickerModule, core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyDJSftDw2ZAC-PU9AXx0u7UVhbKGqO90j0'
                }), router_1.RouterModule.forRoot(appRoutes)],
            declarations: [app_component_1.AppComponent, tasks_component_1.TasksComponent, customer_component_1.CustomerComponent, admin_component_1.AdminComponent, pagenotfound_component_1.pageNotFoundComponent],
            providers: [
                auth_service_1.AuthService,
                auth_guard_1.CanActivateViaAuthGuard, auth_deguard_1.ConfirmDeactivateGuard, auth_guard_admin_1.CanActivateViaAuthGuardAdmin
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map