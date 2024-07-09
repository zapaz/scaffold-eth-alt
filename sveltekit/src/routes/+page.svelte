<script lang="ts">
	import { onMount } from "svelte";

	import type { PublicClient } from "viem";
	import { sepolia } from "viem/chains";

	import type { GetContractReturnGenericType } from "$lib/types";
	import { counter } from "$lib/counter";

	let num: bigint = -1n;
	let counterContract: GetContractReturnGenericType;
	let publicClient: PublicClient;

	const refresh = async (hash?: `0x{string}`) => {
		if (hash) {
			console.log("hash", hash);
			await publicClient.waitForTransactionReceipt({ hash });
		}
		num = await counterContract.read.number();
	};
	const inc = async () => await refresh(await counterContract.write.increment());
	const set = async () => await refresh(await counterContract.write.setNumber([42n]));

	onMount(async () => {
		({ contract: counterContract, publicClient } = await counter(sepolia));
		refresh();
	});
</script>

<h1>Kredeum Template</h1>

<h2>
	Counter: {num >= 0 ? num : "***"}
</h2>

<button on:click={inc}> Increment </button>

<button on:click={set}> Set </button>
