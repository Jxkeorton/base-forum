import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithProviders } from "../utils/testUtils.jsx";
import DetailsCard from "../../components/locations/DetailsCard.jsx";

describe("DetailsCard component", () => {
  const location = {
    id: 10,
    name: "La Tête de Chien",
    country: "France",
    longitude: "7.403012",
    latitude: "43.731660",
    rock_drop: 328,
    total_height: 400,
    access:
      "0 minutes with shuttle: Park at the Tête de Chien panorama car park. The fairly obvious exit is only accessible from the fort which is unfortunately not accessible to the public... First locate the exit from the panorama.",
    cliff_aspect: "SE",
    opened_by: "Gillian Hamcy , David Degrado",
    date_opened: "2018-12-30",
    image:
      "https://res.cloudinary.com/dz02qubd3/image/upload/v1733696696/Untitled_design_15_upirhl.png",
  };

  test("renders location details correctly", () => {
    renderWithProviders(<DetailsCard location={location} />);

    // Test basic details
    expect(screen.getByText("La Tête de Chien")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText(/SE/)).toBeInTheDocument();
    expect(screen.getByText(/Gillian Hamcy , David Degrado/)).toBeInTheDocument();
    expect(screen.getByText(/Rock Drop: 328 ft/)).toBeInTheDocument();
    expect(screen.getByText(/Total Height: 400 ft/)).toBeInTheDocument();
    expect(screen.getByText(/0 minutes with shuttle/)).toBeInTheDocument();
    expect(screen.getByText(/43.731660, 7.403012/)).toBeInTheDocument();
    
    const image = screen.getByAltText("La Tête de Chien");
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(location.image);
  });

  //TODO: fix login 
  test("Save and Add Review buttons are not visible when user is not logged in", () => {
    renderWithProviders(<DetailsCard location={location} />);
    
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    expect(screen.queryByText("Add Review")).not.toBeInTheDocument();
  });
});
