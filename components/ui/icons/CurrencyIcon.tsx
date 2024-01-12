import { cn } from '@/libs/utils';
import {forwardRef, type HTMLAttributes} from 'react';

const CurrencyIcon = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn('rounded-lg border border-neutral-4 bg-card text-card-foreground shadow-sm', className)}
        {...props}
    />
));
CurrencyIcon.displayName = "CurrencyIcon"

export default CurrencyIcon;
