import pkg from 'pg'; 
const { Pool } = pkg; 
import dotenv from 'dotenv'; 

dotenv.config(); 

const connection_string = process.env.CONNECTION_STRING; 

const pool = new Pool({
    connection_string, 
    ssl: {
        rejectUnauthorized: false
    }
}); 

export default pool; 
