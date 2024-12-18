import { fireEvent, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithProviders } from "../utils/testUtils.jsx";
import ReviewForm from "../../components/reviews/ReviewForm.jsx";


describe("ReviewForm component", () => {
  test("renders the ReviewForm component correctly", () => {
    renderWithProviders(<ReviewForm />);

    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Hazard Report")).toBeInTheDocument();
  });

  test("hazard checkbox toggles when clicked", async () => {
    renderWithProviders(<ReviewForm />);
    const checkbox = screen.getByLabelText("Hazard Report");

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("displays existing review data when in edit mode", async () => {
    const mockReview = {
      id: 1,
      subject: "Existing Subject",
      content: "Existing Content",
      hazard: true,
      location: 1,
      location_name: "Location 1",
    };

    renderWithProviders(<ReviewForm review={mockReview} />);

    expect(screen.getByLabelText("Subject")).toHaveValue("Existing Subject");
    expect(screen.getByLabelText("Content")).toHaveValue("Existing Content");
    expect(screen.getByLabelText("Hazard Report")).toBeChecked();
  });
});
