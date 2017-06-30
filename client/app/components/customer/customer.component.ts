import { Component, OnInit } from '@angular/core';
import {Task} from '../../../Task';

import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { Router } from '@angular/router';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {API} from './../../api_config/api_config';
import {Base64} from 'js-base64';
import "jquery";
import 'datatables.net';
import {AgmCoreModule,MapsAPILoader} from 'angular2-google-maps/core';





@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: './customer.component.html',
  styles: [`
    .sebm-google-map-container {
       height: 70%;
       width:60%;
     },
     "styles.css",
   "../node_modules/bootstrap/dist/css/bootstrap.min.css",
   "../node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
   "../node_modules/datatables.net-bs/css/dataTables.bootstrap.css",
   "../node_modules/datatables.net-select-bs/css/select.bootstrap.css"
  `]
  })

export class CustomerComponent { 






public name:any;
public password:any; 
public dd:any;
public mm:any;
public yyyy:any;    
// google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  lat1: number = 51.673858;
  lng1: number = 7.815982;



// declaration
public location:any;
public code:any;
public areaname:any;
public accesstoken:any;
public areacode:any;
public address:any;
public phone:any;
public mobile:any;
public extraroadpoints:any;
public areacodearray:any;
public selectedvalue:any;
public aphone:any;
public clientdetails:any;
    public tableWidget:any;
    public tableWidget2:any;
    public tableWidget3:any;
    public tableWidget4:any;
    public tableWidget5:any;
    public selectedName:any;
    public bookingdate:any;
    public servicedate:any;
    public requesttype:any;
    public currentpassword:any;
    public newpassword:any;
    public cnewpassword:any;
    public locationname:any;
    public selective:any;
    public lastlocation:any;
    public planareacode:any
    public planemployee:any
    public message:any;
    public latlngBounds:any;
    

    reinitializeall(){
        this.name="";
  this.password="";
  this.location="";
this.code="";
this.areaname="";
this.accesstoken="";
this.areacode="";
this.address="";
this.phone="";
this.mobile="";
this.extraroadpoints="";
 this.aphone="";
 this.currentpassword=""
 this.newpassword=""
 this.cnewpassword=""
this.planareacode=""
this.planemployee=""
    }

    public markers2:any;
  
  markers: marker[] = [
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
  ]





constructor(private router: Router,public http:Http,private mapsAPILoader:MapsAPILoader){
       this.date();  
               this.mapsAPILoader.load().then(() => {
              this.latlngBounds = new window['google'].maps.LatLngBounds();
                
  

                this.markers.forEach((location) => {
                    this.latlngBounds.extend(new window['google'].maps.LatLng(location.lat, location.lng))
  })
               })
 }




clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    // if (infoWindow) infoWindow.close(); 
     
     
    this.locationname = label;  
}
  

addtask(name){
     var spli = name.split('-')
     var id=spli[1]
     let url = API.API_UpdateServicerequestAssigntrue+id;
       console.log(this.selectedvalue);
             let body2 = "";
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.put(url, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
      console.log('success')
      this.loadservicerequestdetailplan()
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }else{
  this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
   
     
               console.log(error);
  }     
            });
}


removetask(name){
     var spli = name.split('-')
     var id=spli[1]
     let url = API.API_UpdateServicerequestAssignfalse+id;
       console.log(this.selectedvalue);
             let body2 = "";
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.put(url, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
      console.log('success')
      this.loadservicerequestdetailplan()
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }else{
  this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
   
     
               console.log(error);
  }     
            });
}

plansearch(){
   console.log('plan search')
   var dates2 =this.model.date.day+'-'+this.model.date.month+'-'+this.model.date.year;
    console.log(dates2)
       let url = API.API_GetServiceRequestPlan+this.planareacode+'/'+dates2;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(data);
       this.markers = Array() 
       for(var i=0;i<data.length;i++){
    
       var temp_array = (data[i].location).split(',');
        if(data[i].assigned == 'true'){ 
         this.markers.push({
      lat: Number(temp_array[0]),
      lng: Number(temp_array[1]),
      draggable:false,
      label:data[i].clientname + '-' + data[i]._id,
      add:true,
      remove:false
      });
    }else{
         this.markers.push({
      lat: Number(temp_array[0]),
      lng: Number(temp_array[1]),
      draggable:false,
      label:data[i].clientname + '-' + data[i]._id,
      add:false,
      remove:true
    })
}
                this.mapsAPILoader.load().then(() => {
              this.latlngBounds = new window['google'].maps.LatLngBounds();
 
                this.markers.forEach((location) => {
                    this.latlngBounds.extend(new window['google'].maps.LatLng(location.lat, location.lng))
  })
               })    
   }

   window.dispatchEvent(new Event("resize"));
    console.log(this.markers)
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
   


}
  
markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  

mapClicked($event: MouseEvent) {
    this.markers2 = new Array()
    this.markers2.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
    console.log(this.markers2[this.markers2.length-1].lat,this.markers2[this.markers2.length-1].lng)
  this.location = this.markers2[this.markers2.length-1].lat+','+this.markers2[this.markers2.length-1].lng
   if(this.lastlocation == 1){
    this.addareacode()
   }else if(this.lastlocation == 3){
    this.addclient()
   }else if(this.lastlocation == 4){
     this.addservice()
   }else if(this.lastlocation == 5){
     this.editarea(sessionStorage.getItem('tempid'))
   }else if(this.lastlocation == 6){
     this.editclient(sessionStorage.getItem('tempid'))
   }else if(this.lastlocation == 7){
     this.editservice(sessionStorage.getItem('tempid'))
   }

}

  



 private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };
 // Initialized to specific date (09.10.2018).
        public model: Object;
         



ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges() 
this.date();      

    $("#alerttag").show();
  setTimeout(function() { $("#alerttag").hide(); }, 5000);
this.loadareacode(); 



  }

ngAfterViewInit() {
 
    this.initDatatable()

}

 private initDatatable(): void {

    let exampleId: any = $('#example');
    this.tableWidget = exampleId.DataTable({
      destroy: true,
      select: true
    });

    let exampleId1: any = $('#example1');
    this.tableWidget2 = exampleId1.DataTable({
      destroy: true,
      select: true
    });


    let exampleId2: any = $('#example2');
    this.tableWidget3 = exampleId2.DataTable({
      destroy: true,
      select: true
    });


    let exampleId3: any = $('#example3');
    this.tableWidget4 = exampleId3.DataTable({
      destroy: true,
      select: true
    });

    let exampleId4: any = $('#example4');
    this.tableWidget5 = exampleId4.DataTable({
      destroy: true,
      select: true
    });
   
  }


private reInitDatatable(): void {
    if (this.tableWidget) {
      this.tableWidget.destroy()
      this.tableWidget=null
    }
    if (this.tableWidget2) {
      this.tableWidget2.destroy()
      this.tableWidget2=null
    }
    if (this.tableWidget3) {
      this.tableWidget3.destroy()
      this.tableWidget3=null
    }
    if (this.tableWidget4) {
      this.tableWidget4.destroy()
      this.tableWidget4=null
    }
    if (this.tableWidget5) {
      this.tableWidget5.destroy()
      this.tableWidget5=null
    }
     setTimeout(() => this.initDatatable(),0)
  }

  public selectRow(index: number, row:any) {
    this.selectedName = "row#" + index + " " + row.name
  }






date(){
var today = new Date();
 this.dd = today.getDate();
 this.mm = today.getMonth()+1; //January is 0!
 this.yyyy = today.getFullYear();
this.model= { date: { year: this.yyyy, month: this.mm, day: this.dd } };
this.servicedate= { date: { year: this.yyyy, month: this.mm, day: this.dd } };
this.bookingdate= { date: { year: this.yyyy, month: this.mm, day: this.dd } };
}


requestcode(){
this.loadclientcodedetail();
}

