import React from "react";
import "./Modal3.css";

function Modal3({ set3OpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {
              set3OpenModal(false);
            }}>
            X
          </button>
        </div>
        <div className="title">
         
        </div>
        <div className="body">
        <h6 className="modaltext" 
      >ResfsgsgsgasgghsgKAN</h6>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              set3OpenModal(false);
            }}
            id="cancelBtn">
            Back
          </button>
          <button>Delegate</button>
        </div>
      </div>
    </div>
  );
}

export default Modal3;