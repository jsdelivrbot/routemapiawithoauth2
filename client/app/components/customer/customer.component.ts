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

    name:any;
    password:any; 
public dd:any;
public mm:any;
public yyyy:any;    
// google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  
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
   }

ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges() 
this.date();      

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
addserviceplan.style.display="none";
var area = document.getElementById('area');
area.style.display="block";
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
this.router.navigate(['/login']);

}

dismiss(){
    var notify = document.getElementById('alerttag');
    notify.style.display='none';
}



}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}