pragma solidity ^0.4.14;

import "../ownership/Ownable.sol";


contract DiplrRegistry is Ownable {
    
    mapping(bytes32 => address) context;

    function getAddress(bytes32 _name) constant public returns (address _address) {
        return context[_name];
    }

    function setAddress(bytes32 _name, address _address) public onlyOwner {
        context[_name] = _address;
    }
}