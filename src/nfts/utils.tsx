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

    default:
      return [[], false];
  }
};
