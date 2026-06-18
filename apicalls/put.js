async function updateuser(){
    try{
        const userinputs ={
            email : document.getElementById("changepassword_email").value ,
            oldpassword : document.getElementById("changepassword_oldpassword").value,
            newpassword : document.getElementById("changepassword_newpassword").value
        }
        const response = await fetch("http://127.0.0.1:3000/updateuser",{
            method:"put",
             credentials: "include",
            headers:{
                "content-type":"application/json"
            },
            body:(JSON.stringify(userinputs))
        })
        const data = await response.text();
        document.getElementById("changepassword").innerHTML=data;
    }
    catch(err){
        console.log(err)
    }
}