import { client } from './database.js'; 
import bcrypt from 'bcrypt'; 

// Handler Function for the registration api 
export async function handler(req, res) {

    if(req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST Method Allowed!'}); 
        return; 
    }

    const { username, email, password } = req.body; 

    if(!username || !email || !password) {
        res.status(401).json({ message: 'Username, Email, Password Are Required!'}); 
        return; 
    }

    try {

        // Hashed the inputted password for security
        const hashed_password = await bcrypt.hash(password, 10); 

        // Insert the registration info into the dataase
        const result = await client.query(
            'INSERT accounts (username, email, password) VALUES (username = $1, email = $2, password = $3)', 
            [username, email, hashed_password]
        ); 

        // Check to see the query completed successfully 
        if(result.rowCount === 1) {
            res.status(201).json({ message: 'New User Created!'}); 
            return; 
        } else {
            res.status(500).json({ message: 'Failed to Insert New User Into Database' }); 
        }


    } catch(error) {
        console.error('Error Entering New User Into DB! Error: ', error); 
        res.status(500).json({ message: 'Internal Server Error!', error: error.message}); 
    }

}