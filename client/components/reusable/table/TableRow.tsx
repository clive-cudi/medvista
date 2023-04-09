import { MouseEvent, CSSProperties, ReactNode, useEffect } from "react";
import styles from "../../../styles/components/reusable/table/table.module.scss";

interface TableRow_Props {
  rowData: any[];
  clickable?: boolean;
  onClick?: (e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => void;
  emptyMessage?: string;
  headers: string[] | Element[] | ReactNode[]
}

export const TableRow = ({
  rowData,
  clickable,
  onClick,
  emptyMessage,
  headers
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
        {/* add functionality for rendering special components in cells since the arrays are limited to a single data type */}
        {/* represent special components with strings using a specific unique format and the component ID passed on to a renderer function that renders the corresponding component with its ID */}
        {/* __component@componentID */}
      {rowData.length > 0 ? (
        rowData.map((cell, i) => {
        //   typecheck the cell since renderbyID reference will work on strings only        
            return <td key={i}>{cell}</td>;
        })
      ) : (
        <td key={20} colSpan={headers.length} data-elm-type={"empty-table-row"}>{emptyMessage ?? "No data to display"}</td>
      )}
    </tr>
  );
};