const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0
});

const decimalFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

export function formatDateLabel(value) {
  if (!value) {
    return "Date pending";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Date pending";
  }

  return dateFormatter.format(date);
}

export function formatCompactCurrency(value) {
  return currencyFormatter.format(value || 0);
}

export function formatWeight(value) {
  return `${decimalFormatter.format(value || 0)} kg`;
}

export function formatWholeNumber(value) {
  return numberFormatter.format(value || 0);
}
