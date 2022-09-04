import React, { useEffect, useMemo } from "react";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { NavLink, useParams } from "react-router-dom";

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

export const HandoffConnect = () => {
  const { id } = useParams();
  const db = getDatabase();
  const currentHandoffRef = ref(db, `handoff/${id}`);
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

  useEffect(() => {
    writeHandOffData(id, 2, "CONNECTED");
  }, []);

  const scanDocument = () => {
    writeHandOffData(id, 3, "SCAN DOCUMENT");
  };

  const scanFace = () => {
    writeHandOffData(id, 4, "SCAN FACE");
  };

  const completeVerify = () => {
    writeHandOffData(id, 5, "COMPLETE");
  };

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>
        Handoff CONNECT - Let's do this!!!
      </div>
      <br />
      <div style={{ marginBottom: "2rem" }}>
        <label>Current State:</label>
        <br />
        <label>
          {currentHandoff.status || ""} - {currentHandoff.info || ""}
        </label>
      </div>
      <div
        style={{ marginBottom: "2rem" }}
        hidden={currentHandoff?.status == "5"}
      >
        <button style={{ marginBottom: "1rem" }} onClick={() => scanDocument()}>
          SCAN DOCUMENT
        </button>
        <br />
        <button style={{ marginBottom: "1rem" }} onClick={() => scanFace()}>
          SCAN FACE
        </button>
        <br />
        <button
          style={{ marginBottom: "1rem" }}
          onClick={() => completeVerify()}
        >
          COMPLETE
        </button>
      </div>
      <div>
        {currentHandoff.status == "5" && (
          <button
            onClick={() => {
              window.close();
            }}
          >
            VALIDATION COMPLETE. PRESS TO CLOSE WINDOW
          </button>
        )}
        {currentHandoff.status != "5" && (
          <button
            onClick={() => {
              removeHandOffData(id);
            }}
          >
            <NavLink to={"/"}>CANCEL</NavLink>
          </button>
        )}
      </div>
    </div>
  );
};
