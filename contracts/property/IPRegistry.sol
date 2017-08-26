pragma solidity ^0.4.14;


contract IPRegistry {

    string public version = "1.0.0";

    address owner;
    
    struct IntellectualProperty {
        string company;
        string name;
        string firstName;
        uint timestamp;
    }

    mapping (bytes32=>IntellectualProperty) documents;

    function IPRegistry() {
        owner = msg.sender;
    }

    function register(bytes32 _hash, string _company, string _name, string _firstName) public {
        
        require(documents[_hash].timestamp == 0);

        documents[_hash] = IntellectualProperty({
             company: _company, 
             name: _name, 
             firstName: _firstName, 
             timestamp: now
        });
    }

    function findDocument(bytes32 _hash) constant returns (string company, string firstName, string name, uint timestamp) {
        return (documents[_hash].company, documents[_hash].firstName, documents[_hash].name, documents[_hash].timestamp);
    }
}