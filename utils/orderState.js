export const ACTIONS = {
  UPDATE_SHIPMENT_FIELD: "updateShipmentField",
  UPDATE_PARTY_FIELD: "updatePartyField",
  UPDATE_PACKAGE_FIELD: "updatePackageField",
  ADD_PACKAGE: "addPackage",
  REMOVE_PACKAGE: "removePackage",
  TOGGLE_OPTION: "toggleOption"
};

export const DELIVERY_OPTIONS = [
  { value: "standard", label: "Standard" },
  { value: "express", label: "Express" }
];

const NUMERIC_PACKAGE_FIELDS = new Set([
  "weightKg",
  "lengthCm",
  "widthCm",
  "heightCm",
  "declaredValueInr"
]);

function createUniqueId(prefix) {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return `${prefix}-${globalThis.crypto.randomUUID().slice(0, 8)}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createOrderId(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const serial = `${Math.floor(Math.random() * 9000) + 1000}`;

  return `ORD-${year}${month}${day}-${serial}`;
}

export function getCurrentDateValue(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function createEmptyPackage() {
  return {
    id: createUniqueId("pkg"),
    label: "",
    weightKg: "",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
    declaredValueInr: ""
  };
}

export function createInitialOrderState({ orderId, shipmentDate }) {
  return {
    orderId,
    shipmentDate,
    deliveryType: "standard",
    consignor: {
      name: "",
      address: "",
      city: "",
      pincode: ""
    },
    consignee: {
      name: "",
      address: "",
      city: "",
      pincode: ""
    },
    packages: [createEmptyPackage()],
    options: {
      fragile: false,
      insured: false
    }
  };
}

export function shouldAcceptNumericInput(value) {
  return value === "" || (!Number.isNaN(Number(value)) && Number(value) >= 0);
}

export function orderReducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_SHIPMENT_FIELD:
      return {
        ...state,
        [action.field]: action.value
      };
    case ACTIONS.UPDATE_PARTY_FIELD:
      return {
        ...state,
        [action.party]: {
          ...state[action.party],
          [action.field]: action.value
        }
      };
    case ACTIONS.UPDATE_PACKAGE_FIELD:
      return {
        ...state,
        packages: state.packages.map((item) => {
          if (item.id !== action.packageId) {
            return item;
          }

          if (
            NUMERIC_PACKAGE_FIELDS.has(action.field) &&
            !shouldAcceptNumericInput(action.value)
          ) {
            return item;
          }

          return {
            ...item,
            [action.field]: action.value
          };
        })
      };
    case ACTIONS.ADD_PACKAGE:
      return {
        ...state,
        packages: [...state.packages, createEmptyPackage()]
      };
    case ACTIONS.REMOVE_PACKAGE:
      if (state.packages.length === 1) {
        return state;
      }

      return {
        ...state,
        packages: state.packages.filter((item) => item.id !== action.packageId)
      };
    case ACTIONS.TOGGLE_OPTION:
      return {
        ...state,
        options: {
          ...state.options,
          [action.field]: !state.options[action.field]
        }
      };
    default:
      return state;
  }
}
