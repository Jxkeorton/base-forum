import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Spinner } from "react-bootstrap";
import LocationList from "../../components/locations/LocationList";

const temporaryLocation = [
  {
    id: 10,
    created_at: "07 Nov 2024",
    updated_at: "07 Nov 2024",
    name: "La Tête de Chien",
    country: "France",
    longitude: "7.403012",
    latitude: "43.731660",
    rock_drop: 328,
    total_height: 328,
    access:
      "0 minutes with shuttle: Park at the Tête de Chien panorama car park. The fairly obvious exit is only accessible from the fort which is unfortunately not accessible to the public... First locate the exit from the panorama.",
    cliff_aspect: "SE",
    opened_by: "Gillian Hamcy , David Degrado",
    date_opened: "2018-12-30",
    image:
      "https://res.cloudinary.com/dz02qubd3/image/upload/v1729441727/default_post_qpihoy.jpg",
    is_saved: false,
  },
  {
    id: 1,
    created_at: "07 Nov 2024",
    updated_at: "07 Nov 2024",
    name: "Nebbifield",
    country: "United Kingdom",
    longitude: "-2.111822",
    latitude: "60.140582",
    rock_drop: 450,
    total_height: 960,
    access: "1 hour 45min boat from Shetland, 1 hour walk to the top.",
    cliff_aspect: "W",
    opened_by: "SIMON BRENTFORD, DARREN STRATFORD",
    date_opened: "2015-01-01",
    image:
      "https://res.cloudinary.com/dz02qubd3/image/upload/v1729441727/default_post_qpihoy.jpg",
    is_saved: false,
  },
  {
    id: 2,
    created_at: "07 Nov 2024",
    updated_at: "07 Nov 2024",
    name: "Ben Nevis summit",
    country: "United Kingdom",
    longitude: "-5.003463",
    latitude: "56.796852",
    rock_drop: 120,
    total_height: null,
    access: "Long hike, 2-3 hour hike for a fit adult.",
    cliff_aspect: "N",
    opened_by: "Josh Bregmen",
    date_opened: "2018-08-20",
    image:
      "https://res.cloudinary.com/dz02qubd3/image/upload/v1729441727/default_post_qpihoy.jpg",
    is_saved: false,
  },
  {
    id: 3,
    created_at: "07 Nov 2024",
    updated_at: "07 Nov 2024",
    name: "The queens jewels - Arthur's Seat",
    country: "United Kingdom",
    longitude: "-3.174485",
    latitude: "55.946497",
    rock_drop: 108,
    total_height: 350,
    access: "Walk up the hill from the road nearby",
    cliff_aspect: "W",
    opened_by: "HANS DONNER",
    date_opened: "2019-07-26",
    image:
      "https://res.cloudinary.com/dz02qubd3/image/upload/v1729441727/default_post_qpihoy.jpg",
    is_saved: false,
  },
  {
    id: 4,
    created_at: "07 Nov 2024",
    updated_at: "07 Nov 2024",
    name: "Gillercome, Ravens Crag",
    country: "United Kingdom",
    longitude: "-3.202973",
    latitude: "54.502047",
    rock_drop: 140,
    total_height: 600,
    access: "Park at Seathwaite or Honister Pass.",
    cliff_aspect: "E",
    opened_by: "JOSH Bregmen",
    date_opened: "2018-09-28",
    image:
      "https://res.cloudinary.com/dz02qubd3/image/upload/v1729441727/default_post_qpihoy.jpg",
    is_saved: false,
  },
];

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredLocations(
        temporaryLocation.filter((location) =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setIsLoading(false);
    }, 500);

    setIsLoading(true);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div>
      <h1 className="text-center">Locations</h1>

      <InputGroup
        className="mb-3"
        style={{
          maxWidth: "500px",
          marginBottom: "20px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <InputGroup.Text>
          <i className="fa fa-search"></i>
        </InputGroup.Text>
        <FormControl
          placeholder="Search by location name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {filteredLocations.length === 0 && !isLoading ? (
        <p>No locations found matching the search term.</p>
      ) : (
        <LocationList locations={filteredLocations} />
      )}
    </div>
  );
};

export default Locations;