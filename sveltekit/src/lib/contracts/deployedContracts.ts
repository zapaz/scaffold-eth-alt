import type { GenericContractsDeclaration } from "$lib/utils/scaffold-eth/contract";

import deployedContractsJson from "@scaffold-eth-alt/foundry/deployedContracts.json";

const deployedContracts = deployedContractsJson[31337];

export default deployedContracts satisfies GenericContractsDeclaration;

