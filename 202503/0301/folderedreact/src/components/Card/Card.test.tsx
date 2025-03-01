import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { describe, it, expect } from "vitest";

describe("Card", () => {
  it("renders card with all props", () => {
    render(
      <Card title="Card Title" footer={<div>Footer Content</div>}>
        <div>Card Content</div>
      </Card>
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toHaveTextContent("Card Title");
    expect(screen.getByTestId("card-content")).toHaveTextContent(
      "Card Content"
    );
    expect(screen.getByTestId("card-footer")).toHaveTextContent(
      "Footer Content"
    );
  });

  it("renders card without header when title is not provided", () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );

    expect(screen.queryByTestId("card-header")).not.toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });

  it("renders card without footer when footer is not provided", () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );

    expect(screen.queryByTestId("card-footer")).not.toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });
});
