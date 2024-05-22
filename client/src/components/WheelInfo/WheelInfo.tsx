import { FC } from "react";
import { InfoContainer } from "../../ui/InfoContainer/InfoContainer";
import { MainBtn } from "../../ui/MainBtn/MainBtn";
import "./Wheelinfo.css";

interface IProps {
  handleSpinClick: () => void;
  balance: number;
  disabled: boolean;
}

export const WheelInfo: FC<IProps> = ({
  handleSpinClick,
  balance,
  disabled,
}) => {
  const handleClick = () => {
    handleSpinClick();
  };
  return (
    <div className="wheel-info">
      <InfoContainer title="JACKPOT" info={1000} />
      <InfoContainer title="BALANCE" info={balance} />
      <MainBtn onClick={handleClick} disabled={disabled}>
        <span>SPIN</span>
        <span>WHEEL</span>
      </MainBtn>
    </div>
  );
};
