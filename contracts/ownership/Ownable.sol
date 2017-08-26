pragma solidity ^0.4.14;


contract Ownable {
  
    address public owner;
    
    function Ownable() {
      owner = msg.sender;
    }

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }

    /**
    * @dev Allows the current owner to transfer control of the contract to a newOwner.
    * @param newOwner The address to transfer ownership to.
    */
    function transferOwnership(address newOwner) onlyOwner {
      require(newOwner != address(0));
      owner = newOwner;
    }
}