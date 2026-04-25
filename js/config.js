// Expanded lists to make the categorization less "brittle"
const REGIONS = {
    'africa': ['Somalia', 'South Sudan', 'Sudan', 'Democratic Republic of the Congo', 'Ethiopia', 'Mali', 'Niger', 'Cameroon', 'Nigeria', 'Kenya', 'Burkina Faso', 'Chad', 'Central African Republic', 'Mozambique', 'Madagascar'],
    'middle-east': ['Yemen', 'occupied Palestinian territory', 'Iran (Islamic Republic of)', 'Syrian Arab Republic', 'Lebanon', 'Iraq', 'Jordan', 'Türkiye'],
    'asia': ['Myanmar', 'Afghanistan', 'Pakistan', 'Bangladesh', 'India', 'Indonesia', 'Philippines', 'Sri Lanka', 'Nepal'],
    'americas': ['Colombia', 'Haiti', 'Venezuela', 'Mexico', 'Peru', 'Ecuador', 'Honduras', 'Guatemala', 'El Salvador', 'Nicaragua'],
    'europe': ['Ukraine', 'Russian Federation', 'Armenia', 'Azerbaijan']
};

const CRISIS_KEYWORDS = {
    'displacement': ['displace', 'refugee', 'camp', 'asylum', 'migration', 'migrant', 'evacuation'],
    'conflict': ['conflict', 'war', 'clash', 'attack', 'violence', 'military', 'armed', 'hostilities', 'terror'],
    'disaster': ['earthquake', 'flood', 'drought', 'storm', 'climate', 'cyclone', 'hurricane', 'tsunami', 'landslide', 'volcano'],
    'health': ['health', 'disease', 'outbreak', 'cholera', 'malnutrition', 'epidemic', 'virus', 'famine', 'starvation']
};