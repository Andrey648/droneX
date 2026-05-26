const express = require('express');
const app = express();
app.use(express.json());

const shopId = 'ТВОЙ_SHOP_ID';
const secretKey = 'ТВОЙ_SECRET_KEY';

app.post('/create-payment', async (req, res) => {
    const { amount } = req.body;

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(shopId + ':' + secretKey).toString('base64'),
            'Idempotence-Key': Date.now().toString()
        },
        body: JSON.stringify({
            amount: {
                value: amount,
                currency: 'RUB'
            },
            confirmation: {
                type: 'redirect',
                return_url: 'http://localhost:5500/thanks.html'
            },
            capture: true,
            description: 'DroneX Order'
        })
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log("Server started"));