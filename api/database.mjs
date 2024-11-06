import { Client } from 'pg'; 

const connection_string = 'postgresql://neondb_owner:6oM8ReBmUqlV@ep-weathered-band-a5u1s0ti-pooler.us-east-2.aws.neon.tech/To_Do_List?sslmode=require'; 

const client = new Client({
    connection_string, 
    ssl: {
        rejectUnauthorized: false
    }
}); 

export async function connect_to_db() {

    try {
        await client.connect(); 
        console.log('Connected to DB!'); 
    } catch(error) {
        console.error('Error connecting to DB! Error: ', error); 
    }
}

