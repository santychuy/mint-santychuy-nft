import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';

import santychuyNFT from '../../artifacts/contracts/SantychuyNFT.sol/SantychuyNFT.json';
import { santychuyNFTAddress } from '../constants/nft';

const IndexPage = () => {
  const [account, setAccount] = useState<Partial<unknown>>();
  const [mintAmmount, setMintAmmount] = useState(1);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccount(accounts);
    }
  };

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider
      );

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        santychuyNFTAddress,
        santychuyNFT.abi,
        signer
      );

      try {
        const res = await contract.mint(BigNumber.from(mintAmmount), {
          value: ethers.utils.parseEther((0.02 * mintAmmount).toString()),
        });
        console.log('response', res);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const decrementMint = () => {
    if (mintAmmount !== 1) setMintAmmount(mintAmmount - 1);
  };

  const incrementMint = () => {
    if (mintAmmount !== 3) setMintAmmount(mintAmmount + 1);
  };

  return (
    <main>
      <h1>Welcome to Santychuy NFT Collection 👋</h1>

      {account ? (
        <h1>Connected</h1>
      ) : (
        <button type="button" onClick={connectAccount}>
          Connect
        </button>
      )}

      {account && (
        <div>
          <button type="button" onClick={decrementMint}>
            -
          </button>
          <input type="number" value={mintAmmount} />
          <button type="button" onClick={incrementMint}>
            +
          </button>

          <button type="button" onClick={handleMint}>
            Mint Now
          </button>
        </div>
      )}
    </main>
  );
};

export default IndexPage;
