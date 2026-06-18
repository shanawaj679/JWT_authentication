async function getuser(){
    try{
        const response = await fetch("http://127.0.0.1:3000/user",{
             credentials: "include"
        })
        if(!response.ok){
            console.log(`response eror ${response.status}`)
        }
        const data = await response.json();
        const wholedata = data
        const [{id,email,name,is_active}] = data
         document.getElementById("numberofactiveusers").innerHTML=JSON.stringify(data)
    }
    catch(err){
        console.log(err)
    }
}