onNone(){
var client= document.getElementById('client');
var employee = document.getElementById('employee');
var servicereq = document.getElementById('servicereq');
var serviceplan = document.getElementById('serviceplan');
var locationpicker = document.getElementById('locationpicker')
var servicelist = document.getElementById('servicelist');
var addserviceplan = document.getElementById('addserviceplan');
var areacode = document.getElementById('addareacode');
var addemployee = document.getElementById('addemployees');
var addclient = document.getElementById('addclient');
var notify = document.getElementById('alerttag');
var service = document.getElementById('addservice');

var editareacode = document.getElementById('editareacode')
var editemployee = document.getElementById('editemployee')
var editclient   = document.getElementById('editclient')
var editservice = document.getElementById('editservice')

var popup = document.getElementById('popup')
popup.style.display = 'none'



var mapform = document.getElementById('mapform')
mapform.style.display= "none"

  var changepassword = document.getElementById('changepassword')
    changepassword.style.display='none'

locationpicker.style.display = 'none'


// serviceaddlist.style.display = 'none'
editareacode.style.display = 'none'
editemployee.style.display = 'none'
editclient.style.display = 'none'
editservice.style.display = 'none'

service.style.display='none';
    notify.style.display='none';
addclient.style.display='none';
addemployee.style.display='none'
areacode.style.display='none';
addserviceplan.style.display="none";
var area = document.getElementById('area');
area.style.display="none";
servicelist.style.display="none";
serviceplan.style.display="none";
servicereq.style.display="none";
client.style.display="none";
employee.style.display="none";

if(this.selective == 1)
this.reinitializeall();

}

onAreacode(){
this.selective=1
this.onNone();

var area = document.getElementById('area');
area.style.display="block";
this.loadareacode();
}


addAreacodestyle(){

this.onNone();

var areacode = document.getElementById('addareacode');
areacode.style.display='block';
}

popupshow(){
    var popup = document.getElementById('popup')
    popup.style.display = 'block'
}

popuphide(){
    var popup = document.getElementById('popup')
    popup.style.display = 'none'
}

addemployestyle(){
   
this.onNone();
var addemployee = document.getElementById('addemployees');
addemployee.style.display='block'
}


addLocation(name){
    this.selective=2
    this.onNone()
    
    this.lastlocation=name
    var locationpicker = document.getElementById('locationpicker')
    locationpicker.style.display = 'block'
window.dispatchEvent(new Event("resize"));
}

addclientstyle(){
    this.selective=2
this.onNone();
var addclient = document.getElementById('addclient');
addclient.style.display='block';
}

addservicestyle(){
    this.selective=2
this.onNone();
var service = document.getElementById('addservice');
service.style.display='block';
}

onEmployee(){
    this.selective=1
this.onNone();
var employee = document.getElementById('employee');
employee.style.display="block";
this.loademployee();

}

onClient(){
    this.selective=1
var client= document.getElementById('client');
this.onNone();
client.style.display="block";
this.loadclientsdetail();
}

onServicereq(){
    this.selective=1
var servicereq = document.getElementById('servicereq');
this.onNone();
servicereq.style.display="block";
this.loadservicerequestdetail();
}

onServiceplan(){
this.selective=1
var serviceplan = document.getElementById('serviceplan');
this.onNone();
this.loadservicerequestdetailplan();
serviceplan.style.display="block";
}


servicePlanClick(){
this.selective=2
var servicelist = document.getElementById('servicelist');
this.onNone();
servicelist.style.display="block";
}

addserviceplan(){
this.selective=2
var addserviceplan = document.getElementById('addserviceplan');
this.onNone();
addserviceplan.style.display="block";
setTimeout(function(){
window.dispatchEvent(new Event("resize"));
}, 1);
var mapform = document.getElementById('mapform')
mapform.style.display= "block"
this.planemployee = ''
this.loademployee()

// var serviceaddlist = document.getElementById('serviceaddlist')
// serviceaddlist.style.display = 'block'


}

logout()
{
   sessionStorage.removeItem('currentUser');
   sessionStorage.removeItem('access_token');      
   localStorage.removeItem('refresh_token'); 
   this.router.navigate(['/login']);

}

dismiss(){
    var notify = document.getElementById('alerttag');
    notify.style.display='none';
}

addareacode(){
this.addAreacodestyle();


}

areaForm(){
// update area code form
      if(this.code != null && this.areaname != null && this.location !=null){
       let url = API.API_AddAreacode;
             let body2 = "code="+this.code+"&areaname="+this.areaname+'&location='+this.location;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.post(url, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }

            if(e.status === 422){
                return Observable.throw('duplicate')
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onAreacode();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
  }

if(error == 'duplicate'){
    this.message='username already exist'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
   
     
               console.log(error+'reached duplicate');
}else{
    this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}
     
               console.log(error);
             
            });
      }else{
          this.message='parameters not send properly'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
      }
}

