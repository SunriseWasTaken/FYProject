let allCrises = [];      
let currentMarkers = []; 

function getRegion(countryName) {
    for (let regionKey in REGIONS) {
        if (REGIONS[regionKey].includes(countryName)) {
            return regionKey;
        }
    }
    return 'other';
}

function getCrisisType(report) {
    let title = "";
    if (report.fields.title) {
        title = report.fields.title.toLowerCase();
    }

    for (let typeKey in CRISIS_KEYWORDS) {
        let keywordsArray = CRISIS_KEYWORDS[typeKey];
        
        for (let i = 0; i < keywordsArray.length; i++) {
            if (title.includes(keywordsArray[i])) {
                return typeKey;
            }
        }
    }
    return 'other';
}

async function initializeApp() {
    const data = await fetchCrisesData();
    
    if (data && data.length > 0) {
        allCrises = data;
        document.getElementById('status').innerText = "Live API Data loaded.";
        applyFilters();
    } else {
        document.getElementById('status').innerText = "Error loading live data.";
        document.getElementById('status').style.color = "#e11d48";
        document.getElementById('status').style.backgroundColor = "#ffe4e6";
    }
}

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

function updateUI(dataToRender) {
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];

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

        // Simulated scores for prototype UX demonstration
        const severityScore = Math.floor(Math.random() * 40) + 60; 
        const mediaScore = Math.floor(Math.random() * 30) + 10; 

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

        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${report.fields.url}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                <strong>${countryName}:</strong> ${title}
            </a>
        `;
        feedList.appendChild(li);
        
        // Gather data for charts (capped at 5 to maintain readability)
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

// Event Listeners
document.getElementById('region-filter').addEventListener('change', applyFilters);
document.getElementById('type-filter').addEventListener('change', applyFilters);

// Boot Application
setTimeout(initializeApp, 500);