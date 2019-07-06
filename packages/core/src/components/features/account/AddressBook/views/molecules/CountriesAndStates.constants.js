const countriesOptionsMap = [
  { id: 'US', displayName: 'United States' },
  { id: 'CA', displayName: 'Canada' },
];
const idInfo = '1';
const CAcountriesStatesTable = [
  {
    id: '',
    displayName: 'Select',
  },
  {
    id: `BC${idInfo}`,
    fullName: 'British Columbia',
    displayName: 'BC',
  },
  {
    id: `ON${idInfo}`,
    fullName: 'Ontario',
    displayName: 'ON',
  },
  {
    id: `NL${idInfo}`,
    fullName: 'Newfoundland and Labrador',
    displayName: 'NL',
  },
  {
    id: `NS${idInfo}`,
    fullName: 'Nova Scotia',
    displayName: 'NS',
  },
  {
    id: `PE${idInfo}`,
    fullName: 'Prince Edward Island',
    displayName: 'PE',
  },
  {
    id: `NB${idInfo}`,
    fullName: 'New Brunswick',
    displayName: 'NB',
  },
  {
    id: `QC${idInfo}`,
    fullName: 'Quebec',
    displayName: 'QC',
  },
  {
    id: `MB${idInfo}`,
    fullName: 'Manitoba',
    displayName: 'MB',
  },
  {
    id: `SK${idInfo}`,
    fullName: 'Saskatchewan',
    displayName: 'SK',
  },
  {
    id: `AB${idInfo}`,
    fullName: 'Alberta',
    displayName: 'AB',
  },
  {
    id: `NT${idInfo}`,
    fullName: 'Northwest Territories',
    displayName: 'NT',
  },
  {
    id: `NU${idInfo}`,
    fullName: 'Nunavut',
    displayName: 'NU',
  },
  {
    id: `YT${idInfo}`,
    fullName: 'Yukon',
    displayName: 'YT',
  },
];

