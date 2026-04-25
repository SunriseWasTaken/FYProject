let awarenessChartInstance = null;
let frequencyChartInstance = null;

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
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{
                label: 'Global News Mentions (Thousands)',
                data: [12, 19, 8, 5],
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