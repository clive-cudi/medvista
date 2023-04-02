import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "@styles/components/layout/pageWrapper.module.scss";
import { Header, Header_props } from "../reusable";

interface PageWrapper_Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: any;
  className?: string;
}

export const PageWrapper = ({
  children,
  className,
  ...other
}: PageWrapper_Props): JSX.Element => (
  <main
    className={`${styles.page_container_wrapper} ${className}`}
    data-elm-type={"page_container"}
    {...other}
  >
    <div
      className={styles.page_container_content}
      data-elm-type={"page_content"}
    >
      {children}
    </div>
  </main>
);
