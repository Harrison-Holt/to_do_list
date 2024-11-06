import pool from './database.js'; 
import bcrypt from 'bcrypt'; 

// Handler function for the login api 
export async function handler(req, res) {

    // Chech request method
    if(req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST Methods Allowed!'}); 
        return; 
    }


    // Retrieve info from request body  
    const { username, password } = req.body; 

    // Check if username or password is null or not 
    if(!username || !password) {
        res.status(400).json({ message: 'Username and Password Required!'}); 
        return; 
    }

    try {

    // Retrieve the user's password from the database
    const result = await pool.query(
        'SELECT password FROM accounts WHERE username = $1', 
        [username]
    ); 

    // Check if an user was found 
    if(result.rows.length === 0) {
        res.status(404). json({ message: 'User Not Found!'}); 
        return; 
    }

    const hashed_password = result.rows[0].password; 

    // Compared the inputted password with the hashed password in the database
    const password_matched = await bcrypt.compare(password, hashed_password); 

    // Check if passwords match or not 
    if(password_matched) {
        res.status(200).json({ message: 'User Verified Successfuly!'}); 
    } else {
        res.status(401).json({ message: 'Password Invalid!'}); 
    }
    
    } catch(error) {
        console.error('Error Verifying User! Error: ', error); 
        res.status(500).json({ message: 'Internal Server Error! ', error: error.message}); 
    }
}