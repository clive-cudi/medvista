import { MouseEvent, CSSProperties, ReactNode, useEffect } from "react";
import styles from "../../../styles/components/reusable/table/table.module.scss";

interface TableRow_Props {
  rowData: any[];
  clickable?: boolean;
  onClick?: (e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => void;
  emptyMessage?: string;
  headers: string[] | Element[] | ReactNode[]
  identifier: string
}

export const TableRow = ({
  rowData,
  clickable,
  onClick,
  emptyMessage,
  headers,
  identifier
}: TableRow_Props) => {
  const rowStyling: CSSProperties = {
    borderBottom: "0.5px solid yellow",
  };

  return (
    <tr
      onClick={(e) => {
        if (clickable && onClick) {
          onClick(e);
        }
      }}
      className={clickable ? styles.tr_clickable : ""}
    >
      {rowData.length > 0 ? (
        rowData.map((cell, i) => {     
            return <td key={i}>{cell}</td>;
        })
      ) : (
        <td key={20} colSpan={headers.length} data-elm-type={"empty-table-row"}>{emptyMessage ?? "No data to display"}</td>
      )}
    </tr>
  );
};