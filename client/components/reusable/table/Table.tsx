import { MouseEvent } from "react";
import styles from "../../../styles/components/reusable/table/table.module.scss";
import { TableRow } from "./TableRow";

interface Table_Props {
  tableConfig?: {
    headers: string[] | JSX.Element[] | React.ReactNode[];
    data: string[][];
    identifiers: string[];
  };
  className?: string;
  clickableRows?: boolean;
  onClickHandler?: (
    e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
    clickedRow: {index: number, identifier: string}
  ) => void;
  emptyMessage?: string
}

export const Table = ({
  tableConfig,
  className,
  clickableRows,
  onClickHandler,
  emptyMessage
}: Table_Props) => {
  return (
    <table className={`${styles.table} ${className ?? ""}`}>
      <thead>
        <tr>
          {tableConfig?.headers.map((header, ix) => {
            return (
              <th key={ix}>
                {typeof header == "string" ? <h4>{header}</h4> : header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableConfig?.data && tableConfig?.data.length > 0 ? (
          tableConfig?.data.map((rowData, index) => {
            return (
              <TableRow
                key={index}
                rowData={rowData}
                clickable={clickableRows ?? false}
                onClick={(e) => {
                  if (clickableRows && onClickHandler) {
                    onClickHandler(e, {index, identifier: tableConfig.identifiers[index]});
                  }
                }}
                headers={tableConfig.headers}
                identifier={tableConfig.identifiers[index]}
              />
            );
          })
        ) : (
          <TableRow rowData={[]} identifier={""} headers={tableConfig?.headers as string[]} emptyMessage={emptyMessage} />
        )}
      </tbody>
    </table>
  );
};
