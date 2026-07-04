export interface SupportOption {
  title: string;
  price: number;
  currency: string;
  isOneTime: boolean;
  description: string;
  benefits: string[];
  impact: string;
  isHighlighted?: boolean;
  externalUrl: string;
}

/** Symbol used to render a price for a given ISO currency code. */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  RSD: 'RSD ',
};

/** Format a support option's price with the correct currency symbol. */
export function formatSupportPrice(option: Pick<SupportOption, 'price' | 'currency'>): string {
  const symbol = CURRENCY_SYMBOLS[option.currency] ?? '';
  return `${symbol}${option.price}`;
}

export const supportOptions: SupportOption[] = [
  {
    title: 'Kafa',
    price: 5,
    currency: 'USD',
    isOneTime: true,
    externalUrl: 'https://buymeacoffee.com/duxor',
    description: 'Jednokratna podrška, bez obaveza.',
    impact: 'Pokrivaš troškove servera za nekoliko dana rada zajednice.',
    benefits: [
      'Jednokratna donacija',
      'Bez pretplate i obaveza',
      'Naša iskrena zahvalnost 🙏',
    ],
  },
  {
    title: 'Član',
    price: 20,
    currency: 'USD',
    isOneTime: false,
    isHighlighted: true,
    externalUrl: 'https://buymeacoffee.com/duxor/membership',
    description: 'Mesečna podrška koja održava zajednicu u pogonu.',
    impact: 'Održavaš infrastrukturu, alate i razvoj aktivnih projekata.',
    benefits: [
      'Sve iz „Kafa" opcije',
      'Redovna mesečna podrška',
      'Značka podržavaoca u zajednici',
      'Prioritet pri glasanju o pravcu razvoja',
    ],
  },
  {
    title: 'Pokrovitelj',
    price: 990,
    currency: 'USD',
    isOneTime: false,
    externalUrl: 'https://buymeacoffee.com/duxor/membership',
    description: 'Za kompanije i organizacije koje veruju u misiju.',
    impact: 'Omogućavaš skaliranje projekata, mentorstvo i nove inicijative.',
    benefits: [
      'Sve iz „Član" opcije',
      'Logo/ime organizacije na sajtu',
      'Pomen u mesečnom izveštaju o utrošku',
      'Direktan kontakt sa timom zajednice',
    ],
  },
];

/**
 * @deprecated Use SupportOption and supportOptions instead.
 */
export type DonationOption = SupportOption;

/**
 * @deprecated Use supportOptions instead.
 */
export const donationOptions = supportOptions;