addemployes(){
this.addemployestyle();
}



employeeForm(){
// add employee

if(this.code != null && this.areacode != null && this.password != null && this.name != null && this.phone != null && this.address != null){
     if(this.password == this.cnewpassword){
       let url = API.API_AddEmployee;
             let body2 = "code="+this.code+"&areacode="+this.areacode+'&name='+this.name+'&password='+this.password+'&phone='+this.phone+'&address='+this.address;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.post(url, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            if(e.status === 422){
                return Observable.throw('duplicate');
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onEmployee();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }

  if(error == 'duplicate'){
  this.message='username already exist'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
  }else{
 
  
 this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
  }
     
               console.log(error);
             
            });
     }else{
         this.message='password mismatch'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
     }
}else{
   this.message='parameters not send properly'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}

}

addclient(){
this.addclientstyle();
this.loadareacode();
this.selectedvalue = 'please select area code'
}

onChange(newValue) {
    console.log(newValue);
    this.selectedvalue = newValue;
    
}

onChangeplan(val){
console.log(val);
this.planareacode=val
}

clientForm(){
// add client

if(this.code != null && this.areacode !=null && this.name !=null && this.phone !=null && this.address != null && this.mobile !=null){
       let url = API.API_AddClient;
       console.log(this.selectedvalue);
             let body2 = "clientcode="+this.code+"&areacode="+this.selectedvalue+'&clientname='+this.name+'&address='+this.address+'&phone='+this.phone+'&mobile='+this.mobile+'&location='+this.location+'&extraroadpoints='+this.extraroadpoints;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.post(url, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }

            if (e.status === 422) {
                return Observable.throw('duplicate');
            }else{
                return Observable.throw('unknown');
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onClient();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
     this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }

  if(error == 'duplicate'){
  this.message='username already exist'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
  }else{
  
this.message='unkown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
  }   
     
               console.log(error);
 
            });
}else{
    console.log('parameters not found')
 this.message='parameters not send properly'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}


}

addservice(){
this.addservicestyle();
}

serviceForm(){
// post service form
 console.log('loaddata service form');
let url = API.API_GetAreacode;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
       this.areacodearray = Array();
       this.areacodearray = data;
       
}, error => {
if(error=="Unauthorized"){
this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
        console.log(error);
}
});      



}


loadclientcodedetail(){
// load area code
  console.log('loaddata client code detail');
let url = API.API_GetClientcodedetail+this.code;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
       if(data == null){
           this.message='no users found'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
       }else{
      this.name = data.clientname;
      this.phone = data.phone;
      this.aphone = data.mobile;
      this.address = data.address;
      this.location = data.location;
      this.areacode = data.areacode;
       }
}, error => {
if(error=="Unauthorized"){
alert(error);
this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}else{
    this.message='users not found'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}
});      

}

 

loadclientsdetail(){
// load area code
  console.log('loaddata clients detail');
let url = API.API_GetClients;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
     this.areacodearray = Array();
       this.areacodearray = data;
       this.reInitDatatable();
}, error => {
if(error=="Unauthorized"){
this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}else{
    this.message='no user found'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}
});      

}


loadservicerequestdetail(){
// load area code
  console.log('loaddata service request detail');
let url = API.API_GetServicerequest;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
     this.areacodearray = Array();
       this.areacodearray = data;
       this.reInitDatatable();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      

}


loadservicerequestdetailplan(){
// load area code
  console.log('loaddata service request detail');
let url = API.API_GetServiceRequestPlandetail;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
     this.areacodearray = Array();
       this.areacodearray = data;
       this.reInitDatatable();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      

}




loadareacode(){
// load area code
  console.log('loaddata arae code');
let url = API.API_GetAreacode;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
       this.areacodearray = Array();
       this.areacodearray = data;
       this.reInitDatatable();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      

}

loademployee(){
// load area code
  console.log('loaddata employee');
let url = API.API_GetEmployee;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
       this.areacodearray = Array();
       this.areacodearray = data;
       this.reInitDatatable();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      

}



 onDateChanged2(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
       
this.servicedate=event.date;
}

 onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.bookingdate=event.formatted;
}

