<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import AddressComponent from "../_components/AddressComponent.svelte";

	let address = $state("");
	let contractData: any;

	$effect(() => {
		address = $page.url.hash.slice(1);
	});
</script>

<AddressComponent {address} {contractData} />
