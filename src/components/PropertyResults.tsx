"use client";

import { useState } from "react";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  area_m2?: string | null;
  rooms?: string | null;
  floor?: string | null;
  year_built?: string | null;
  condition?: string | null;
  heating?: string | null;
  energy_certificate?: string | null;
  furnished?: string | null;
  parking?: string | null;
  balcony?: string | null;
  elevator?: string | null;
  features: string[];
  description: string;
  photos: string[];
  agent_name?: string | null;
  agent_phone?: string | null;
  agent_email?: string | null;
  listing_url: string;
  posted_date?: string | null;
  available_from?: string | null;
}

interface DomainResult {
  domain: string;
  data: {
    domain: string;
    searchQuery: string;
    totalFound: number;
    properties: Property[];
    searchCompleted: boolean;
    timestamp: string;
  };
}

interface PropertyResultsProps {
  results: DomainResult[];
  searchQuery: string;
  onNewSearch: () => void;
}

export default function PropertyResults({ results, searchQuery, onNewSearch }: PropertyResultsProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"price" | "area" | "date">("date");

  // Aggregate all properties
  const allProperties = results.flatMap(result => 
    result.data.properties.map(property => ({
      ...property,
      sourceDomain: result.domain
    }))
  );

  // Filter properties by domain
  const filteredProperties = selectedDomain === "all" 
    ? allProperties 
    : allProperties.filter(p => p.sourceDomain === selectedDomain);

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price":
        const priceA = parseFloat(a.price.replace(/[^\d.-]/g, '')) || 0;
        const priceB = parseFloat(b.price.replace(/[^\d.-]/g, '')) || 0;
        return priceA - priceB;
      case "area":
        const areaA = parseFloat(a.area_m2?.replace(/[^\d.-]/g, '') || '0') || 0;
        const areaB = parseFloat(b.area_m2?.replace(/[^\d.-]/g, '') || '0') || 0;
        return areaB - areaA;
      case "date":
      default:
        return new Date(b.posted_date || '').getTime() - new Date(a.posted_date || '').getTime();
    }
  });

  const totalFound = results.reduce((sum, result) => sum + result.data.totalFound, 0);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h1 className="text-3xl font-black text-balance">Property Search Results</h1>
          </div>
          <p className="text-muted-foreground text-lg mb-4">
            Found <span className="text-primary font-semibold">{totalFound} properties</span> for: 
            <span className="text-foreground font-medium"> "{searchQuery}"</span>
          </p>
          
          <button
            onClick={onNewSearch}
            className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/40 text-foreground py-2 px-6 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 font-medium"
          >
            🔍 New Search
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {results.map((result) => (
            <div key={result.domain} className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-2">{result.domain}</h3>
              <p className="text-2xl font-bold text-primary mb-1">{result.data.properties.length}</p>
              <p className="text-muted-foreground text-sm">Properties found</p>
              {result.data.totalFound > result.data.properties.length && (
                <p className="text-xs text-muted-foreground mt-1">
                  ({result.data.totalFound} total available)
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Source:</label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="bg-background border-2 border-primary/20 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="all">All Sources ({allProperties.length})</option>
                {results.map((result) => (
                  <option key={result.domain} value={result.domain}>
                    {result.domain} ({result.data.properties.length})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "price" | "area" | "date")}
                className="bg-background border-2 border-primary/20 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="date">Date Posted</option>
                <option value="price">Price (Low to High)</option>
                <option value="area">Area (Large to Small)</option>
              </select>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredProperties.length} properties
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid gap-6">
          {sortedProperties.map((property, index) => (
            <div key={`${property.sourceDomain}-${property.id}-${index}`} className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Property Image */}
                <div className="md:w-1/3">
                  {property.photos && property.photos.length > 0 ? (
                    <img
                      src={property.photos[0]}
                      alt={property.title}
                      className="w-full h-64 md:h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  ) : (
                    <div className="w-full h-64 md:h-full bg-muted/30 flex items-center justify-center">
                      <svg className="h-16 w-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{property.title}</h3>
                      <p className="text-muted-foreground mb-2">{property.location}</p>
                      <span className="inline-block bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {property.sourceDomain}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">{property.price}</div>
                      {property.area_m2 && (
                        <div className="text-sm text-muted-foreground">{property.area_m2}</div>
                      )}
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    {property.rooms && (
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">🏠</span>
                        <span>{property.rooms}</span>
                      </div>
                    )}
                    {property.floor && (
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">🏢</span>
                        <span>{property.floor}</span>
                      </div>
                    )}
                    {property.parking && (
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">🚗</span>
                        <span>{property.parking}</span>
                      </div>
                    )}
                    {property.year_built && (
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">📅</span>
                        <span>{property.year_built}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {property.description}
                  </p>

                  {/* Features Tags */}
                  {property.features && property.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.slice(0, 5).map((feature, idx) => (
                        <span key={idx} className="bg-muted/50 text-muted-foreground px-2 py-1 rounded-md text-xs">
                          {feature}
                        </span>
                      ))}
                      {property.features.length > 5 && (
                        <span className="text-muted-foreground text-xs">+{property.features.length - 5} more</span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={property.listing_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      View Details
                    </a>
                    {property.agent_phone && (
                      <a
                        href={`tel:${property.agent_phone}`}
                        className="bg-gradient-to-br from-card to-muted/30 border border-primary/20 text-foreground px-4 py-2 rounded-lg hover:border-primary transition-colors text-sm font-medium"
                      >
                        📞 Call
                      </a>
                    )}
                  </div>

                  {/* Agent Info */}
                  {property.agent_name && (
                    <div className="mt-4 pt-4 border-t border-primary/20 text-sm text-muted-foreground">
                      <span className="font-medium">Agent:</span> {property.agent_name}
                      {property.agent_email && (
                        <span className="ml-4">
                          <a href={`mailto:${property.agent_email}`} className="text-primary hover:underline">
                            {property.agent_email}
                          </a>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or selecting different sources.</p>
          </div>
        )}
      </div>
    </div>
  );
}
