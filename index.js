const quote_container = document.getElementById('quote_container');

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

        quote_container.innerHTML = `"${data[0].quote}" <br>
                                        - ${data[0].author}`; 
    } catch(error) {
        console.error("Fetching Data!", error); 
        return; 
    }
}

get_quote(); 