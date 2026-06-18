async function adduser(){
    try{
        const userinputs ={
            name : document.getElementById("name").value ,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        
    const response = await fetch("http://127.0.0.1:3000/adduserdata",{
        method:"post",
        headers:{
               "content-type":"application/json"
        },
        body:(JSON.stringify(userinputs))
    })
    const data = await response.text()
    document.getElementById("alreadyregistered").innerHTML=data
      if(response.ok){
        window.location.href="/JWT_authentication/frontendhtml/login.html";
    }
   }
    catch(err){
        console.log(err)
    }
}
 

async function login(){
    try{
        const userinputs ={
            email: document.getElementById("login_email").value,
            password: document.getElementById("login_password").value
        }
    const response = await fetch("http://localhost:3000/loginuser",{
        method:"post",
        credentials: "include",
        headers:{
               "content-type":"application/json"
        },
        body:(JSON.stringify(userinputs))
    })
    const data = await response.text()
    document.getElementById("loginuser").innerHTML=data
    if(response.ok){
        window.location.href="/JWT_authentication/frontendhtml/profile.html";
    }
   }
    catch(err){
        console.log(err)
    }
}