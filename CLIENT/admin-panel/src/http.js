
export const postData = async (requestData, apiUrl) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData)
        });


        const data = await response.json();

        if (!response.ok) {
            alert(data.message)
            throw new Error(`HTTP error! status: ${response.status} - ${data.message}`);
        }

        return data

        // Handle the response data in here
    } catch (error) {
        console.error('Error:', error);
        // Handle the error here
    }
};

export const fetchData = async (apiUrl, loadData = undefined) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });


        const data = await response.json();

        if (!response.ok) {
            alert(data.message)
            throw new Error(`HTTP error! status: ${response.status} - ${data.message}`);
        }

        if (loadData) {
            loadData(data)
        }

        return data

        // Handle the response data in here
    } catch (error) {
        console.error('Error:', error);
        // Handle the error here
    }
};