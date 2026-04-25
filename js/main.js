let allCrises = [];      
let currentMarkers = []; 
let awarenessChartInstance = null; 
let frequencyChartInstance = null; 

// Data mapping via config.js
function getRegion(country) {
    for (let regionKey in REGIONS) {
        if (REGIONS[regionKey].includes(country)) return regionKey;
    }
    return 'other';
}

function getCrisisType(title) {
    const t = title ? title.toLowerCase() : "";
    for (let typeKey in CRISIS_KEYWORDS) {
        let keywordsArray = CRISIS_KEYWORDS[typeKey];
        for (let i = 0; i < keywordsArray.length; i++) {
            if (t.includes(keywordsArray[i])) return typeKey;
        }
    }
    return 'other';
}

// Initialise application and fetch data via api.js
async function initializeApp() {
    const data = await fetchCrisesData();
    
    if (data && data.length > 0) {
        allCrises = data;
        document.getElementById('status').innerText = "Live API Data loaded.";
        applyFilters();
    } else {
        document.getElementById('status').innerText = "Error loading live data.";
        document.getElementById('status').style.color = "#e11d48";
    }
}

// Filter data based on UI selections
function applyFilters() {
    const regionFilter = document.getElementById('region-filter').value;
    const typeFilter = document.getElementById('type-filter').value;

    const filteredData = allCrises.filter(report => {
        const countryName = report.fields.primary_country.name;
        const title = report.fields.title;
        
        const matchesRegion = (regionFilter === 'all') || (getRegion(countryName) === regionFilter);
        const matchesType = (typeFilter === 'all') || (getCrisisType(title) === typeFilter);
        
        return matchesRegion && matchesType;
    });

    updateUI(filteredData);
}

// Update map markers, sidebar feed, and prepare chart data
function updateUI(dataToRender) {
    // Clear existing map pins
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];

    // Clear existing sidebar items
    const feedList = document.getElementById('crisis-feed-list');
    feedList.innerHTML = '';

    let chartLabels = [];
    let severityData = [];
    let mediaData = [];
    let validCrisesCount = 0;

    dataToRender.forEach(report => {
        const lat = report.fields.primary_country.location.lat;
        const lon = report.fields.primary_country.location.lon;
        const countryName = report.fields.primary_country.name;
        const title = report.fields.title;

        // Simulated scores for prototype visualisation
        const severityScore = Math.floor(Math.random() * 40) + 60; 
        const mediaScore = Math.floor(Math.random() * 30) + 10; 

        // Render map marker
        const marker = L.circleMarker([lat, lon], {
            radius: 8, fillColor: "#e11d48", color: "#ffffff", weight: 2, opacity: 1, fillOpacity: 0.8
        }).addTo(map);
        
        marker.bindPopup(`
            <div style="font-family: 'Inter', sans-serif;">
                <h3 style="margin: 0 0 5px 0; color: #e11d48;">${countryName}</h3>
                <p style="font-size: 0.85rem; margin-bottom: 10px;">${title}</p>
                <p style="margin: 5px 0;"><strong>Severity:</strong> ${severityScore}/100</p>
                <p style="margin: 5px 0;"><strong>Media Coverage:</strong> ${mediaScore}/100</p>
                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 10px 0;">
                <a href="${report.fields.url}" target="_blank" style="color: #e11d48; font-weight: 600; text-decoration: none;">View Source Report ↗</a>
            </div>
        `);
        currentMarkers.push(marker);

        // Render sidebar list item
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${report.fields.url}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                <strong>${countryName}:</strong> ${title}
            </a>
        `;
        feedList.appendChild(li);
        
        // Keep chart data intentionally small for readability
        if (validCrisesCount < 5) {
            const shortName = countryName.length > 15 ? countryName.substring(0, 15) + '...' : countryName;
            chartLabels.push(shortName);
            severityData.push(severityScore);
            mediaData.push(mediaScore);
        }

        validCrisesCount++;
    });

    if (dataToRender.length === 0) {
        feedList.innerHTML = '<li style="color: #6b7280; font-style: italic;">No recent crises match these filters.</li>';
    }

    renderCharts(chartLabels, severityData, mediaData);
}

// Render or update visualisations
function renderCharts(labels, severity, media) {
    if (awarenessChartInstance) awarenessChartInstance.destroy();
    if (frequencyChartInstance) frequencyChartInstance.destroy();

    const ctx1 = document.getElementById('awarenessChart').getContext('2d');
    awarenessChartInstance = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Severity Score', data: severity, backgroundColor: '#e11d48', borderRadius: 4 },
                { label: 'Media Score', data: media, backgroundColor: '#9ca3af', borderRadius: 4 }
            ]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            layout: { padding: { bottom: 15 } },
            plugins: {
                title: {
                    display: true,
                    text: '(Click the legend below to filter datasets)',
                    font: { size: 11, style: 'italic', weight: 'normal' },
                    color: '#6b7280',
                    padding: { bottom: 10 }
                }
            },
            scales: {
                x: {
                    ticks: { maxRotation: 0, minRotation: 0, font: { size: 10 } }
                },
                y: {
                    beginAtZero: true,
                    max: 100, 
                    title: { display: true, text: 'Relative Index Score', color: '#4b5563', font: { weight: 'bold' } }
                }
            }
        }
    });

    const ctx2 = document.getElementById('frequencyChart').getContext('2d');
    frequencyChartInstance = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [ 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{
                label: 'Global News Mentions',
                data: [14, 27, 9, 33, 18, 25, 11, 29, 16],
                borderColor: '#2563eb',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(37, 99, 235, 0.1)'
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            layout: { padding: { bottom: 15 } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

// Event listeners
document.getElementById('region-filter').addEventListener('change', applyFilters);
document.getElementById('type-filter').addEventListener('change', applyFilters);

// Boot sequence
setTimeout(initializeApp, 500);