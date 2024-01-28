import { Accordion } from '@chakra-ui/react';
import {FC} from 'react';

interface IAsideFilter {
  defaultOpenIndex?: number | number[],
  children: React.ReactNode,
  allowMultiple?: boolean
}

export const AsideFilter: FC<IAsideFilter>  = ({allowMultiple = true, defaultOpenIndex ,children}) => {
  return (
    <Accordion defaultIndex={defaultOpenIndex} allowMultiple={allowMultiple}>{children}</Accordion>
  );
};
