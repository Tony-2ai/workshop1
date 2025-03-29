// Investment calculation constants
const INVESTMENT_RATES = {
    stock: {
        annualReturn: 0.15, // 15% annual return
        riskLevel: 'high',
        minDuration: 5
    },
    gold: {
        annualReturn: 0.08, // 8% annual return
        riskLevel: 'medium',
        minDuration: 3
    },
    realEstate: {
        annualReturn: 0.06, // 6% annual return
        riskLevel: 'low',
        minDuration: 10
    }
};

// Initialize Chart.js
let investmentChart;

// DOM Elements
const investmentInput = document.getElementById('investment-amount');
const calculateBtn = document.getElementById('calculate-btn');
const stockReturns = document.getElementById('stock-returns');
const goldReturns = document.getElementById('gold-returns');
const realEstateReturns = document.getElementById('real-estate-returns');
const stockDuration = document.getElementById('stock-duration');
const goldDuration = document.getElementById('gold-duration');
const realEstateDuration = document.getElementById('real-estate-duration');

// Add loading state management
const chartContainer = document.querySelector('.chart-container');
const cards = document.querySelectorAll('.card');

function setLoading(isLoading) {
    chartContainer.classList.toggle('loading', isLoading);
    cards.forEach(card => card.classList.toggle('loading', isLoading));
    calculateBtn.disabled = isLoading;
}

// Calculate investment returns
function calculateReturns(amount, rate, years) {
    return amount * Math.pow(1 + rate, years);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Generate chart data
function generateChartData(initialAmount) {
    const years = 10;
    const data = {
        labels: Array.from({ length: years + 1 }, (_, i) => `Year ${i}`),
        datasets: [
            {
                label: 'Stock Market',
                data: Array.from({ length: years + 1 }, (_, i) => 
                    calculateReturns(initialAmount, INVESTMENT_RATES.stock.annualReturn, i)
                ),
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                fill: true
            },
            {
                label: 'Gold',
                data: Array.from({ length: years + 1 }, (_, i) => 
                    calculateReturns(initialAmount, INVESTMENT_RATES.gold.annualReturn, i)
                ),
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                fill: true
            },
            {
                label: 'Real Estate',
                data: Array.from({ length: years + 1 }, (_, i) => 
                    calculateReturns(initialAmount, INVESTMENT_RATES.realEstate.annualReturn, i)
                ),
                borderColor: '#00ccff',
                backgroundColor: 'rgba(0, 204, 255, 0.1)',
                fill: true
            }
        ]
    };
    return data;
}

// Update chart
function updateChart(initialAmount) {
    const ctx = document.getElementById('investment-growth-chart').getContext('2d');
    
    if (investmentChart) {
        investmentChart.destroy();
    }

    investmentChart = new Chart(ctx, {
        type: 'line',
        data: generateChartData(initialAmount),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return formatCurrency(value);
                        }
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

// AI Insights Generation
function generateAIInsights(amount) {
    const insights = [];
    const stockReturn = calculateReturns(amount, INVESTMENT_RATES.stock.annualReturn, INVESTMENT_RATES.stock.minDuration);
    const goldReturn = calculateReturns(amount, INVESTMENT_RATES.gold.annualReturn, INVESTMENT_RATES.gold.minDuration);
    const realEstateReturn = calculateReturns(amount, INVESTMENT_RATES.realEstate.annualReturn, INVESTMENT_RATES.realEstate.minDuration);

    // Determine best performing investment
    const returns = [
        { type: 'Stock Market', value: stockReturn },
        { type: 'Gold', value: goldReturn },
        { type: 'Real Estate', value: realEstateReturn }
    ];
    
    const bestInvestment = returns.reduce((max, current) => 
        current.value > max.value ? current : max
    );

    insights.push(`Based on your investment of ${formatCurrency(amount)}, ${bestInvestment.type} shows the highest potential return of ${formatCurrency(bestInvestment.value)}.`);

    // Risk assessment
    if (amount > 1000000) {
        insights.push('Given your substantial investment amount, consider diversifying across multiple asset classes to manage risk.');
    } else if (amount < 100000) {
        insights.push('For smaller investments, focus on building a solid foundation with lower-risk options first.');
    }

    // Market timing insights
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour <= 16) {
        insights.push('Stock market is currently open. Consider monitoring real-time market conditions for optimal entry points.');
    }

    return insights;
}

// Update AI Insights
function updateAIInsights(amount) {
    const aiMessage = document.getElementById('ai-message');
    const recommendationsList = document.getElementById('ai-recommendations-list');
    
    aiMessage.textContent = 'Analyzing market conditions and generating personalized recommendations...';
    recommendationsList.innerHTML = '';

    setTimeout(() => {
        const insights = generateAIInsights(amount);
        aiMessage.textContent = 'Here are your personalized investment insights:';
        
        insights.forEach(insight => {
            const li = document.createElement('li');
            li.textContent = insight;
            recommendationsList.appendChild(li);
        });
    }, 1500);
}

// Card Interaction Handlers
function setupCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const infoBtn = card.querySelector('.info-btn');
        const chartBtn = card.querySelector('.chart-btn');
        const details = card.querySelector('.card-details');
        
        infoBtn.addEventListener('click', () => {
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        });

        chartBtn.addEventListener('click', () => {
            const investmentType = card.dataset.investmentType;
            showDetailedChart(investmentType);
        });
    });
}

