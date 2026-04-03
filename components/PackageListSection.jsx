import PackageCard from "./PackageCard";
import styles from "./PackageListSection.module.css";

export default function PackageListSection({
  packages,
  onPackageFieldChange,
  onAddPackage,
  onRemovePackage
}) {
  return (
    <section className={styles.sectionCard}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.eyebrow}>Package information</p>
          <h3 className={styles.title}>Shipment items</h3>
        </div>
        <button className={styles.addButton} type="button" onClick={onAddPackage}>
          Add package
        </button>
      </div>

      <p className={styles.copy}>
        Every package stays independently editable, and at least one package is
        always required.
      </p>

      <div className={styles.packageStack}>
        {packages.map((item, index) => (
          <PackageCard
            key={item.id}
            index={index}
            packageItem={item}
            canRemove={packages.length > 1}
            onFieldChange={onPackageFieldChange}
            onRemove={onRemovePackage}
          />
        ))}
      </div>
    </section>
  );
}
