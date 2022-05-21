const { isAddress } = require("ethers/lib/utils");

//const defaultContractAddress = "0x925195d664A8CAdA8Ff90a8948e394B9bd15237B";
const defaultContractAddress = "0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A";
var provider;
var signer;
var contractAddress = defaultContractAddress;
var accountAddress;
var contract;

// 1. Connect Metamask with Dapp
async function connectMetaMaskWallet() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    document.getElementById("connectMetaMaskWallet_TX").value =
      "Provider With Signer Connected";
    changeElementIdColor("connectMetaMaskWallet_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("connectMetaMaskWallet_BTN", "red");
    alert(err.message);
  }
}

// 2. Connect Metamask Account
async function getActiveMetaMaskAccount() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    accountAddress = await signer.getAddress();
    document.getElementById("activeMetaMaskAccount_TX").value = accountAddress;
    console.log("Account address s:", accountAddress);
    changeElementIdColor("activeMetaMaskAccount_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("activeMetaMaskAccount_BTN", "red");
    alert(err.message);
  }
}

// 3. Get Ethereum balance
async function getEthereumAccountBalance() {
  try {
    const balance = await signer.getBalance();
    const convertToEth = 1e18;
    const ethbalance = balance.toString() / convertToEth;
    document.getElementById("ethereumAccountBalance_TX").value = ethbalance;
    console.log(
      "account's balance in ether:",
      balance.toString() / convertToEth
    );
    changeElementIdColor("ethereumAccountBalance_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("ethereumAccountBalance_BTN", "red");
    alert(err.message);
  }
}

// 4. Connect contract
async function connectContract() {
  try {
    contractContainer = document.getElementById("contractData_TX");
    contractText = document.getElementById("connectContract_TX");
    contractAddress = contractText.value;

    contract = new ethers.Contract(contractAddress, spCoinABI, signer);
    // do a test call to see if contract is valid.
    tokenName = await contract.name();
    changeElementIdColor("connectContract_BTN", "green");
  } catch (err) {
    contractConnectError =
      "Cannot Connect to Address" + contractAddress + "\n" + err.message;
    console.log(contractConnectError);
    changeElementIdColor("connectContract_BTN", "red");
    alert(contractConnectError);
  }
}

// 5. Read contract data from the contract on the connected account
/*
async function readContractData() {
  try {
    tokenName = await contract.name();
    document.getElementById("contractName_TX").value = tokenName;
    symbol = await contract.symbol();
    document.getElementById("contractSymbol_TX").value = symbol;

    // decimals = await contract.decimals()
    // alert("spCoinDecimals = "+decimals);
    spCoinTotalSupply = await contract.totalSupply();
    document.getElementById("contractTotalSupply_TX").value = spCoinTotalSupply;
    changeElementIdColor("contractData_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("contractData_BTN", "red");
    alert(err.message);
  }
}
*/

async function readContractName() {
  try {
    tokenName = await contract.name();
    document.getElementById("contractName_TX").value = tokenName;
    changeElementIdColor("contractName_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("contractName_BTN", "red");
    alert(err.message);
  }
}

async function readContractSymbol() {
  try {
    symbol = await contract.symbol();
    document.getElementById("contractSymbol_TX").value = symbol;
    changeElementIdColor("contractSymbol_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("contractSymbol_BTN", "red");
    alert(err.message);
  }
}

async function readContractTotalSupply() {
  try {
    spCoinTotalSupply = await contract.totalSupply();
    document.getElementById("contractTotalSupply_TX").value = spCoinTotalSupply;
    changeElementIdColor("contractTotalSupply_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("contractTotalSupply_BTN", "red");
    alert(err.message);
  }
}

async function readContractDecimals() {
  try {
    decimals = await contract.decimals();
    document.getElementById("contractDecimals_TX").value = decimals;
    changeElementIdColor("contractDecimals_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("contractDecimals_BTN", "red");
    alert(err.message);
  }
}

async function balanceOf() {
  try {
    balance = await contract.balanceOf(accountAddress);
    document.getElementById("balanceOf_TX").value = balance;
    console.log("balanceOf " + accountAddress + " = " + balance);
    changeElementIdColor("balanceOf_BTN", "green");
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("balanceOf_BTN", "red");
    alert(err.message);
  }
}

async function sendToAccount() {
  try {
    const spCoinContract = new ethers.Contract(
      contractAddress,
      spCoinABI,
      provider
    );
    sendToAccountAddr = document.getElementById("sendToAccountAddr_TX");
    addr = document.getElementById("sendToAccountAddr_TX").value;
    if (!addr && addr.length == 0) {
      console.log("Address is empty");
      sendToAccountAddr.value = "Address is empty";
      changeElementIdColor("sendToAccountAddr_TX", "red");
      changeElementIdColor("sendToAccount_BTN", "red");
    } else {
      if (!ethers.utils.isAddress(addr)) {
        alert("Address %s is not valid", addr);
        changeElementIdColor("sendToAccountAddr_TX", "red");
        changeElementIdColor("sendToAccount_BTN", "red");
      } else {
        spCoinContract.connect(signer).transfer(addr, "500000000");
        changeElementIdColor("sendToAccount_BTN", "green");
      }
    }
  } catch (err) {
    console.log(err.message);
    changeElementIdColor("sendToAccount_BTN", "red");
    alert(err.message);
  }
}

function changeElementIdColor(name, color) {
  //	alert("EXECUTING changeElementIdColor ("+name + " , " + color);
  document.getElementById(name).style.backgroundColor = color;
}

async function clearFields() {
  window.location.document.getElementById("connectMetaMaskWallet_TX").value = "";
  document.getElementById("activeMetaMaskAccount_TX").value = "";
  document.getElementById("ethereumAccountBalance_TX").value = "";
  document.getElementById("contractData_TX").value = "";
  document.getElementById("connectContract_TX").value = "";
  document.getElementById("contractName_TX").value = "";
  document.getElementById("contractSymbol_TX").value = "";
  document.getElementById("contractTotalSupply_TX").value = "";
  document.getElementById("balanceOf_TX").value = "";
}

function toggle() {
	myDiv = document.getElementById("myDIV");
	if (myDiv.style.display === "none") {
		myDiv.style.display = "block";
		div.style.display = "block";
	} else {
		myDiv.style.display = "none";
		div.style.display = "none";
	}
  }