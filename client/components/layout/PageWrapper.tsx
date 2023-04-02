import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "@styles/components/layout/pageWrapper.module.scss";
import { Header, Header_props, Modal } from "../reusable";
import { useModal, useContextMenu } from "@/hooks";
import { ContextMenuWrapper } from "./ContextMenuWrapper";

interface PageWrapper_Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: any;
  className?: string;
}

export const PageWrapper = ({
  children,
  className,
  ...other
}: PageWrapper_Props): JSX.Element => {
  const { modal } = useModal();
  const { ctxMenu } = useContextMenu();

  return (
  <main
    className={`app ${styles.page_container_wrapper} ${className}`}
    data-elm-type={"page_container"}
    {...other}
  >
    <div
      className={`content ${styles.page_container_content}`}
      data-elm-type={"page_content"}
    >
      {children}
    </div>
    {modal.open === true && <Modal data={modal.data} />}
    {ctxMenu.open === true && <ContextMenuWrapper elmList={ctxMenu.elements ?? []} />}
  </main>
)};
