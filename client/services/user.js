export const registerFetch = async (data) => {
    const res = await fetch('http://localhost:3000/auth/register',
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

export const loginFetch = async (data) => {
    const res = await fetch('http://localhost:3000/auth/login',
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