
export type CurrencyIconType = 'KZT' | 'USD' | 'EUR' | 'RUB'

export const CURRENCY_MAP: Record<CurrencyIconType, {value: string}> = {
    KZT: {value: '₸'},
    EUR: {value: '€'},
    USD: {value: '$'},
    RUB: {value: '₽'}
} 