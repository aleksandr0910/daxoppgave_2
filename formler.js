




/**
 * @param {String} fodselsdato format: ddmmyy
 * @param {boolean} isKvinne //how you identify, hvis du er ikke binær, bruk det tallet som du synes beskriver kjønnet ditt best
 * @param {String} wowRace //other MMO's count too.. 
 * @param {number} antallGangerRettetGeirSinProg 
 * @param {number} treningPerUke //bare kul trening teller.
 * @param {number} McTjukkasPerManed //fatso King also counts
 * @param {boolean} hasFrokostForSkole 
 * @param {boolean} hasDrivingFemalePartner or mother/sister
 * @param {boolean} hasMaleDrivingPartner or father/brother
 * @param {boolean} isSpillerItimen 
 * @returns age achieved with current lifestyle. Exactly!
 */
function calculateAge(
    isKvinne, wowRace, antallGangerRettetGeirSinProg,
    treningPerUke, McTjukkasPerManed,  
    hasFrokostForSkole, hasDrivingFemalePartner, hasMaleDrivingPartner,
    isSpillerItimen){
        let calculatedAge;
        if(isKvinne){
            calculatedAge = 81.7;
        } else {
            calculatedAge = 76.1;
        }

        if(wowRace) calculatedAge -=10.2; //To much sitting still..
        calculatedAge -= (McTjukkasPerManed*4.666);
        calculatedAge = calculatedAge - antallGangerRettetGeirSinProg*1.2
        calculatedAge = calculatedAge + treningPerUke * 1.2;
        calculatedAge += (hasFrokostForSkole * 4.19);
        calculatedAge -= (isSpillerItimen * 4.21);
        calculatedAge += (hasDrivingFemalePartner * 3.75);
        calculatedAge -= (hasMaleDrivingPartner * 3.71); 
        calculatedAge -= (isSpillerItimen * 4.62)


        return calculatedAge;
    }

    //Complete the formulae
    //You are supposed to calculate time and date of death, down to the minute!
    export function calculateExactTimeOfDeath(
        fodselsdato, isKvinne, wowRace, antallGangerRettetGeirSinProg,
        treningPerUke, McTjukkasPerManed,  
        hasFrokostForSkole, hasDrivingFemalePartner, hasMaleDrivingPartner,
        isSpillerItimen){
        let achievedAge = calculateAge(isKvinne, wowRace, antallGangerRettetGeirSinProg,
            treningPerUke, McTjukkasPerManed,  
            hasFrokostForSkole, hasDrivingFemalePartner, hasMaleDrivingPartner,
            isSpillerItimen);

        return achievedAge - (new Date().getFullYear()- fodselsdato.getFullYear()) 
    }

