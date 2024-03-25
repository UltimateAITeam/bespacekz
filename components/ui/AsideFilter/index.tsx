"use client";

import { Accordion } from "@chakra-ui/react";
import { FC, Children, useMemo } from "react";

interface IAsideFilter {
  defaultOpenIndex?: number | number[];
  allOpenIndex?: boolean;
  children: React.ReactNode;
  allowMultiple?: boolean;
}

export const AsideFilter: FC<IAsideFilter> = ({
  allowMultiple = true,
  allOpenIndex,
  defaultOpenIndex,
  children,
}) => {
  const arrayWithAllChildrenIndex = useMemo<number[]>(() => {
    return Children.map(children, (_, idx) => idx) || [];
  }, [children]);
  return (
    <Accordion
      defaultIndex={allOpenIndex ? arrayWithAllChildrenIndex : defaultOpenIndex}
      allowMultiple={allowMultiple}
    >
      {children}
    </Accordion>
  );
};
