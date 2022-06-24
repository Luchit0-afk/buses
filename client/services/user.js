export const registerFetch = async (data) => {
    const res = await fetch('http://localhost:3000/user/register',
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
    const res = await fetch('http://localhost:3000/user/login',
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