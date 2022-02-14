import {
    calculateExactTimeOfDeath
}from "./formler.js"


const knapp = document.querySelector("button");
knapp.addEventListener("click",rot)

function rot(){
let dato = new Date(document.getElementById("fodselsdato").value)
console.log(dato)
let kjonn = document.getElementById("isKvinne").checked
if(kjonn == true){
    console.log("du er kvinne")
} else {
    console.log("gratulerer")
}
let rase = document.getElementById("wowRace").value
console.log(rase)
let geirprog = document.getElementById("antallGangerRettetGeirSinProg").value
console.log(geirprog)
let trening = document.getElementById("treningPerUke").value
console.log(trening)
let mccern = document.getElementById("McTjukkasPerManed").value
console.log(mccern)
let frokostskole = document.getElementById("hasFrokostForSkole").checked
if(frokostskole == true){
    console.log("kult ass")
} else {
    console.log("raring")
}
let femaledriver = document.getElementById("hasDrivingFemalePartner").checked
console.log(femaledriver)
let maledriver = document.getElementById("hasMaleDrivingPartner").checked
console.log(maledriver)
let spille = document.getElementById("isSpillerItimen").checked
console.log(spille)

document.querySelector("form").reset()

let death = calculateExactTimeOfDeath(
    dato,kjonn,rase,geirprog,trening,mccern,frokostskole,femaledriver,maledriver,spille
)
let p = document.querySelector("p")
p.innerHTML = death 
}


let countDownDate = new Date().getTime(
)
let x = setInterval(() => {
    
}, 1000);
let now = new Date().getTime()

let distance = countDownDate - now;
let days = Math.floor(distance / (1000 * 60 * 60 * 24));
let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("demo").innerHTML = days + "d " + hours + "h "
+ minutes + "m " + seconds + "s ";
if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";}

function millisekunder(){

let dato = new Date(document.getElementById("fodselsdato").value)
}