const defaultContractAddress = '0x925195d664A8CAdA8Ff90a8948e394B9bd15237B';
var provider;
var signer;
var contractAddress = defaultContractAddress;
var accountAddress;
var contract;

// 1. Connect Metamask with Dapp
async function connectMetaMaskWallet() {
	try {
		// MetaMask requires requesting permission to connect users accounts
		provider = new ethers.providers.Web3Provider(window.ethereum)
		await provider.send("eth_requestAccounts", []);
		signer = await provider.getSigner();
		document.getElementById('connectMetaMaskWallet_DIV').innerHTML = "<span style='color:red'>&#x2705</span>";
	}
	catch(err) {
		console.log(err.message);
		alert(err.message);
	}
}

// 2. Connect Metamask Account
async function connectMetaMaskAccount() {
	try {
		// MetaMask requires requesting permission to connect users accounts
		accountAddress = await signer.getAddress();
		document.getElementById('connMetaMaskAccount_TB').value = accountAddress;
		console.log("Account address s:", accountAddress);
		document.getElementById('connectMetaMaskAccount_DIV').innerHTML = "<span style='color:red'>&#x2705</span>";
	}
	catch(err) {
		console.log(err.message);
		alert(err.message);
	}
}

// 3. Get Ethereum balance
async function getEthereumAccountBalance() {
	try {
		const balance = await signer.getBalance()
		const convertToEth = 1e18;
		const ethbalance = balance.toString() / convertToEth;
		document.getElementById('balanceText').value = ethbalance;
		console.log("account's balance in ether:", balance.toString() / convertToEth);
		document.getElementById('connectMetaMaskAccount_DIV').innerHTML = "<span style='color:red'>&#x2705</span>";
	}
	catch(err) {
		console.log(err.message);
		alert(err.message);
	}
}

// 4. Connect contract
async function connectContract() {
	try {
		contractContainer = document.getElementById("contractData");
		contractText = document.getElementById("contractText");
		contractAddress = contractText.value;
		contract = new ethers.Contract(contractAddress, spCoinABI, signer);
		document.getElementById('connectContract_DIV').innerHTML = "<span style='color:red'>&#x2705</span>";
	}
	catch(err) {
		contractConnectError = "Cannot Connect to Address" + contractAddress + "\n" + err.message;
		console.log(contractConnectError);
		alert(contractConnectError);
	}
}

// 5. Read contract data from the contract on the connected account
async function readContractData() {
	try {
		mainContainer = document.getElementById("contractData_DIV");
		spCoinName = await contract.name()
		alert(spCoinName);
		spCoinSymbol = await contract.symbol()
	//  spCoinDecimals = await contract.decimals()
		spCoinTotalSupply = await contract.totalSupply()

		mainContainer.innerHTML = "";
		appendDivData(mainContainer, "spCoinName", spCoinName);   
		appendDivData(mainContainer, "spCoinSymbol", spCoinSymbol);
	// appendDivData(mainContainer, spCoinDecimals, "spCoinDecimals");
		appendDivData(mainContainer, "spCoinTotalSupply", spCoinTotalSupply);
	}
	catch(err) {
		console.log(err.message);
		alert(err.message);
	}
}

async function balanceOf() {
	try {
		balanceOfContainer = document.getElementById("balanceOf_DIV");
		balance = await contract.balanceOf(accountAddress);
		balanceOfContainer.innerHTML = "";
		appendDivData(balanceOfContainer, "Balance", balance);
	}
	catch(err) {
		console.log(err.message);
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
		console.log(err.message);
		alert(err.message);
	}
}

async function sendToAccount() {
	try {
		const spCoinContract = new ethers.Contract(contractAddress, spCoinABI, provider);
    	spCoinContract.connect(signer).transfer("0x6CC3dFBec068b7fccfE06d4CD729888997BdA6eb", "500000000")
		document.getElementById('sendToAccount_DIV').innerHTML = "<span style='color:red'>&#x2705</span>";
	}
	catch(err) {
		console.log(err.message);
		alert(err.message);
	}
}
