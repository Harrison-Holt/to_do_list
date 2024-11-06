
document.getElementById("login_button").addEventListener('click', (event) => {
    event.preventDefault(); 

    let username = document.getElementById("username").value; 
    let password = document.getElementById("password").value; 

    send_login_info(username, password); 
}); 

async function send_login_info(username, password) {

    try {
        const response = await fetch('../api/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ username, password })
        }); 

        if(!response.ok) {
            console.error(`Error Fetching Data: ${response.status}`); 
            return; 
        }

        const result = await response.json(); 
        console.log(result); 

        window.location.href = './index.html'; 
    } catch(error) {
        console.error("Error Sending Data! Error: ", error); 
    }
}