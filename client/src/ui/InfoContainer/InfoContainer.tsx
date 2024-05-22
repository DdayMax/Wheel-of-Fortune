import { FC } from "react";
import "./InfoContainer.css";

interface Iprops {
  title: string;
  info: string | number;
}

export const InfoContainer: FC<Iprops> = ({ title, info }) => {
  return (
    <div className="info-container">
      <span>{title}</span>
      <span>{info}</span>
    </div>
  );
};
