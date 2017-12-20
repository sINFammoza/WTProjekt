// Session-Storage Elemente
sessionStorage.setItem('coins', coins);
sessionStorage.setItem('token', token);

//Host-Adressen und TOKEN,COINS variable

var hostlog = "https://legitjokes.herokuapp.com/api/user/authenticate";
var hostreg = "https://legitjokes.herokuapp.com/api/user/register";
var token;
var coins;

//Log-in Request

var loginform = new Vue({


    el: "#loginform",
    data: {

       seen:false,
       username:"",
       password:"",
       RegisterLink:"Don't have an Account? Click here to Register",
       ErrorMessage:"Username or password is wrong!",
       AnnoyingMessage:"",
       fails: false,
       failcounterLogin: 0

   },


   methods: {

login: function(e){ 
    
   e.preventDefault();

    this.$http.post(hostlog,{username: this.username,password: this.password})
    .then(function(res){

      if(res.body.Status === "Success") 
      {

         failcounterLogin = 0;
         this.$data.fails = false;
         console.log("Success");
         token = res.body.token;  
         coins = res.body.coins;
         console.log("Token: " +token);
         console.log("Coins: "+ coins);

     }
     else if(res.body.Status === "Error") 
     {

        this.$data.failcounterLogin++;

        console.log("Number of Login fails: "+this.failcounterLogin);

        if(this.$data.failcounterLogin>1){
      
           this.$data.fails = true;

        }

        switch(this.$data.failcounterLogin){
          
          case 2: 
          this.$data.AnnoyingMessage = "Whats wrong with you ?"
           break;

          case 3: 
          this.$data.AnnoyingMessage = "If you don't have an Account click the link !!!"
           break;

          case 4: 
          this.$data.AnnoyingMessage = "Do you think this is funny ?"
           break;


          case 5: 
          this.$data.AnnoyingMessage = "OK, I have nothing to say anymore"
           break;

          default:
          this.$data.AnnoyingMessage = ""


        }

        this.username = "";
        this.password = "";
        this.$data.seen = true;

    }

})

},


toRegisterForm: function(){

this.$data.seen = false;
this.$data.failcounterLogin = 0;
this.$data.fails = false;

}

}


});


//Account-Registrieren Register-Request

var registerform = new Vue ({


    el: "#register-div",
    data: {

       seen: false,
       username:"",
       password:"" ,
       RegHeading:"Create an Account",
       ErrorMessage:"Name is already used take another one !"

   },



   methods: {

//AJAX REQUEST

    register: function(e){ 
        
       e.preventDefault();

       console.log("Welcome to the Registration");

        this.$http.post(hostreg,{username: this.username,password: this.password})
        .then(function(res){

            if(res.body.Status === "Success"){
                
                console.log("Success");}

                if(res.body.Status === "Error"){

                   this.$data.seen = true;                
                   this.username = "";
                   this.password = "";
                   console.log("Error");

               }})          
    },

   // VON REGISTER ZURÜCK ZU LOGIN FORM 

    backToLogin: function(){

       this.$data.seen = false;

       $("#register-div").animate({opacity: 0}, {duration: 500, queue:false});
   

       setTimeout(function(){
           $(".form").fadeIn(1000);},1000);

}
}
});


// VUE für ANFANG 

var firstVue = new Vue({

 el: "#start",

 data:{

active: true,
hidden:true

 },

 mounted: function(){


    setTimeout(function(){
       $("ul").removeClass('Hidden');
         //firstVue.$data.hidden = false;
     },500);


     setTimeout(function(){
         $("#Menubutton").removeClass('hiddenButton');
     },3000);

 },



 methods:{
  
  //VERSCHWINDEN DES STARTBILDSCHIRMS UND ERSCHEINEN DER LOGINFORM

     loginform: function(){

        $("#Menubutton").fadeToggle();

        setTimeout(function(){
            $("ul").fadeToggle("slow");
        },1000);

        setTimeout(function(){
            $(".form").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow')
        },2000);

        //$("ul").addClass('Hidden');
        firstVue.$data.hidden = true;
        $("#Menubutton").addClass('hiddenButton');

    }
    


}


});




// JQUERY für den Wechsel von LOGIN zu REGISTER 


$(document).ready(function(){


    $("#toRegisterForm").click(function(){

        $('.form').fadeOut(1000)

        setTimeout(function(){
            $("#register-div").animate({opacity: 1}, {duration: 500, queue:false});

        },1500);

    });
  });












