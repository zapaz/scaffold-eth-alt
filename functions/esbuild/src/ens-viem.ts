import { Address, createPublicClient, formatEther, http } from "viem";
import { normalize } from "viem/ens";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

const ens = (() => {
  const getName = async (address: string): Promise<string> => {
    let name: string | null = null;

    try {
      name = await publicClient.getEnsName({ address: address as Address });
    } catch (e) {
      console.error("ENS lookupAddress not found");
    }

    console.log("getName", address, "=>", name);
    return name || address || "";
  };

  const getAddress = async (name: string): Promise<string> => {
    let address: string | null = null;

    try {
      address = await publicClient.getEnsAddress({ name });
    } catch (e) {
      console.error("ENS resolveAddress not found");
    }

    console.log("getAddress", address, "=>", address);
    return address || "";
  };

  const getAvatar = async (address: string): Promise<string> => {
    let avatar: string | null = null;

    try {
      // avatar = await ensProvider.getAvatar(address);
      avatar = await publicClient.getEnsAvatar({
        name: normalize(address)
      });
    } catch (e) {
      console.error("ENS lookupAddress not found");
    }

    // console.log("getAvatar", address, "=>", avatar);
    return avatar || "";
  };

  return { getName, getAddress, getAvatar };
})();

export const main = async ({ path }) => {
  try {
    const ensDomain = path?.slice(1) || 'vitalik.eth';
    const address = await ens.getAddress(ensDomain);
    const reverseName = await ens.getName(address);
    const ethBalance = formatEther(await publicClient.getBalance({ address: address as Address }));

    return `<html>
    <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f0f0f0; padding: 20px;">
      <h1 style="color: #333;">ENS Lookup</h1>
      <p style="font-size: 18px;">ENS domain: <strong>${ensDomain}</strong></p>
      <p style="font-size: 18px;">Address: <strong>${address}</strong></p>
      <p style="font-size: 18px;">Balance: <strong>${ethBalance} ETH</strong></p>
      ${reverseName
        ? `<p style="font-size: 18px;">Reverse ENS: <strong>${reverseName}</strong></p>`
        : ''
      }
      </body>
      </html>`;
  } catch (error) {
    console.error('Error:', error.message);
    return `<html>
    <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f0f0f0; padding: 20px;">
      <h1 style="color: red;">Error</h1>
      <p style="font-size: 18px;">${error.message}</p>
    </body>
    </html>`;
  }
};
