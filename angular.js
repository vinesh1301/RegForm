// Now the main angularJs part

var myApp = angular.module("myApp", []);
myApp.service("ContactService" , function(){
 var uid = 1;
 var contacts = [{
   'id' : 0,
 'name' : 'Vinesh Kumar',
 'email' : 'vineshkumar1301@gmail.com',
 'password': '1234567',
 'phone' : '8777340064'}]; 
 
 // Code for  saving new contact and saving existing edited contact.
 
 this.save = function(contact)  
 {
 if(contact.id == null)                       
 {
 contact.id = uid++;
 contacts.push(contact);
 }
 else
 {
 for(var i in contacts)
 {
 if(contacts[i].id == contact.id)
 {
 contacts[i] = contact;
 }
 }
 }
 };
 
 // serach for a contact
 
 
 this.get = function(id)
 {
 for(var i in contacts )
 {
 if( contacts[i].id == id)
 {
 return contacts[i];
 }
 }
 };
 
 //Delete a contact
 
 this.delete = function(id)
 {
 for(var i in contacts)
 {
 if(contacts[i].id == id)
 {
 contacts.splice(i,1);
 }
 }
 }; 
 
 //Show all contacts
 
 this.list = function()
 {
 return contacts;
 } ; 
});
 
 
 // Now the controller part of the AngularJs
 
myApp.controller("ContactController" , function($scope , ContactService){
    console.clear();
    
    $scope.ifSearchUser = false;
    $scope.title ="List of Users";
    
 $scope.contacts = ContactService.list();
 
 $scope.saveContact = function()
 {
   console.log($scope.newcontact);
   if($scope.newcontact == null || $scope.newcontact == angular.undefined)
   return;
 ContactService.save($scope.newcontact);
 $scope.newcontact = {};
 }; 
 $scope.delete = function(id)
 {
 ContactService.delete(id);
 if($scope.newcontact != angular.undefined && $scope.newcontact.id == id)
 {
 $scope.newcontact = {};
 }
 }; 
 $scope.edit = function(id)
 {
 $scope.newcontact = angular.copy(ContactService.get(id));
 }; 
 $scope.searchUser = function(){
   if($scope.title == "List of Users"){
     $scope.ifSearchUser=true;
     $scope.title = "Back";
   }
   else
   {
     $scope.ifSearchUser = false;
     $scope.title = "List of Users";
   }   
 };
});