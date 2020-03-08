import React from "react";
import { createAxComponent } from "./createAxComponent";

const defineElement = <Props extends {} = any>(tag: string) =>
  React.forwardRef(
    (props: Props, ref: any) =>
      React.createElement<Props>(tag, { ...props, ref })
  );

export const Aquedux = {
  div: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLDivElement>>('div'),
    { style: true }
  ),
  span: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLSpanElement>>('span'),
    { style: true }
  ),
  a: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLAnchorElement>>('a'),
    { style: true }
  ),
  p: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLParagraphElement>>('p'),
    { style: true }
  ),
  img: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLIFrameElement>>('img'),
    { style: true }
  ),
  table: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLTableElement>>('table'),
    { style: true }
  ),
  tr: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLTableRowElement>>('tr'),
    { style: true }
  ),
  td: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLTableDataCellElement>>('td'),
    { style: true }
  ),
  th: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLTableHeaderCellElement>>('th'),
    { style: true }
  )
};
