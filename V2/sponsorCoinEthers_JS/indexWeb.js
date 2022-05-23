function WEB_connectMetaMask() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    provider = new ethers.providers.Web3Provider(window.ethereum);
    document.getElementById("connectWallet_TX").value = "Connected to MetaMask";
  } catch (err) {
    throw err;
  }
  return provider;
}

function WEB_getWallet() {
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

function WEB_getContract() {
  console.log("getContract");
  try {
    if (contract == null) {
		contract = new ethers.Contract(contractAddress, spCoinABI, getSigner());
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
  return contract;
}

function WEB_getWalletProvider(_wallet) {
  try {
    switch (_wallet) {
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

function WEB_getProvider() {
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

function WEB_getSigner() {
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
async function WEB_connectWallet() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    var wallet = document.getElementById("connectWallet_TX").value;
    provider = getWalletProvider(wallet);

    /*
    await getProvider().send("eth_requestAccounts", []);
    signer = await getSigner();
    
 	*/
    changeElementIdColor("connectWallet_BTN", "green");
  } catch (err) {
  }
}

// 2. Connect Metamask Account
async function WEB_getActiveMetaMaskAccount() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    accountAddress = await getSigner().getAddress();
    document.getElementById("activeMetaMaskAccount_TX").value = accountAddress;
    console.log("Account address s:", accountAddress);
    changeElementIdColor("activeMetaMaskAccount_BTN", "green");
  } catch (err) {
    alertLogError(err, "activeMetaMaskAccount_BTN");
  }
}

// 3. Get Ethereum balance
async function WEB_getEthereumAccountBalance() {
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
    alertLogError(err, "ethereumAccountBalance_BTN");
  }
}

// 4. Connect contract
async function WEB_connectContract() {
	try {
	  contractText = document.getElementById("connectContract_TX");
	  contractAddress = contractText.value;
	  contract = new ethers.Contract(contractAddress, spCoinABI, getSigner());
	  // do a test call to see if contract is valid.
	  tokenName = await contract.name();
	  changeElementIdColor("connectContract_BTN", "green");
	} catch (err) {
		console.log(err);
	  contract = null;
	  if (contractAddress == null || contractAddress.length == 0)
		msg = "Error: Contract Address required";
	  else msg = "Error: Invalid Contract Address " + contractAddress;
	  alertLogError(
		{ name: "Bad Contract Address", message: msg },
		"connectContract_BTN"
	  );
	  throw err;
	}
	return contract;
  }
  
  async function WEB_connectContract() {
  try {
    contractText = document.getElementById("connectContract_TX");
    contractAddress = contractText.value;
    contract = new ethers.Contract(contractAddress, spCoinABI, getSigner());
    // do a test call to see if contract is valid.
    tokenName = await contract.name();
    changeElementIdColor("connectContract_BTN", "green");
  } catch (err) {
	  console.log(err);
    contract = null;
    if (contractAddress == null || contractAddress.length == 0)
      msg = "Error: Contract Address required";
    else msg = "Error: Invalid Contract Address " + contractAddress;
    alertLogError(
      { name: "Bad Contract Address", message: msg },
      "connectContract_BTN"
    );
	throw err;
  }
  return contract;
}

async function WEB_readContractName() {
  try {
    tokenName = await getContract().name();
    document.getElementById("contractName_TX").value = tokenName;
    changeElementIdColor("contractName_BTN", "green");
  } catch (err) {
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContractName() ";
    alertLogError(
      { name: "ReadNameFailure", message: msg },
      "contractName_BTN"
    );
  }
}

async function WEB_readContractSymbol() {
  try {
    symbol = await getContract().symbol();
    document.getElementById("contractSymbol_TX").value = symbol;
    changeElementIdColor("contractSymbol_BTN", "green");
  } catch (err) {
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContracSymbol() ";
    alertLogError(
      { name: "readContracSymbol", message: msg },
      "contractSymbol_BTN"
    );
  }
}

async function WEB_readContractTotalSupply() {
  try {
    spCoinTotalSupply = await getContract().totalSupply();
    document.getElementById("contractTotalSupply_TX").value = spCoinTotalSupply;
    changeElementIdColor("contractTotalSupply_BTN", "green");
  } catch (err) {
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContractTotalSupply() ";
    alertLogError(
      { name: "readContractTotalSupply", message: msg },
      "contractTotalSupply_BTN"
    );
  }
}

async function WEB_readContractDecimals() {
  try {
    decimals = await getContract().decimals();
    document.getElementById("contractDecimals_TX").value = decimals;
    changeElementIdColor("contractDecimals_BTN", "green");
  } catch (err) {
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContractDecimals() ";
    alertLogError(
      { name: "readContractDecimals", message: msg },
      "contractDecimals_BTN"
    );
  }
}

async function WEB_balanceOf() {
  try {
    balance = await getContract().balanceOf(accountAddress);
    document.getElementById("balanceOf_TX").value = balance;
    console.log("balanceOf " + accountAddress + " = " + balance);
    changeElementIdColor("balanceOf_BTN", "green");
  } catch (err) {
    console.log(err);
	alert(contract)
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContractBalanceOfName() ";
    alertLogError(
      { name: "GetBalanceOfNameFailure", message: msg },
      "balanceOf_BTN"
    );
  }
}

async function WEB_sendToAccount() {
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
    alertLogError(err, "sendToAccount_BTN");
  }
}

function WEB_alertLogError(err, element) {
  console.log(err.message);
  changeElementIdColor(element, "red");
  alert(err.message);
}

function WEB_changeElementIdColor(name, color) {
  document.getElementById(name).style.backgroundColor = color;
}
function WEB_toggle(elmtStr) {
  elmtObj = document.getElementById(elmtStr);
  if (elmtObj.style.display === "none") {
    elmtObj.style.display = "block";
  } else {
    elmtObj.style.display = "none";
  }
}

function WEB_isEmptyObj(object) {
  isEmpty = JSON.stringify(object) === "{}";
  return isEmpty;
}