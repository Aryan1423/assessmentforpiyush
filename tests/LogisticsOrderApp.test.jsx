import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import LogisticsOrderApp from "@/components/LogisticsOrderApp";

describe("LogisticsOrderApp", () => {
  it("renders a read-only order id and updates the preview in real time", async () => {
    const user = userEvent.setup();

    render(
      <LogisticsOrderApp
        initialOrderId="ORD-20260403-1234"
        initialShipmentDate="2026-04-03"
      />
    );

    expect(screen.getByDisplayValue("ORD-20260403-1234")).toHaveAttribute(
      "readonly"
    );

    await user.type(
      screen.getAllByLabelText("Name", { selector: "input" })[0],
      "Acme"
    );

    expect(screen.getByText(/Acme/)).toBeInTheDocument();
  });

  it("switches delivery type and updates shipment indicators", async () => {
    const user = userEvent.setup();

    render(
      <LogisticsOrderApp
        initialOrderId="ORD-20260403-1234"
        initialShipmentDate="2026-04-03"
      />
    );

    await user.click(screen.getByRole("radio", { name: "Express" }));
    await user.click(screen.getByRole("checkbox", { name: /Fragile handling/i }));
    await user.click(
      screen.getByRole("checkbox", { name: /Insurance required/i })
    );

    expect(screen.getAllByText("Express")[0]).toBeInTheDocument();
    expect(screen.getByText("Fragile")).toBeInTheDocument();
    expect(screen.getByText("Insured")).toBeInTheDocument();
  });

  it("recalculates totals when package inputs change", async () => {
    const user = userEvent.setup();

    render(
      <LogisticsOrderApp
        initialOrderId="ORD-20260403-1234"
        initialShipmentDate="2026-04-03"
      />
    );

    await user.type(screen.getByLabelText("Weight (kg)"), "12.5");
    await user.type(screen.getByLabelText("Declared value (₹)"), "1500");

    expect(screen.getByText("12.5 kg")).toBeInTheDocument();
    expect(screen.getAllByText("₹1,500").length).toBeGreaterThan(0);
  });
});
