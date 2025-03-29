document.addEventListener('DOMContentLoaded', function() {
    // Initialize the gold price chart
    const ctx = document.getElementById('gold-price-chart').getContext('2d');
    const goldChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Gold Price (₹)',
                data: [4800, 4950, 5100, 5050, 5200, 5150, 5300, 5250, 5400, 5350, 5500, 5234.75],
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#A0AEC0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#A0AEC0'
                    }
                }
            }
        }
    });

    // Update gold price and chart data every 5 seconds
    setInterval(() => {
        const currentPrice = parseFloat(document.querySelector('.current-price').textContent.replace('₹', '').replace(',', ''));
        const change = (Math.random() - 0.5) * 50;
        const newPrice = currentPrice + change;
        const changePercent = (change / currentPrice * 100).toFixed(2);

        // Update price display
        document.querySelector('.current-price').textContent = `₹${newPrice.toFixed(2)}`;
        const priceChange = document.querySelector('.price-change');
        priceChange.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent}%`;
        priceChange.className = `price-change ${changePercent >= 0 ? 'positive' : 'negative'}`;

        // Update chart data
        goldChart.data.datasets[0].data.push(newPrice);
        goldChart.data.datasets[0].data.shift();
        goldChart.update();
    }, 5000);
}); 