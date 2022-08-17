import React from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">
        <table className="ff">
        <tr>
        <td className = "modaltext">My Delegation</td>
        <td className = "modalsubtext">315.72 KAN</td>
        </tr>
        <tr>
        <td className = "modaltext">Available Balance</td>
        <td className = "modalsubtext">0.05 KAN</td>
        </tr>
        <tr>
        <td className = "modaltext">Amount to Delegate</td>
        </tr> 
        <tr>
            <td>
        <form className = "amount">
                <input className = "amt" type="text" placeholder="KAN" required/>
                <button className = "maxbtn"> MAX </button>
            </form>
            </td>
        </tr>
    
        </table>  
        </div>

        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
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

export default Modal;