const monthNames = ["January", "February", "March", "April", "May", "June", "Julii", "Augustus", "Septis", "October", "November", "December"];
let form = $("#personal-data");
let formData;

form.on('submit', event => {
    event.preventDefault();
    formData = {
        birthDate: $("#fodselsdato").val(), //HTML Validation
        kjonn: $("#kjonn").val()*1, //HTML Validation and multiply by 1 for dirty conversion..
        mmorace: $("#mmorace").val()*1, //selector, no validation
        rettetGeirSinProg: $("#geirRetting").val()*1, //HTML validation and multiply for dirty conversion..
        treningPerUke: $("#trening").val()*1,
        mctjukkas: $("#mctjukkas").val()*1, //HTML validation and multiply for dirty conversion..
        breakfast: $("#breakfast").is(":checked"),
        gamer: $("#gamer").is(":checked"),
        sjaffor: $("#sjaffor").val()*1
    }

    let calculatedAge = calculateAge(formData.kjonn, formData.mmorace,
         formData.rettetGeirSinProg, formData.treningPerUke, formData.mctjukkas, 
         formData.breakfast, formData.gamer, formData.sjaffor);
    const deathDate = calculateExactTimeOfDeath(formData.birthDate, calculatedAge);
    initiateTimer(new Date(formData.birthDate), deathDate);
});

/**
 * @param {String} fodselsdato format: ddmmyy
 * @param {number} kjonn //velg det tallet som beskriver kjønnet ditt best, 0 og 1 er binær reservasjon. 0 er kvinne, 1 er mann
 * @param {String} mmorace //other MMO's count too.. 
 * @param {number} antallGangerRettetGeirSinProg 
 * @param {number} treningPerUke //bare kul trening teller.
 * @param {number} McTjukkasPerManed //fatso King also counts
 * @param {boolean} hasFrokostForSkole 
 * @param {boolean} hasSafeDriver
 * @param {boolean} isSpillerItimen 
 * @returns age achieved with current lifestyle. Exactly!
 */
function calculateAge(
    kjonn, mmorace, antallGangerRettetGeirSinProg,
    treningPerUke, McTjukkasPerManed,  
    hasFrokostForSkole,
    isGamer,
    hasSafeDriver){
        let calculatedAge = kjonn ? 76.1 : 81.7;
        console.log("1: ", calculatedAge);

        if(mmorace) calculatedAge -= 10.2; //To much sitting still..
        console.log("2: ", calculatedAge);

        calculatedAge -= (McTjukkasPerManed*4.666);
        console.log("3: ", calculatedAge);
        calculatedAge = calculatedAge - antallGangerRettetGeirSinProg*1.2
        console.log("4: ", calculatedAge);
        calculatedAge = calculatedAge + treningPerUke * 1.2;
        console.log("5: ", calculatedAge);
        calculatedAge += (hasFrokostForSkole * 1.119);
        console.log("6: ", calculatedAge);
        calculatedAge -= (isGamer * 4.21); console.log("isGamer", isGamer)
        console.log("7: ", calculatedAge);
        calculatedAge = hasSafeDriver ? calculatedAge - 4 : calculatedAge*1.121;//true means male driver.. 
        console.log("8: ", calculatedAge);
        calculatedAge -= (isGamer * 4.62);
        console.log("9: ", calculatedAge);

    return calculatedAge;
}

//Complete the formulae
//You are supposed to calculate time and date of death, down to the minute!
function calculateExactTimeOfDeath(birthDate, calculatedAge){

    const birthDateInMilis = new Date(birthDate).getTime();
    const deathDateInMillis = birthDateInMilis + ageToMilliSeconds(calculatedAge);

    return new Date(deathDateInMillis);
}

function ageToMilliSeconds(ageInYears){
    //age measured in years calculated to days
    const ageInDays = ageInYears*365; //dont count for leap years..
    const ageInHours = ageInDays*24;
    const ageInMinutes = ageInHours*60;
    const ageInSeconds = ageInMinutes*60;
    const ageInMillis = ageInSeconds*1000;

    return ageInMillis;
}

function initiateTimer(birthDate, deathDate){
    $("#deathTimer").removeClass("hidden");
    $("#deathdate").text(
        `Date of death:  ${deathDate.getDate()} ${monthNames[deathDate.getMonth()]} ${deathDate.getFullYear()}`
    );
    const birthDateInMillis = new Date(birthDate).getTime();
    const deathDateInMillis = deathDate.getTime();


    setTimeout(_=>{
        let millisToDeath = deathDateInMillis - Date.now();
        let secondsToDeath = millisToSeconds(millisToDeath);
        let minutesToDeath = secondsToMinutes(secondsToDeath);
        let hoursToDeath = minutesToHours(minutesToDeath);
        let daysToDeath = hoursToDays(hoursToDeath);
        let yearsToDeath = daysToYears(daysToDeath);

        $("#years").text(`Years left to live: ${Math.floor(yearsToDeath)}`);
        $("#days").text(`Days left to live: ${Math.floor(daysToDeath)}`);
        $("#timer").text(`${Math.floor(hoursToDeath)}h : ${Math.floor(minutesToDeath)}m :${Math.floor(secondsToDeath)}s`);
        if(millisToDeath > 0){
           initiateTimer(birthDate, deathDate); //CLEAN THIS UP!
        } else {
            //TODO: GO TO YOU ARE DEAD PAGE
            //TODO: ADD sound to last day of living... just as a kind reminder..
        }
    }, 1000);
}

function recursiveTimeout(){}

function millisToSeconds(millis){
    return millis/1000;
}

function secondsToMinutes(seconds){
    return seconds/60;
}

function minutesToHours(minutes){
    return minutes/60;
}

function hoursToDays(hours){
    return hours/24;
}

function daysToYears(days){
    return days/365;
}