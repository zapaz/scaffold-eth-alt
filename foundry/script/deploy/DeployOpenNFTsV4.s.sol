// SPDX-License-Identifier: MITs
pragma solidity 0.8.19;

import {DeployLite} from "@forge-deploy-lite/DeployLite.s.sol";

import {OpenNFTsFactoryV3} from "src/OpenNFTsFactoryV3.sol";
import {OpenNFTsV4} from "src/OpenNFTsV4.sol";

contract DeployOpenNFTsV4 is DeployLite {
    function deployOpenNFTsV4() public returns (address) {
        address sender = vm.envAddress("SENDER");
        address openNFTsFactoryV3 = readAddress("OpenNFTsFactoryV3");

        require(
            sender == OpenNFTsFactoryV3(openNFTsFactoryV3).owner(), "Deployer must be OpenNFTsFactoryV3 owner !"
        );

        DeployState state = deployState("OpenNFTsV4");

        if (state == DeployState.None) {
            vm.startBroadcast(sender);
            address openNFTsV4 = deploy("OpenNFTsV4", "");

            bool[] memory options = new bool[](1);
            options[0] = true;
            OpenNFTsV4(openNFTsV4).initialize(
                "OpenNFTsV4", "ONFT", sender, abi.encode(abi.encode(0, address(0), 0, options), address(0), 0)
            );

            OpenNFTsFactoryV3(openNFTsFactoryV3).setTemplate("OpenNFTsV4", openNFTsV4);

            vm.stopBroadcast();
        }

        return readAddress("OpenNFTsV4");
    }

    function run() public virtual {
        deployOpenNFTsV4();
    }
}
