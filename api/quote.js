import dotenv from 'dotenv'; 

dotenv.config(); 
const api_key = process.env.API_KEY

export default async function handler(req, res) {

    if(req.method !== 'GET') {
        res.status(405).json({ message: 'Only GET Reguests Allowed!'}); 
        return; 
    }

    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
            headers: {
                'X-Api-Key': api_key
            }
        })

        if(!response.ok) {
            console.error(`Error Fetching Data! Stsus: ${response.status}`); 
            res.status(500).json({ message: 'Internal Server Error!'}); 
            return; 
        }

        const data = await response.json(); 
        console.log(data); 
        res.status(200).json({ message: 'Successful!', data}); 
    } catch(error) {
        console.error('Error Fetching Data!', error); 
        res.status(500).json({ message: 'Internal Server Error!'}); 
        return; 
    }
}