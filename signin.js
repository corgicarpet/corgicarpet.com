function startsigninhandler(){
    
    console.log(username.value);
    console.log(password.value);
    window.location.href = "index.html";
}

const signinbtn = document.getElementById("signinbutton");
const username = document.getElementById("username");
const password = document.getElementById("password");

signinbtn.onclick = startsigninhandler;