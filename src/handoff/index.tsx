import React, { useEffect, useMemo, useState } from "react";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { Dashboard } from "./dashboard";
import { HandoffInit } from "./handoffInit";

export default () => {
  const db = getDatabase();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentKey, setCurrentKey] = useState("test001");
  const currentHandoffRef = ref(db, `handoff/${currentKey}`);
  const [currentHandoff, setCurrentHandoff] = React.useState<{
    status: string;
    info: string;
  }>({
    status: "",
    info: "",
  });

  useMemo(
    () =>
      onValue(currentHandoffRef, (snapshot) => {
        const result = snapshot.val();
        setCurrentHandoff({
          ...currentHandoff,
          status: result?.status || "",
          info: result?.info || "",
        });
      }),
    [setCurrentHandoff]
  );

  return (
    <div>
      <div style={{ paddingBottom: "2rem" }}>
        <label>Session Key: </label>
        <input
          disabled={currentStep !== 0}
          type="text"
          placeholder="sessionKey"
          value={currentKey}
          onChange={(e) => setCurrentKey(e.target.value)}
        />
      </div>
      <div>
        {currentStep == 0 && (
          <Dashboard
            handleClick={setCurrentStep}
            currentKey={currentKey}
            currentHandoff={currentHandoff}
          />
        )}
        {currentStep == 1 && (
          <HandoffInit
            handleClick={setCurrentStep}
            currentKey={currentKey}
            currentHandoff={currentHandoff}
          />
        )}
      </div>
    </div>
  );
};

// status definitions
// 0 - start / dashboard / initial register
// 1 - init / Generate QR code /
// 2 - connected / handoff accepted
// 3 - scan document
// 4 - scan face
// 5 - completed
