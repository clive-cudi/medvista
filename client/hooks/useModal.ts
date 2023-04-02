import { useContext, ReactNode } from "react";
import { ModalCtx, modalCtx_Props } from "@/context";

export function useModal() {
  const { modal, setModal } = useContext(ModalCtx) as modalCtx_Props;

  function closeModal() {
    setModal({
      open: false,
      data: null,
    });
  }

  function toggleModal(data: JSX.Element | ReactNode | null): {
    isOpen: boolean;
  } {
    if (modal.open) {
      setModal({
        open: false,
        data: null,
      });

      return { isOpen: false };
    } else {
      setModal({
        open: true,
        data: data,
      });

      return { isOpen: true };
    }
  }

  function openModal(
    data: JSX.Element | ReactNode | null,
    usePrevious?: boolean,
    withTimeout?: {
      status: boolean;
      timeOut: number;
    },
    outerClickClose?: boolean,
  ): { isOpen: boolean; data: JSX.Element | ReactNode | null } {
    const prevElm = modal.data;
    setModal({
      open: true,
      data: usePrevious ? prevElm : data,
      autoClose: {
        status: withTimeout?.status ? withTimeout?.status : false,
        closeTimeOut: withTimeout?.timeOut ? withTimeout?.timeOut : 10,
      },
      outerClickClose: outerClickClose ?? false,
    });

    return {
      isOpen: true,
      data: data,
    };
  }

  return {
    modal,
    closeModal,
    toggleModal,
    openModal,
  };
}
