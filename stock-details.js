// Initialize charts
let niftyChart, sensexChart, macdChart;

// Generate random price data
function generatePriceData() {
    const data = [];
    const basePrice = 19000; // Base price for NIFTY
    for (let i = 0; i < 24; i++) {
        const randomChange = (Math.random() * 2 - 1) * 100; // Random change between -100 and +100
        data.push(basePrice + randomChange);
    }
    return data;
}

// Generate MACD data
function generateMACDData() {
    const data = [];
    for (let i = 0; i < 24; i++) {
        data.push({
            macd: (Math.random() - 0.5) * 2,
            signal: (Math.random() - 0.5) * 1.5,
            histogram: (Math.random() - 0.5) * 0.5
        });
    }
    return data;
}

// Initialize NIFTY chart
function initNiftyChart() {
    const ctx = document.getElementById('nifty-chart').getContext('2d');
    const data = generatePriceData();
    
    niftyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [{
                label: 'NIFTY 50',
                data: data,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                fill: true,
                tension: 0.4
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
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Initialize SENSEX chart
function initSensexChart() {
    const ctx = document.getElementById('sensex-chart').getContext('2d');
    const data = generatePriceData().map(price => price * 3.3); // SENSEX is roughly 3.3x NIFTY
    
    sensexChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [{
                label: 'SENSEX',
                data: data,
                borderColor: '#00ccff',
                backgroundColor: 'rgba(0, 204, 255, 0.1)',
                fill: true,
                tension: 0.4
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
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Initialize MACD chart
function initMACDChart() {
    const ctx = document.getElementById('macd-chart').getContext('2d');
    const macdData = generateMACDData();
    
    macdChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [
                {
                    label: 'MACD',
                    data: macdData.map(d => d.macd),
                    borderColor: '#00ff88',
                    tension: 0.4
                },
                {
                    label: 'Signal',
                    data: macdData.map(d => d.signal),
                    borderColor: '#ff8800',
                    tension: 0.4
                }
            ]
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
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Update stock prices
function updateStockPrices() {
    const stockItems = document.querySelectorAll('.stock-item');
    
    stockItems.forEach(item => {
        const priceElement = item.querySelector('.stock-price');
        const changeElement = item.querySelector('.stock-change');
        const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ''));
        
        // Generate random change
        const randomChange = (Math.random() * 2 - 1) * 50; // Random change between -50 and +50
        const newPrice = currentPrice + randomChange;
        const changePercent = (randomChange / currentPrice) * 100;
        
        // Update price
        priceElement.textContent = `₹${newPrice.toFixed(2)}`;
        
        // Update change indicator
        const changeText = changePercent >= 0 ? `+${changePercent.toFixed(1)}%` : `${changePercent.toFixed(1)}%`;
        changeElement.textContent = changeText;
        
        // Update colors
        changeElement.className = `stock-change ${changePercent >= 0 ? 'positive' : 'negative'}`;
    });
}

// Update market metrics
function updateMarketMetrics() {
    const metrics = {
        'Market Cap': {
            value: '₹2.5T',
            change: (Math.random() - 0.5) * 0.5
        },
        '24h Volume': {
            value: '₹45.2B',
            change: (Math.random() - 0.5) * 1
        },
        'Volatility Index': {
            value: (15 + Math.random() * 2).toFixed(1)
        }
    };

    Object.entries(metrics).forEach(([label, data]) => {
        const metricElement = document.querySelector(`.metric-item:has(.metric-label:contains('${label}'))`);
        if (metricElement) {
            const valueElement = metricElement.querySelector('.metric-value');
            valueElement.textContent = data.value;
            
            if (data.change !== undefined) {
                valueElement.classList.remove('positive', 'negative');
                valueElement.classList.add(data.change >= 0 ? 'positive' : 'negative');
            }
        }
    });
}

// Update technical indicators
function updateTechnicalIndicators() {
    // Update RSI
    const rsiValue = 65.8 + (Math.random() - 0.5) * 5;
    const rsiElement = document.querySelector('.rsi-value');
    if (rsiElement) {
        rsiElement.textContent = rsiValue.toFixed(1);
        const rsiLabel = document.querySelector('.rsi-label');
        if (rsiLabel) {
            rsiLabel.textContent = rsiValue > 70 ? 'Overbought' : rsiValue < 30 ? 'Oversold' : 'Neutral';
        }
    }

    // Update Moving Averages
    const sma20 = 19350.25 + (Math.random() - 0.5) * 100;
    const ema50 = 19280.75 + (Math.random() - 0.5) * 100;
    
    document.querySelector('.indicator-item:nth-child(1) .indicator-value').textContent = `₹${sma20.toFixed(2)}`;
    document.querySelector('.indicator-item:nth-child(2) .indicator-value').textContent = `₹${ema50.toFixed(2)}`;
}

// Update charts
function updateCharts() {
    if (niftyChart && sensexChart && macdChart) {
        const newData = generatePriceData();
        const newMACDData = generateMACDData();
        
        // Update NIFTY chart
        niftyChart.data.datasets[0].data = newData;
        niftyChart.update();
        
        // Update SENSEX chart
        sensexChart.data.datasets[0].data = newData.map(price => price * 3.3);
        sensexChart.update();

        // Update MACD chart
        macdChart.data.datasets[0].data = newMACDData.map(d => d.macd);
        macdChart.data.datasets[1].data = newMACDData.map(d => d.signal);
        macdChart.update();
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initNiftyChart();
    initSensexChart();
    initMACDChart();

    // Update data every 5 seconds
    setInterval(() => {
        updateStockPrices();
        updateMarketMetrics();
        updateTechnicalIndicators();
        updateCharts();
    }, 5000);

    // Handle smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize market data updates
    updateMarketData();
    setInterval(updateMarketData, 30000); // Update every 30 seconds

    // Initialize broker modal
    initializeBrokerModal();
});

// Broker data
const brokerData = {
    'Zerodha': {
        name: 'Zerodha',
        rating: 4.5,
        features: [
            { icon: 'fas fa-check-circle', text: 'Zero brokerage on equity delivery' },
            { icon: 'fas fa-check-circle', text: 'Advanced trading platforms' },
            { icon: 'fas fa-check-circle', text: 'Research and analysis tools' },
            { icon: 'fas fa-check-circle', text: '24/7 customer support' }
        ],
        accountOpening: {
            process: 'Simple online process',
            documents: 'PAN, Aadhaar, Bank details',
            time: '24-48 hours'
        },
        contact: {
            phone: '1800-419-4254',
            email: 'support@zerodha.com'
        }
    },
    'Upstox': {
        name: 'Upstox',
        rating: 5.0,
        features: [
            { icon: 'fas fa-check-circle', text: 'Free equity delivery trades' },
            { icon: 'fas fa-check-circle', text: 'Advanced charting tools' },
            { icon: 'fas fa-check-circle', text: 'Real-time market data' },
            { icon: 'fas fa-check-circle', text: 'Mobile trading app' }
        ],
        accountOpening: {
            process: 'Digital account opening',
            documents: 'PAN, Aadhaar, Bank details',
            time: '24 hours'
        },
        contact: {
            phone: '1800-419-4254',
            email: 'support@upstox.com'
        }
    },
    'Angel Broking': {
        name: 'Angel Broking',
        rating: 4.0,
        features: [
            { icon: 'fas fa-check-circle', text: 'Research reports' },
            { icon: 'fas fa-check-circle', text: 'Portfolio management' },
            { icon: 'fas fa-check-circle', text: 'Investment advisory' },
            { icon: 'fas fa-check-circle', text: 'Branch network' }
        ],
        accountOpening: {
            process: 'Online and offline options',
            documents: 'PAN, Aadhaar, Bank details',
            time: '48-72 hours'
        },
        contact: {
            phone: '1800-209-2090',
            email: 'support@angelbroking.com'
        }
    },
    'ICICI Direct': {
        name: 'ICICI Direct',
        rating: 4.5,
        features: [
            { icon: 'fas fa-check-circle', text: 'Banking integration' },
            { icon: 'fas fa-check-circle', text: 'Research reports' },
            { icon: 'fas fa-check-circle', text: 'Portfolio tracking' },
            { icon: 'fas fa-check-circle', text: 'Branch support' }
        ],
        accountOpening: {
            process: 'Online process',
            documents: 'PAN, Aadhaar, Bank details',
            time: '24-48 hours'
        },
        contact: {
            phone: '1800-200-3344',
            email: 'support@icicidirect.com'
        }
    }
};

// Initialize broker modal
function initializeBrokerModal() {
    const modal = document.getElementById('brokerModal');
    const closeBtn = modal.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show broker details
function showBrokerDetails(brokerName) {
    const modal = document.getElementById('brokerModal');
    const brokerDetails = document.getElementById('brokerDetails');
    const broker = brokerData[brokerName];

    brokerDetails.innerHTML = `
        <div class="broker-header">
            <img src="https://via.placeholder.com/60" alt="${broker.name}">
            <div class="broker-info-modal">
                <h4>${broker.name}</h4>
                <div class="broker-rating">
                    ${generateStars(broker.rating)}
                    <span>${broker.rating}</span>
                </div>
            </div>
        </div>
        <div class="broker-features">
            ${broker.features.map(feature => `
                <div class="feature-item-modal">
                    <i class="${feature.icon}"></i>
                    <span>${feature.text}</span>
                </div>
            `).join('')}
        </div>
        <div class="broker-account-info">
            <h4>Account Opening</h4>
            <p>Process: ${broker.accountOpening.process}</p>
            <p>Documents: ${broker.accountOpening.documents}</p>
            <p>Time: ${broker.accountOpening.time}</p>
        </div>
        <div class="broker-contact">
            <h4>Contact Information</h4>
            <p><i class="fas fa-phone"></i> ${broker.contact.phone}</p>
            <p><i class="fas fa-envelope"></i> ${broker.contact.email}</p>
        </div>
        <div class="broker-actions">
            <button class="open-account-btn" onclick="openNewAccount('${broker.name}')">
                <i class="fas fa-user-plus"></i>
                Open Account
            </button>
            <button class="learn-more-btn" onclick="learnMore('${broker.name}')">
                <i class="fas fa-info-circle"></i>
                Learn More
            </button>
        </div>
    `;

    modal.style.display = 'flex';
}

// Generate stars for rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Open new account
function openNewAccount(brokerName) {
    // Show loading state
    const modal = document.getElementById('brokerModal');
    const brokerActions = modal.querySelector('.broker-actions');
    const originalContent = brokerActions.innerHTML;
    
    brokerActions.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Processing...</span>
        </div>
    `;

    // Simulate API call
    setTimeout(() => {
        brokerActions.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <span>Account opening initiated! A representative will contact you shortly.</span>
            </div>
        `;
    }, 2000);
}

// Learn more about broker
function learnMore(brokerName) {
    // Redirect to broker's website or show more details
    window.open(`https://www.${brokerName.toLowerCase().replace(' ', '')}.com`, '_blank');
}

// Update market data
function updateMarketData() {
    // Simulate real-time market data updates
    const marketItems = document.querySelectorAll('.market-item');
    marketItems.forEach(item => {
        const value = item.querySelector('.market-value');
        const change = item.querySelector('.market-change');
        
        // Generate random changes
        const currentValue = parseFloat(value.textContent.replace(/[^0-9.-]+/g, ''));
        const randomChange = (Math.random() * 2 - 1).toFixed(1);
        const newValue = (currentValue * (1 + randomChange / 100)).toFixed(1);
        
        // Update values and styles
        value.textContent = formatValue(value.textContent, newValue);
        updateChangeIndicator(change, randomChange);
    });
}

// Format market values
function formatValue(originalValue, newValue) {
    if (originalValue.includes('T')) {
        return `₹${newValue}T`;
    } else if (originalValue.includes('B')) {
        return `${newValue}B`;
    } else {
        return Math.round(newValue).toLocaleString();
    }
}

// Update change indicators
function updateChangeIndicator(changeElement, change) {
    const isPositive = change > 0;
    changeElement.textContent = `${isPositive ? '+' : ''}${change}%`;
    changeElement.className = `price-change ${isPositive ? 'positive' : 'negative'}`;
} 