import { Component , OnInit } from '@angular/core';
import {Task} from '../../../Task';
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
  selector: 'admin',
  templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit{ 


    public accesstoken:any;


    // add cutomer variable
    public code:any;
    public name:any;
    public location:any;
    public api:any;
    public password:any;
    public cpassword:any;
    public address:any;
    public email:any;
    public phone:any;
    public display:any;
    public current:any;
    public editdisplay:any;
    public currentpassword:any;
    public newpassword:any;
    public cnewpassword:any;


// on init
    ngOnInit(){
this.loaddata();
    }

    
    constructor(private router: Router,public http:Http){
    $(document).ready( function () {
    $('#example').DataTable();
} );


this.loaddata();
    }

     

// home page
home(){
     var notify = document.getElementById('alerttag');
    notify.style.display='none';
  var notify = document.getElementById('addcustomer');
    notify.style.display='none';
    var main = document.getElementById('adminmain');
main.style.display='block';
var displass = document.getElementById('editcustomer')
    displass.style.display = 'none';
    var changepassword = document.getElementById('changepassword')
    changepassword.style.display='none'
this.loaddata();
}



// add customer plus button functionality
 addcustomer(){
 var notify = document.getElementById('alerttag');
    notify.style.display='none';
var main = document.getElementById('adminmain');
main.style.display='none';
  var notify = document.getElementById('addcustomer');
    notify.style.display='block';
    var changepassword = document.getElementById('changepassword')
    changepassword.style.display='none'
    this.code='';
       this.name="";
       this.password="";
       this.email="";
       this.api="";
       this.address="";
       this.phone="";
 }


// logging out
   logout(){
   
   sessionStorage.removeItem('adminUser');
   sessionStorage.removeItem('access_token');      
   localStorage.removeItem('refresh_token');    

   this.router.navigate(['/login']);
   
   console.log('logged out');
   
         }



dismiss(){
    var notify = document.getElementById('alerttag');
    notify.style.display='none';
}



submitForm(){
 
      if(this.password == this.cpassword){

  // get access token
       let urlaccess = API.API_AddCustomer;
             let body2 = "name="+this.name+"&password="+this.password+'&email='+this.email+'&code='+this.code+'&location='+this.location+'&api='+this.api+'&address='+this.address+'&phone='+this.phone;
             this.accesstoken=sessionStorage.getItem('access_token')
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Bearer '+ this.accesstoken
    });
    
            this.http.post(urlaccess, body2, {headers : head2})
            .map(res =>  res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        })
       .subscribe(data => {
      this.home();            
        this.router.navigate(['/admin']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       alert(error);
    
  }
  // var notify = document.getElementById('notifys');
    //  notify.style.display = 'block';
  
  $("#notifys").show();
  setTimeout(function() { $("#notifys").hide(); }, 5000);
   
     
               console.log(error);
             
            });
 
       }else{
$("#notifys").show();
  setTimeout(function() { $("#notifys").hide(); }, 5000);
       }
     }

     
     loaddata(){
       console.log('loaddata');
let url = API.API_GetCustomer;
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
this.display = Array();
this.display=data;
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
    
       }


  remove(id){
   
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

this.loaddata();
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
}


loadsingledata(id){
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
       this.email=data.email;
       this.api=data.api;
       this.address=data.address
       this.phone=data.phone
}, error => {
if(error=="Unauthorized"){
alert(error);
console.log(error);
}
});      
    
       }

edit(id){
  console.log('reached edit');
    sessionStorage.setItem('tempid',id);
    var main = document.getElementById('adminmain');
    main.style.display='none';
    var notify = document.getElementById('addcustomer');
    notify.style.display='none';
    var displass = document.getElementById('editcustomer')
    displass.style.display = 'block';
    var changepassword = document.getElementById('changepassword')
    changepassword.style.display='none'
    this.loadsingledata(id); 

   




}


updateForm(){
 
      if(this.password == this.cpassword){

  // get access token
  var id = sessionStorage.getItem('tempid');
       let urlaccess = API.API_UpdateCustomer+id;
             let body2 = "name="+this.name+"&password="+this.password+'&email='+this.email+'&code='+this.code+'&location='+this.location+'&api='+this.api+'&address='+this.address+'&phone='+this.phone;
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
      this.home();            
        this.router.navigate(['/admin']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       alert(error);
    
  }
  // var notify = document.getElementById('notifys');
    //  notify.style.display = 'block';
  
  $("#notifyss").show();
  setTimeout(function() { $("#notifyss").hide(); }, 5000);
   
     
               console.log(error);
             
            });
 
       }else{
$("#notifyss").show();
  setTimeout(function() { $("#notifyss").hide(); }, 5000);
       }
     }







passwordForm(){

if(this.cnewpassword == this.newpassword){

       let urlaccess = API.API_UpdatePassword;
             let body2 ="name="+this.name+"&password="+this.newpassword+'&oldpassword='+this.currentpassword;
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
      this.home();            
        this.router.navigate(['/admin']);   
     }, error => {
       if(error=="Unauthorized"){
       console.log(error);
       alert(error);
    
  }
  // var notify = document.getElementById('notifys');
    //  notify.style.display = 'block';
  
  $("#notifyss").show();
  setTimeout(function() { $("#notifyss").hide(); }, 5000);
   
     
               console.log(error);
             
            });
}
}


changepassword(){

  var notify = document.getElementById('alerttag');
    notify.style.display='none';
  var notify = document.getElementById('addcustomer');
    notify.style.display='none';
    var main = document.getElementById('adminmain');
main.style.display='none';
var displass = document.getElementById('editcustomer')
    displass.style.display = 'none';
    var changepassword = document.getElementById('changepassword')
    changepassword.style.display='block'

}

}



