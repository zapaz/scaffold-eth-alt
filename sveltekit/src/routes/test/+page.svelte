<script lang="ts">
	import { onMount } from "svelte";
	import { runDeployedContracts } from "$lib/contracts/deployedContracts";

	onMount(() => {
		runDeployedContracts();
	});
</script>
