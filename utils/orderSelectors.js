import {
  formatCompactCurrency,
  formatDateLabel,
  formatWeight,
  formatWholeNumber
} from "./formatters";

function toNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildPartySummary(party, fallback) {
  const pieces = [party.name, party.address, party.city, party.pincode].filter(Boolean);

  if (!pieces.length) {
    return fallback;
  }

  return pieces.join(", ");
}

export function getOrderTotals(orderState) {
  return orderState.packages.reduce(
    (totals, item) => ({
      packageCount: totals.packageCount + 1,
      totalWeight: totals.totalWeight + toNumber(item.weightKg),
      totalDeclaredValue:
        totals.totalDeclaredValue + toNumber(item.declaredValueInr)
    }),
    { packageCount: 0, totalWeight: 0, totalDeclaredValue: 0 }
  );
}

export function getPackagePreviewItems(packages) {
  return packages.map((item, index) => ({
    id: item.id,
    title: item.label || `Package ${index + 1}`,
    weightValue: toNumber(item.weightKg),
    lengthValue: toNumber(item.lengthCm),
    widthValue: toNumber(item.widthCm),
    heightValue: toNumber(item.heightCm),
    declaredValue: toNumber(item.declaredValueInr)
  }));
}

export function getOrderSummary(orderState) {
  const totals = getOrderTotals(orderState);
  const packages = getPackagePreviewItems(orderState.packages);

  return {
    orderId: orderState.orderId,
    shipmentDateLabel: formatDateLabel(orderState.shipmentDate),
    deliveryTypeLabel:
      orderState.deliveryType === "express" ? "Express" : "Standard",
    senderSummary: buildPartySummary(
      orderState.consignor,
      "Sender information will appear here as the form is completed."
    ),
    receiverSummary: buildPartySummary(
      orderState.consignee,
      "Receiver information will appear here as the form is completed."
    ),
    packages,
    totals,
    totalWeightLabel: formatWeight(totals.totalWeight),
    totalDeclaredValueLabel: formatCompactCurrency(totals.totalDeclaredValue),
    packageCountLabel: formatWholeNumber(totals.packageCount),
    fragile: orderState.options.fragile,
    insured: orderState.options.insured
  };
}
