export const generateMockPropertyData = (domain: string, searchQuery: string) => {
  const timestamp = new Date().toISOString();
  
  // Mock data templates for different domains
  const mockDataTemplates = {
    "nepremicnine.net": {
      domain: "nepremicnine.net",
      searchQuery,
      totalFound: 3,
      properties: [
        {
          id: "np_001",
          title: "ČRNUČE, 310 m2 - prodaja, hiša, vrstna",
          price: "980.000,00 €",
          location: "Ljubljana mesto, Ljubljana Bežigrad, Črnuče",
          area_m2: "310 m²",
          rooms: "Hiša",
          floor: "Večnadstropna",
          year_built: "1996",
          condition: "Zgrajena l. 1996",
          heating: "Plinska peč na mestni plin",
          energy_certificate: null,
          furnished: "Lepo opremljena",
          parking: "Garaža za 3 avtomobile",
          balcony: "Terasa",
          elevator: null,
          features: ["Bazen", "Vrt", "Klet", "Savna", "Kamin", "Talno gretje", "Klima", "Optika"],
          description: "V mirnem naselju v Črnučah prodamo nadstandardno družinsko hišo, ki je primerna tudi za ambasade. Hiša ponuja udobno bivanje v treh etažah, ki jih povezuje osrednje stopnišče z galerijo. Na vrtu se nahaja bazen, ki je orientiran proti gozdu, zato nudi popolno zasebnost. Hiša se ponaša z vgrajenimi nadstandardnimi materiali ter s prostornostjo.",
          photos: [
            "https://img.nepremicnine.net/slonep_oglasi2/17335084.jpg"
          ],
          agent_name: "Janja Šubic",
          agent_phone: "051/676-939",
          agent_email: "info@dom-real.si",
          listing_url: "https://www.nepremicnine.net/oglasi-prodaja/crnuce-hisa_6995871/",
          posted_date: "2025-09-08",
          available_from: "Takoj"
        },
        {
          id: "np_002",
          title: "LJUBLJANA CENTER, 206.04 m2 - prodaja, hiša, drugo",
          price: "3.500.000,00 €",
          location: "Ljubljana Center",
          area_m2: "206.04 m²",
          rooms: "5 spalnic",
          floor: "Hiša",
          year_built: "1700 (prenovljena 2020)",
          condition: "Prenovljena l. 2020",
          heating: "Toplotna črpalka",
          energy_certificate: null,
          furnished: "Polno opremljeno",
          parking: "Garaža",
          balcony: "Balkon, Atrij, Terasa",
          elevator: null,
          features: ["Bazen", "Vrt", "Talno gretje", "Protivlomna vrata", "Domofon", "Alarm", "Optični internet", "Prezračevalni sistem"],
          description: "Prodamo čudovito vilo z bazenom in petimi apartmaji ter velikim vrtom, ki obsega del samega Grajskega griča, v strogem mestnem jedru Ljubljane. Pravljični lokaciji, kjer mestni vrvež zamenjajo mir in razgledi, ki jemljejo dih. Edinstveni lokaciji, ki ponuja nekaj neprecenljivega in skoraj nedosegljivega - urbano udobje v objemu narave.",
          photos: [
            "https://img.nepremicnine.net/slonep_oglasi2/18284757.jpg"
          ],
          agent_name: "Uroš",
          agent_phone: "041 775 606",
          agent_email: "info@booking.com",
          listing_url: "https://www.nepremicnine.net/oglasi-prodaja/lj-center-hisa_7048002/",
          posted_date: "2025-09-09",
          available_from: "Takoj"
        },
        {
          id: "np_003",
          title: "LJUBLJANA VIČ, 645 m2 - prodaja, hiša, samostojna",
          price: "2.450.000,00 €",
          location: "Ljubljana Vič",
          area_m2: "645 m²",
          rooms: "6 spalnic",
          floor: "P+1+M",
          year_built: "1975 (adaptirana 2018)",
          condition: "Adaptirana l. 2018",
          heating: "Mestni plin",
          energy_certificate: null,
          furnished: "Polno opremljeno",
          parking: "Parkirno mesto",
          balcony: "Terasa",
          elevator: null,
          features: ["Bazen", "Vrt", "Klimatska naprava", "Savna", "Alarmni sistem", "Video nadzor"],
          description: "Prodamo hišo z velikim in lepo urejenim vrtom, ki zagotavlja popolno intimo, 13,5 metra dolgim bazenom ter ločenim večnamenskim/garažnim objektom. Nepremičnina se nahaja na odlični lokaciji na Viču. Hiša nudi obilo bivalnega prostora in se prilagaja različnim življenjskim slogom.",
          photos: [
            "https://img.nepremicnine.net/slonep_oglasi2/17333977.jpg"
          ],
          agent_name: "Esad Čeman",
          agent_phone: "041/699-372",
          agent_email: "info@stoja-trade.si",
          listing_url: "https://www.nepremicnine.net/oglasi-prodaja/lj-vic-hisa_6954832/",
          posted_date: "2025-09-07",
          available_from: "Takoj"
        }
      ],
      searchCompleted: true,
      timestamp
    },

    "bolha.si/nepremicnine": {
      domain: "bolha.si/nepremicnine",
      searchQuery,
      totalFound: 2,
      properties: [
        {
          id: "bolha_001",
          title: "Prodaja, Hiša, Samostojna, Ljubljana mesto, Vič-Rudnik",
          price: "1.200.000 €",
          location: "Osrednjeslovenska, Ljubljana Vič Rudnik, Rudnik",
          area_m2: "219.00 m²",
          rooms: "3 spalnice",
          floor: "Večnadstropna",
          year_built: "2004",
          condition: "Popolnoma opremljeno",
          heating: "Toplotna črpalka, talno gretje",
          energy_certificate: null,
          furnished: "Popolnoma opremljeno",
          parking: "3 parkirna mesta",
          balcony: "Balkon, Terasa, Atrij",
          elevator: null,
          features: ["Vrt/dvorišče", "Bazen", "Klima", "Optika", "Polnilna postaja"],
          description: "Podeželska vila z bazenom v Črni vasi (339 m2, K+P+M, zgrajena l. 2004). V Črni vasi, prijetnem sončnem naselju na južnem obrobju Ljubljane, ki je le nekaj kilometrov oddaljeno od Rudnika in 10 min od centra Ljubljane prodamo podeželsko vilo, ki je izredno funkcionalna, lepo opremljena.",
          photos: [
            "https://www.bolha.com/image-w920x690/nepremicnine/prodaja-hisa-samostojna-ljubljana-mesto-vic-rudnik-slika-51227301.jpg"
          ],
          agent_name: "KW Slovenia",
          agent_phone: "omnis@kwslovenia.com",
          agent_email: "omnis@kwslovenia.com",
          listing_url: "https://www.bolha.com/nepremicnine/prodaja-hisa-samostojna-ljubljana-mesto-vic-rudnik-oglas-13506310",
          posted_date: "29.11.2024",
          available_from: "Takoj"
        },
        {
          id: "bolha_002",
          title: "Prodamo ekskluzivno vilo z bazenom - Ljubljana",
          price: "1.295.000 €",
          location: "Osrednjeslovenska, Ljubljana Bežigrad, Nadgorica",
          area_m2: "250.74 m²",
          rooms: "5 sob",
          floor: "Enonadstropna",
          year_built: "1974 (obnovljena 2000)",
          condition: "Obnovljena l. 2000",
          heating: "Toplotna črpalka",
          energy_certificate: "C (35 - 60 kWh/m²a)",
          furnished: "Polno opremljeno",
          parking: "4 parkirna mesta",
          balcony: null,
          elevator: null,
          features: ["Bazen", "Jacuzzi", "Letna kuhinja", "Fitnes s savno", "Kamin", "Talno gretje", "Klima", "Protivlomna vrata", "Alarmni sistem", "Video nadzor"],
          description: "Posredujemo pri prodaji ekskluzivne hiše, ki je bila zgrajena leta 1974 in obnovljena leta 2000 ter stoji na vse skupaj 1.392 m2 velikem zemljišču. Hiša ima 250,74m2 s premišljenim tlorisom in ogromno dnevne svetlobe, ki poudari vsak kotiček vile.",
          photos: [
            "https://www.bolha.com/image-w920x690/nepremicnine/prodamo-ekskluzivno-vilo-z-bazenom-ljubljana-slika-50032129.jpg"
          ],
          agent_name: "Nepremičninska družba d.o.o.",
          agent_phone: "ljubljana@re-max.si",
          agent_email: "ljubljana@re-max.si",
          listing_url: "https://www.bolha.com/nepremicnine/prodamo-ekskluzivno-vilo-z-bazenom-ljubljana-oglas-13244621",
          posted_date: "26.09.2024",
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
