import styles from "./ShipmentDetailsSection.module.css";
import { DELIVERY_OPTIONS } from "@/utils/orderState";

export default function ShipmentDetailsSection({
  orderId,
  shipmentDate,
  deliveryType,
  onShipmentFieldChange
}) {
  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Shipment details</p>
        <h3 className={styles.title}>Core transport information</h3>
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>Order ID</span>
          <input
            className={styles.input}
            type="text"
            value={orderId}
            readOnly
            aria-readonly="true"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Shipment date</span>
          <input
            className={styles.input}
            type="date"
            value={shipmentDate}
            onChange={(event) =>
              onShipmentFieldChange("shipmentDate", event.target.value)
            }
          />
        </label>
      </div>

      <fieldset className={styles.deliveryGroup}>
        <legend className={styles.label}>Delivery type</legend>
        <div className={styles.deliveryOptions}>
          {DELIVERY_OPTIONS.map((option) => {
            const inputId = `delivery-${option.value}`;

            return (
              <label
                key={option.value}
                className={`${styles.deliveryOption} ${
                  deliveryType === option.value ? styles.deliveryOptionActive : ""
                }`}
                htmlFor={inputId}
              >
                <input
                  id={inputId}
                  className={styles.radio}
                  type="radio"
                  name="deliveryType"
                  checked={deliveryType === option.value}
                  onChange={() =>
                    onShipmentFieldChange("deliveryType", option.value)
                  }
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
