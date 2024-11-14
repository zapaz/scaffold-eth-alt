import { type Abi } from "abitype";
import { type Address } from "viem";
import { type DeploymentContractName, readDeploymentContract } from "@scaffold-eth-svelte5/common";
import { createTargetNetworkId } from "$lib/scaffold-eth/runes";
import { createPublicClient, createAccount } from "$lib/wagmi/runes";

const createContract = (name: DeploymentContractName) => {
  const client = $derived.by(createPublicClient());
  const { targetNetworkId: chainId } = $derived.by(createTargetNetworkId);
  const { address, abi } = $derived(readDeploymentContract(chainId, name));
  const { account } = $derived(createAccount());
  const { address: acountAddress } = $derived(account);

  // $inspect("createContract chainId", chainId)

  return {
    get client() {
      return client;
    },
    get chainId() {
      return chainId;
    },
    get address() {
      return address as Address;
    },
    get abi() {
      return abi as Abi;
    },
    get account() {
      return acountAddress;
    }
  };
};

export { createContract };
