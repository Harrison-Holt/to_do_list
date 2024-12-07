const quote_container = document.getElementById('quote_container');

async function get_quote() {
    try {
        const response = await fetch('/api/quote', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Error connecting to API! Status: ${response.status}`);
            quote_container.innerHTML = "Unable to fetch quote. Please try again later.";
            return;
        }

        const jsonResponse = await response.json(); // Full response
        console.log(jsonResponse);

        // Extract the first quote object from data array
        const data = jsonResponse.data;
        if (data && data.length > 0) {
            const quote = data[0].quote;
            const author = data[0].author;

            quote_container.innerHTML = `"${quote}" <br> - ${author}`;
        } else {
            console.error("No quotes found in API response.");
            quote_container.innerHTML = "No quotes available at the moment.";
        }
    } catch (error) {
        console.error("Error fetching data!", error);
        quote_container.innerHTML = "An error occurred. Please try again later.";
    }
}

// Call the function to display the quote
get_quote();
