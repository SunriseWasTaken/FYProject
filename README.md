# Bear Witness - User Guide

## Live Demo
https://sunrisewastaken.github.io/FYProject/

## What the software does
Bear Witness is a browser-based dashboard that displays live humanitarian crisis reports from ReliefWeb on an interactive world map.  
It lets users filter reports by region and crisis type, then view matching items in a live feed and summary charts.

## Core features implemented
- Live data fetch from ReliefWeb Reports API
- Interactive map markers with popup details and source links
- Region filtering (`Africa`, `Asia`, `Middle East`, `Americas`, `Europe`)
- Crisis type filtering (`Conflict`, `Displacement`, `Disaster`, `Health`)
- Live sidebar crisis feed with clickable report links
- Two charts:
  - Severity vs Media comparison
  - Report Frequency trend (currently both using simulated values)

## Setup and run instructions
1. Download or clone the project folder.
2. Open a terminal in the project root (`FYProject`).
3. Start a local server (recommended):
   - `python3 -m http.server 8080`
4. Open a browser and go to:
   - `http://localhost:8080`
5. Wait for the status text to show: `Live API Data loaded.`
6. Use the Region and Crisis Type filters from the left panel.
7. Click map markers or feed items to open source reports.

## Dependencies and install steps
No package installation is required for this version.

Dependencies are loaded via CDN in `index.html`:
- Leaflet (map rendering)
- Chart.js (data visualizations)

Data source:
- ReliefWeb API (live crisis reports)

## Test credentials or sample inputs
- No account or login is required.
- Sample test flow:
  1. Set Region to `Middle East`
  2. Set Crisis Type to `Conflict`
  3. Confirm map/feed updates
  4. Open one report link from popup or feed

## Known limitations / not implemented yet
- Map pins can overlap because ReliefWeb provides broad country-level coordinates rather than precise local incident locations.
- Media coverage scoring is simulated for UX demonstration
- Some values remain hardcoded for speed during prototype iteration.
- The Severity vs Media chart may still show repeated country instances depending on filtered report composition.
- No backend database, authentication, or user accounts.
- Error handling is basic (status text + console logs).
