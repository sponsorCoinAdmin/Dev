const { ethers } = require ("ethers");

async function toggleConnection(btnType) {
  var btn = document.getElementById(btnType);
  var btnName = btn.innerText;
  if (btnName == "Connect")
     connect(btn);
}

async function connect(btn) {
try {
    if (typeof window.ethereum !== undefined) {
      // alert ("Connecting")
      // Request account access if needed
      await ethereum.request({method: "eth_requestAccounts"});
      setButton(btn, "lightgreen", "Connected");
       // alert("Accounts now exposed, use them");
      // ethereum.send('eth_sendTransaction', { from: accounts[0], /* ... */ })
  }
  else {
     alert("window.ethereum EXISTS");
     alert("Metamask must be installed in your browser")
  }
} catch (error) {
    alert("error = "+error);
}
}

async function execute(btn) {

// Require
// Address
// contract ABI (contract ABI to interact with a contract)
// function
// node connection (metamask)
try {
    if (typeof window.ethereum !== undefined) {
      // alert ("Connecting")
      // Request account access if needed
      await ethereum.request({method: "eth_requestAccounts"});
      setButton(btn, "lightgreen", "Connected");
       // alert("Accounts now exposed, use them");
      // ethereum.send('eth_sendTransaction', { from: accounts[0], /* ... */ })
  }
  else {
     alert("window.ethereum EXISTS");
     alert("Metamask must be installed in your browser")
  }
} catch (error) {
    alert("error = "+error);
}
}

function setButton(btn, color, txt) {
    btn.style.backgroundColor = color;
    btn.innerText = txt;
}

modules.export = {
    connect,
    export
  }