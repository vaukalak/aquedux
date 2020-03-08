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
    { style: true },
    { children: "textContent" }
  ),
  span: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLSpanElement>>('span'),
    { style: true },
    { children: "textContent" }
  ),
  a: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLAnchorElement>>('a'),
    { style: true },
    { children: "textContent" }
  ),
  p: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLParagraphElement>>('p'),
    { style: true },
    { children: "textContent" }
  ),
  img: createAxComponent(
    defineElement<React.ImgHTMLAttributes<HTMLImageElement>>('img'),
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
    { style: true },
    { children: "textContent" }
  ),
  th: createAxComponent(
    defineElement<React.HTMLAttributes<HTMLTableHeaderCellElement>>('th'),
    { style: true },
    { children: "textContent" }
  )
};
