
// Event listener for the register button 
document.getElementById('register_button').addEventListener('click', (event) => {
    event.preventDefault(); 

    // Retrieve registration info from form 
    let username = document.getElementById("username").value; 
    let email = document.getElementById('email').value; 
    let password = document.getElementById("password").value; 

    send_registration_info(username, email, password); 
}); 

async function send_registration_info(username, email, password) {

    try {
        
        // Send the registration info to the api 
        const response = await fetch('../api/register', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ username, email, password })
        }); 

        // Check to see if the response is working 
        if(!response.ok) {
            console.error(`Error Fetching Data! Error: ${response.status}`); 
            return; 
        }

        // Retrieve the status code from the api 
        const data = await response.json(); 
        console.log(data); 

        window.location.href = './login.html'; 

    } catch(error) {
        console.error('Error Sending Data! Error: ', error); 
    }
}