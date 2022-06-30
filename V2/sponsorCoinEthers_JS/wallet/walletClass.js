class Wallet {
  constructor(_walletName) {
    try {
      this.accountList;
      this.accountAddress;
      this.walletName = _walletName;
      this.defaultWalletName = "METAMASK";
      this.provider = this.connectValidWalletProvider(_walletName);
      this.signer = provider.getSigner();
      this.tm = new TokenMap();
      // return this.provider;
    } catch (err) {
      processError(err);
    }
  }

  connectValidWalletProvider(_walletName) {
    try {
      // MetaMask requires requesting permission to connect users accounts
      if (_walletName == undefined || _walletName.length == 0) {
        msg = "Error: No Wallet Specified";
        throw { name: "emptyWalletSigner", message: msg };
      }
      var provider = this.getWalletProvider(_walletName);
      if (provider == undefined || provider.length == 0) {
        msg = "Error: Cannot connect to wallet <" + _walletName + ">";
        throw { name: "emptyWalletSigner", message: msg };
      }
      return provider;
    } catch (err) {
      processError(err);
    }
  }

  getWalletProvider(_walletName) {
    var provider;
    try {
      switch (_walletName.toUpperCase()) {
        case "METAMASK":
          provider = connectMetaMask();
          break;
        default:
          throw { "name": "Unknown Provider", "message": "Cannot connect to Wallet Provider " + _walletName };
      }
      this.accountList = provider.send("eth_requestAccounts", []);
    } catch (err) {
      processError(err);
    }
    return provider;
  }

  getActiveAccount() {
    try {
      // MetaMask requires requesting permission to connect users accounts
      return this.signer.getAddress();
    } catch (err) {
      processError(err);
    }
  }
}


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

// 3. Get Ethereum balance
async function getEthereumAccountBalance() {
  try {
    const balance = await signer.getBalance();
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