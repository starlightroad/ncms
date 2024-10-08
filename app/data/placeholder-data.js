const companies = [
  {
    name: 'Acme Networks',
  },
];

const users = [
  {
    company_name: companies[0].name,
    name: 'Demo User',
    email: 'demo@acmefiber.com',
    password: 'd3m04cc0unt1234!',
  },
];

const vendors = [
  {
    company_name: companies[0].name,
    name: 'Crown Castle Fiber',
    website: 'https://crowncastle.com',
    phone: '800-684-1985',
  },
  {
    company_name: companies[0].name,
    name: 'Lumen',
    website: 'https://lumen.com',
    phone: '800-111-4563',
  },
  {
    company_name: companies[0].name,
    name: 'Unite Private Networks (UPN)',
    website: 'https://uniteprivatenetworks.com',
    phone: '888-552-8844',
  },
  {
    company_name: companies[0].name,
    name: 'Live Oak Fiber',
    website: 'https://liveoakfiber.com',
    phone: '800-109-2812',
  },
  {
    company_name: companies[0].name,
    name: 'FiberLight',
    website: 'https://fiberlight.com',
    phone: '888-600-2200',
  },
  {
    company_name: companies[0].name,
    name: 'Everstream',
    website: 'https://everstream.net',
    phone: '800-656-2766',
  },
  {
    company_name: companies[0].name,
    name: 'Google Fiber',
    website: 'https://fiber.google.com',
    phone: '888-123-4567',
  },
  {
    company_name: companies[0].name,
    name: 'Uniti Fiber',
    website: 'https://uniti.com',
    phone: '800-864-3427',
  },
];

const locations = [
  {
    company_name: companies[0].name,
    name: 'Spectre Datacenter',
    street: '150 Greenwich St 62nd floor',
    city: 'New York',
    state: 'NY',
    zip: '10007',
  },
  {
    company_name: companies[0].name,
    name: 'Nguyen Datacenter',
    street: '121 Albright Way',
    city: 'Los Gatos',
    state: 'CA',
    zip: '95032',
  },
  {
    company_name: companies[0].name,
    name: 'Aether Palace',
    street: 'One Infinite Loop',
    city: 'Cupertino',
    state: 'CA',
    zip: '95014',
  },
  {
    company_name: companies[0].name,
    name: 'La Naranja',
    street: '4600 150th Ave NE',
    city: 'Redmond',
    state: 'WA',
    zip: '98052',
  },
  {
    company_name: companies[0].name,
    name: 'Crescent Moon',
    street: '835 Market St 7th Floor',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
  },
  {
    company_name: companies[0].name,
    name: 'Lady White',
    street: '100 CenturyLink Drive',
    city: 'Monroe',
    state: 'LA',
    zip: '71203',
  },
  {
    company_name: companies[0].name,
    name: 'Goldstein Datacenter',
    street: '17358 Railroad St',
    city: 'City of Industry',
    state: 'CA',
    zip: '91748',
  },
  {
    company_name: companies[0].name,
    name: 'Los Rojos',
    street: '8001 Development Drive',
    city: 'Morrisville',
    state: 'NC',
    zip: '27560',
  },
];

const circuits = [
  {
    company_name: companies[0].name,
    circuit_id: 'C98765-NYC01-L2T-0456',
    vendor_name: vendors[1].name,
    type: 'Wavelength',
    capacity: '100G',
    location1_name: locations[0].name,
    location2_name: locations[2].name,
  },
  {
    company_name: companies[0].name,
    circuit_id: 'I65432-BOS01-L3T-9001',
    vendor_name: vendors[3].name,
    type: 'CWDM',
    capacity: '10G',
    location1_name: locations[1].name,
    location2_name: locations[3].name,
  },
  {
    company_name: companies[0].name,
    circuit_id: 'B23456-LAX03-ETH-1032',
    vendor_name: vendors[5].name,
    type: 'DWDM',
    capacity: '10G',
    location1_name: locations[6].name,
    location2_name: locations[4].name,
  },
  {
    company_name: companies[0].name,
    circuit_id: 'A45678-CHI02-WAV-0098',
    vendor_name: vendors[7].name,
    type: 'Wavelength',
    capacity: '100G',
    location1_name: locations[5].name,
    location2_name: locations[7].name,
  },
  {
    company_name: companies[0].name,
    circuit_id: 'D34567-ATL05-DIA-6789',
    vendor_name: vendors[6].name,
    type: 'EVPL',
    capacity: '10G',
    location1_name: locations[6].name,
    location2_name: locations[2].name,
  },
  {
    company_name: companies[0].name,
    circuit_id: 'F67890-MIA04-MPLS-1122',
    vendor_name: vendors[4].name,
    type: 'DWDM',
    capacity: '100G',
    location1_name: locations[6].name,
    location2_name: locations[3].name,
  },
  {
    company_name: companies[0].name,
    circuit_id: 'H09876-SEA02-ETH-0555',
    vendor_name: vendors[2].name,
    type: 'EPL',
    capacity: '10G',
    location1_name: locations[7].name,
    location2_name: locations[2].name,
  },
  {
    company_name: companies[0].name,
    circuit_id: 'J32109-PHX05-WAV-7077',
    vendor_name: vendors[0].name,
    type: 'Wavelength',
    capacity: '100G',
    location1_name: locations[0].name,
    location2_name: locations[3].name,
  },
];

const mapLoads = [
  {
    company_name: companies[0].name,
    month_id: 1,
    day: 12,
    year: 2024,
    count: 12,
  },
  {
    company_name: companies[0].name,
    month_id: 2,
    day: 1,
    year: 2024,
    count: 28,
  },
  {
    company_name: companies[0].name,
    month_id: 6,
    day: 25,
    year: 2024,
    count: 40,
  },
  {
    company_name: companies[0].name,
    month_id: 3,
    day: 14,
    year: 2024,
    count: 20,
  },
  {
    company_name: companies[0].name,
    month_id: 6,
    day: 30,
    year: 2024,
    count: 7,
  },
  {
    company_name: companies[0].name,
    month_id: 8,
    day: 21,
    year: 2023,
    count: 33,
  },
  {
    company_name: companies[0].name,
    month_id: 2,
    day: 8,
    year: 2023,
    count: 72,
  },
  {
    company_name: companies[0].name,
    month_id: 7,
    day: 27,
    year: 2024,
    count: 64,
  },
  {
    company_name: companies[0].name,
    month_id: 11,
    day: 19,
    year: 2022,
    count: 23,
  },
  {
    company_name: companies[0].name,
    month_id: 0,
    day: 27,
    year: 2021,
    count: 39,
  },
];

module.exports = {
  companies,
  users,
  circuits,
  locations,
  vendors,
  mapLoads,
};
