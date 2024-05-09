import axios from "axios";

const nmapAPIcall = (scan_type, command, options, schedule, target, target_end) =>{
    
    axios({
        method: "GET",
        url: `${process.env.NMAP_API}/`
    })
    .then(function(response){
        console.log(response);
        //shranis v firestore za tisto iskanje
    })
    .catch(function(error){
        console.log(error);
    });
}

export {nmapAPIcall};
