import { main } from '../src/ens.js';

main({ method: "GET", path: "/zapaz.eth" }).then(console.log).catch(console.error);