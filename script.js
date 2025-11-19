async function loadCryptoData() {
    const url = "https://api.coincap.io/v2/assets?limit=10";
    const res = await fetch(url);
    const data = await res.json();

    const container = document.getElementById("crypto-container");
    container.innerHTML = "";

    data.data.forEach(coin => {
        const box = document.createElement("div");
        box.className = "crypto-box";
        box.innerHTML = `
            <h3>${coin.name}</h3>
            <p>Price: $${parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p>Change (24h): ${parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
        `;
        container.appendChild(box);
    });
}

loadCryptoData();

setInterval(loadCryptoData, 15000);

// -------- Chart.js Bitcoin Chart --------
async function loadBTCchart() {
    const res = await fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=h1");
    const data = await res.json();

    const prices = data.data.map(x => x.priceUsd);
    const times = data.data.map(x => new Date(x.time).toLocaleTimeString());

    new Chart(document.getElementById("btcChart"), {
        type: "line",
        data: {
            labels: times,
            datasets: [{
                label: "BTC Price",
                data: prices,
                borderWidth: 2
            }]
        }
    });
}

loadBTCchart();
