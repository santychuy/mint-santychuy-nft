import type { Dispatch, FC, SetStateAction } from 'react';

import styles from './index.module.css';

interface NavBarProps {
  accountsWallet: Partial<unknown>;
  setAccount: Dispatch<SetStateAction<Partial<unknown>>>;
}

const NavBar: FC<NavBarProps> = ({ accountsWallet, setAccount }) => {
  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccount(accounts);
    }
  };

  return (
    <nav className={styles.container}>
      {!accountsWallet && (
        <button type="button" onClick={connectAccount}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default NavBar;
