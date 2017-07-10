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
  styles: [
   "styles.css",
   "../node_modules/bootstrap/dist/css/bootstrap.min.css",
   "../node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
   "../node_modules/datatables.net-bs/css/dataTables.bootstrap.css",
   "../node_modules/datatables.net-select-bs/css/select.bootstrap.css"
 ]
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
    public tableWidget:any;
    public selectedName:any;


// on init
    ngOnInit(){
        if(localStorage.getItem('User')=='admin'){
     
     this.router.navigate(['/admin']);

        }
     else{
        this.router.navigate(['/customeron']);
     }

    $("#alerttag").show();
  setTimeout(function() { $("#alerttag").hide(); }, 5000);
this.loaddata();

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
 
  }


  private reInitDatatable(): void {
    if (this.tableWidget) {
      this.tableWidget.destroy()
      this.tableWidget=null
    }
    setTimeout(() => this.initDatatable(),0)
  }

  public selectRow(index: number, row:any) {
    this.selectedName = "row#" + index + " " + row.name
  }
    
    constructor(private router: Router,public http:Http){
   

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
      this.code='';
       this.name="";
       this.password="";
       this.email="";
       this.api="";
       this.address="";
       this.phone="";
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
   
   localStorage.removeItem('User');
   localStorage.removeItem('access_token');      
   localStorage.removeItem('refresh_token');    
//    this.location.replaceState('/');
   this.router.navigate(['/login']);
   
   console.log('logged out');
   
         }



dismiss(){
    var notify = document.getElementById('alerttag');
    notify.style.display='none';
}



submitForm(){
 if(  !(this.code=='') &&
       !(this.name=="") &&
       !(this.password=="")&&
       !(this.email=="")&&
       !(this.api=="")&&
       !(this.address=="")&&
       !(this.phone=="")){
      if(this.password == this.cpassword){

  // get access token
       let urlaccess = API.API_AddCustomer;
             let body2 = "name="+this.name+"&password="+this.password+'&email='+this.email+'&code='+this.code+'&location='+this.location+'&api='+this.api+'&address='+this.address+'&phone='+this.phone;
             this.accesstoken=localStorage.getItem('access_token')
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
 }else{
                $("#notifys").show();
  setTimeout(function() { $("#notifys").hide(); }, 5000);
 }
     }

     
     loaddata(){
       console.log('loaddata');
let url = API.API_GetCustomer;
    this.accesstoken=localStorage.getItem('access_token')
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
this.reInitDatatable()
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
    this.accesstoken=localStorage.getItem('access_token')
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
    this.accesstoken=localStorage.getItem('access_token')
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
    localStorage.setItem('tempid',id);
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
 if(  !(this.code=='') &&
       !(this.name=="") &&
       !(this.password=="")&&
       !(this.email=="")&&
       !(this.api=="")&&
       !(this.address=="")&&
       !(this.phone=="")){
      if(this.password == this.cpassword){

  // get access token
  var id = localStorage.getItem('tempid');
       let urlaccess = API.API_UpdateCustomer+id;
             let body2 = "name="+this.name+"&password="+this.password+'&email='+this.email+'&code='+this.code+'&location='+this.location+'&api='+this.api+'&address='+this.address+'&phone='+this.phone;
             this.accesstoken=localStorage.getItem('access_token')
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
  console.log(error + "suggested");
             $("#notifyss").show();
  setTimeout(function() { $("#notifyss").hide(); }, 5000);
            });
 
       }else{
             $("#notifyss").show();
  setTimeout(function() { $("#notifyss").hide(); }, 5000);
       }
       }else{
                      $("#notifyss").show();
  setTimeout(function() { $("#notifyss").hide(); }, 5000);
       }
     }







passwordForm(){

var names = localStorage.getItem('adminUser')
if(this.cnewpassword == this.newpassword){

       let urlaccess = API.API_UpdatePassword;
             let body2 ="name="+names+"&password="+this.newpassword+'&oldpassword='+this.currentpassword;
             this.accesstoken=localStorage.getItem('access_token')
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

    

 let urlaccess = API.API_AccessToken;
 var refresh_token = localStorage.getItem('refresh_token')
             let body2 = "username="+this.name+"&refresh_token="+refresh_token+'&grant_type=refresh_token';
             var authdata = btoa('clientBasic' + ':' + 'clientPassword');
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Basic '+ authdata
    });
    
            this.http.post(urlaccess, body2, {headers : head2})
            .map(res =>  res.json())
            .subscribe(data => {
       
           localStorage.setItem('access_token',data.access_token)      
       
        this.home();            
        this.router.navigate(['/admin']);   
     }, error => {
               console.log(error);
            $("#alerttag").show();
  setTimeout(function() { $("#alerttag").hide(); }, 5000);
            });
       
}, error => {
       if(error=="Unauthorized"){
       console.log(error);
       alert(error);
    
  }
  
  $("#notifyss").show();
  setTimeout(function() { $("#notifyss").hide(); }, 5000);
   
     
               console.log(error);
             
            });
}else{
    $("#notifyss").show();
  setTimeout(function() { $("#notifyss").hide(); }, 5000);
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



