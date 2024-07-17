import scaffoldConfig from "$lib/scaffold.config";
import { contracts } from "$lib/utils/scaffold-eth/contract";
import { createAccount } from "@byteatatime/wagmi-svelte";



const getAllContracts = () => {
  // const { chain } = $derived.by(createAccount());

  console.log("getAllContracts ~ contracts:", contracts);
  const contractsData = contracts?.[31337];

  return contractsData ? contractsData : {};
}

export { getAllContracts };