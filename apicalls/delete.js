async function deleteuser(){
    try{
        const userinputs={
            email:document.getElementById("delete_email").value ,
            password : document.getElementById("delete_password").value
        }
        const response = await fetch("http://127.0.0.1:3000/deleteuser",{
            method:"delete",
             credentials: "include",
            headers:{
                "content-type":"application/json"
            },
            body:(JSON.stringify(userinputs))
        })
        const data = await response.text()
        document.getElementById("deleteuser").innerHTML=data
    }
    catch(err){
        console.log(err)
    }
}