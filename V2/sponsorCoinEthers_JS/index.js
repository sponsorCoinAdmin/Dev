const { isAddress } = require("ethers/lib/utils");

//const defaultContractAddress = "0x925195d664A8CAdA8Ff90a8948e394B9bd15237B";
const defaultContractAddress = "0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A";
var defaultWallet="METAMASK";
var wallet;
var provider;
var signer;
var contractAddress = defaultContractAddress;
var accountAddress;
var contract;


function connectMetaMask() {
	try {
	  // MetaMask requires requesting permission to connect users accounts
	  provider = new ethers.providers.Web3Provider(window.ethereum);
	  document.getElementById("connectWallet_TX").value =
      "Connected to MetaMask";
	} catch (err) {
	  alertLogError(err,"connectWallet_BTN");
	  throw err;
	}
	return provider;
  }

  function getWallet() {
	try {
		if (wallet == null) {
	        wallet = defaultWallet;
		}
	} catch (err) {
	    alert(err.message);
	    throw err;
	}
	return wallet;
}

function getWalletProvider(_wallet) {
	try {
		switch(_wallet) {
			case "METAMASK":
				provider = connectMetaMask();
				break;
			default:
				provider = connectMetaMask();
				break;
		} 
	} catch (err) {
	    alert(err.message);
	    throw err;
	}
	return provider;
}

function getProvider() {
	try {
		if (provider == null) {
	        provider = getWalletProvider(getWallet());
			changeElementIdColor("connectWallet_BTN", "green");
		}
	} catch (err) {
	    alert(err.message);
	    throw err;
	}
	return provider;
}

function isEmptyObj(object) {
	isEmpty =  JSON.stringify(object) === '{}';
	return isEmpty;
  }

function getSigner() {
	try {
		if (signer == null) {
			signer = getProvider().getSigner();
		}
	} catch (err) {
	    alert(err.message);
	    throw err;
	}
	return signer;
}

// 1. Connect Metamask with Dapp
async function connectWallet() {
  try {
    // MetaMask requires requesting permission to connect users accounts
	alert("connectWallet");
	var wallet = document.getElementById("connectWallet_TX").value;
	provider = getWalletProvider(wallet);

	/*
    await getProvider().send("eth_requestAccounts", []);
    signer = await getSigner();
    
 	*/
	 changeElementIdColor("connectWallet_BTN", "green");
	 } catch (err) {
	   alertLogError(err,"connectWallet_BTN");
     }
}

// 2. Connect Metamask Account
async function getActiveMetaMaskAccount() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    accountAddress = await getSigner().getAddress();
    document.getElementById("activeMetaMaskAccount_TX").value = accountAddress;
    console.log("Account address s:", accountAddress);
    changeElementIdColor("activeMetaMaskAccount_BTN", "green");
  } catch (err) {
	alertLogError(err,"activeMetaMaskAccount_BTN");
  }
}

// 3. Get Ethereum balance
async function getEthereumAccountBalance() {
  try {
    const balance = await getSigner().getBalance();
    const convertToEth = 1e18;
    const ethbalance = balance.toString() / convertToEth;
    document.getElementById("ethereumAccountBalance_TX").value = ethbalance;
    console.log(
      "account's balance in ether:",
      balance.toString() / convertToEth
    );
    changeElementIdColor("ethereumAccountBalance_BTN", "green");
  } catch (err) {
	alertLogError(err,"ethereumAccountBalance_BTN");
  }
}

// 4. Connect contract
async function connectContract() {
  try {
    contractText = document.getElementById("connectContract_TX");
	if (isEmptyObj(contractText)){
		throw "Contract Address Empty";
	}
    contractAddress = contractText.value;

    contract = new ethers.Contract(contractAddress, spCoinABI, getSigner());
    // do a test call to see if contract is valid.
    tokenName = await contract.name();
    changeElementIdColor("connectContract_BTN", "green");
  } catch (err) {
   console.log(contractConnectError);
    alertLogError(err,"connectContract_BTN");
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
        alertLogError(err,"contractData_BTN");
  }
}
*/

async function readContractName() {
  try {
    tokenName = await contract.name();
    document.getElementById("contractName_TX").value = tokenName;
    changeElementIdColor("contractName_BTN", "green");
  } catch (err) {
	alertLogError(err,"contractName_BTN");
  }
}

async function readContractSymbol() {
  try {
    symbol = await contract.symbol();
    document.getElementById("contractSymbol_TX").value = symbol;
    changeElementIdColor("contractSymbol_BTN", "green");
  } catch (err) {
	alertLogError(err,"contractSymbol_BTN");
  }
}

async function readContractTotalSupply() {
  try {
    spCoinTotalSupply = await contract.totalSupply();
    document.getElementById("contractTotalSupply_TX").value = spCoinTotalSupply;
    changeElementIdColor("contractTotalSupply_BTN", "green");
  } catch (err) {
	alertLogError(err,"contractTotalSupply_BTN");
  }
}

async function readContractDecimals() {
  try {
    decimals = await contract.decimals();
    document.getElementById("contractDecimals_TX").value = decimals;
    changeElementIdColor("contractDecimals_BTN", "green");
  } catch (err) {
	alertLogError(err,"contractDecimals_BTN");
  }
}

async function balanceOf() {
  try {
    balance = await contract.balanceOf(accountAddress);
    document.getElementById("balanceOf_TX").value = balance;
    console.log("balanceOf " + accountAddress + " = " + balance);
    changeElementIdColor("balanceOf_BTN", "green");
  } catch (err) {
	alertLogError(err,"balanceOf_BTN");
  }
}

async function sendToAccount() {
  try {
    const spCoinContract = new ethers.Contract(
      contractAddress,
      spCoinABI,
      getProvider()
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
    alertLogError(err,"sendToAccount_BTN");
  }
}

function alertLogError(err, element) {
    console.log(err.message);
    changeElementIdColor(element, "red");
    alert(err.message);
}

function changeElementIdColor(name, color) {
  document.getElementById(name).style.backgroundColor = color;
}

async function clearFields() {
//  window.location.document.getElementById("connectWallet_TX").value = "";
  document.getElementById("activeMetaMaskAccount_TX").value = "";
  document.getElementById("ethereumAccountBalance_TX").value = "";
  document.getElementById("contractData_TX").value = "";
  document.getElementById("connectContract_TX").value = "";
  document.getElementById("contractName_TX").value = "";
  document.getElementById("contractSymbol_TX").value = "";
  document.getElementById("contractTotalSupply_TX").value = "";
  document.getElementById("balanceOf_TX").value = "";
}

function toggle(elmt) {
	myDiv = document.getElementById(elmt);
	if (myDiv.style.display === "none") {
		myDiv.style.display = "block";
		div.style.display = "block";
	} else {
		myDiv.style.display = "none";
		div.style.display = "none";
	}
  }