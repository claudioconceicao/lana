
type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  availableDates: { title: string; date: string }[];
};


export const dummy = {
    listings: [
        {
            id: 1,
            title: "Cozy Cottage",
            description: "A cozy cottage in the countryside.",
            price: 100,
            location: "Countryside",
            availableDates: ["2025-10-01", "2025-10-02", "2025-10-03"]
        },
        {
            id: 2,
            title: "Modern Apartment",
            description: "A modern apartment in the city center.",
            price: 150,
            location: "City Center",
            availableDates: ["2025-10-05", "2025-10-06", "2025-10-07"]
        },
        {
            id: 3,
            title: "Beach House",
            description: "A beautiful beach house with ocean views.",
            price: 200,
            location: "Beachfront",
            availableDates: ["2025-10-10", "2025-10-11", "2025-10-12"]
        },
        {
            id: 4,
            title: "Mountain Retreat",
            description: "A serene mountain retreat for nature lovers.",
            price: 180,
            location: "Mountains",
            availableDates: ["2025-10-15", "2025-10-16", "2025-10-17"]
        },
        {
            id: 5,
            title: "Urban Loft",
            description: "A stylish urban loft in a trendy neighborhood.",
            price: 120,
            location: "Downtown",
            availableDates: ["2025-10-20", "2025-10-21", "2025-10-22"]
        },
        {
            id: 6,
            title: "Suburban Home",
            description: "A spacious suburban home with a backyard.",
            price: 130,
            location: "Suburbia",
            availableDates: ["2025-10-25", "2025-10-26", "2025-10-27"]
        },
        {
            id: 7,
            title: "Luxury Villa",
            description: "A luxury villa with a private pool.",
            price: 300,
            location: "Exclusive Area",
            availableDates: ["2025-10-30", "2025-10-31", "2025-11-01"]
        },
        {
            id: 8,
            title: "Rustic Cabin",
            description: "A rustic cabin in the woods.",
            price: 90,
            location: "Forest",
            availableDates: ["2025-11-05", "2025-11-06", "2025-11-07"]
        },
        {
            id: 9,
            title: "Penthouse Suite",
            description: "A luxurious penthouse suite with city views.",
            price: 250,
            location: "Skyline",
            availableDates: ["2025-11-10", "2025-11-11", "2025-11-12"]
        },
        {
            id: 10,
            title: "Charming Bungalow",
            description: "A charming bungalow with a garden.",
            price: 110,
            location: "Residential Area",
            availableDates: ["2025-11-15", "2025-11-16", "2025-11-17"]
        },
        
    ]};