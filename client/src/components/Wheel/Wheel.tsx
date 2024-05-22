import { Wheel as WheelOfFortune } from "react-custom-roulette";
import { IDATA } from "../../data/wheelOption";
import { FC } from "react";
import "./Wheel.css";

interface IProps {
  mustSpin: boolean;
  prizeNumber: number;
  data: IDATA;
  onStopSpinning: () => void;
  startingOptionIndex: number;
}

export const Wheel: FC<IProps> = ({
  mustSpin,
  prizeNumber,
  data,
  onStopSpinning,
  startingOptionIndex,
}) => {
  return (
    <div className="Wheel">
      <WheelOfFortune
        spinDuration={0.27}
        mustStartSpinning={mustSpin}
        backgroundColors={["#ffd600", "#303030"]}
        prizeNumber={prizeNumber}
        data={data}
        innerBorderWidth={0}
        radiusLineWidth={0}
        textColors={["white"]}
        perpendicularText={true}
        textDistance={80}
        startingOptionIndex={startingOptionIndex}
        onStopSpinning={onStopSpinning}
      />
    </div>
  );
};
