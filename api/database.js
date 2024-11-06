import { Pool } from 'pg'; 
import dotenv from 'dotenv'; 

dotenv.config(); 

const connection_string = process.env.CONNECTION_STRING; 

const pool = new Pool({
    connection_string, 
    ssl: {
        rejectUnauthorized: false
    }
}); 

export async function connect_to_db() {

    try {
        await pool.connect(); 
        console.log('Connected to DB!'); 
    } catch(error) {
        console.error('Error connecting to DB! Error: ', error); 
    }
}

