let web3;
let contract;
const contractAddress = "0x117995ee913c14983838C58DAC969d2F2190188B";
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "date",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ticketPrice",
          "type": "uint256"
        }
      ],
      "name": "EventCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "TicketIssued",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "TicketPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        }
      ],
      "name": "TicketSalesEnded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "TicketTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "eventCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "eventExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "eventTickets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isForSale",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "events",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "date",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "ticketPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ticketCounter",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ticketsSold",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "salesEnded",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_date",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_ticketPrice",
          "type": "uint256"
        }
      ],
      "name": "createEvent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        }
      ],
      "name": "issueTicket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        }
      ],
      "name": "buyTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        }
      ],
      "name": "endTicketSales",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferTicket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        }
      ],
      "name": "getTicketOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        }
      ],
      "name": "getEvent",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "date",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "ticketPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ticketCounter",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ticketsSold",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "salesEnded",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
];

// Helper function to extract and display detailed error messages
function getErrorMessage(error) {
  console.error(error);

  if (error && error.message) {
    const matches = error.message.match(/reverted with reason string '(.+?)'/);
    if (matches && matches[1]) {
      return matches[1];
    }
    return error.message;
  }
  return "An unknown error occurred";
}

window.onload = async () => {
  // Check if MetaMask is installed
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log("Connected to contract:", contractAddress);
    } catch (error) {
      alert(`Error: ${getErrorMessage(error)}`);
    }
  } else {
    alert("Please install MetaMask to use this app.");
  }
};

// Connect Wallet
document.getElementById("connectWallet").onclick = async () => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    alert("Wallet connected!");
  } catch (error) {
    alert(`Error: Wallet failed to connect.`);
  }
};

// Create Event
document.getElementById("createEvent").onclick = async () => {
  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;
  const location = document.getElementById("eventLocation").value;
  const price = web3.utils.toWei(document.getElementById("ticketPrice").value, "ether");

  const accounts = await web3.eth.getAccounts();

  try {
    await contract.methods.createEvent(name, date, location, price).send({ from: accounts[0] });
    alert("Event created successfully!");
  } catch (error) {
    alert(`Error: Failed to create event. Two events can't have the exact same name, location, and date.`);
  }
};

// Issue Ticket
document.getElementById("issueTicket").onclick = async () => {
  const eventId = document.getElementById("eventIdForIssue").value;
  const accounts = await web3.eth.getAccounts();

  try {
    await contract.methods.issueTicket(eventId).send({ from: accounts[0] });
    alert("Ticket issued successfully!");
  } catch (error) {
    alert(`Error: Only the event creator can issue tickets.`);
  }
};

// Buy Ticket
document.getElementById("buyTicket").onclick = async () => {
  const eventId = document.getElementById("eventIdForBuy").value;
  const accounts = await web3.eth.getAccounts();

  try {
    const event = await contract.methods.getEvent(eventId).call();
    const ticketPrice = event.ticketPrice;

    await contract.methods.buyTicket(eventId).send({ from: accounts[0], value: ticketPrice });
    alert("Ticket purchased successfully!");
  } catch (error) {
    alert(`Error: You can't buy tickets that you already own.`);
  }
};

// Get Event
document.getElementById("getEvent").onclick = async () => {
  const eventId = document.getElementById("eventIdForDetails").value;

  try {
    const event = await contract.methods.getEvent(eventId).call();

    const formattedEvent = {
      id: event.id,
      name: event.name,
      date: event.date,
      location: event.location,
      creator: event.creator,
      ticketPrice: web3.utils.fromWei(event.ticketPrice, "ether") + " ETH",
      ticketCounter: event.ticketCounter,
      ticketsSold: event.ticketsSold,
      salesEnded: event.salesEnded,
    };

    document.getElementById("eventDetails").innerText = JSON.stringify(formattedEvent, null, 2);
  } catch (error) {
    alert("Failed to fetch event details.");
  }
};

// Check Ticket Owner
document.getElementById("checkOwner").onclick = async () => {
  const eventId = document.getElementById("eventIdForOwner").value;
  const ticketId = document.getElementById("ticketIdForOwner").value;

  try {
    const owner = await contract.methods.getTicketOwner(eventId, ticketId).call();
    document.getElementById("ticketOwner").innerText = `Owner: ${owner}`;
  } catch (error) {
    alert(`Error: Ticket with this ID does not exist.`);
  }
};

// Transfer Ticket
document.getElementById("transferTicket").onclick = async () => {
  const eventId = document.getElementById("eventIdForTransfer").value;
  const ticketId = document.getElementById("ticketIdForTransfer").value;
  const newOwner = document.getElementById("newOwnerAddress").value;

  const accounts = await web3.eth.getAccounts();

  try {
    await contract.methods.transferTicket(eventId, ticketId, newOwner).send({ from: accounts[0] });
    alert("Ticket transferred successfully!");
  } catch (error) {
    alert(`Error: You can only transfer tickets that you own to another address.`);
  }
};