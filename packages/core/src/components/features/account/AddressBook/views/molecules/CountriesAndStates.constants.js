const countriesOptionsMap = [
  {
    id: '',
    displayName: '',
  },
  { id: 'US', displayName: 'United States' },
  { id: 'CA', displayName: 'Canada' },
];

const CAcountriesStatesTable = [
  {
    id: '',
    displayName: '',
  },
  {
    id: 'BC-1',
    fullName: 'British Columbia',
    displayName: 'BC',
  },
  {
    id: 'ON-1',
    fullName: 'Ontario',
    displayName: 'ON',
  },
  {
    id: 'NL-1',
    fullName: 'Newfoundland and Labrador',
    displayName: 'NL',
  },
  {
    id: 'NS-1',
    fullName: 'Nova Scotia',
    displayName: 'NS',
  },
  {
    id: 'PE-1',
    fullName: 'Prince Edward Island',
    displayName: 'PE',
  },
  {
    id: 'NB-1',
    fullName: 'New Brunswick',
    displayName: 'NB',
  },
  {
    id: 'QC-1',
    fullName: 'Quebec',
    displayName: 'QC',
  },
  {
    id: 'MB-1',
    fullName: 'Manitoba',
    displayName: 'MB',
  },
  {
    id: 'SK-1',
    fullName: 'Saskatchewan',
    displayName: 'SK',
  },
  {
    id: 'AB-1',
    fullName: 'Alberta',
    displayName: 'AB',
  },
  {
    id: 'NT-1',
    fullName: 'Northwest Territories',
    displayName: 'NT',
  },
  {
    id: 'NU-1',
    fullName: 'Nunavut',
    displayName: 'NU',
  },
  {
    id: 'YT-1',
    fullName: 'Yukon',
    displayName: 'YT',
  },
];

