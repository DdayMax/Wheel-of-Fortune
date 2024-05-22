import { FC, ReactNode } from "react";
import "./MainBtn.css";

interface Iprops {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}

export const MainBtn: FC<Iprops> = ({ children, onClick, disabled }) => {
  return (
    <div className="main-btn__wrapper">
      <button className="main-btn__btn" onClick={onClick} disabled={disabled}>
        <div className="main-btn__text">{children}</div>
      </button>
    </div>
  );
};
