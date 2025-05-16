let roomcode = document.querySelector(".roomcode").innerHTML
let joinbtn = document.querySelector(".joinbtn").addEventListener("click", ()=>{
    window.location.href = `http://localhost:3000/${roomcode}/quiz`
})