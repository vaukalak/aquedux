import React from "react";
import { createRxComponent } from "./createRxComponent";

const defineElement = <Props extends {} = any>(tag: string) =>
  React.forwardRef(
    (props: Props, ref: any) =>
      React.createElement<Props>(tag, { ...props, ref })
  );

export const RxComponents = {
  div: createRxComponent(
    defineElement<React.HTMLAttributes<HTMLDivElement>>('div'),
    { style: true }
  ),
  span: createRxComponent(
    defineElement<React.HTMLAttributes<HTMLSpanElement>>('span'),
    { style: true }
  ),
  a: createRxComponent(
    defineElement<React.HTMLAttributes<HTMLAnchorElement>>('a'),
    { style: true }
  ),
  p: createRxComponent(
    defineElement<React.HTMLAttributes<HTMLParagraphElement>>('p'),
    { style: true }
  ),
  table: createRxComponent(
    defineElement<React.HTMLAttributes<HTMLTableElement>>('table'),
    { style: true }
  ),
  tr: createRxComponent(
    defineElement<React.HTMLAttributes<HTMLTableRowElement>>('tr'),
    { style: true }
  ),
  td: createRxComponent(
    defineElement<React.HTMLAttributes<HTMLTableDataCellElement>>('td'),
    { style: true }
  ),
  th: createRxComponent(
    defineElement<React.HTMLAttributes<HTMLTableHeaderCellElement>>('th'),
    { style: true }
  )
};
