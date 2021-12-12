// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract getHub{
    address public deployed;

    event Transfer(address sender, address receiver, uint amount);

    constructor() public{
        deployed = address(this);
    }

    struct Details {
        address payable owner;
        string ipfsDest;
        bool tradable;
        bool openSource;
        uint cost;
        uint fundRaised;
    }

    Details[] public details;

    function addDetails(string memory ipfsDest,bool tradable,uint cost) public{
        Details memory temp = Details(msg.sender, ipfsDest, tradable, false, cost, 0);
        details.push(temp);
    }

    function changeOpenSource(bool openSource, string memory ipfsDest) public{
        for(uint i=0; i<details.length; i++){
            if(keccak256(abi.encodePacked(details[i].ipfsDest))==keccak256(abi.encodePacked(ipfsDest))&& details[i].owner == msg.sender)
                if(!details[i].tradable)
                    details[i].openSource = openSource;
        }
    }

    function changeTradable(bool tradable, string memory ipfsDest) public{
        for(uint i=0; i<details.length; i++){
            if(keccak256(abi.encodePacked(details[i].ipfsDest))==keccak256(abi.encodePacked(ipfsDest)) && details[i].owner == msg.sender)
                if(!details[i].openSource)
                    details[i].tradable = tradable;
        }
    }

    function trade(string memory ipfsDest, address payable newOwner) public payable{
        for(uint i=0; i<details.length; i++){
            if(keccak256(abi.encodePacked(details[i].ipfsDest))==keccak256(abi.encodePacked(ipfsDest))){
                require(msg.value == details[i].cost, "Failed to send Ether");
                address payable dest = details[i].owner;
                bool pay = dest.send(msg.value);
                require(pay, "Failed to send Ether");
                details[i].owner = newOwner;
            }
        }
    }

    function changeCost(string memory ipfsDest,uint cost) public{
        for(uint i=0; i<details.length; i++){
            if(keccak256(abi.encodePacked(details[i].ipfsDest))==keccak256(abi.encodePacked(ipfsDest))){
                details[i].cost = cost;
            }
        }
    }

    function crowdFunding(string memory ipfsDest) public payable{
        for(uint i=0; i<details.length; i++){
            if(keccak256(abi.encodePacked(details[i].ipfsDest))==keccak256(abi.encodePacked(ipfsDest))){
                address payable dest = details[i].owner;
                bool pay = dest.send(msg.value);
                require(pay, "Failed to send Ether");
                details[i].fundRaised += msg.value;
            }
        }
    }

}