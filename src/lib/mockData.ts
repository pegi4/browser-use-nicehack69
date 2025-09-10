export const generateMockPropertyData = (domain: string, searchQuery: string) => {
  const timestamp = new Date().toISOString();
  
  // Mock data templates for different domains
  const mockDataTemplates = {
    "nepremicnine.net": {
      domain: "nepremicnine.net",
      searchQuery,
      totalFound: 15,
      properties: [
        {
          id: "np_001",
          title: "Luksuzno 3-sobno stanovanje v centru Ljubljane",
          price: "450.000 €",
          location: "Ljubljana, Center",
          area_m2: "95 m²",
          rooms: "3-sobno",
          floor: "2. nadstropje",
          year_built: "2019",
          condition: "Novo",
          heating: "Centralno ogrevanje",
          energy_certificate: "A",
          furnished: "Delno opremljeno",
          parking: "Garažno mesto",
          balcony: "Balkon 8 m²",
          elevator: "Da",
          features: ["Klimatska naprava", "Parket", "Vgradne omare", "Alarmni sistem"],
          description: "Vrhunsko 3-sobno stanovanje v prestižni lokaciji centra Ljubljane. Stanovanje se nahaja v novejši stavbi z dvigalom in garažo. Opremljeno je z visokokakovostnimi materiali in ima čudovit razgled na grad.",
          photos: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
          ],
          agent_name: "Marija Novak",
          agent_phone: "+386 41 123 456",
          agent_email: "marija.novak@nepremicnine.net",
          listing_url: "https://nepremicnine.net/oglasi-prodaja/ljubljana-center-stanovanje_6789",
          posted_date: "2025-09-08",
          available_from: "Takoj"
        },
        {
          id: "np_002", 
          title: "Svetlo 2-sobno stanovanje z balkonom",
          price: "320.000 €",
          location: "Ljubljana, Bežigrad",
          area_m2: "68 m²",
          rooms: "2-sobno",
          floor: "4. nadstropje",
          year_built: "2015",
          condition: "Zelo dobro",
          heating: "Centralno ogrevanje",
          energy_certificate: "B",
          furnished: "Neopremljeno",
          parking: "Zunaj",
          balcony: "Balkon 6 m²",
          elevator: "Da",
          features: ["Parket", "Vgradne omare", "Orientacija jug"],
          description: "Prijetno 2-sobno stanovanje v mirni soseski Bežigrada. Stanovanje je svetlo z velikim balkonom in lepim razgledom. Primerno za mlade pare ali kot naložba.",
          photos: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
            "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800"
          ],
          agent_name: "Peter Kos",
          agent_phone: "+386 31 987 654",
          agent_email: "peter.kos@nepremicnine.net",
          listing_url: "https://nepremicnine.net/oglasi-prodaja/ljubljana-bezigrad-stanovanje_6790",
          posted_date: "2025-09-07",
          available_from: "1.10.2025"
        },
        {
          id: "np_003",
          title: "Moderna garsonjera v novi stavbi",
          price: "195.000 €",
          location: "Ljubljana, Šiška",
          area_m2: "42 m²",
          rooms: "Garsonjera",
          floor: "1. nadstropje",
          year_built: "2023",
          condition: "Novo",
          heating: "Toplotna črpalka",
          energy_certificate: "A+",
          furnished: "Neopremljeno",
          parking: "Garažno mesto",
          balcony: "Terasa 4 m²",
          elevator: "Da",
          features: ["Podno ogrevanje", "Klimatska naprava", "Smart home", "Videofon"],
          description: "Sodobna garsonjera v novi stavbi z najnovejšo tehnologijo. Idealna za mlade ali kot naložba za oddajanje.",
          photos: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
          ],
          agent_name: "Ana Horvat",
          agent_phone: "+386 40 555 123",
          agent_email: "ana.horvat@nepremicnine.net",
          listing_url: "https://nepremicnine.net/oglasi-prodaja/ljubljana-siska-garsonjera_6791",
          posted_date: "2025-09-09",
          available_from: "15.10.2025"
        }
      ],
      searchCompleted: true,
      timestamp
    },

    "bolha.si/nepremicnine": {
      domain: "bolha.si/nepremicnine",
      searchQuery,
      totalFound: 12,
      properties: [
        {
          id: "bolha_001",
          title: "Stanovanje Lovran, 112,99m2",
          price: "599.000 €",
          location: "Primorsko-goranska, Lovran",
          area_m2: "112.99 m²",
          rooms: "4-sobno",
          floor: "pritličje",
          year_built: "2010",
          condition: "Dobro",
          heating: "Centralno ogrevanje",
          energy_certificate: "C",
          furnished: null,
          parking: "Da",
          balcony: "Terasa",
          elevator: null,
          features: ["Pogled na morje", "Terasa", "Klima"],
          description: "Stanovanje v večstanovanjski stavbi, pritličje. Odličen pogled na morje in blizu plaže.",
          photos: [
            "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"
          ],
          agent_name: "Marko Petrić",
          agent_phone: "+385 98 123 456",
          agent_email: "marko.petric@bolha.si",
          listing_url: "https://www.bolha.com/nepremicnine/stanovanje-lovran-112.99m2-oglas-14446049",
          posted_date: "2025-09-10",
          available_from: null
        },
        {
          id: "bolha_002",
          title: "Buzet, 1-sobno+DS stanovanje v novogradnji",
          price: "175.041 €",
          location: "Istrska, Buzet",
          area_m2: "64.83 m²",
          rooms: "1-sobno+DS",
          floor: "1. nadstropje",
          year_built: "2024",
          condition: "Novo",
          heating: "Podno ogrevanje",
          energy_certificate: "A",
          furnished: null,
          parking: "Garažno mesto",
          balcony: null,
          elevator: "Da",
          features: ["Novogradnja", "Podno ogrevanje", "Garaža"],
          description: "Stanovanje v večstanovanjski stavbi, 1. nadstropje. Novogradnja v centru Buzeta.",
          photos: [
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800"
          ],
          agent_name: "Silva Matić",
          agent_phone: "+385 91 987 654",
          agent_email: "silva.matic@bolha.si",
          listing_url: "https://www.bolha.com/nepremicnine/stanovanje-buzet-64.83m2-oglas-14446021",
          posted_date: "2025-09-10",
          available_from: "Takoj"
        }
      ],
      searchCompleted: true,
      timestamp
    },

    "google.com": {
      domain: "google.com",
      searchQuery,
      totalFound: 8,
      properties: [
        {
          id: "google_001",
          title: "Luxury Downtown Apartment with Parking",
          price: "$750,000",
          location: "Downtown, City Center",
          area_m2: "110 m²",
          rooms: "2 bedroom",
          floor: "5th floor",
          year_built: "2018",
          condition: "Excellent",
          heating: "Central heating",
          energy_certificate: "A",
          furnished: "Partially furnished",
          parking: "Underground parking",
          balcony: "Balcony 10 m²",
          elevator: "Yes",
          features: ["City view", "Modern kitchen", "Air conditioning", "Gym access"],
          description: "Beautiful 2-bedroom apartment in the heart of downtown. Features modern amenities and stunning city views. Walking distance to all major attractions.",
          photos: [
            "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800",
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800"
          ],
          agent_name: "Sarah Johnson",
          agent_phone: "+1 555 123 4567",
          agent_email: "sarah.johnson@realty.com",
          listing_url: "https://www.realty.com/downtown-luxury-apartment-123",
          posted_date: "2025-09-09",
          available_from: "November 1, 2025"
        },
        {
          id: "google_002",
          title: "Modern 3BR Apartment Near Metro",
          price: "$680,000",
          location: "Midtown District",
          area_m2: "125 m²",
          rooms: "3 bedroom",
          floor: "3rd floor",
          year_built: "2020",
          condition: "New",
          heating: "Heat pump",
          energy_certificate: "A+",
          furnished: "Unfurnished",
          parking: "Assigned parking spot",
          balcony: "Large terrace",
          elevator: "Yes",
          features: ["Metro access", "Rooftop garden", "Concierge", "Pet-friendly"],
          description: "Spacious 3-bedroom apartment just steps from metro station. Perfect for families with excellent schools nearby.",
          photos: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"
          ],
          agent_name: "Mike Davis",
          agent_phone: "+1 555 987 6543",
          agent_email: "mike.davis@homes.com",
          listing_url: "https://www.homes.com/midtown-3br-apartment-456",
          posted_date: "2025-09-08",
          available_from: "October 15, 2025"
        }
      ],
      searchCompleted: true,
      timestamp
    },

    "facebook.com": {
      domain: "facebook.com",
      searchQuery,
      totalFound: 6,
      properties: [
        {
          id: "fb_001",
          title: "Cozy 2BR Apartment - Great Location!",
          price: "$520,000",
          location: "Residential Area, Suburb",
          area_m2: "85 m²",
          rooms: "2 bedroom",
          floor: "2nd floor",
          year_built: "2016",
          condition: "Good",
          heating: "Gas heating",
          energy_certificate: "B",
          furnished: "Unfurnished",
          parking: "Street parking",
          balcony: "Small balcony",
          elevator: null,
          features: ["Quiet neighborhood", "Close to parks", "Shopping nearby"],
          description: "Perfect starter home in a quiet residential area. Close to schools and shopping centers. Great community feel.",
          photos: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
          ],
          agent_name: "Lisa Chen",
          agent_phone: "+1 555 456 7890",
          agent_email: "lisa.chen@facebook.com",
          listing_url: "https://www.facebook.com/marketplace/item/123456789",
          posted_date: "2025-09-07",
          available_from: "December 1, 2025"
        }
      ],
      searchCompleted: true,
      timestamp
    }
  };

  // Return mock data for the specific domain, or a default if not found
  return mockDataTemplates[domain as keyof typeof mockDataTemplates] || {
    domain,
    searchQuery,
    totalFound: 0,
    properties: [],
    searchCompleted: true,
    timestamp
  };
};
