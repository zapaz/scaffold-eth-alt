// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IOpenPass {
    function setTokenURI(string memory tokenURI) external;

    function safeMint(address to) external;
}
