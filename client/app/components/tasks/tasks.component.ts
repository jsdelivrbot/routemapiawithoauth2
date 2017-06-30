import { Component, OnInit } from '@angular/core';
import {Task} from '../../../Task';
import { Router } from '@angular/router';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {API} from './../../api_config/api_config';
import {Base64} from 'js-base64';


@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './tasks.component.html',
})

export class TasksComponent implements OnInit{ 


    name:any;
    password:any; 
    public registration:any;
    public access_token:any;
    public refresh_token:any;

    
    
    
    constructor(private router: Router,public http:Http){
       
    }
    
    
    
    // on init
    ngOnInit(){
if(sessionStorage.getItem('adminUser')=='admin'){
     
     this.router.navigate(['/admin']);

        }
     else if(sessionStorage.getItem('currentUser')=='customer'){
        this.router.navigate(['/customer']);
     }

    }

    
    // call for login
    submit(){
             if(this.name=='admin'){
            // pre registration if not added
             let url = API.API_REGISTER;
             let body = "username="+this.name+"&password="+this.password;
             let head = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded'
               });
    

            this.http.post(url, body, {headers : head})
            .map(res =>  res.json())
            .subscribe(data => {
               
               
            
        
    
              }, error => {
               console.log(error);
               });

       console.log('get access_token');
    // get access token
       let urlaccess = API.API_AccessToken;
             let body2 = "username="+this.name+"&password="+this.password+'&grant_type=password';
             sessionStorage.setItem('username',this.name)
             var authdata = btoa('test' + ':' + 'secret');
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Basic '+ authdata
    });
    
            this.http.post(urlaccess, body2, {headers : head2})
            .map(res =>  res.json())
            .subscribe(data => {
              this.access_token =  data.access_token;               
              this.refresh_token = data.refresh_token; 
    console.log('access_token' + this.access_token +'\n refresh_token' + this.refresh_token)
        sessionStorage.setItem('access_token',this.access_token)      
        localStorage.setItem('refresh_token',this.refresh_token)    
        sessionStorage.setItem('adminUser',this.name)
        this.router.navigate(['/admin']);   
     }, error => {
               console.log(error);
            $("#alerttag").show();
  setTimeout(function() { $("#alerttag").hide(); }, 5000);
            });
         
}
     else{

        //  customer logged in
         
                console.log('get access_token');
    // get access token
       let urlaccess = API.API_AccessToken;
             let body2 = "username="+this.name+"&password="+this.password+'&grant_type=password';
            sessionStorage.setItem('username',this.name)
             var authdata = btoa('test' + ':' + 'secret');
             let head2 = new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization':'Basic '+ authdata
    });
    
            this.http.post(urlaccess, body2, {headers : head2})
            .map(res =>  res.json())
            // do any other checking for statuses here
        
            .subscribe(data => {
              this.access_token =  data.access_token;               
              this.refresh_token = data.refresh_token; 
    console.log('access_token' + this.access_token +'\n refresh_token' + this.refresh_token)
        sessionStorage.setItem('access_token',this.access_token)      
        localStorage.setItem('refresh_token',this.refresh_token)    
         sessionStorage.setItem('currentUser',this.name)
     this.router.navigate(['/customer']);  
     }, error => {
               console.log(error + "customer error");
              
            $("#alerttag").show();
  setTimeout(function() { $("#alerttag").hide(); }, 5000);
            });
        
     
    }
}

dismiss(){
    var notify = document.getElementById('alerttag');
    notify.style.display='none';
}
  
}
