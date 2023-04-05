import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import styles from "@styles/components/layout/pageWrapper.module.scss";
import { Header, Header_props, Modal, PageLoadingStrip } from "../reusable";
import { useModal, useContextMenu, usePageLoading } from "@/hooks";
import { ContextMenuWrapper } from "./ContextMenuWrapper";
import { useSession } from "next-auth/react";

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
  const { isPageLoading } = usePageLoading();
  const session = useSession();

  useEffect(() => {console.log(session)}, [session])

  return (
  <main
    className={`app ${styles.page_container_wrapper} ${className}`}
    data-elm-type={"page_container"}
    {...other}
  >
    {isPageLoading === true ? <PageLoadingStrip /> : null}
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
