// Contract Vars;
const spCoinContractAddress = "0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A";
const abi = spCoinABI;

class Contract {
  constructor(_contractAddress, _ABI, _signer) {
    this.contractAddress = _contractAddress;
    this.ABI = _ABI;
    this.signer = _signer;
    this.contract = this.getContract(_contractAddress, _ABI, _signer);
    this.name = this.getName();
    this.name = this.contract.name();
    this.symbol = this.contract.symbol();
    this.totalSupply = this.contract.totalSupply();
    this.decimals = this.contract.decimals();
    this.tokenSupply = weiToToken(this.totalSupply, this.decimals);
  }

  getName() {
    var name = this.contract.name();
    return name;
  }

  getContract(_contractAddress, _ABI, _signer) {
    var contract;
    try {
      if (_contractAddress != null) {
        contract = new ethers.Contract(_contractAddress, _ABI, _signer);
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

async function connectValidContract(_contractAddress) {
  try {
    // MetaMask requires requesting permission to connect users accounts
    if (_contractAddress == undefined || _contractAddress.length == 0) {
      msg = "Error: Contract Address Required";
      throw { "name": "missingContractAddress", "message": msg };
    }
    try {
      contract = new ethers.Contract(_contractAddress, spCoinABI, signer);
      // do a test call to see if contract is valid.
      tokenName = await contract.name();
    }
    catch {
      msg = "Error: Cannot connect to Contract Address  <" + _contractAddress + ">";
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
    contract = new ethers.Contract(contractAddress, spCoinABI, getProvider());
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
