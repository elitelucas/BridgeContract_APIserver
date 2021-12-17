const Web3 = require("web3");
// const web3Eth = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/7de28753810e4400b3eb7fccf288475b"));
const web3Eth = new Web3(
  "wss://rinkeby.infura.io/ws/v3/7de28753810e4400b3eb7fccf288475b"
);
const web3Bsc = new Web3(
  new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  )
);
const adminPrivKey =
  "aec13e414b5863d151a8eaaa2cf6aa6374ab94b73fb6a26d940c4742dd0defee";
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);
const BridgeEthABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
    ],
    name: "Convert",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "aa",
        type: "address",
      },
    ],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getServerBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const BridgeEthAddress = "0x78abC44F127AdFc6FFa1884bA566d62b755b7965";
const BridgeBscABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
    ],
    name: "Convert",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "aa",
        type: "address",
      },
    ],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getServerBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const BridgeBscAddress = "0xd6BC5b5E2475F44D245A97A1d668Ea428D981656";
const bridgeEth = new web3Eth.eth.Contract(BridgeEthABI, BridgeEthAddress);
const bridgeBsc = new web3Bsc.eth.Contract(BridgeBscABI, BridgeBscAddress);

// bridgeEth.events
//   .Transfer({ fromBlock: 0, step: 0 })
//   .on("data", async (event) => {
//     const { from, to, amount, date, nonce, signature } = event.returnValues;
//     const tx = bridgeBsc.methods.mint(from, to, amount, nonce, signature);
//     const [gasPrice, gasCost] = await Promise.all([
//       web3Bsc.eth.getGasPrice(),
//       tx.estimateGas({ from: admin }),
//     ]);
//     const data = tx.encodeABI();
//     const txData = {
//       from: admin,
//       to: bridgeBsc.options.address,
//       data,
//       gas: gasCost,
//       gasPrice,
//     };
//     const receipt = await web3Bsc.eth.sendTransaction(txData);
//     console.log(`Transaction hash: ${receipt.transactionHash}`);
//     console.log(
//       `Processed transfer: - from ${from} - to ${to} - amount ${amount} tokens - date ${date} - nonce ${nonce} `
//     );
//   });

bridgeEth.events.Convert(async (err, events) => {
  if (err) {
    console.log(err);
  } else {
    var returnValues = events.returnValues;
    console.log(returnValues);
    const { from, to, amount, date } = returnValues;
    const tx = bridgeBsc.methods.mint(to, amount);
    const [gasPrice, gasCost] = await Promise.all([
      web3Bsc.eth.getGasPrice(),
      tx.estimateGas({ from: admin }),
    ]);
    const data = tx.encodeABI();
    const txData = {
      from: admin,
      to: bridgeBsc.options.address,
      data,
      gas: gasCost,
      gasPrice,
    };
    const receipt = await web3Bsc.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(
      `Processed transfer: - from ${from} - to ${to} - amount ${amount} tokens - date ${date}`
    );
  }
});

console.log("running ....");
