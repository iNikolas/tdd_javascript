import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  slots?: React.ReactNode[];
}