servicereqstForm(){
   var dates =this.bookingdate.date.day+'/'+this.bookingdate.date.month+'/'+this.bookingdate.date.year;
  var dates2 =this.servicedate.date.day+'/'+this.servicedate.date.month+'/'+this.servicedate.date.year;
    if(this.code != '' ){
       let url = API.API_AddServicerequest;
       console.log(this.selectedvalue);
             let body2 = "clientcode="+this.code+"&areacode="+this.areacode+'&clientname='+this.name+'&address='+this.address+'&phone='+this.phone+'&mobile='+this.aphone+'&location='+this.location+'&requesttype='+this.requesttype+'&bookingdate='+dates+'&servicedate='+dates2;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.post(url, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }

            if (e.status === 422) {
                return Observable.throw('duplicate');
            }

            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onServicereq();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
      this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }

  if(error == 'duplicate'){
  this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}else{

this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}
     
               console.log(error);
             
            });
}else{
 this.message='parameters not send properly '
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}
}

removearea(id){
    console.log('deletedata');
 console.log(id);
let url = API.API_RemoveArea+id;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.delete(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));

this.loadareacode();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
}

removeemployee(id){
    console.log('deletedata');
 console.log(id);
let url = API.API_RemoveCustomer+id;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.delete(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));

this.loademployee();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
}

removeclient(id){
    console.log('deletedata');
 console.log(id);
let url = API.API_RemoveCustomer+id;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.delete(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));

this.loadclientsdetail();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
}


removeservice(id){
    console.log('deletedata');
 console.log(id);
let url = API.API_RemoveService+id;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.delete(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));

this.loadservicerequestdetail();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
}

editarea(id){
this.selective=2    
    console.log('reached edit');
    sessionStorage.setItem('tempid',id);
    this.onNone()
    var editareacode = document.getElementById('editareacode')
    editareacode.style.display = 'block'
    this.loadsingleareadata(id)
}

editemployee(id){
this.selective=2
    console.log('reached edit');
    sessionStorage.setItem('tempid',id);
    this.onNone()
    var editemployee = document.getElementById('editemployee')
    editemployee.style.display = 'block'
     this.loadsingleemployeedata(id)
}

editclient(id){
    this.selective=2
    console.log('reached edit');
    sessionStorage.setItem('tempid',id);
   this.onNone()
    var editclient   = document.getElementById('editclient')
    editclient.style.display = 'block'
    this.loadsingleclientdata(id)
}

editservice(id){
    this.selective=2
    console.log('reached edit');
    sessionStorage.setItem('tempid',id);
    this.onNone()
    var editservice = document.getElementById('editservice')
    editservice.style.display = 'block'
    this.loadsingleservicedata(id)
}




loadsingleareadata(id){
       console.log('loadareadata');
let url = API.API_GetAreacode+id;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
       this.code=data.areacode;
       this.areaname=data.areaname;
       this.location = data.location;
       
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
    
       }



loadsingleemployeedata(id){
       console.log('loaddata');
let url = API.API_GetCustomer+id;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
       this.code=data.code;
       this.name=data.username;
       this.areacode=data.areacode;
       this.address=data.address
       this.phone=data.phone
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
    
       }

loadsingleclientdata(id){
       console.log('loaddata');
let url = API.API_GetCustomer+id;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
       this.code=data.code;
       this.name=data.clientname;
       this.mobile=data.mobile;
       this.extraroadpoints=data.extraroadpoints;
       this.address=data.address
       this.location=data.location;
       this.phone=data.phone
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
    
       }


loadsingleservicedata(id){
       console.log('loaddata');
let url = API.API_GetServicerequest+id;
    this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });

  this.http.get(url,{
      headers: head2
    })
    .map(res =>  {
            return res.json();
}).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(data => {
       console.log(JSON.stringify(data));
       this.code=data.code;
       this.name=data.clientname;
       this.aphone=data.mobile;
       this.areacode=data.areacode;
       this.address=data.address
       this.phone=data.phone
       this.location=data.location
       this.requesttype=data.requesttype
       var array = new Array();
       var array2 = new Array();
    //  split string and store it into array
       array = this.servicedate.split('/');
       array2 = this.bookingdate.split('/');

       this.servicedate= { date: { year: array[2], month: array[1], day: array[0] } };
this.bookingdate= { date: { year: array2[2], month: array2[1], day: array2[0] } };
       this.servicedate=data.servicedate
       this.bookingdate=data.bookingdate
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
    
       }


updateServiceForm(){
 
      var dates =this.bookingdate.date.day+'/'+this.bookingdate.date.month+'/'+this.bookingdate.date.year;
  var dates2 =this.servicedate.date.day+'/'+this.servicedate.date.month+'/'+this.servicedate.date.year;
  var id = sessionStorage.getItem('tempid');
    if(this.code != '' ){
       let url = API.API_UpdateServicerequest+id;
       console.log(this.selectedvalue);
             let body2 = "clientcode="+this.code+"&areacode="+this.areacode+'&clientname='+this.name+'&address='+this.address+'&phone='+this.phone+'&mobile='+this.aphone+'&location='+this.location+'&requesttype='+this.requesttype+'&bookingdate='+dates+'&servicedate='+dates2;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.put(url, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onServicereq();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }else{
  this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
   
     
               console.log(error);
  }     
            });
}
     }


