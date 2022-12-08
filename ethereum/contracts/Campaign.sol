// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint minimum, string memory heading, string memory desc) public {
        address newCampaign = address(new Campaign(minimum,heading, desc, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    string public title;
    string public description;
    mapping (address => bool) public approvers;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, string memory heading, string memory desc, address creator){
        manager = creator;
        minimumContribution = minimum;
        title = heading;
        description = desc;
    }

    function contribute () public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory desc, uint value, address recipient) public restricted {
        Request storage newRequest = requests.push(); 
        newRequest.description = desc;
        newRequest.value= value;
        newRequest.recipient= recipient;
        newRequest.complete= false;
        newRequest.approvalCount= 0;
    }
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];

        require(request.approvalCount >= (approversCount / 2));
        require(!request.complete);
        
        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address, string memory, string memory 
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager,
          title,
          description
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}