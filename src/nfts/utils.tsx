export const DISABLE_SELL = ['327ubUZkUUAEdeWvyQYh1Ycs9mt6yDnt7jDAW47U3krw'];
export const PUBLIC_KEY_GOD = 'BJa7dq3bRP216zaTdw4cdcV71WkPc1HXvmnGeFVDi5DC';

export const hasMoreImages = (publicKeyString: string): [any, boolean] => {
  switch (publicKeyString) {
    case '7TRzvCqXN8KSXggbSyeEG2Z9YBBhEFmbtmv6FLbd4mmd':
      return [
        [
          require(`../assets/nfts/${publicKeyString}/${publicKeyString}.jpg`),
          require(`../assets/nfts/${publicKeyString}/${publicKeyString}-1.jpg`),
          require(`../assets/nfts/${publicKeyString}/${publicKeyString}-2.jpg`),
        ],
        true,
      ];
    case '8xH9FWLA5wbETiV6WM1yUUbAnSE3N2pZqZR6WW3aUQTJ':
      return [
        [
          require(`../assets/nfts/${publicKeyString}/${publicKeyString}.png`),
          require(`../assets/nfts/${publicKeyString}/${publicKeyString}-1.jpg`),
          require(`../assets/nfts/${publicKeyString}/${publicKeyString}-2.jpg`),
        ],
        true,
      ];

    default:
      return [[], false];
  }
};
