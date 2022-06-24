export const getAllCreditsCard = async () => {
    const res = await fetch('http://localhost:3000/credit_card/getAll', { method: 'GET' });
    const json = await res.json();
    return json;
}

export const newTrip = async ( data ) => {
    const res = await fetch('http://localhost:3000/trip/new', 
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    const json = await res.json();
    return json;
}

export const getAllCities = async () => {
    const res = await fetch('http://localhost:3000/city/getAll', { method: 'GET' });
    const json = await res.json();
    return json;
}

export const findTrips = async (data) => {
    const res = await fetch('http://localhost:3000/trip/findTrips',
        { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    const json = await res.json();
    return json;
}

export const newPassenger = async ( data ) => {
    const res = await fetch('http://localhost:3000/passenger/new', 
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    const json = await res.json();
    return json;
}