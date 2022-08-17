import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3 from "web3-eth";

function Header() {
  // Adding our Kanytoken state and a set function to assign it
  const [kanyToken, setKanyToken] = useState(0);
  const [accounts, setAccounts] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [accountBalance, setAccountBalance] = useState(0);
  const [accountStakes, setAccountStakes] = useState([]);
  // this will trigger whenever the App function is called, which index.js runs at startup
  useEffect(() => {
    // Here we check if there is web3 support
    if (typeof web3 !== "undefined") {
      window.web3 = new Web3(window.web3.currentProvider);
      // Check if its MetaMask that is installed
      if (window.web3.currentProvider.isMetaMask === true) {
        connectMetaMask();
        connectToSelectedNetwork();
      } else {
        // Another web3 provider, add support if you want
      }
    } else {
      // The browser has no web3
      // Suggest the user to install a web3 compatible browser plugin
      throw new Error(
        "No web3 support, redirect user to a download page or something :) "
      );
    }
  }, []);

  useEffect(() => {
    // Only get profile if we are completly loaded
    if (loaded && accounts !== 0) {
      // get user info
      getUserProfile();
      // Subscribe to Stake events
      // Options allows us to specify filters so we dont grab all events, in this case we only select our current account in metamask
      let options = {
        filter: {
          address: [accounts[0]],
        },
      };
      // Our contract has a field called events which has all Available events.
      kanyToken.events
        .Staked(options)
        // data is when
        .on("data", (event) => console.log("Data: ", event))
        .on("changed", (changed) => console.log("Changed: ", changed))
        .on("error", (err) => console.log("Err: ", err))
        .on("connected", (str) => console.log("Conntected: ", str));
    } else {
      setTimeout(setLoaded(true), 500);
    }
    // This here subscribes to changes on the loaded state
  }, [loaded, accounts, kanyToken]);

  // connectMetaMask is used to connect to MetaMask and ask permission to grab account information
  function connectMetaMask() {
    // We need to make the connection to MetaMask work.
    // Send Request for accounts and to connect to metamask.
    window.web3
      .requestAccounts()
      .then((result) => {
        // Whenever the user accepts this will trigger
        console.log("Accounts: ", accounts);
        setAccounts(result);
      })
      .catch((error) => {
        // Handle errors, such as when a user does not accept
        throw new Error(error);
      });
  }

  // getABI loads the ABI of the contract
  // This is an async function so we can wait for it to finish executing
  async function getABI() {
    // KanyToken.json should be placed inside the public folder so we can reach it
    let ABI = "";
    await fetch("./kk.json", {
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
    return "0x43E68B3677d0A26B58A56C0A3351a2833027BE5C";
  }

  async function connectToSelectedNetwork() {
    // This will connect to the selected network inside MetaMask
    const web3 = new Web3(Web3.givenProvider);
    // Set the ABI of the Built contract so we can interact with it
    const abi = await getABI();
    const address = getContractAddress();

    if (address === undefined) {
      address = getContractAddress();
    }
    // Make a new instance of the contract by giving the address and abi
    const kanytoken = await new web3.Contract(abi, address);
    // Set the state of the app by passing the contract so we can reach it from other places
    setKanyToken(kanytoken);
    setLoaded(true);
  }

  // getUserProfile will fetch account information from the block chain network
  async function getUserProfile() {
    // Let's grab the tokens total supply, the method is named the same as in the Solidity code, and add call() to execute it.
    call(kanyToken.methods.totalSupply, setTotalSupply);
    // balanceOf Requires input argument of the account to grab, so let's grab the first available account for now
    call(kanyToken.methods.balanceOf, setAccountBalance, accounts[0]);
    call(kanyToken.methods.hasStake, setAccountStakes, accounts[0]);
  }

  // call takes in a function to execute and runs a given callback on the response
  function call(func, callback, ...args) {
    // Trigger the function with the arguments
    func(...args)
      .call()
      .then((result) => {
        // Apply given callback, this is our stateSetters
        callback(result);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // unstake
  function unstake() {
    kanyToken.methods
      .withdrawStake(10, accounts[0])
      .estimateGas({ from: accounts[0] })
      .then((gas) => {
        // We now have the gas amount, we can now send the transactions
        kanyToken.methods.withdrawStake(10, accounts[0]).send({
          from: accounts[0],
          gas: gas,
        });
        setAccountBalance(accountBalance + 10);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // stake will trigger a stake on the users behalf
  function stake() {
    // When we trigger Transactions we should use send instead of call
    // We should also calculate the GAS cost so we can apply the correct amount of gas
    kanyToken.methods
      .stake(10)
      .estimateGas({ from: accounts[0] })
      .then((gas) => {
        // We now have the gas amount, we can now send the transactions
        kanyToken.methods.stake(10).send({
          from: accounts[0],
          gas: gas,
        });
        // Update of account by changing stake, Trigger a reload when transaction is done later
        setAccountBalance(accountBalance - 10);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  return (
    <div className="header">
      <header className="header">
        <p>The total supply is {totalSupply}</p>
        <p>Account balance: {accountBalance} </p>
        <p>Account: {accounts[0]}</p>
        <button onClick={stake}>
          <p>Stake</p>
        </button>
        <button onClick={unstake}>
          <p>Unstake</p>
        </button>
      </header>
    </div>
  );
}

export default Header;
