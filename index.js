
async function get_quote() {

    try {
        const response = await fetch('/api/quote', {
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        if(!response.ok) {
            console.error(`Error connection to api! Status: ${response.status}`); 
        }

        const data = await response.json(); 
        console.log(data); 
    } catch(error) {
        console.error("Fetching Data!", error); 
        return; 
    }
}

get_quote(); 