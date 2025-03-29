document.addEventListener('DOMContentLoaded', function() {
    // Initialize the real estate price chart
    const ctx = document.getElementById('real-estate-chart').getContext('2d');
    const realEstateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Property Value Index',
                data: [100, 102, 105, 103, 107, 106, 109, 108, 112, 110, 115, 116.2],
                borderColor: '#00ccff',
                backgroundColor: 'rgba(0, 204, 255, 0.1)',
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

    // Update market trend every 5 seconds
    setInterval(() => {
        const trendIndicator = document.querySelector('.trend-indicator');
        const currentGrowth = parseFloat(trendIndicator.textContent.match(/\+(\d+\.\d+)/)[1]);
        const change = (Math.random() - 0.5) * 0.5;
        const newGrowth = currentGrowth + change;
        
        trendIndicator.textContent = `Market Growth: ${newGrowth >= 0 ? '+' : ''}${newGrowth.toFixed(1)}%`;
        trendIndicator.className = `trend-indicator ${newGrowth >= 0 ? 'positive' : 'negative'}`;

        // Update chart data
        const lastValue = realEstateChart.data.datasets[0].data[realEstateChart.data.datasets[0].data.length - 1];
        const newValue = lastValue * (1 + change / 100);
        realEstateChart.data.datasets[0].data.push(newValue);
        realEstateChart.data.datasets[0].data.shift();
        realEstateChart.update();
    }, 5000);
}); 