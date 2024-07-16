# scaffold-eth-alt

[scaffold-eth-alt](https://github.com/zapaz/scaffold-eth-alt) is an alternative tech stack to [scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2) while using components of [scaffold-eth-svelte](https://github.com/ByteAtATime/scaffold-eth-svelte)

Demo site on Fleek.xyz here => https://scaffold-eth-alt.on-fleek.app/

Comparison of tech stacks:

| Feature/Tool           | scaffold-eth-2                          | scaffold-eth-alt                          |
|------------------------|-------------------------------------------|-----------------------------------------|
| Smart Contract Tool    | [hardhat](https://hardhat.org/) (or [foundry](https://getfoundry.sh/)) | [foundry](https://getfoundry.sh/)         |
| Package Manager        | [yarn](https://yarnpkg.com/)            | [pnpm](https://pnpm.io/)                  |
| Task runner            | [yarn](https://yarnpkg.com/)            | [turborepo](https://turborepo.org/)       |
| Blockchain Libraries   | [viem](https://viem.sh/), [wagmi](https://wagmi.sh/) | [viem](https://viem.sh/), [wagmi](https://wagmi.sh/) |
| Smartcontract Language | [solidity](https://soliditylang.org/)   | [solidity](https://soliditylang.org/)     |
| Frontend Language      | [typescript](https://www.typescriptlang.org/) | [typescript](https://www.typescriptlang.org/) |
| Frontend Framework     | [react](https://reactjs.org/)           | [svelte5](https://svelte.dev/)            |
| Fullstack Framework    | [nextjs](https://nextjs.org/)           | [sveltekit](https://kit.svelte.dev/)      |
| Build Tool             | [webpack](https://webpack.js.org/)      | [vite](https://vitejs.dev/)               |
| CSS Framework          | [tailwindcss](https://tailwindcss.com/) | [tailwindcss](https://tailwindcss.com/)   |
| UI Library             | [daisyui](https://daisyui.com/)         | [daisyui](https://daisyui.com/)           |
| Deployment Tool        | [specific scripts](https://github.com/scaffold-eth/scaffold-eth-2/tree/main/packages/hardhat/deploy) | [forge-deploy-lite](https://github.com/zapaz/forge-deploy-lite) |
| Deployment Platform    | [vercel](https://vercel.com/)           | [fleek](https://fleek.xyz/)               |