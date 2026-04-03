import styles from "./PackageCard.module.css";

const PACKAGE_FIELDS = [
  { key: "label", label: "Package label", type: "text", placeholder: "Carton / Pallet / Case" },
  {
    key: "weightKg",
    label: "Weight (kg)",
    type: "number",
    min: "0",
    step: "0.1",
    inputMode: "decimal"
  },
  {
    key: "lengthCm",
    label: "Length (cm)",
    type: "number",
    min: "0",
    step: "0.1",
    inputMode: "decimal"
  },
  {
    key: "widthCm",
    label: "Width (cm)",
    type: "number",
    min: "0",
    step: "0.1",
    inputMode: "decimal"
  },
  {
    key: "heightCm",
    label: "Height (cm)",
    type: "number",
    min: "0",
    step: "0.1",
    inputMode: "decimal"
  },
  {
    key: "declaredValueInr",
    label: "Declared value (₹)",
    type: "number",
    min: "0",
    step: "1",
    inputMode: "numeric"
  }
];

export default function PackageCard({
  index,
  packageItem,
  canRemove,
  onFieldChange,
  onRemove
}) {
  const packageNumber = index + 1;

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardEyebrow}>Package {packageNumber}</p>
          <h4 className={styles.cardTitle}>
            {packageItem.label || `Shipment unit ${packageNumber}`}
          </h4>
        </div>
        <button
          className={styles.removeButton}
          type="button"
          disabled={!canRemove}
          onClick={() => onRemove(packageItem.id)}
        >
          Remove
        </button>
      </div>

      <div className={styles.grid}>
        {PACKAGE_FIELDS.map((field) => {
          const inputId = `${packageItem.id}-${field.key}`;

          return (
            <label
              className={`${styles.field} ${
                field.key === "label" ? styles.fieldWide : ""
              }`}
              htmlFor={inputId}
              key={field.key}
            >
              <span className={styles.label}>{field.label}</span>
              <input
                id={inputId}
                className={styles.input}
                type={field.type}
                min={field.min}
                step={field.step}
                inputMode={field.inputMode}
                placeholder={field.placeholder}
                value={packageItem[field.key]}
                onChange={(event) =>
                  onFieldChange(packageItem.id, field.key, event.target.value)
                }
              />
            </label>
          );
        })}
      </div>
    </article>
  );
}
