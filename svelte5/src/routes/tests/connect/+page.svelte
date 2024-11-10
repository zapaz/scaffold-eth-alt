<script lang="ts">
  import { Connect } from "$lib/wagmi/components";

  let chainId = $state(undefined);
  let address = $state(undefined);
  let name = $state(undefined);

  $inspect("address:", address);
</script>

<div class="p-8">
  <Connect bind:chainId bind:address bind:name />
</div>

<div class="px-8">
  name: {name}
</div>
<div class="px-8">
  address: {address}
</div>
<div class="px-8">
  chainId: {chainId}
</div>
