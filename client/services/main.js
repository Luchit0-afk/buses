export const getAllCreditsCard = async () => {
    const res = await fetch('http://localhost:3000/credit_card/getAll', { method: 'GET' });
    const json = await res.json();
    return json;
}