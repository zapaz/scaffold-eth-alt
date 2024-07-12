<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import AddressComponent from "../_components/AddressComponent.svelte";

	let address: string;
	let contractData: any;

	const updateAddress = () => {
		address = $page.url.hash.slice(1);
		console.log("updateAddress ~ address:", address);
	};

	onMount(updateAddress);
</script>

<AddressComponent {address} {contractData} />

