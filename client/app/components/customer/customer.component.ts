import { Component, OnInit } from '@angular/core';
import {Task} from '../../../Task';
import {IMyDpOptions} from 'mydatepicker';
import { Router } from '@angular/router';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {API} from './../../api_config/api_config';
import {Base64} from 'js-base64';
import "jquery";
import 'datatables.net';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: './customer.component.html',
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
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

  
clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  
  
markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
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
  ]

// just an interface for type safety.

//  mapClicked($event: MouseEvent) {
//     this.markers.push({
//       lat: $event.coords.lat,
//       lng: $event.coords.lng
//     });
//   }


 private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };
 // Initialized to specific date (09.10.2018).
        public model: Object;
         

constructor(private router: Router,public http:Http){
       this.date();  
       $(document).ready( function () {
    $('#example').DataTable();
} );
       $(document).ready( function () {
    $('#areaexample').DataTable();
} );    

$(document).ready( function () {
    $('#example3').DataTable();
} );

$(document).ready( function () {
    $('#example4').DataTable();
} );        

$(document).ready( function () {
    $('#example5').DataTable();
} ); 
   }

ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges() 
this.date();      
var notify = document.getElementById('alerttag');
    notify.style.display='block';
  }



date(){
var today = new Date();
 this.dd = today.getDate();
 this.mm = today.getMonth()+1; //January is 0!
 this.yyyy = today.getFullYear();
this.model= { date: { year: this.yyyy, month: this.mm, day: this.dd } };
}

onAreacode(){
var client= document.getElementById('client');
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
service.style.display='none';
    notify.style.display='none';
addclient.style.display='none';
addemployee.style.display='none'
areacode.style.display='none';
addserviceplan.style.display="none";
var area = document.getElementById('area');
area.style.display="block";
servicelist.style.display="none";
serviceplan.style.display="none";
servicereq.style.display="none";
client.style.display="none";
employee.style.display="none";

}


addAreacodestyle(){
var client= document.getElementById('client');
var employee = document.getElementById('employee');
var servicereq = document.getElementById('servicereq');
var serviceplan = document.getElementById('serviceplan');
var servicelist = document.getElementById('servicelist');
var addserviceplan = document.getElementById('addserviceplan');
var areacode = document.getElementById('addareacode');
var addemployee = document.getElementById('addemployees');
var notify = document.getElementById('alerttag');
    notify.style.display='none';
addemployee.style.display='none'
areacode.style.display='block';
addserviceplan.style.display="none";
var area = document.getElementById('area');
area.style.display="none";
servicelist.style.display="none";
serviceplan.style.display="none";
servicereq.style.display="none";
client.style.display="none";
employee.style.display="none";

}


addemployestyle(){
var client= document.getElementById('client');
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
service.style.display='none';
    notify.style.display='none';
addclient.style.display='none';
addemployee.style.display='block'
areacode.style.display='none';
addserviceplan.style.display="none";
var area = document.getElementById('area');
area.style.display="none";
servicelist.style.display="none";
serviceplan.style.display="none";
servicereq.style.display="none";
client.style.display="none";
employee.style.display="none";

}


addclientstyle(){
var client= document.getElementById('client');
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
service.style.display='none';
    notify.style.display='none';
addclient.style.display='none';
addclient.style.display='block';
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

}

addservicestyle(){
var client= document.getElementById('client');
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
service.style.display='none';
service.style.display='block';
    notify.style.display='none';
addclient.style.display='none';
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

}

onEmployee(){
var client= document.getElementById('client');
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
employee.style.display="block";

}

onClient(){
var client= document.getElementById('client');
var employee = document.getElementById('employee');
var servicereq = document.getElementById('servicereq');
var serviceplan = document.getElementById('serviceplan');
var servicelist = document.getElementById('servicelist');
var addserviceplan = document.getElementById('addserviceplan');
var addemployee = document.getElementById('addemployees');
var addclient = document.getElementById('addclient');
var notify = document.getElementById('alerttag');
var service = document.getElementById('addservice');
service.style.display='none';
    notify.style.display='none';
addclient.style.display='none';
addemployee.style.display='none'
addserviceplan.style.display="none";
var area = document.getElementById('area');
area.style.display="none";
servicelist.style.display="none";
serviceplan.style.display="none";
servicereq.style.display="none";
employee.style.display="none";
client.style.display="block";
}

onServicereq(){
var client= document.getElementById('client');
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
servicereq.style.display="block";
client.style.display="none";
employee.style.display="none";
}

onServiceplan(){
var client= document.getElementById('client');
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
service.style.display='none';
    notify.style.display='none';
addclient.style.display='none';
addemployee.style.display='none'
areacode.style.display='none';
addserviceplan.style.display="none";
var area = document.getElementById('area');
area.style.display="none";
servicelist.style.display="none";
serviceplan.style.display="block";
servicereq.style.display="none";
client.style.display="none";
employee.style.display="none";

}


servicePlanClick(){
var client= document.getElementById('client');
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
service.style.display='none';
    notify.style.display='none';
addclient.style.display='none';
addemployee.style.display='none'
areacode.style.display='none';
addserviceplan.style.display="none";
var area = document.getElementById('area');
area.style.display="none";
servicelist.style.display="block";
serviceplan.style.display="none";
servicereq.style.display="none";
client.style.display="none";
employee.style.display="none";




}

addserviceplan(){
var client= document.getElementById('client');
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
service.style.display='none';
    notify.style.display='none';
addclient.style.display='none';
addemployee.style.display='none'
areacode.style.display='none';
addserviceplan.style.display="block";
var area = document.getElementById('area');
area.style.display="none";
servicelist.style.display="none";
serviceplan.style.display="none";
servicereq.style.display="none";
client.style.display="none";
employee.style.display="none";


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
      if(this.code != '' && this.areaname != '' && this.location !=''){
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
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onAreacode();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       alert(error);
    
  }
  // var notify = document.getElementById('notifyss');
  //    notify.style.display = 'block';
  
  $("#notifyss1").show();
  setTimeout(function() { $("#notifyss1").hide(); }, 5000);
   
     
               console.log(error);
             
            });
      }
}

addemployes(){
this.addemployestyle();
}



employeeForm(){
// add employee

if(this.code != '' && this.areacode !='' && this.password != '' && this.name !='' && this.phone !='' && this.address != ''){
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
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onEmployee();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       alert(error);
    
  }
  // var notify = document.getElementById('notifyss');
  //    notify.style.display = 'block';
  
  $("#notifyss1").show();
  setTimeout(function() { $("#notifyss1").hide(); }, 5000);
   
     
               console.log(error);
             
            });
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

clientForm(){
// add client

if(this.code != '' && this.areacode !='' && this.name !='' && this.phone !='' && this.address != '' && this.mobile !=''){
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
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.onClient();            
        this.router.navigate(['/customer']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       alert(error);
    
  }
  // var notify = document.getElementById('notifyss');
  //    notify.style.display = 'block';
  
  $("#notifyss1").show();
  setTimeout(function() { $("#notifyss1").hide(); }, 5000);
   
     
               console.log(error);
             
            });
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
       
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      

}

}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}