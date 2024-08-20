import { targetNetwork } from "./global.svelte";
import { createPublicClient } from "$lib/wagmi/runes";
import { ContractCodeStatus, contracts, type Contract, type ContractName } from "$lib/scaffold-eth/ts";
import type { Address } from "viem";

export const createDeployedContractInfo = <TContractName extends ContractName>(contractName: TContractName) => {
  const deployedContract = $derived(
    contracts?.[targetNetwork.targetNetwork.id]?.[contractName as ContractName] as Contract<TContractName>
  );
  let status = $state(ContractCodeStatus.LOADING);

  $effect(() => {
    const checkContractDeployment = async () => {
      if (!deployedContract) {
        status = ContractCodeStatus.NOT_FOUND;
        return;
      }
      const publicClient = $derived.by(createPublicClient());

      const code = await publicClient?.getBytecode({
        address: deployedContract.address as Address
      });

      if (!code || code === "0x") {
        status = ContractCodeStatus.NOT_FOUND;
        return;
      }
      status = ContractCodeStatus.DEPLOYED;
    };

    checkContractDeployment();
  });

  return () => ({
    data: status === ContractCodeStatus.DEPLOYED ? deployedContract : undefined,
    isLoading: status === ContractCodeStatus.LOADING
  });
};