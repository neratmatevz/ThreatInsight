import axios from "axios";

let nmapAPIcall = () =>{
    
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