updateEmployeeForm(){
 var id = sessionStorage.getItem('tempid');
    if(this.code != '' && this.areacode !='' && this.password != '' && this.name !='' && this.phone !='' && this.address != ''){
       let url = API.API_UpdateEmployee+id;
             let body2 = "code="+this.code+"&areacode="+this.areacode+'&name='+this.name+'&password='+this.password+'&phone='+this.phone+'&address='+this.address;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.put(url, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) { 
                return Observable.throw('Unauthorized');
            }

if (e.status === 422) {
                return Observable.throw('duplicate');
            }

            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onEmployee();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
    this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }

  if(error == 'duplicate'){
  this.message='username already present'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
  }else{
  
  
  this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
     
               console.log(error);
  }     
            });
}else{
   this.message='parameters not send properly'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}
     }


       updateClientForm(){
 var id = sessionStorage.getItem('tempid');
     if(this.code != null && this.areacode !=null && this.name !=null && this.phone !=null && this.address != null && this.mobile !=null){
       let url = API.API_UpdateClient+id;
       console.log(this.selectedvalue);
             let body2 = "clientcode="+this.code+"&areacode="+this.selectedvalue+'&clientname='+this.name+'&address='+this.address+'&phone='+this.phone+'&mobile='+this.mobile+'&location='+this.location+'&extraroadpoints='+this.extraroadpoints;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.put(url, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }

            if (e.status === 422) {
                return Observable.throw('duplicate');
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onClient();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
     this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }
  
  if(error == 'duplicate'){
  this.message='username already exist'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
  }
  
 this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
   
     
               console.log(error);
             
            });
}else{
   this.message='parameter not send properly'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}

     }



     updateAreaForm(){
 var id = sessionStorage.getItem('tempid');
       if(this.code != '' && this.areaname != '' && this.location !=''){
       let url = API.API_UpdateAreacode+id;
             let body2 = "code="+this.code+"&areaname="+this.areaname+'&location='+this.location;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.put(url, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
            if (e.status === 422){
                return Observable.throw('duplicate');
            }
                
})
       .subscribe(data => {
      this.onAreacode();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error + "dislaying error");
      this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }
  if(error=='duplicate'){
   console.log(error);
 this.message='username already exist'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
  }
  // var notify = document.getElementById('notifyss');
  //    notify.style.display = 'block';
   console.log(error);
  this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
     
              
             
            });
      }else{
       this.message='parameter not send properly'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    }
     }

changepassword(){

  this.selective=1
    this.onNone()
    var changepassword = document.getElementById('changepassword')
    changepassword.style.display='block'

}

passwordForm(){

var names = sessionStorage.getItem('currentUser')
if(this.cnewpassword == this.newpassword){

       let urlaccess = API.API_UpdatePassword;
             let body2 ="name="+names+"&password="+this.newpassword+'&oldpassword='+this.currentpassword;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.put(urlaccess, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
       console.log(data);
       this.onAreacode();            
        this.router.navigate(['/customer']);   
     console.log("reached here")    
 }, error => {
       if(error=="Unauthorized"){
       console.log(error);
     this.message='unauthorized user'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
    
  }
 this.message='unknown error'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
   
     
               console.log(error);
             
            });
}else{
    this.message='parameters not send properly'
     $("#popup").show();
        setTimeout(function() { $("#popup").hide(); }, 5000);
}
}

}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
    add:boolean;
   remove:boolean;
  
}