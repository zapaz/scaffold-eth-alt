import { main } from '../dist/ens-viem.js';

main({ method: "GET", path: "/zapaz.eth" }).then(console.log).catch(console.error);