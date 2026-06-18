async function userprofile(){
    try{
        const response = await fetch("http://127.0.0.1:3000/userprofile",{
            credentials: "include"
        });

        if(!response.ok){
            const message = await response.text();
            console.log(`Error ${response.status}: ${message}`);
            return;
        }

        const data = await response.json();

        const [{id,email,name,is_active}] = data;

        document.getElementById("your_id").innerHTML = id;
        document.getElementById("your_name").innerHTML = name;
        document.getElementById("your_is_active").innerHTML = is_active;
        document.getElementById("your_email").innerHTML = email;
    }
    catch(err){
        console.log(err);
    }
}