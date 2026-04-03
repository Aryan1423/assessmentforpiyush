import styles from "./PartyDetailsSection.module.css";

const PARTY_FIELDS = [
  { key: "name", label: "Name", type: "text", autoComplete: "name" },
  {
    key: "address",
    label: "Address",
    type: "text",
    autoComplete: "street-address"
  },
  { key: "city", label: "City", type: "text", autoComplete: "address-level2" },
  {
    key: "pincode",
    label: "Pincode",
    type: "text",
    autoComplete: "postal-code",
    inputMode: "numeric"
  }
];

export default function PartyDetailsSection({
  title,
  subtitle,
  prefix,
  values,
  onFieldChange
}) {
  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.grid}>
        {PARTY_FIELDS.map((field) => {
          const inputId = `${prefix}-${field.key}`;

          return (
            <label
              className={`${styles.field} ${
                field.key === "address" ? styles.fieldWide : ""
              }`}
              htmlFor={inputId}
              key={field.key}
            >
              <span className={styles.label}>{field.label}</span>
              <input
                id={inputId}
                className={styles.input}
                type={field.type}
                autoComplete={field.autoComplete}
                inputMode={field.inputMode}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={values[field.key]}
                onChange={(event) =>
                  onFieldChange(field.key, event.target.value)
                }
              />
            </label>
          );
        })}
      </div>
    </section>
  );
}
