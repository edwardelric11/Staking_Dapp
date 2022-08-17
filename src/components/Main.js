import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Modal2 from "./Modal2";
import Modal3 from "./Modal3";
import Web3 from "web3-eth";

function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [kanyToken, setKanyToken] = useState(0);

  // getABI loads the ABI of the contract
  // This is an async function so we can wait for it to finish executing
  async function getABI() {
    // KanyToken.json should be placed inside the public folder so we can reach it
    let ABI = "";
    await fetch("./KanyToken.json", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // We have a Response, make sure its 200 or throw an error
        if (response.status == 200) {
          // This is actually also a promise so we need to chain it to grab data
          return response.json();
        } else {
          throw new Error("Error fetching ABI");
        }
      })
      .then((data) => {
        // We have the data now, set it using the state
        ABI = data.abi;
      })
      .catch((error) => {
        throw new Error(error);
      });

    return ABI;
  }
  // getContractAddress returns the address of the contract
  // hardcoded :)
  function getContractAddress() {
    return "0x88Ccbf092493F0ECc349cfB091623fA1d5017A39";
  }

  return (
    <div className="Table">
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      {modal2Open && <Modal2 set2OpenModal={setModal2Open} />}
      {modal3Open && <Modal3 set3OpenModal={setModal3Open} />}

      <table>
        <tr>
          <td className="th">Available</td>
          <td className="th">Total Staked</td>
          <td className="th">Total Unbonding</td>
          <td className="th">Reward Distribution</td>
          <td className="th">Pending Rewards</td>
        </tr>
        <tr>
          <td>0.05 KAN</td>
          <td>315.72 KAN</td>
          <td>0 KAN</td>
          <td>23H 36M 43S</td>
          <td>12.22 KAN</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <button
              className="Stake"
              type="button"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Stake
            </button>
          </td>
          <td>
            <button
              className="Unstake"
              type="button"
              onClick={() => {
                setModal2Open(true);
              }}
            >
              Unstake
            </button>
          </td>
          <td></td>
          <td></td>
          <td>
            <button
              className="Claim"
              type="button"
              onClick={() => {
                setModal3Open(true);
              }}
            >
              Claim Rewards
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Main;
