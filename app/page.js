import LogisticsOrderApp from "@/components/LogisticsOrderApp";
import styles from "./page.module.css";
import { createOrderId, getCurrentDateValue } from "@/utils/orderState";

export default function Page() {
  const initialOrderId = createOrderId();
  const initialShipmentDate = getCurrentDateValue();

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>Design-Focused Frontend Assignment</p>
        <h1 className={styles.title}>Logistics order form with live shipment preview</h1>
        <p className={styles.intro}>
          A responsive, design-first workflow for composing a shipment and
          reviewing its operational summary in real time.
        </p>
        <LogisticsOrderApp
          initialOrderId={initialOrderId}
          initialShipmentDate={initialShipmentDate}
        />
      </div>
    </main>
  );
}
