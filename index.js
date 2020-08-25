let list = document.getElementById("taravelInfo").children;
const form = document.getElementById("taravelInfo");
let ids = {};
let results = {};
const invalid = {
    "name":"start with alphabets,Enter your valid name.",
    "email":"invalid email ",
    "number":"invalid mobile number ",
    "address":"please fill the valid address"
}


Array.from(list).forEach(element => {
    element.addEventListener("change",validate);
});

function validate(event){
   const name = event.target.name;
   const element = event.target;
   let isValid = false;
   if(name === "name"){
       let regex = /^[a-z]{1,2}\w+(\s+?\w+){0,10}/i;
       if(regex.test(element.value)){
            isValid =true;
            
       }
   }
   else if(name === "email"){
        let regex = /(\w+)[@]([a-z]+)[.]([a-z]+)/i;
        if(regex.test(element.value)){
          
            isValid =true;
        }
   }

   else if(name === "number"){
       let regex = /\b\d{10}\b/;
       if(regex.test(event.target.value)){
            
            isValid =true;
        }
   }
   else if(name ==="cars"){
        
        isValid =true;
   }

   else if(name === "address"){
       let regex = /\w+(\s+?\w+?){0,20}/i;
       if(regex.test(element.value)){
            
            isValid =true;
        } 
   }
   else if(name === "message"){
       let regex = /\w+(\s+?\w+?){0,20}/i;
       if(regex.test(element.value)){
        ids = {
            ...ids,
            [name]:name
        }
         element.classList.add("is-valid");
         return;
       }
       else{
        element.classList.remove("is-valid");
        return;
       }
    }
   if(isValid){
        ids = {
            ...ids,
            [name]:name
        }

        results = {
            ...results,
            [name]:true
        }
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        let feedback = document.getElementById("f"+name);
        feedback.classList.replace("invalid-feedback","valid-feedback");
        feedback.innerText = "looks good..";
   }else{
        results = {
            ...results,
            [name]:false
        }
        element.classList.add("is-invalid");
        let feedback = document.getElementById("f"+name);
        feedback.classList.replace("valid-feedback","invalid-feedback");
        feedback.innerText = invalid[name];
   }
}

function result(value,message){
    const html = `<div id = ${value} class="result alert alert-${value} alert-dismissible fade show" role="alert">
    <strong> ${value==="danger"?"Failure":"Success"}</strong> ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
</div>`
    if(value==="success"){
        document.querySelector(".container").insertAdjacentHTML("beforebegin",html);
        let arr = Object.values(ids);
        setTimeout(()=>{
            arr.forEach((value)=>{
                document.getElementById(value).classList.remove("is-valid");
            })
        },0)
        form.reset();
        ids = {};
        results = {};
        
    }else{
        document.querySelector(".container").insertAdjacentHTML("beforebegin",html);
    }
    
    
    setTimeout(()=>{
        let result = document.querySelector(".result");
        result.remove();
    },5000);
}

form.addEventListener("submit",(event)=>{
    
    event.preventDefault();
    let arr = Object.values(results);
    if(check(arr)){
        result("success","Your travel request has been successfully submited");
    }else{
        result("danger","Please fill the from completely")
    }
    document.documentElement.scrollTop = 0;     
});

function check(arr){

    if(arr.length < 5 ){
        return false;
    }
    for(value in arr){
        if(value===false){
            return false;
        }
    }
    return true;
}