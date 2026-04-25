// Stores static configuration data, mapping rules, and constants.

const REGIONS = {
    'africa': ['Somalia', 'South Sudan', 'Sudan', 'Democratic Republic of the Congo', 'Ethiopia', 'Mali', 'Niger', 'Cameroon', 'Nigeria', 'Kenya'],
    'middle-east': ['Yemen', 'occupied Palestinian territory', 'Iran (Islamic Republic of)', 'Syrian Arab Republic', 'Lebanon', 'Iraq'],
    'asia': ['Myanmar', 'Afghanistan', 'Pakistan', 'Bangladesh', 'India', 'Indonesia'],
    'americas': ['Colombia', 'Haiti', 'Venezuela', 'Mexico', 'Peru', 'Ecuador'],
    'europe': ['Ukraine', 'Russian Federation']
};

const CRISIS_KEYWORDS = {
    'displacement': ['displace', 'refugee', 'camp', 'asylum'],
    'conflict': ['conflict', 'war', 'clash', 'attack', 'violence', 'military'],
    'disaster': ['earthquake', 'flood', 'drought', 'storm', 'climate'],
    'health': ['health', 'disease', 'outbreak', 'cholera', 'malnutrition']
};