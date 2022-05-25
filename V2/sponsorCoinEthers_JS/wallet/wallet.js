// Wallet Vars
var defaultWalletName = "METAMASK";
var walletName;
var provider;
var signer;
var accountAddress;

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

function setWalletName(_walletName) 
{
    this.walletName = _walletName;
}

function getWalletName() {
  //   try {
  //     if (walletName == null) {
  //       walletName = defaultWalletName;
  //     }
  //   } catch (err) {
  //     processError(err);
  //   }
  return walletName;
}

function getWalletProvider(_walletName) {
  //  if (_walletName == undefined) _walletName = defaultWalletName;
  try {
    switch (_walletName.toUpperCase()) {
      case "METAMASK":
        provider = connectMetaMask();
        break;
      default:
        provider = undefined;
        break;
    }
  } catch (err) {
    processError(err);
  }
  return provider;
}

function getProvider(_walletName) {
  try {
    if (provider == null) {
      provider = getWalletProvider(getWalletName());
    }
  } catch (err) {
    processError(err);
  }
  return provider;
}

function getSigner() {
  try {
    if (signer == null) {
      signer =
        getProvider() != undefined ? getProvider().getSigner() : undefined;
    }
  } catch (err) {
    processError(err);
  }
  return signer;
}

function getValidatedSigner() {
  try {
    if (signer == null) {
      signer = getSigner();
      if (signer == undefined)
        throw {
          name: "emptyWalletSigner",
          message: "Error: Valid Wallet Connection Required",
        };
    }
  } catch (err) {
    processError(err);
  }
  return signer;
}

// 1. Connect Metamask with Dapp
async function connectWalletProvider(_walletName) {
  try {
    // MetaMask requires requesting permission to connect users accounts
    provider = getWalletProvider(_walletName);

    /*
	  await getProvider().send("eth_requestAccounts", []);
	  signer = await getSigner();
	  
	   */
    return provider;
  } catch (err) {
    processError(err);
  }
}

async function connectValidWalletProvider(_walletName) {
  try {
    // MetaMask requires requesting permission to connect users accounts
    if (_walletName == undefined || _walletName.length == 0) {
        msg = "Error: No Wallet Specified";
        throw { name: "emptyWalletSigner", message: msg };
    }
    var provider = getWalletProvider(_walletName);
	if (provider == undefined || provider.length == 0) {
		msg = "Error: Cannot connect to wallet <"+_walletName+">";
		throw { name: "emptyWalletSigner", message: msg };
	  }
	  this.provider = provider;
      return provider;
  } catch (err) {
    processError(err);
  }
}

// 2. Connect Metamask Account
async function getActiveAccount(_signer) {
  try {
    // MetaMask requires requesting permission to connect users accounts
    accountAddress = await _signer.getAddress();
    return accountAddress;
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


function disconnectWallet() {
  this.walletName = undefined;
  this.accountAddress = undefined;
	this.provider = undefined;
	this.signer = undefined;
}