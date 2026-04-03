"use client";

import { useMemo, useReducer } from "react";
import ShipmentDetailsSection from "./ShipmentDetailsSection";
import PartyDetailsSection from "./PartyDetailsSection";
import PackageListSection from "./PackageListSection";
import OptionsSection from "./OptionsSection";
import LivePreviewPanel from "./LivePreviewPanel";
import styles from "./LogisticsOrderApp.module.css";
import {
  ACTIONS,
  createInitialOrderState,
  orderReducer
} from "@/utils/orderState";
import { getOrderSummary } from "@/utils/orderSelectors";

export default function LogisticsOrderApp({
  initialOrderId,
  initialShipmentDate
}) {
  const [orderState, dispatch] = useReducer(
    orderReducer,
    {
      orderId: initialOrderId,
      shipmentDate: initialShipmentDate
    },
    createInitialOrderState
  );

  const summary = useMemo(() => getOrderSummary(orderState), [orderState]);

  const handleShipmentFieldChange = (field, value) => {
    dispatch({
      type: ACTIONS.UPDATE_SHIPMENT_FIELD,
      field,
      value
    });
  };

  const handlePartyFieldChange = (party, field, value) => {
    dispatch({
      type: ACTIONS.UPDATE_PARTY_FIELD,
      party,
      field,
      value
    });
  };

  const handlePackageFieldChange = (packageId, field, value) => {
    dispatch({
      type: ACTIONS.UPDATE_PACKAGE_FIELD,
      packageId,
      field,
      value
    });
  };

  const handleAddPackage = () => {
    dispatch({ type: ACTIONS.ADD_PACKAGE });
  };

  const handleRemovePackage = (packageId) => {
    dispatch({
      type: ACTIONS.REMOVE_PACKAGE,
      packageId
    });
  };

  const handleOptionToggle = (field) => {
    dispatch({
      type: ACTIONS.TOGGLE_OPTION,
      field
    });
  };

  return (
    <section className={styles.appShell} aria-label="Logistics order workspace">
      <div className={styles.layout}>
        <section className={styles.formPanel} aria-labelledby="form-panel-title">
          <div className={styles.panelHeader}>
            <p className={styles.kicker}>Order composer</p>
            <h2 className={styles.panelTitle} id="form-panel-title">
              Build the shipment
            </h2>
            <p className={styles.panelCopy}>
              Complete the form and watch the shipping summary update instantly.
            </p>
          </div>

          <div className={styles.formSections}>
            <ShipmentDetailsSection
              orderId={orderState.orderId}
              shipmentDate={orderState.shipmentDate}
              deliveryType={orderState.deliveryType}
              onShipmentFieldChange={handleShipmentFieldChange}
            />

            <PartyDetailsSection
              title="Consignor"
              subtitle="Sender details"
              prefix="sender"
              values={orderState.consignor}
              onFieldChange={(field, value) =>
                handlePartyFieldChange("consignor", field, value)
              }
            />

            <PartyDetailsSection
              title="Consignee"
              subtitle="Receiver details"
              prefix="receiver"
              values={orderState.consignee}
              onFieldChange={(field, value) =>
                handlePartyFieldChange("consignee", field, value)
              }
            />

            <PackageListSection
              packages={orderState.packages}
              onPackageFieldChange={handlePackageFieldChange}
              onAddPackage={handleAddPackage}
              onRemovePackage={handleRemovePackage}
            />

            <OptionsSection
              options={orderState.options}
              onToggle={handleOptionToggle}
            />
          </div>
        </section>

        <LivePreviewPanel orderState={orderState} summary={summary} />
      </div>
    </section>
  );
}
