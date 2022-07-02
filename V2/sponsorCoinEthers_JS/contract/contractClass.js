// Contract Vars;
const spCoinContractAddress = "0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A";
const abi = spCoinABI;

async function init(contract) {
  contract.name = await contract.name();
  contract.symbol = await contract.symbol();
  contract.totalSupply = await contract.totalSupply();
}

class Contract {
  constructor(_address, _ABI, _signer) {
    this.loaded = false;
    this.address = _address;
    this.ABI = _ABI;
    this.signer = _signer;
    this.contract = this.getContract(_address, _ABI, _signer);
    this.name;
    this.symbol;
    this.totalSupply;
    this.decimals;
    // this.init();
    // this.alertVals();
    // setTimeout(this.alertVals, 3000);
  }

  async init() {
    try {
      this.name = await this.contract.name();
      this.symbol = await this.contract.symbol();
      this.totalSupply = await this.contract.totalSupply();
      this.decimals = await this.contract.decimals();
      this.tokenSupply = weiToToken(this.totalSupply, this.decimals);
      this.mapWalletObjectByAddressKey(this);
    } catch (err) {
      var msg = "** Error Contract Creation\n";
      msg += "Invalad Address: "+this.address;
      alertLogErrorMessage(msg);
      throw err;
    }
    return true;
  }

  alertVals() {
    var vals = "\nName = " + this.name;
    vals += "\nSymbol = " + this.symbol;
    vals += "\ntotalSupply" + this.totalSupply;
    vals += "\ndecimals" + this.decimals;
    alert("Contract Values" + vals);
  }

  getContract(_address, _ABI, _signer) {
    var contract;
    try {
      if (_address != null) {
        contract = new ethers.Contract(_address, _ABI, _signer);
      }
    } catch (err) {
      processError(err);
    }
    return contract;
  }
  /*
    balanceOf(accountAddress) {
      try {
        balance = await getContract().balanceOf(accountAddress);
        return balance;
      } catch (err) {
        processError(err);
      }
    }
    */
}

async function connectValidContract(_address) {
  try {
    // MetaMask requires requesting permission to connect users accounts
    if (_address == undefined || _address.length == 0) {
      msg = "Error: Contract Address Required";
      throw { "name": "missingContractAddress", "message": msg };
    }
    try {
      contract = new ethers.Contract(_address, spCoinABI, signer);
      // do a test call to see if contract is valid.
      tokenName = await contract.name();
    }
    catch {
      msg = "Error: Cannot connect to Contract Address  <" + _address + ">";
      throw { "name": "emptyWalletSigner", "message": msg };
    }
    return contract;
  } catch (err) {
    contract = undefined;
    processError(err);
  }
}

async function sendToAccount(addr) {
  try {
    if (!addr && addr.length == 0) {
      console.log("Address is empty");
      throw { name: "GUI_sendTokensToAccount", message: "Address is empty" };
    } else {
      if (!ethers.utils.isAddress(addr)) {
        throw {
          name: "GUI_sendTokensToAccount",
          message: "Address is not valid",
        };
      } else {
        contractDecimals = await getContractDecimals();
        contractWeiBalance = tokenToWei(tokenAmount, contractDecimals);
        strVal = contractWeiBalance.toFixed(contractDecimals);
        alert("contractDecimals = " + contractDecimals + "\ncontractWeiBalance = " + contractWeiBalance);
        getContract().connect(signer).transfer(addr, "55000000000000000000000");
        getContract().connect(signer).transfer(addr, contractWeiBalance);
        //         contract.connect(signer).transfer(addr, "500000000");
      }
    }
  } catch (err) {
    processError(err);
  }
}

async function OLD_sendTokensToAccount(addr, tokenAmount) {
  try {
    var signer = getValidatedSigner();
    contract = new ethers.Contract(address, spCoinABI, getProvider());
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