const UScountriesStatesTable = [
  {
    displayName: 'Select',
    id: '',
  },
  {
    fullName: 'Alabama',
    displayName: 'AL',
    id: `AL${idInfo}`,
  },
  {
    fullName: 'Alaska',
    displayName: 'AK',
    id: `AK${idInfo}`,
  },
  {
    fullName: 'American Samoa',
    displayName: 'AS',
    id: `AS${idInfo}`,
  },
  {
    fullName: 'Arizona',
    displayName: 'AZ',
    id: `AZ${idInfo}`,
  },
  {
    fullName: 'Arkansas',
    displayName: 'AR',
    id: `AR${idInfo}`,
  },
  {
    id: `AA${idInfo}`,
    fullName: '',
    displayName: 'AA',
  },
  {
    id: `AE${idInfo}`,
    fullName: '',
    displayName: 'AE',
  },
  {
    id: `AP${idInfo}`,
    fullName: '',
    displayName: 'AP',
  },
  {
    fullName: 'California',
    displayName: 'CA',
    id: `CA${idInfo}`,
  },
  {
    fullName: 'Colorado',
    displayName: 'CO',
    id: `CO${idInfo}`,
  },
  {
    fullName: 'Connecticut',
    displayName: 'CT',
    id: `CT${idInfo}`,
  },
  {
    fullName: 'Delaware',
    displayName: 'DE',
    id: `DE${idInfo}`,
  },
  {
    fullName: 'Dist. of Columbia',
    displayName: 'DC',
    id: `DC${idInfo}`,
  },
  {
    fullName: '',
    displayName: 'FM',
    id: `FM${idInfo}`,
  },
  {
    fullName: 'Florida',
    displayName: 'FL',
    id: `FL${idInfo}`,
  },
  {
    fullName: 'Georgia',
    displayName: 'GA',
    id: `GA${idInfo}`,
  },
  {
    fullName: 'Guam',
    displayName: 'GU',
    id: `GU${idInfo}`,
  },
  {
    fullName: 'Hawaii',
    displayName: 'HI',
    id: `HI${idInfo}`,
  },
  {
    fullName: 'Idaho',
    displayName: 'ID',
    id: `ID${idInfo}`,
  },
  {
    fullName: 'Illinois',
    displayName: 'IL',
    id: `IL${idInfo}`,
  },
  {
    fullName: 'Indiana',
    displayName: 'IN',
    id: `IN${idInfo}`,
  },
  {
    fullName: 'Iowa',
    displayName: 'IA',
    id: `IA${idInfo}`,
  },
  {
    fullName: 'Kansas',
    displayName: 'KS',
    id: `KS${idInfo}`,
  },
  {
    fullName: 'Kentucky',
    displayName: 'KY',
    id: `KY${idInfo}`,
  },
  {
    fullName: 'Louisiana',
    displayName: 'LA',
    id: `LA${idInfo}`,
  },
  {
    fullName: 'Maine',
    displayName: 'ME',
    id: `ME${idInfo}`,
  },
  {
    fullName: 'Marshall Islands',
    displayName: 'MH',
    id: `MH${idInfo}`,
  },
  {
    fullName: 'Maryland',
    displayName: 'MD',
    id: `MD${idInfo}`,
  },
  {
    fullName: 'Massachusetts',
    displayName: 'MA',
    id: `MA${idInfo}`,
  },
  {
    fullName: 'Michigan',
    displayName: 'MI',
    id: `MI${idInfo}`,
  },
  {
    fullName: 'Minnesota',
    displayName: 'MN',
    id: `MN${idInfo}`,
  },
  {
    fullName: 'Mississippi',
    displayName: 'MS',
    id: `MS${idInfo}`,
  },
  {
    fullName: 'Missouri',
    displayName: 'MO',
    id: `MO${idInfo}`,
  },
  {
    fullName: 'Montana',
    displayName: 'MT',
    id: `MT${idInfo}`,
  },
  {
    fullName: 'Nebraska',
    displayName: 'NE',
    id: `NE${idInfo}`,
  },
  {
    fullName: 'Nevada',
    displayName: 'NV',
    id: `NV${idInfo}`,
  },
  {
    fullName: 'New Hampshire',
    displayName: 'NH',
    id: `NH${idInfo}`,
  },
  {
    fullName: 'New Jersey',
    displayName: 'NJ',
    id: `NJ${idInfo}`,
  },
  {
    fullName: 'New Mexico',
    displayName: 'NM',
    id: `NM${idInfo}`,
  },
  {
    fullName: 'New York',
    displayName: 'NY',
    id: `NY${idInfo}`,
  },
  {
    fullName: 'North Carolina',
    displayName: 'NC',
    id: `NC${idInfo}`,
  },
  {
    fullName: 'North Dakota',
    displayName: 'ND',
    id: `ND${idInfo}`,
  },
  {
    fullName: 'Northern Marianas',
    displayName: 'MP',
    id: `MP${idInfo}`,
  },
  {
    fullName: 'Ohio',
    displayName: 'OH',
    id: `OH${idInfo}`,
  },
  {
    fullName: 'Oklahoma',
    displayName: 'OK',
    id: `OK${idInfo}`,
  },
  {
    fullName: 'Oregon',
    displayName: 'OR',
    id: `OR${idInfo}`,
  },
  {
    fullName: 'Palau',
    displayName: 'PW',
    id: `PW${idInfo}`,
  },
  {
    fullName: 'Pennsylvania',
    displayName: 'PA',
    id: `PA${idInfo}`,
  },
  {
    fullName: 'Puerto Rico',
    displayName: 'PR',
    id: `PR${idInfo}`,
  },
  {
    fullName: 'Rhode Island',
    displayName: 'RI',
    id: `RI${idInfo}`,
  },
  {
    fullName: 'South Carolina',
    displayName: 'SC',
    id: `SC${idInfo}`,
  },
  {
    fullName: 'South Dakota',
    displayName: 'SD',
    id: `SD${idInfo}`,
  },
  {
    fullName: 'Tennessee',
    displayName: 'TN',
    id: `TN${idInfo}`,
  },
  {
    fullName: 'Texas',
    displayName: 'TX',
    id: `TX${idInfo}`,
  },
  {
    fullName: 'Utah',
    displayName: 'UT',
    id: `UT${idInfo}`,
  },
  {
    fullName: 'Vermont',
    displayName: 'VT',
    id: `VT${idInfo}`,
  },
  {
    fullName: 'Virginia',
    displayName: 'VI',
    id: `VI${idInfo}`,
  },
  {
    fullName: 'Virgin Islands',
    displayName: 'VA',
    id: `VA${idInfo}`,
  },
  {
    fullName: 'Washington',
    displayName: 'WA',
    id: `WA${idInfo}`,
  },
  {
    fullName: 'West Virginia',
    displayName: 'WV',
    id: `WV${idInfo}`,
  },
  {
    fullName: 'Wisconsin',
    displayName: 'WI',
    id: `WI${idInfo}`,
  },
  {
    fullName: 'Wyoming',
    displayName: 'WY',
    id: `WY${idInfo}`,
  },
];
export { countriesOptionsMap, UScountriesStatesTable, CAcountriesStatesTable };
