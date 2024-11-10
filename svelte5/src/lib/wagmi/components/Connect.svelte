<script lang="ts">
  import { type Config, createConfig, connect, http } from "@wagmi/core";
  import { mainnet, baseSepolia, optimismSepolia } from "viem/chains";
  import {
    injected,
    metaMask,
    coinbaseWallet,
    // safe as safeFunc,
    walletConnect as walletConnectFunc
  } from "@wagmi/connectors";
  import scaffoldConfig from "$lib/scaffold.config";
  import type { Address } from "viem";

  let {
    chainId = $bindable(),
    address = $bindable(),
    name = $bindable()
  }: { chainId?: number; address?: Address; name?: string } = $props();

  let buttonSelected = $state("btn-default");

  const chains = [mainnet, baseSepolia, optimismSepolia] as const;

  const walletConnect = () => walletConnectFunc({ projectId: scaffoldConfig.walletConnectProjectId });
  // const safe = () => safeFunc({  allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/], debug: true });

  const connectors = [injected(), metaMask(), coinbaseWallet(), walletConnect()]; //, safe()];
  type Connector = (typeof connectors)[number];

  const transports = {
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
    [optimismSepolia.id]: http()
  };
  const config: Config<typeof chains, typeof transports> = createConfig({ chains, connectors, transports });

  let connectModal: HTMLInputElement | undefined = $state();
  $effect(() => {
    connectModal = document.getElementById("connect-modal") as HTMLInputElement;
  });

  const connectWallet = async (connectorFunc: () => Connector) => {
    if (connectModal) connectModal.checked = false;

    name = connectorFunc.name;
    chainId = undefined;
    address = undefined;

    const wallet = await connect(config, { connector: connectorFunc() });

    chainId = wallet.chainId;
    address = wallet.accounts[0];
  };
</script>

<label for="connect-modal" class="btn btn-primary btn-sm"> Connect Wallet </label>
<input type="checkbox" id="connect-modal" class="modal-toggle" />

<label for="connect-modal" class="modal cursor-pointer">
  <label class="modal-box relative w-64 bg-secondary">
    <input class="absolute left-0 top-0 h-0 w-0" />
    <h3 class="mb-3 text-xl font-bold text-center">Connect Wallet</h3>
    <label for="connect-modal" class="btn btn-circle btn-ghost btn-sm absolute right-3 top-3 text-xl"> &times; </label>
    <ul class="space-y-4 text-center">
      {@render connectBlock(injected, "Injected Wallet")}
      {@render connectBlock(metaMask, "Metamask")}
      {@render connectBlock(coinbaseWallet, "Coinbase Wallet")}
      {@render connectBlock(walletConnect, "WalletConnect")}
      <!-- {@render connectBlock(safe, "Safe Wallet")} -->
    </ul>
  </label>
</label>

{#snippet connectBlock(connectFunc: () => Connector, connectTitle: string)}
  <li class="flex align-center">
    <img src="/{connectFunc.name}.svg" alt={connectTitle} class="w-8 h-8 mr-2" />
    <button
      class="btn btn-default btn-sm w-40 {name === connectFunc.name ? 'btn-accent' : ''}"
      onclick={() => connectWallet(connectFunc)}
    >
      {connectTitle}
    </button>
  </li>
{/snippet}
