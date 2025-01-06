import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

// Styled component for the modal window
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

// Styled component for the overlay (background behind the modal)
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

// Styled component for the close button
const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

// Create a Context to manage modal state
const ModalContext = createContext();

/**
 * Main Modal component that provides the context for controlling modal state.
 * It wraps children components and provides open/close functionality via context.
 */
function Modal({ children }) {
  const [openName, setOpenName] = useState(""); // State to track the name of the open modal

  const close = () => setOpenName(""); // Function to close the modal
  const open = setOpenName; // Function to open the modal with a specific name

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

/**
 * Component to trigger opening a modal window.
 * It passes an `onClick` event to the wrapped children to open the modal.
 */
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // Clone the child element and add an onClick handler to open the modal
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

/**
 * Component for rendering the modal window.
 * Displays the modal if the provided name matches the currently open modal's name.
 */
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  // Only render the modal if the name matches the openName
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// Attach the Open and Window components to the Modal component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
