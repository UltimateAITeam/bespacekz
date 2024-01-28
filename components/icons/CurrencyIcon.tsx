import {cn} from '@/libs/utils';
import {forwardRef, type HTMLAttributes} from 'react';

interface CurrencyIconProps {
    currency: CurrencyIconType;
}

export type CurrencyIconType = 'KZT' | 'USD' | 'EUR' | 'RUB'

const CURRENCY_MAP: Record<CurrencyIconType, {value: string}> = {
    KZT: {value: '₸'},
    EUR: {value: '€'},
    USD: {value: '$'},
    RUB: {value: '₽'}
} 
// forwardRef<Type for ref, Type for props>()
const CurrencyIcon = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement> & CurrencyIconProps>(
    ({className, currency, ...props}, ref) => {
        return (
            <span
                ref={ref}
                className={cn('w-[1em] h-[1em] text-center align-middle shrink-0 !leading-none', className)}
                {...props}>
                {CURRENCY_MAP[currency].value}
            </span>
        );
    }
);
CurrencyIcon.displayName = 'CurrencyIcon';

export default CurrencyIcon;
