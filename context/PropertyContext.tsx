import { Property } from "@/types/property";
import { properties as initialProperties } from "@/types/propertydata";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined,
);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (property: Property) => {
    setProperties((prev) => [property, ...prev]);
  };

  const updateProperty = (property: Property) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === property.id ? property : p)),
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PropertyContext.Provider
      value={{ properties, addProperty, updateProperty, deleteProperty }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
}
