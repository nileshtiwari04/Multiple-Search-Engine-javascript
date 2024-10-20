const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
const stockSearch = document.getElementById('stockSearch');
const searchButton = document.getElementById('searchButton');
const stockDetails = document.getElementById('stockDetails');
const stockTable = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
const ctx = document.getElementById('stockChart').getContext('2d');
let stockChart;

const stockDropdown = document.getElementById('stockDropdown');
const loadStockButton = document.getElementById('loadStockButton');

// Fetch stock data
async function getStockData(stockSymbol) {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`);
    const data = await response.json();
    return data['Time Series (Daily)'];
}

// Fetch top trending stocks (mocked)
async function getTrendingStocks() {
    // Replace this part with actual API call if available
    return ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NFLX', 'NVDA', 'BABA', 'INTC'];
}

// Populate dropdown with trending stocks
async function populateDropdown() {
    const trendingStocks = await getTrendingStocks();
    trendingStocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock;
        option.textContent = stock;
        stockDropdown.appendChild(option);
    });
}

// Display stock details
function displayStockDetails(stockData, symbol) {
    const latestDate = Object.keys(stockData)[0];
    const latestData = stockData[latestDate];
    const price = parseFloat(latestData['4. close']).toFixed(2);
    const volume = latestData['5. volume'];
    const previousClose = stockData[Object.keys(stockData)[1]]['4. close'];
    const change = (price - previousClose).toFixed(2);
    
    stockDetails.innerHTML = `
        <h3>${symbol}</h3>
        <p>Price: $${price}</p>
        <p>Change: $${change}</p>
        <p>Volume: ${volume}</p>
    `;

    updateStockTable(symbol, price, change, volume);
}

// Update stock comparison table
function updateStockTable(symbol, price, change, volume) {
    const newRow = stockTable.insertRow();
    newRow.innerHTML = `
        <td>${symbol}</td>
        <td>$${price}</td>
        <td>${change}</td>
        <td>${volume}</td>
    `;
}

// Display stock price graph
function displayStockGraph(stockData) {
    const labels = Object.keys(stockData).slice(0, 30).reverse();
    const data = labels.map(date => parseFloat(stockData[date]['4. close']));

    if (stockChart) {
        stockChart.destroy();
    }

    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Handle stock search
searchButton.addEventListener('click', async () => {
    const stockSymbol = stockSearch.value.toUpperCase();
    const stockData = await getStockData(stockSymbol);
    
    if (stockData) {
        displayStockDetails(stockData, stockSymbol);
        displayStockGraph(stockData);
    } else {
        stockDetails.innerHTML = `<p>Stock symbol not found.</p>`;
    }
});

// Load stock from dropdown
loadStockButton.addEventListener('click', async () => {
    const selectedStock = stockDropdown.value;
    const stockData = await getStockData(selectedStock);
    if (stockData) {
        displayStockDetails(stockData, selectedStock);
        displayStockGraph(stockData);
    } else {
        stockDetails.innerHTML = `<p>Stock data not available for ${selectedStock}.</p>`;
    }
});

// Initialize dropdown with trending stocks
populateDropdown();
