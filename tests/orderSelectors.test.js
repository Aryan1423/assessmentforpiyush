import { describe, expect, it } from "vitest";
import { getOrderSummary, getOrderTotals } from "@/utils/orderSelectors";

const state = {
  orderId: "ORD-20260403-1234",
  shipmentDate: "2026-04-03",
  deliveryType: "express",
  consignor: {
    name: "Acme Supply",
    address: "Dock 4, River Road",
    city: "Mumbai",
    pincode: "400001"
  },
  consignee: {
    name: "North Grid Retail",
    address: "Warehouse 9, Industrial Avenue",
    city: "Delhi",
    pincode: "110001"
  },
  packages: [
    {
      id: "pkg-1",
      label: "Pallet A",
      weightKg: "12.5",
      lengthCm: "40",
      widthCm: "30",
      heightCm: "20",
      declaredValueInr: "4000"
    },
    {
      id: "pkg-2",
      label: "Crate B",
      weightKg: "",
      lengthCm: "50",
      widthCm: "40",
      heightCm: "30",
      declaredValueInr: "500"
    }
  ],
  options: {
    fragile: true,
    insured: false
  }
};

describe("order selectors", () => {
  it("calculates totals while treating empty numeric fields as zero", () => {
    const totals = getOrderTotals(state);

    expect(totals.packageCount).toBe(2);
    expect(totals.totalWeight).toBe(12.5);
    expect(totals.totalDeclaredValue).toBe(4500);
  });

  it("builds a preview summary from order state", () => {
    const summary = getOrderSummary(state);

    expect(summary.deliveryTypeLabel).toBe("Express");
    expect(summary.senderSummary).toContain("Acme Supply");
    expect(summary.receiverSummary).toContain("North Grid Retail");
    expect(summary.packages[0].title).toBe("Pallet A");
    expect(summary.packages[1].declaredValue).toBe(500);
  });
});
