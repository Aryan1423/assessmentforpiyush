import styles from "./LivePreviewPanel.module.css";
import { formatCompactCurrency, formatWeight } from "@/utils/formatters";

function PreviewMetric({ label, value }) {
  return (
    <div className={styles.metricCard}>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
    </div>
  );
}

function StatusBadge({ label, active }) {
  return (
    <span
      className={`${styles.statusBadge} ${
        active ? styles.statusBadgeActive : styles.statusBadgeMuted
      }`}
    >
      {label}
    </span>
  );
}

export default function LivePreviewPanel({ summary }) {
  return (
    <aside className={styles.previewRail} aria-labelledby="preview-panel-title">
      <div className={styles.previewCard}>
        <div className={styles.previewHeader}>
          <div>
            <p className={styles.eyebrow}>Live preview</p>
            <h2 className={styles.title} id="preview-panel-title">
              Shipment summary
            </h2>
          </div>
          <span className={styles.deliveryBadge}>{summary.deliveryTypeLabel}</span>
        </div>

        <div className={styles.orderMeta}>
          <div>
            <span className={styles.metaLabel}>Order ID</span>
            <strong className={styles.metaValue}>{summary.orderId}</strong>
          </div>
          <div>
            <span className={styles.metaLabel}>Shipment date</span>
            <strong className={styles.metaValue}>{summary.shipmentDateLabel}</strong>
          </div>
        </div>

        <div className={styles.routeGrid}>
          <article className={styles.routeCard}>
            <p className={styles.routeLabel}>Sender</p>
            <p className={styles.routeCopy}>{summary.senderSummary}</p>
          </article>
          <article className={styles.routeCard}>
            <p className={styles.routeLabel}>Receiver</p>
            <p className={styles.routeCopy}>{summary.receiverSummary}</p>
          </article>
        </div>

        <div className={styles.metricGrid}>
          <PreviewMetric label="Packages" value={summary.packageCountLabel} />
          <PreviewMetric label="Total weight" value={summary.totalWeightLabel} />
          <PreviewMetric
            label="Declared value"
            value={summary.totalDeclaredValueLabel}
          />
        </div>

        <div className={styles.statusRow}>
          <StatusBadge label="Fragile" active={summary.fragile} />
          <StatusBadge label="Insured" active={summary.insured} />
        </div>

        <section className={styles.packageSection}>
          <div className={styles.packageHeader}>
            <h3 className={styles.packageTitle}>Package breakdown</h3>
            <p className={styles.packageSubtitle}>
              Operational detail for every shipment unit.
            </p>
          </div>

          <div className={styles.packageList}>
            {summary.packages.map((item) => (
              <article className={styles.packageCard} key={item.id}>
                <div className={styles.packageRow}>
                  <div>
                    <h4 className={styles.packageName}>{item.title}</h4>
                    <p className={styles.packageMeta}>
                      {formatWeight(item.weightValue)} · {item.lengthValue || 0} ×{" "}
                      {item.widthValue || 0} × {item.heightValue || 0} cm
                    </p>
                  </div>
                  <strong className={styles.packageValue}>
                    {formatCompactCurrency(item.declaredValue)}
                  </strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
