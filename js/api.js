const RELIEFWEB_API = "https://api.reliefweb.int/v2/reports?appname=THParvin-goldstudentproject931-v00mi&limit=150&sort[]=date:desc&fields[include][]=title&fields[include][]=primary_country&fields[include][]=url&fields[include][]=date";

async function fetchCrisesData() {
    try {
        const response = await fetch(RELIEFWEB_API);
        
        if (response.status !== 200) {
            console.error("API failed with status: " + response.status);
            return []; 
        }

        const data = await response.json();
        
        // Ensure only valid reports with coordinates and URLs are returned
        return data.data.filter(report => 
            report.fields && 
            report.fields.primary_country && 
            report.fields.primary_country.location &&
            report.fields.title && 
            report.fields.url
        );

    } catch (error) {
        console.error("Network error during API fetch:", error);
        return [];
    }
}