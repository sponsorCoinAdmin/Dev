//const defaultContractAddress = "0x925195d664A8CAdA8Ff90a8948e394B9bd15237B";
const spCoinContractAddress = "0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A";
var defaultWallet = "METAMASK";
var wallet;
var provider;
var signer;
var contractAddress = spCoinContractAddress;
var accountAddress;
var contract;

function connectMetaMask() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } catch (err) {
	  processError(err);
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
	processError(err);
}
  return wallet;
}

function getContract() {
  try {
    if (contract == null) {
		contract = new ethers.Contract(contractAddress, spCoinABI, getSigner());
    }
  } catch (err) {
	processError(err);
}
  return contract;
}

function getWalletProvider(_wallet) {
	if (_wallet == undefined)
	  _wallet = defaultWallet;
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
	processError(err);
}
  return provider;
}

function getProvider(_wallet) {
  alert("wallet = " + wallet);
  try {
    if (provider == null) {
      provider = getWalletProvider(getWallet());
    }
  } catch (err) {
	processError(err);
}
  return provider;
}

function getSigner() {
  try {
    if (signer == null) {
      signer = getProvider().getSigner();
    }
  } catch (err) {
	processError(err);
}
  return signer;
}

// 1. Connect Metamask with Dapp
async function connectWallet() {
  try {
    // MetaMask requires requesting permission to connect users accounts
     provider = getWalletProvider(wallet);

    /*
    await getProvider().send("eth_requestAccounts", []);
    signer = await getSigner();
    
 	*/
  } catch (err) {
	processError(err);
}
}

// 2. Connect Metamask Account
async function getActiveMetaMaskAccount() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    accountAddress = await getSigner().getAddress();
	return accountAddress
  } catch (err) {
	processError(err);
}
}

// 3. Get Ethereum balance
async function getEthereumAccountBalance() {
  try {
    const balance = await getSigner().getBalance();
    const convertToEth = 1e18;
    const ethbalance = balance.toString() / convertToEth;
    console.log(
      "account's balance in ether:",
      balance.toString() / convertToEth
    );
  } catch (err) {
	processError(err);
}
  return balance;
}

// 4. Connect contract
  async function connectContract() {
  try {
    contract = new ethers.Contract(getAddress(), spCoinABI, getSigner());
    // do a test call to see if contract is valid.
    tokenName = await contract.name();
  } catch (err) {
	processError(err);
}
  return contract;
}

async function readContractName() {
  try {
    tokenName = await getContract().name();
  } catch (err) {
	processError(err);
}
  return tokenName;
}

async function readContractSymbol() {
  try {
    symbol = await getContract().symbol();
  } catch (err) {
      throw err;
	}
}

async function readContractTotalSupply() {
  try {
    spCoinTotalSupply = await getContract().totalSupply();
	return supply;
   } catch (err) {
	processError(err);
}
}

async function readContractDecimals() {
  try {
    decimals = await getContract().decimals();
	return decimals;
   } catch (err) {
	processError(err);
}
}

async function balanceOf() {
  try {
    balance = await getContract().balanceOf(accountAddress);
    return balance;
  } catch (err) {
	processError(err);
}
}

async function sendToAccount(addr) {
  try {
    const spCoinContract = new ethers.Contract(
      contractAddress,
      spCoinABI,
      getProvider()
    );
    if (!addr && addr.length == 0) {
      console.log("Address is empty");
      sendToAccountAddr.value = "Address is empty";
    } else {
      if (!ethers.utils.isAddress(addr)) {
        alert("Address %s is not valid", addr);
      } else {
        spCoinContract.connect(signer).transfer(addr, "500000000");
      }
    }
  } catch (err) {
	processError(err);
}
}

function changeElementIdColor(name, color) {
  document.getElementById(name).style.backgroundColor = color;
}

function isEmptyObj(object) {
  isEmpty = JSON.stringify(object) === "{}";
  return isEmpty;
}

function processError(err) {
	throw err;
  }
