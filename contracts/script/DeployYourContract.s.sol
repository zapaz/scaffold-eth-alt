// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {DeployLite} from "@forge-deploy-lite/DeployLite.s.sol";
import {YourContract} from "../src/YourContract.sol";

contract DeployYourContract is DeployLite {
    function deployYourContract() public returns (address) {
        return deployLite("YourContract", abi.encode(msg.sender));
    }

    function run() public virtual {
        deployYourContract();
    }
}
