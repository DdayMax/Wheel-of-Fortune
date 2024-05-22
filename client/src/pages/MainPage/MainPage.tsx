import { FC, useEffect, useState, useRef } from "react";
import "./MainPage.css";
import { WheelInfo } from "../../components/WheelInfo/WheelInfo";
import { WinnersList } from "../../components/WinnersList/WinnersList";
import { Wheel } from "../../components/Wheel/Wheel";
import { DATA } from "../../data/wheelOption";
import { randomIndex } from "../../utils/randomIndex";
import { updateUserOnServer } from "../../components/Api/updateUserOnServer";
import { queryClient } from "../../components/Api/queryClient";
import { IUser } from "../../components/Api/User";
import { Modal } from "../../ui/Modal";
import { MainBtn } from "../../ui/MainBtn";

const data = DATA;
const JACKPOT = 1000;
const TRYCOST = 100;

interface IProps {
  me: IUser;
}

export const MainPage: FC<IProps> = ({ me }) => {
  const [balance, setBalance] = useState(me ? me.balance : 100);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isSpinButtonClicked, setIsSpinButtonClicked] = useState(false);
  const [startingOptionIndex, setStartingOptionIndex] = useState(0);
  const [disabledSpinBtn, setDisabledSpinBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prize, setPrize] = useState(0);
  const [showNoMoneyModal, setShowNoMoneyModal] = useState(false);

  const balanceRef = useRef(balance);

  const handleSpinClick = () => {
    if (balanceRef.current >= TRYCOST) {
      setDisabledSpinBtn(true);
      setIsSpinButtonClicked(true);
      const newPrizeNumber = randomIndex(data);
      setPrizeNumber(newPrizeNumber);
      setBalance((prevBalance) => {
        balanceRef.current = prevBalance - TRYCOST;
        return balanceRef.current;
      });
    } else {
      setShowNoMoneyModal(true);
    }
  };

  useEffect(() => {
    if (isSpinButtonClicked) {
      setMustSpin(true);
      setIsSpinButtonClicked(false);
    }
  }, [isSpinButtonClicked]);

  const onStopSpinning = async () => {
    setStartingOptionIndex(prizeNumber);
    setMustSpin(false);
    setDisabledSpinBtn(false);
    const prizeValue =
      data[prizeNumber].option === "JACKPOT"
        ? JACKPOT
        : Number(data[prizeNumber].option);

    setPrize(prizeValue);
    setBalance((prevBalance) => {
      balanceRef.current = prevBalance + prizeValue;
      return balanceRef.current;
    });
    setShowModal(true);

    if (me) {
      const updatedUser = {
        ...me,
        balance: balanceRef.current,
      };

      try {
        await updateUserOnServer({
          ...updatedUser,
          amount: prizeValue === JACKPOT ? "JACKPOT" : prizeValue,
        });
        queryClient.invalidateQueries({ queryKey: ["winners"] });
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <h1 className="game__title">WHEEL OF FORTUNE</h1>
      <div className="game__wheel-and-info-wrapper">
        <Wheel
          mustSpin={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={onStopSpinning}
          startingOptionIndex={startingOptionIndex}
        />
        <WheelInfo
          handleSpinClick={handleSpinClick}
          balance={balance}
          disabled={disabledSpinBtn}
        />
      </div>
      <WinnersList />
      <Modal show={showModal}>
        <h2>YOU WIN</h2>
        <p>{prize}!</p>
        <MainBtn onClick={() => setShowModal(false)} disabled={false}>
          <span>GREAT</span>
        </MainBtn>
      </Modal>
      <Modal show={showNoMoneyModal}>
        <h2>NOT ENOUGH MONEY</h2>
        <MainBtn onClick={() => setShowNoMoneyModal(false)} disabled={false}>
          <span>OK</span>
        </MainBtn>
      </Modal>
    </>
  );
};
