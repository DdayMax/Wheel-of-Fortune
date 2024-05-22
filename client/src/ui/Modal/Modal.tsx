import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface IProps {
  show: boolean;
  children: ReactNode;
}

export const Modal: FC<IProps> = ({ show, children }) => {
  if (!show) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
