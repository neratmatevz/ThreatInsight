const Agent = require('undici').Agent;

const nmapAPIcall = (scan_type, command, options, schedule, target, target_end) =>{
    
    //set agent for ssl
    const agent = new Agent({
        connect: {
          rejectUnauthorized: false,
        },
    })

    //set request body as form
    const form = new FormData();
    form.append(`scan_type`, scan_type);
    form.append(`command`, command);
    form.append(`options`, options);
    form.append(`schedule`, schedule);
    form.append("target", target);
    form.append(`target_end`, target_end);

    //Configure request parameters
    const fetchConfig = {
        method: 'POST',
        headers: {
            'NMAP-API-KEY' : process.env.NMAP_API_KEY 
        },
        dispatcher: agent,
        body: form
    }

    //Fetch to start the scan
    fetch(
            `${process.env.NMAP_API}/start_scan`,
            fetchConfig
        )
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.status_code === 201){
                let scanID = data.scan_id;
                return scanID;
            }
            if(data.status_code === 401){return data.status;}

            if(data.status_code === 403){return data.status;}

            if(data.status_code === 404){return data.status;}

            if(data.status_code === 405){return data.status;}

            if(data.status_code === 417){return data.status;}

            if(data.status_code === 429){return data.status;}
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

module.exports = nmapAPIcall;