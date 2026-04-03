import styles from "./OptionsSection.module.css";

const OPTION_ITEMS = [
  {
    key: "fragile",
    title: "Fragile handling",
    copy: "Mark the shipment for extra handling in transit."
  },
  {
    key: "insured",
    title: "Insurance required",
    copy: "Flag the order for declared value protection."
  }
];

export default function OptionsSection({ options, onToggle }) {
  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Additional options</p>
        <h3 className={styles.title}>Protection and care</h3>
      </div>

      <div className={styles.optionStack}>
        {OPTION_ITEMS.map((item) => (
          <label className={styles.optionRow} key={item.key}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={options[item.key]}
              onChange={() => onToggle(item.key)}
            />
            <span className={styles.checkboxVisual} aria-hidden="true" />
            <span className={styles.optionCopy}>
              <span className={styles.optionTitle}>{item.title}</span>
              <span className={styles.optionDescription}>{item.copy}</span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
