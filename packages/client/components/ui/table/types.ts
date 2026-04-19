import React from "react";

interface HeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  key: string;
}

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  heads?: HeadProps[];
}
