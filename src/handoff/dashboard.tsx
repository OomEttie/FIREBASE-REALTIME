import React from "react";
import { getDatabase, ref, set, remove } from "firebase/database";

function writeHandOffData(sessionKey, status, info) {
  const db = getDatabase();
  set(ref(db, "handoff/" + sessionKey), {
    status,
    info,
  });
}

function removeHandOffData(sessionKey) {
  const db = getDatabase();
  remove(ref(db, "handoff/" + sessionKey));
}

export const Dashboard = ({
  handleClick,
  currentKey,
  currentHandoff,
}: {
  handleClick: any;
  currentKey: any;
  currentHandoff: any;
}) => {
  return (
    <div>
      {currentHandoff?.status !== 5 && (
        <button
          style={{ marginBottom: "2rem", fontWeight: "bold" }}
          onClick={() => {
            if (
              currentHandoff?.status == "" ||
              currentHandoff?.status == "0" ||
              currentHandoff?.status == "1"
            ) {
              writeHandOffData(currentKey, "1", "init");
              handleClick(1);
            } else {
              removeHandOffData(currentKey);
              handleClick(0);
            }
          }}
        >
          {currentHandoff?.status == "" ||
          currentHandoff?.status == "0" ||
          currentHandoff?.status == "1"
            ? `Let's continue to the Handover!!!`
            : "CANCEL"}
        </button>
      )}
      <div style={{ marginBottom: "2rem" }}>
        <label>Current State:</label>
        <br />
        <label>
          {currentHandoff?.status || ""} - {currentHandoff?.info || ""}
        </label>
      </div>
      {currentHandoff.status == "5" && (
        <button
          style={{ marginBottom: "2rem", fontWeight: "bold" }}
          onClick={() => {
            removeHandOffData(currentKey);
          }}
        >
          CONTINUE
        </button>
      )}
    </div>
  );
};
