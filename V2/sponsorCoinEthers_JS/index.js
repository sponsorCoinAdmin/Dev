let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer
const spCoinCotractAddress = '0x9BAD613F5DBFd749E7a952Fb4F524cBb03c9F1EA';

// 1. Connect Metamask with Dapp
async function connectMetamask() {
	try {
		// MetaMask requires requesting permission to connect users accounts
		await provider.send("eth_requestAccounts", []);
		signer = await provider.getSigner();
		address = await signer.getAddress();
		document.getElementById('connectText').value = address;
		console.log("Account address s:", address);
	}
	catch(err) {
		consol.log(err.message);
		alert(err.message);
	  }
	}

// 2. Get balance
async function getWalletEthBalance() {
	try {
		const balance = await signer.getBalance()
    const convertToEth = 1e18;
    const ethbalance = balance.toString() / convertToEth;
    document.getElementById('balanceText').value = ethbalance;
    console.log("account's balance in ether:", balance.toString() / convertToEth);
	}
	catch(err) {
		consol.log(err.message);
		alert(err.message);
	}
}

// 3. read data from the sponsorCoin contract on kovan 
async function readDataFromSpCoinContract() {
	try {
		mainContainer = document.getElementById("spCoinData");
		const spCoinContract = new ethers.Contract(spCoinCotractAddress, spCoinABI, provider.getSigner());
		const spCoinName = await spCoinContract.name()
		const spCoinSymbol = await spCoinContract.symbol()
	//   const spCoinDecimals = await spCoinContract.decimals()
		const spCoinTotalSupply = await spCoinContract.totalSupply()
	
		mainContainer.innerHTML = "";
		appendDivData(mainContainer, "spCoinName", spCoinName);   
		appendDivData(mainContainer, "spCoinSymbol", spCoinSymbol);
	// appendDivData(mainContainer, spCoinDecimals, "spCoinDecimals");
		appendDivData(mainContainer, "spCoinTotalSupply", spCoinTotalSupply);
	}
	catch(err) {
		consol.log(err.message);
		alert(err.message);
	}
}

async function balanceOf() {
	try {
		balanceOfContainer = document.getElementById("balanceOfData");
		addressText = document.getElementById("addressText");
		balanceAddress = addressText.value;
		const spCoinContract = new ethers.Contract(spCoinCotractAddress, spCoinABI, provider.getSigner());
		const balance = await spCoinContract.balanceOf(balanceAddress);
	//    const spcCoinBalance = await spCoinContract.balanceOf("0x4F75f07232a56c2b98FC9878F496bFc32e317Ace");
		balanceOfContainer.innerHTML = "";
		appendDivData(balanceOfContainer, "Balance", balance);
	}
	catch(err) {
		consol.log(err.message);
		alert(err.message);
	}
}
  
function appendDivData(mainContainer, name, val) {
	try {
		var div = document.createElement("DIV");
    str = name + " = " + val;
    div.innerHTML = str;
    mainContainer.appendChild(div);
    console.log(str);
	}
	catch(err) {
		consol.log(err.message);
		alert(err.message);
	}
}

async function sendSPCoinToAccount() {
	try {
		const spCoinContract = new ethers.Contract(spCoinCotractAddress, spCoinABI, provider);
    	spCoinContract.connect(signer).transfer("0x6CC3dFBec068b7fccfE06d4CD729888997BdA6eb", "500000000")
	}
	catch(err) {
		consol.log(err.message);
		alert(err.message);
	}
}



