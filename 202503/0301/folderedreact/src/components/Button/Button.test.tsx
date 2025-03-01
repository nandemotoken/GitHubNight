import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { vi, describe, it, expect } from "vitest";

describe("Button", () => {
  it("renders button with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByTestId("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByTestId("button")).toHaveTextContent("Loading...");
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByTestId("button")).toBeDisabled();
  });

  it("applies different variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const button = screen.getByTestId("button");
    expect(button.className).toContain("primary");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(button.className).toContain("secondary");

    rerender(<Button variant="outline">Outline</Button>);
    expect(button.className).toContain("outline");
  });

  it("applies different sizes", () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    const button = screen.getByTestId("button");
    expect(button.className).toContain("small");

    rerender(<Button size="medium">Medium</Button>);
    expect(button.className).toContain("medium");

    rerender(<Button size="large">Large</Button>);
    expect(button.className).toContain("large");
  });
});
