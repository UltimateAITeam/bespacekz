const {fontFamily} = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            /* screens: {
        "2xl": "1400px",
      }, */
        },
        extend: {
            fontFamily: {
                roboto: ['var(--font-roboto)', ...fontFamily.sans],
                inter: ['var(--font-inter)', ...fontFamily.sans],
                'dm-sans': ['var(--font-dm-sans)', ...fontFamily.sans],
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    // DEFAULT: 'hsl(var(--primary))',
                    foreground: '#FFF',
                    text: '#1A3353',
                    5: 'rgba(54, 110, 246, 0.7)',
                    6: '#366EF6',
                    10: '#002766'
                },
                secondary: {
                    DEFAULT: 'rgba(114, 132, 154, 1)',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                neutral: {
                    background: '#F0F0F0',
                    foreground: '#C1C1C1',
                    4: '#F0F0F0',
                },
                footerBg: '#030852',
                cardBg: '#F0F5FF'
                // mainBg: '#F3FFFC',
                // firstStepsBg: '#F0F5FF',
                // 'character-secondary': '#72849A'
            },
            borderRadius: {
                lg: '15px',
            },
            keyframes: {
                'accordion-down': {
                    from: {height: '0'},
                    to: {height: 'var(--radix-accordion-content-height)'},
                },
                'accordion-up': {
                    from: {height: 'var(--radix-accordion-content-height)'},
                    to: {height: '0'},
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
};
