import React from "react";
import { getDatabase, ref, remove } from "firebase/database";
import { NavLink } from "react-router-dom";

function removeHandOffData(sessionKey) {
  const db = getDatabase();
  remove(ref(db, "handoff/" + sessionKey));
}

export const HandoffInit = ({
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
      <div style={{ fontWeight: "bold" }}>Handoff init - Let's do this!!!</div>
      <br />
      <div
        style={{ cursor: "pointer", paddingBottom: "2rem" }}
        onClick={() => handleClick(0)}
      >
        <NavLink to={`/handoff/${currentKey}`} target="_blank">
          <span>XXXX QR CODE XXXX</span>
          <br />
          <span>XXXX {currentKey} XXXX</span>
        </NavLink>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <label>Current State:</label>
        <br />
        <label>
          {currentHandoff.status || ""} - {currentHandoff.info || ""}
        </label>
      </div>
      <div>
        <button
          onClick={() => {
            removeHandOffData(currentKey);
            handleClick(0);
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};
