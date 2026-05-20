import { Property } from "./property";

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxury Land Plot Panorama",
    price: "$3,250,000",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    status: "vacant" as const,
    location: "Downtown, Sector 5",
    type: "land" as const,
    latitude: 23.0225,
    longitude: 72.5714,
    description:
      "Prime location land plot with panoramic city views. Ready for immediate development.",
    bedrooms: 0,
    bathrooms: 0,
    area: "5000 sq ft",
    gallery: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
      "https://images.unsplash.com/photo-1600607689023-24cf9c5e2e69?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2071&amp;q=80",
    ],
    agent: "John Doe",
    phone: "+91 98765 43210",
    dolil:
      "https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf",
    taxDocument:
      "https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf",
  },
  {
    id: "2",
    title: "Modern Flat Apartment",
    price: "$2,400 / mo",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    status: "occupied" as const,
    location: "Gulbai Tekra, Ahmedabad",
    type: "flat" as const,
    latitude: 23.03,
    longitude: 72.56,
    description:
      "Spacious 3BHK apartment with modern amenities and gym access.",
    bedrooms: 3,
    bathrooms: 2,
    area: "1500 sq ft",
    gallery: [],
    agent: "Jane Smith",
    phone: "+91 87654 32109",
    dolil:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd69?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    taxDocument:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "3",
    title: "Cozy Pondside House",
    price: "$1,850,000",
    image:
      "https://images.unsplash.com/photo-1600607689023-24cf9c5e2e69?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2071&amp;q=80",
    location: "Sabarmati Lake Area",
    type: "pond" as const,
    latitude: 23.1,
    longitude: 72.55,
    description: "Serene house by the pond with private garden and lake views.",
    bedrooms: 4,
    bathrooms: 3,
    area: "2800 sq ft",
    gallery: [],
    agent: "Mike Johnson",
    phone: "+91 76543 21098",
    dolil:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    taxDocument:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "4",
    title: "Prime Land Commercial",
    price: "$4,200,000",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    status: "maintenance" as const,
    location: "SG Highway",
    type: "land" as const,
    latitude: 23.04,
    longitude: 72.5,
    description:
      "High-traffic commercial land ideal for retail or office space.",
    bedrooms: 0,
    bathrooms: 0,
    area: "8000 sq ft",
    gallery: [],
    agent: "Sarah Wilson",
    phone: "+91 65432 10987",
    dolil:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd69?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    taxDocument:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "5",
    title: "Luxury Flat Penthouse",
    price: "$2,100 / mo",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    status: "vacant" as const,
    location: "Navrangpura",
    type: "flat" as const,
    latitude: 23.025,
    longitude: 72.565,
    description: "Penthouse with rooftop terrace and premium finishes.",
    bedrooms: 4,
    bathrooms: 3,
    area: "2200 sq ft",
    gallery: [],
    agent: "David Brown",
    phone: "+91 54321 09876",
    dolil:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    taxDocument:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80",
  },
  {
    id: "6",
    title: "Pond View Retreat",
    price: "$2,800,000",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    status: "occupied" as const,
    location: "Kankaria Lake",
    type: "pond" as const,
    latitude: 23.005,
    longitude: 72.6,
    description: "Luxury retreat with direct pond access and infinity pool.",
    bedrooms: 5,
    bathrooms: 4,
    area: "3500 sq ft",
    gallery: [],
    agent: "Emily Davis",
    phone: "+91 43210 98765",
    dolil:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    taxDocument:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80",
  },

  {
    id: "7",
    title: "Prime Land Commercial",
    price: "$4,200,000",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    status: "maintenance" as const,
    location: "SG Highway",
    type: "land" as const,
    latitude: 23.04,
    longitude: 72.5,
    description:
      "High-traffic commercial land ideal for retail or office space.",
    bedrooms: 0,
    bathrooms: 0,
    area: "8000 sq ft",
    gallery: [],
    agent: "Sarah Wilson",
    phone: "+91 65432 10987",
    dolil:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd69?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    taxDocument:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "8",
    title: "Luxury Flat Penthouse",
    price: "$2,100 / mo",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    status: "vacant" as const,
    location: "Navrangpura",
    type: "flat" as const,
    latitude: 23.025,
    longitude: 72.565,
    description: "Penthouse with rooftop terrace and premium finishes.",
    bedrooms: 4,
    bathrooms: 3,
    area: "2200 sq ft",
    gallery: [],
    agent: "David Brown",
    phone: "+91 54321 09876",
  },
  {
    id: "9",
    title: "Pond View Retreat",
    price: "$2,800,000",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80",
    status: "occupied" as const,
    location: "Kankaria Lake",
    type: "pond" as const,
    latitude: 23.005,
    longitude: 72.6,
    description: "Luxury retreat with direct pond access and infinity pool.",
    bedrooms: 5,
    bathrooms: 4,
    area: "3500 sq ft",
    gallery: [],
    agent: "Emily Davis",
    phone: "+91 43210 98765",
    dolil:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    taxDocument:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80",
  },
];
