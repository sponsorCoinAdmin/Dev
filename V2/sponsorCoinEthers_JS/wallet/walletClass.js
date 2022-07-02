class Wallet {
  constructor(_walletName) {
    try {
      this.accountList;
      this.address;
      this.walletName = _walletName;
      this.name = "Ethereum";
      this.balance;
      this.symbol;

      this.defaultWalletName = "METAMASK";
      this.provider = this.connectValidWalletProvider(_walletName);
      this.signer = provider.getSigner();
      this.tm = new TokenMap();
      // return this.provider;
    } catch (err) {
      processError(err);
    }
  }

  async init() {
    this.address = await this.signer.getAddress();;
    this.name = "Ethereum";
    this.symbol = "ETH";
    this.balance = await this.getEthereumAccountBalance();
    this.totalSupply = await this.signer.getBalance();
    this.decimals = 18;
    this.tokenSupply = await this.signer.getBalance(); // weiToToken(this.totalSupply, this.decimals);
    var tokenMapValues = this.tm.mapWalletObjectByAddressKey(this);
    return true;
  }

  async getContractMapByAddressKey(_addressKey) {
    var addressObject;
    var contractMap = this.tm.getTokenMapValues(_addressKey);
  
    // check if contract exists
    if (contractMap == undefined) {
      contractMap = await this.addNewTokenContractToMap(_addressKey, spCoinABI);
    }
    else {
      contractMap = tm.mapWalletObjectByAddressKey(addressObj);
    }
    return contractMap;
  }

  async addNewTokenContractToMap(_contractAddress, _abi) {
    var contractMap = null;
    try {
      var abi = _abi == undefined ? spCoinABI : _abi;
      var contract = new Contract(_contractAddress, abi, this.signer);
      await contract.init();
      contractMap = this.tm.mapWalletObjectByAddressKey(contract);
    } catch (err) {
      processError(err);
      throw err;
    }
    return contractMap;
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

  async getActiveAccount() {
    try {
      // MetaMask requires requesting permission to connect users accounts
      this.address = await this.signer.getAddress();
      return this.address;
    } catch (err) {
      processError(err);
    }
  }

  setTokenProperty(_address, _propertyKey, _propertyValue) {
    this.tm.setTokenProperty(_address, _propertyKey, _propertyValue);
  }

  async getEthereumAccountBalance() {
    const decimals = 1e18;
    var ethbalance;
    try {
      const balance = await this.signer.getBalance();
      ethbalance = balance.toString() / decimals;
      console.log("account's balance in ether:", ethbalance);
    } catch (err) {
      processError(err);
    }
    return ethbalance;
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