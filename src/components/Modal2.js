import React from "react";
import "./Modal2.css";

function Modal2({ set2OpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">
       <table className="ff">
        <tr>
        <td className = "modaltext">Available for Undelegation</td>
        <td className = "modalsubtext">315.72 KAN</td>
        </tr>
        <tr>
        <td className = "modaltext">Amount to Undelegate</td>
        <td>
    
        </td>
        </tr> 
        <tr>
            <td className = "modaltext">
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
              set2OpenModal(false);
            }}
            id="cancelBtn">
            BACK
          </button>
          <button id="Undelegate">UNDELEGATE</button>
          </div>
        </div>
      </div>
   
  );
}

export default Modal2;