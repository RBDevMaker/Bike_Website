import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "../App";
import Products from "../components/Products";

describe("Renders main page correctly", async () => {
  afterEach(() => {
    cleanup();
  });

  it("Should render the main page correctly", async () => {
    // Setup
    await render(<App />);
    const h1 = await screen.queryByText("AnyCompany bicycle parts");

    // Expectations
    expect(h1).not.toBeNull();
  });

  it("Should show the current year in the copyrights", async () => {
    // Setup
    await render(<App />);
    const year = new Date().getFullYear();
    const copyrights = await screen.queryByText(
      "© " +
        year +
        ", Amazon Web Services, Inc. or its Affiliates. All rights reserved."
    );

    // Expectations
    expect(copyrights).not.toBeNull();
  });

  it("Should show a light banner after clicking on button", async () => {
    // Setup
    const { container } = await render(<App />);
    const banner = container.getElementsByClassName("banner");
    const button = await screen.queryByText("Light Banner");

    // Pre Expectations
    expect(banner).not.toBeNull();
    expect(banner[0].classList.contains("banner-dark")).toBe(true);
    expect(button).not.toBeNull();

    // Actions
    fireEvent.click(button);

    // Post Expectations
    expect(banner[0].classList.contains("banner-light")).toBe(true);
  });

  it("Should show 3 products", async () => {
    // Setup
    const { container } = await render(<Products />);
    const products = container.getElementsByTagName("td");

    // Expectations
    expect(products.length).toBe(3);
  });
});
