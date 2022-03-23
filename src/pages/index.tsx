import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';

import santychuyNFT from '../../artifacts/contracts/SantychuyNFT.sol/SantychuyNFT.json';
import { santychuyNFTAddress } from '../constants/nft';
import NavBar from '../components/NavBar';
import Stepper from '../components/Stepper';
import styles from '../styles/home.module.css';

const IndexPage = () => {
  const [account, setAccount] = useState<Partial<unknown>>();
  const [mintAmmount, setMintAmmount] = useState(1);

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
        alert(
          `Succesfull mint! Here is the transaction of your mint: ${res.hash}`
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <NavBar accountsWallet={account} setAccount={setAccount} />
      <main className={styles.container}>
        <h1>Welcome to Santychuy NFT Collection 👋</h1>
        <p>The worst styled Mint Page 😅 (soon to be styled)</p>
        <p>This is only to experiment experience the mint process</p>

        {account && (
          <div className={styles.mintContainer}>
            <Stepper
              mintAmmount={mintAmmount}
              setMintAmmount={setMintAmmount}
            />

            <button className={styles.btn} type="button" onClick={handleMint}>
              Mint Now
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default IndexPage;
