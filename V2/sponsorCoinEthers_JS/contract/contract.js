// Contract Vars;
const spCoinContractAddress = "0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A";
var contractAddress;
var contract;

function setContractAddress(_contractAddress) {
  contractAddress = _contractAddress;
}

function getContract(_contractAddress) {
  try {
    if (_contractAddress != null) {
      contract = new ethers.Contract(_contractAddress, spCoinABI, getSigner());
    }
  } catch (err) {
    processError(err);
  }
  return contract;
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

async function connectValidContract(_contractAddress) {
  try {
    // MetaMask requires requesting permission to connect users accounts
    if (_contractAddress == undefined || _contractAddress.length == 0) {
      msg = "Error: Contract Address Required";
      throw { "name": "missingContractAddress", "message": msg };
    }

    contract = new ethers.Contract(_contractAddress, spCoinABI, signer);

    if (contract == undefined || contract.length == 0) {
      msg = "Error: Cannot connect to Contract Address  <" + _contractAddress + ">";
      throw { "name": "emptyWalletSigner", "message": msg };
    }

    // do a test call to see if contract is valid.
    tokenName = await contract.name();
 
    return contract;
  } catch (err) {
    processError(err);
  }
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
    var signer = getValidatedSigner();
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