// Show Detailed Chart
function showDetailedChart(investmentType) {
    const chartContainer = document.querySelector('.chart-container');
    const ctx = chartContainer.getContext('2d');
    
    if (investmentChart) {
        investmentChart.destroy();
    }

    const data = generateChartData(parseFloat(investmentInput.value));
    const selectedDataset = data.datasets.find(ds => 
        ds.label.toLowerCase().includes(investmentType)
    );

    investmentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [selectedDataset]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `${selectedDataset.label} Growth Projection`,
                    color: '#ffffff',
                    font: {
                        family: "'Orbitron', sans-serif"
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return formatCurrency(value);
                        }
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

// Enhanced updateInvestmentCards function
async function updateInvestmentCards(amount) {
    try {
        setLoading(true);
        
        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update returns and durations
        const stockReturn = calculateReturns(amount, INVESTMENT_RATES.stock.annualReturn, INVESTMENT_RATES.stock.minDuration);
        stockReturns.textContent = formatCurrency(stockReturn);
        stockDuration.textContent = `${INVESTMENT_RATES.stock.minDuration} years`;

        const goldReturn = calculateReturns(amount, INVESTMENT_RATES.gold.annualReturn, INVESTMENT_RATES.gold.minDuration);
        goldReturns.textContent = formatCurrency(goldReturn);
        goldDuration.textContent = `${INVESTMENT_RATES.gold.minDuration} years`;

        const realEstateReturn = calculateReturns(amount, INVESTMENT_RATES.realEstate.annualReturn, INVESTMENT_RATES.realEstate.minDuration);
        realEstateReturns.textContent = formatCurrency(realEstateReturn);
        realEstateDuration.textContent = `${INVESTMENT_RATES.realEstate.minDuration} years`;

        // Update chart
        updateChart(amount);
        
        // Update AI insights
        updateAIInsights(amount);
    } catch (error) {
        console.error('Error updating investment cards:', error);
        alert('An error occurred while calculating returns. Please try again.');
    } finally {
        setLoading(false);
    }
}

// Enhanced event listener with input validation
calculateBtn.addEventListener('click', () => {
    const amount = parseFloat(investmentInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid investment amount greater than 0');
        return;
    }
    if (amount > 1000000000) { // 1 billion limit
        alert('Investment amount exceeds the maximum limit of ₹1,000,000,000');
        return;
    }
    updateInvestmentCards(amount);
});

// Add input validation on keypress
investmentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateBtn.click();
    }
});

// Market Data Updates
function updateMarketData() {
    const marketItems = document.querySelectorAll('.market-item');
    
    marketItems.forEach(item => {
        const value = item.querySelector('.market-value');
        const change = item.querySelector('.market-change');
        
        // Simulate market data updates
        const currentValue = parseFloat(value.textContent.replace(/[^0-9.-]+/g, ''));
        const randomChange = (Math.random() * 2 - 1) * 0.5; // Random change between -0.5% and +0.5%
        const newValue = currentValue * (1 + randomChange / 100);
        
        // Update value with animation
        value.textContent = newValue.toFixed(2);
        
        // Update change indicator
        const changeText = randomChange >= 0 ? `+${randomChange.toFixed(1)}%` : `${randomChange.toFixed(1)}%`;
        change.textContent = changeText;
        
        // Update colors
        value.className = `market-value ${randomChange >= 0 ? 'positive' : 'negative'}`;
        change.className = `market-change ${randomChange >= 0 ? 'positive' : 'negative'}`;
    });
}

// Update market data every 5 seconds
setInterval(updateMarketData, 5000);

// Navigation to detail pages
function setupNavigation() {
    const stockCard = document.querySelector('.stock-card');
    const goldCard = document.querySelector('.gold-card');
    const realEstateCard = document.querySelector('.real-estate-card');

    stockCard.querySelector('.buy-btn').addEventListener('click', () => {
        window.open('stock-details.html', '_blank');
    });

    goldCard.querySelector('.buy-btn').addEventListener('click', () => {
        window.open('gold-details.html', '_blank');
    });

    realEstateCard.querySelector('.buy-btn').addEventListener('click', () => {
        window.open('real-estate-details.html', '_blank');
    });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Close sidebar when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            
            // Smooth scroll to target section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle active navigation states
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);
// Update active nav on page load
window.addEventListener('load', updateActiveNav);

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const defaultAmount = 100000;
    investmentInput.value = defaultAmount;
    updateInvestmentCards(defaultAmount);
    setupCardInteractions();
    setupNavigation();
    updateMarketData(); // Initial market data update
}); 