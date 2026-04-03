import { describe, expect, it } from "vitest";
import {
  ACTIONS,
  createInitialOrderState,
  orderReducer
} from "@/utils/orderState";

describe("orderReducer", () => {
  it("updates shipment fields", () => {
    const state = createInitialOrderState({
      orderId: "ORD-20260403-1234",
      shipmentDate: "2026-04-03"
    });

    const nextState = orderReducer(state, {
      type: ACTIONS.UPDATE_SHIPMENT_FIELD,
      field: "deliveryType",
      value: "express"
    });

    expect(nextState.deliveryType).toBe("express");
  });

  it("updates nested party fields", () => {
    const state = createInitialOrderState({
      orderId: "ORD-20260403-1234",
      shipmentDate: "2026-04-03"
    });

    const nextState = orderReducer(state, {
      type: ACTIONS.UPDATE_PARTY_FIELD,
      party: "consignor",
      field: "city",
      value: "Mumbai"
    });

    expect(nextState.consignor.city).toBe("Mumbai");
  });

  it("adds and removes packages while keeping one minimum package", () => {
    const state = createInitialOrderState({
      orderId: "ORD-20260403-1234",
      shipmentDate: "2026-04-03"
    });

    const addedState = orderReducer(state, {
      type: ACTIONS.ADD_PACKAGE
    });

    expect(addedState.packages).toHaveLength(2);

    const removedState = orderReducer(addedState, {
      type: ACTIONS.REMOVE_PACKAGE,
      packageId: addedState.packages[0].id
    });

    expect(removedState.packages).toHaveLength(1);

    const guardedState = orderReducer(removedState, {
      type: ACTIONS.REMOVE_PACKAGE,
      packageId: removedState.packages[0].id
    });

    expect(guardedState.packages).toHaveLength(1);
  });

  it("updates a package independently", () => {
    const state = createInitialOrderState({
      orderId: "ORD-20260403-1234",
      shipmentDate: "2026-04-03"
    });

    const nextState = orderReducer(state, {
      type: ACTIONS.UPDATE_PACKAGE_FIELD,
      packageId: state.packages[0].id,
      field: "weightKg",
      value: "16.2"
    });

    expect(nextState.packages[0].weightKg).toBe("16.2");
  });
});
