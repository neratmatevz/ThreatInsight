const Agent = require('undici').Agent;

const nmapAPIcall = (scan_type, command, options, schedule, target, target_end) => {
    //set agent for ssl
    const agent = new Agent({
        connect: {
            rejectUnauthorized: false,
        },
    });

    //set request body as form data
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
            'NMAP-API-KEY': process.env.NMAP_API_KEY
        },
        dispatcher: agent,
        body: form
    };

    //Fetch to start the scan
    return fetch(`${process.env.NMAP_API}/start_scan`, fetchConfig)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.status_code === 201) {
                let scanID = data.scan_id;
                return scanID;
            } else {
                throw new Error(`Failed to start scan: ${data.status}`);
            }
        })
        .catch(error => {
            throw new Error(`Error starting scan: ${error.message}`);
        });
};


const nmapAPIreport = (scan_id) => {
    // Set agent for SSL
    const agent = new Agent({
        connect: {
            rejectUnauthorized: false,
        },
    });

    // Set request body as form data
    const form = new FormData();
    form.append(`scan_id`, scan_id);

    // Configure request parameters
    const fetchConfig = {
        method: 'POST',
        headers: {
            'NMAP-API-KEY': process.env.NMAP_API_KEY
        },
        dispatcher: agent,
        body: form
    };

    // Function to fetch report recursively with a delay
    const fetchWithDelay = () => {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NMAP_API}/scan_result`, fetchConfig)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.status_code === 200) {
                        resolve(data);
                    } else if (data.status_code === 202) {
                        // If status code is 202, call the function recursively after 5 seconds
                        setTimeout(() => {
                            resolve(fetchWithDelay());
                        }, 5000); // 5 seconds delay
                    } else {
                        reject(new Error(`Failed to fetch scan report: ${data.status}`));
                    }
                })
                .catch(error => {
                    reject(new Error(`Error fetching report: ${error.message}`));
                });
        });
    };

    // Start fetching report with delay
    return fetchWithDelay();
};

module.exports = { nmapAPIcall, nmapAPIreport };