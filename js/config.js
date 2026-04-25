// Curated region lists for ReliefWeb country naming patterns.
const REGIONS = {
    'africa': [
        'Somalia', 'South Sudan', 'Sudan', 'Democratic Republic of the Congo', 'Congo',
        'Ethiopia', 'Eritrea', 'Djibouti', 'Mali', 'Niger', 'Chad', 'Burkina Faso',
        'Cameroon', 'Nigeria', 'Kenya', 'Uganda', 'Central African Republic',
        'Mozambique', 'Madagascar', 'Zimbabwe', 'Malawi'
    ],
    'middle-east': [
        'Yemen', 'occupied Palestinian territory', 'State of Palestine', 'Iran (Islamic Republic of)',
        'Syrian Arab Republic', 'Lebanon', 'Iraq', 'Jordan', 'Turkey', 'Türkiye',
        'Saudi Arabia', 'Israel'
    ],
    'asia': [
        'Myanmar', 'Afghanistan', 'Pakistan', 'Bangladesh', 'India', 'Indonesia',
        'Philippines', 'Sri Lanka', 'Nepal', 'China', 'Kazakhstan', 'Kyrgyzstan', 'Tajikistan'
    ],
    'americas': [
        'Colombia', 'Haiti', 'Venezuela', 'Mexico', 'Peru', 'Ecuador',
        'Honduras', 'Guatemala', 'El Salvador', 'Nicaragua', 'Brazil'
    ],
    'europe': [
        'Ukraine', 'Russian Federation', 'Armenia', 'Azerbaijan',
        'Bosnia and Herzegovina', 'Serbia', 'Kosovo'
    ]
};

const CRISIS_KEYWORDS = {
    'displacement': ['displace', 'refugee', 'camp', 'asylum', 'migration', 'migrant', 'evacuation'],
    'conflict': ['conflict', 'war', 'clash', 'attack', 'violence', 'military', 'armed', 'hostilities', 'terror'],
    'disaster': ['earthquake', 'flood', 'drought', 'storm', 'climate', 'cyclone', 'hurricane', 'tsunami', 'landslide', 'volcano'],
    'health': ['health', 'disease', 'outbreak', 'cholera', 'malnutrition', 'epidemic', 'virus', 'famine', 'starvation']
};