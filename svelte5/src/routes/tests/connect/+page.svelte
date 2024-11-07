<script lang="ts">
  import { createConfig, connect, getBalance, getEnsName, http } from "@wagmi/core";
  import { mainnet, baseSepolia, optimismSepolia } from "viem/chains";
  import { injected, metaMask, coinbaseWallet, walletConnect } from "@wagmi/connectors";
  import scaffoldConfig from "$lib/scaffold.config";

  const projectId = scaffoldConfig.walletConnectProjectId;
  const connectors = [injected(), metaMask(), coinbaseWallet(), walletConnect({ projectId })];
  const chains = [mainnet, baseSepolia, optimismSepolia] as const;
  const transports = {
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
    [optimismSepolia.id]: http()
  };
  const config = createConfig({ chains, connectors, transports });

  let connectModal: HTMLInputElement | undefined = $state();
  $effect(() => {
    connectModal = document.getElementById("faucet-modal") as HTMLInputElement;
  });

  const connectWallet = async (index: 0 | 1 | 2 | 3) => {
    if (connectModal) connectModal.checked = false;

    const { chainId, accounts } = await connect(config, { connector: connectors[index] });
    console.log("connectWallet ~ connect:", chainId, accounts[0]);
  };
</script>

<div class="m-8">
  <label for="faucet-modal" class="btn btn-primary btn-sm"> Connect Wallet </label>
  <input type="checkbox" id="faucet-modal" class="modal-toggle" />

  <label for="faucet-modal" class="modal cursor-pointer">
    <label class="modal-box relative w-64">
      <input class="absolute left-0 top-0 h-0 w-0" />
      <h3 class="mb-3 text-xl font-bold">Connect Wallet</h3>
      <label for="faucet-modal" class="btn btn-circle btn-ghost btn-sm absolute right-3 top-3 text-xl"> &times; </label>
      <ul class=" space-y-4">
        <li><button class="btn btn-default btn-sm" onclick={() => connectWallet(0)}>Injected wallet</button></li>
        <li><button class="btn btn-default btn-sm" onclick={() => connectWallet(1)}>Metamask</button></li>
        <li><button class="btn btn-default btn-sm" onclick={() => connectWallet(2)}>Coinbase wallet</button></li>
        <li><button class="btn btn-default btn-sm" onclick={() => connectWallet(3)}>WalletConnect</button></li>
      </ul>
    </label>
  </label>
</div>
