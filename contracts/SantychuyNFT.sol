// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract SantychuyNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply; //Available
    uint256 public maxSupply; //Max NFT collection
    uint256 public maxPerwallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    //Init variables here because is more cheaper
    constructor() payable ERC721('Santychuy', 'SC') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerwallet = 3;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled)
        external
        onlyOwner
    {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId), 'Token does not exists!');

        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(_tokenId),
                    '.json'
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ''
        );

        require(success, 'withdraw failed!');
    }

    //Important to audit
    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, 'minting nos enabled');
        require(msg.value == _quantity * mintPrice, 'wrong mint value');
        require(totalSupply + _quantity <= maxSupply, 'Sold out!');
        require(
            walletMints[msg.sender] + _quantity <= maxPerwallet,
            'Exceeded max wallet'
        );

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId); //Function from ERC721 Contract
        }
    }
}