const UScountriesStatesTable = [
  {
    displayName: '',
    id: '',
  },
  {
    fullName: 'Alabama',
    displayName: 'AL',
    id: 'AL-1',
  },
  {
    fullName: 'Alaska',
    displayName: 'AK',
    id: 'AK-1',
  },
  {
    fullName: 'American Samoa',
    displayName: 'AS',
    id: 'AS-1',
  },
  {
    fullName: 'Arizona',
    displayName: 'AZ',
    id: 'AZ-1',
  },
  {
    fullName: 'Arkansas',
    displayName: 'AR',
    id: 'AR-1',
  },
  {
    id: 'AA-1',
    fullName: '',
    displayName: 'AA',
  },
  {
    id: 'AE-1',
    fullName: '',
    displayName: 'AE',
  },
  {
    id: 'AP-1',
    fullName: '',
    displayName: 'AP',
  },
  {
    fullName: 'California',
    displayName: 'CA',
    id: 'CA-1',
  },
  {
    fullName: 'Colorado',
    displayName: 'CO',
    id: 'CO-1',
  },
  {
    fullName: 'Connecticut',
    displayName: 'CT',
    id: 'CT-1',
  },
  {
    fullName: 'Delaware',
    displayName: 'DE',
    id: 'DE-1',
  },
  {
    fullName: 'Dist. of Columbia',
    displayName: 'DC',
    id: 'DC-1',
  },
  {
    fullName: '',
    displayName: 'FM',
    id: 'FM-1',
  },
  {
    fullName: 'Florida',
    displayName: 'FL',
    id: 'FL-1',
  },
  {
    fullName: 'Georgia',
    displayName: 'GA',
    id: 'GA-1',
  },
  {
    fullName: 'Guam',
    displayName: 'GU',
    id: 'GU-1',
  },
  {
    fullName: 'Hawaii',
    displayName: 'HI',
    id: 'HI-1',
  },
  {
    fullName: 'Idaho',
    displayName: 'ID',
    id: 'ID-1',
  },
  {
    fullName: 'Illinois',
    displayName: 'IL',
    id: 'IL-1',
  },
  {
    fullName: 'Indiana',
    displayName: 'IN',
    id: 'IN-1',
  },
  {
    fullName: 'Iowa',
    displayName: 'IA',
    id: 'IA-1',
  },
  {
    fullName: 'Kansas',
    displayName: 'KS',
    id: 'KS-1',
  },
  {
    fullName: 'Kentucky',
    displayName: 'KY',
    id: 'KY-1',
  },
  {
    fullName: 'Louisiana',
    displayName: 'LA',
    id: 'LA-1',
  },
  {
    fullName: 'Maine',
    displayName: 'ME',
    id: 'ME-1',
  },
  {
    fullName: 'Marshall Islands',
    displayName: 'MH',
    id: 'MH-1',
  },
  {
    fullName: 'Maryland',
    displayName: 'MD',
    id: 'MD-1',
  },
  {
    fullName: 'Massachusetts',
    displayName: 'MA',
    id: 'MA-1',
  },
  {
    fullName: 'Michigan',
    displayName: 'MI',
    id: 'MI-1',
  },
  {
    fullName: 'Minnesota',
    displayName: 'MN',
    id: 'MN-1',
  },
  {
    fullName: 'Mississippi',
    displayName: 'MS',
    id: 'MS-1',
  },
  {
    fullName: 'Missouri',
    displayName: 'MO',
    id: 'MO-1',
  },
  {
    fullName: 'Montana',
    displayName: 'MT',
    id: 'MT-1',
  },
  {
    fullName: 'Nebraska',
    displayName: 'NE',
    id: 'NE-1',
  },
  {
    fullName: 'Nevada',
    displayName: 'NV',
    id: 'NV-1',
  },
  {
    fullName: 'New Hampshire',
    displayName: 'NH',
    id: 'NH-1',
  },
  {
    fullName: 'New Jersey',
    displayName: 'NJ',
    id: 'NJ-1',
  },
  {
    fullName: 'New Mexico',
    displayName: 'NM',
    id: 'NM-1',
  },
  {
    fullName: 'New York',
    displayName: 'NY',
    id: 'NY-1',
  },
  {
    fullName: 'North Carolina',
    displayName: 'NC',
    id: 'NC-1',
  },
  {
    fullName: 'North Dakota',
    displayName: 'ND',
    id: 'ND-1',
  },
  {
    fullName: 'Northern Marianas',
    displayName: 'MP',
    id: 'MP-1',
  },
  {
    fullName: 'Ohio',
    displayName: 'OH',
    id: 'OH-1',
  },
  {
    fullName: 'Oklahoma',
    displayName: 'OK',
    id: 'OK-1',
  },
  {
    fullName: 'Oregon',
    displayName: 'OR',
    id: 'OR-1',
  },
  {
    fullName: 'Palau',
    displayName: 'PW',
    id: 'PW-1',
  },
  {
    fullName: 'Pennsylvania',
    displayName: 'PA',
    id: 'PA-1',
  },
  {
    fullName: 'Puerto Rico',
    displayName: 'PR',
    id: 'PR-1',
  },
  {
    fullName: 'Rhode Island',
    displayName: 'RI',
    id: 'RI-1',
  },
  {
    fullName: 'South Carolina',
    displayName: 'SC',
    id: 'SC-1',
  },
  {
    fullName: 'South Dakota',
    displayName: 'SD',
    id: 'SD-1',
  },
  {
    fullName: 'Tennessee',
    displayName: 'TN',
    id: 'TN-1',
  },
  {
    fullName: 'Texas',
    displayName: 'TX',
    id: 'TX-1',
  },
  {
    fullName: 'Utah',
    displayName: 'UT',
    id: 'UT-1',
  },
  {
    fullName: 'Vermont',
    displayName: 'VT',
    id: 'VT-1',
  },
  {
    fullName: 'Virginia',
    displayName: 'VI',
    id: 'VI-1',
  },
  {
    fullName: 'Virgin Islands',
    displayName: 'VA',
    id: 'VA-1',
  },
  {
    fullName: 'Washington',
    displayName: 'WA',
    id: 'WA-1',
  },
  {
    fullName: 'West Virginia',
    displayName: 'WV',
    id: 'WV-1',
  },
  {
    fullName: 'Wisconsin',
    displayName: 'WI',
    id: 'WI-1',
  },
  {
    fullName: 'Wyoming',
    displayName: 'WY',
    id: 'WY-1',
  },
];
export { countriesOptionsMap, UScountriesStatesTable, CAcountriesStatesTable };
