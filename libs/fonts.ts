import {Roboto, Inter} from 'next/font/google';

export const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['400', '500', '700'],
});

export const inter = Inter({subsets: ['latin'], variable: '--font-inter'});
