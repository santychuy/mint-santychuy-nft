import type { FC, Dispatch, SetStateAction } from 'react';

interface StepperProps {
  mintAmmount: number;
  setMintAmmount: Dispatch<SetStateAction<number>>;
}

const Stepper: FC<StepperProps> = ({ mintAmmount, setMintAmmount }) => {
  const decrementMint = () => {
    if (mintAmmount !== 1) setMintAmmount(mintAmmount - 1);
  };

  const incrementMint = () => {
    if (mintAmmount !== 3) setMintAmmount(mintAmmount + 1);
  };

  return (
    <div>
      <button type="button" onClick={decrementMint}>
        -
      </button>
      <input type="number" value={mintAmmount} />
      <button type="button" onClick={incrementMint}>
        +
      </button>
    </div>
  );
};

export default Stepper;
