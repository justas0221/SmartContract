// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedEventTicketing {
    struct Event {
        uint256 id;
        string name;
        string date;
        string location;
        address creator;
        uint256 ticketPrice;
        uint256 ticketCounter;
        uint256 ticketsSold;
        bool salesEnded;
    }

    struct Ticket {
        uint256 id;
        uint256 eventId;
        address owner;
        bool isForSale;
    }

    uint256 public eventCounter = 0;
    mapping(uint256 => Event) public events;
    mapping(bytes32 => bool) public eventExists; // To enforce unique combination of name, date, and location
    mapping(uint256 => Ticket[]) public eventTickets;

    // Events
    event EventCreated(uint256 indexed eventId, string name, string date, string location, address indexed creator, uint256 ticketPrice);
    event TicketIssued(uint256 indexed ticketId, uint256 indexed eventId, address indexed owner);
    event TicketPurchased(uint256 indexed ticketId, uint256 indexed eventId, address indexed buyer);
    event TicketSalesEnded(uint256 indexed eventId);
    event TicketTransferred(uint256 indexed ticketId, uint256 indexed eventId, address indexed newOwner);

    // Create a new event with a unique combination of name, date, and location
    function createEvent(string memory _name, string memory _date, string memory _location, uint256 _ticketPrice) public {
        bytes32 eventHash = keccak256(abi.encodePacked(_name, _date, _location));
        require(!eventExists[eventHash], "An event with the same name, date, and location already exists");

        events[eventCounter] = Event(eventCounter, _name, _date, _location, msg.sender, _ticketPrice, 0, 0, false);
        eventExists[eventHash] = true;

        emit EventCreated(eventCounter, _name, _date, _location, msg.sender, _ticketPrice);
        eventCounter++;
    }

    // Issue a new ticket for a specific event by Event ID
    function issueTicket(uint256 eventId) public {
        require(eventId < eventCounter, "Event does not exist");
        require(events[eventId].creator == msg.sender, "Only event creator can issue tickets");
        require(!events[eventId].salesEnded, "Ticket sales have ended for this event");

        uint256 ticketId = events[eventId].ticketCounter;
        eventTickets[eventId].push(Ticket(ticketId, eventId, msg.sender, true));

        emit TicketIssued(ticketId, eventId, msg.sender);

        events[eventId].ticketCounter++;
    }

    // Buy the next available ticket for a specific event by Event ID
    function buyTicket(uint256 eventId) public payable {
        require(eventId < eventCounter, "Event does not exist");

        Event storage eventDetails = events[eventId];
        require(!eventDetails.salesEnded, "Ticket sales have ended for this event");
        require(eventDetails.ticketsSold < eventDetails.ticketCounter, "All tickets are sold out");
        require(msg.value == eventDetails.ticketPrice, "Incorrect ticket price");

        require(msg.sender != eventDetails.creator, "Event creator cannot buy tickets to their own event");

        Ticket storage ticket = eventTickets[eventId][eventDetails.ticketsSold];
        require(ticket.isForSale, "Ticket is not available for sale");

        ticket.owner = msg.sender;
        ticket.isForSale = false;

        eventDetails.ticketsSold++;

        emit TicketPurchased(ticket.id, eventId, msg.sender);
    }

    // End ticket sales
    function endTicketSales(uint256 eventId) public {
        require(eventId < eventCounter, "Event does not exist");
        require(events[eventId].creator == msg.sender, "Only event creator can end ticket sales");
        require(!events[eventId].salesEnded, "Ticket sales have already ended");

        events[eventId].salesEnded = true;

        emit TicketSalesEnded(eventId);
    }

    // Transfer a ticket to another address
    function transferTicket(uint256 eventId, uint256 ticketId, address newOwner) public {
        require(eventId < eventCounter, "Event does not exist");
        require(ticketId < eventTickets[eventId].length, "Invalid ticket ID");

        Ticket storage ticket = eventTickets[eventId][ticketId];
        require(msg.sender == ticket.owner, "Only the ticket owner can transfer this ticket");
        require(newOwner != address(0), "New owner address cannot be zero");

        ticket.owner = newOwner;

        emit TicketTransferred(ticketId, eventId, newOwner);
    }

    // Get the owner of a specific ticket
    function getTicketOwner(uint256 eventId, uint256 ticketId) public view returns (address) {
        require(eventId < eventCounter, "Event does not exist");
        require(ticketId < eventTickets[eventId].length, "Invalid ticket ID");

        return eventTickets[eventId][ticketId].owner;
    }

    // Get event details by Event ID
    function getEvent(uint256 eventId) public view returns (
        uint256 id,
        string memory name,
        string memory date,
        string memory location,
        address creator,
        uint256 ticketPrice,
        uint256 ticketCounter,
        uint256 ticketsSold,
        bool salesEnded
    ) {
        require(eventId < eventCounter, "Event does not exist");

        Event storage eventDetails = events[eventId];

        return (
            eventDetails.id,
            eventDetails.name,
            eventDetails.date,
            eventDetails.location,
            eventDetails.creator,
            eventDetails.ticketPrice,
            eventDetails.ticketCounter,
            eventDetails.ticketsSold,
            eventDetails.salesEnded
        );
    }
}