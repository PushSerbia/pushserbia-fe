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

export const supportOptions: SupportOption[] = [
  {
    title: 'Member',
    price: 20,
    currency: 'USD',
    isOneTime: false,
    isHighlighted: true,
    externalUrl: 'https://buymeacoffee.com/duxor/membership',
    description: 'Mesečna podrška za održavanje i razvoj zajednice.',
    impact:
      'Sa $20 mesečno direktno podržavaš infrastrukturu i projekte zajednice.',
    benefits: ['Community membership.'],
  },
  {
    title: 'Angel',
    price: 990,
    currency: 'USD',
    isOneTime: false,
    externalUrl: 'https://buymeacoffee.com/duxor/membership',
    description: 'Premium podrška za dugoročnu održivost zajednice.',
    impact:
      'Sa $990 mesečno omogućavaš skaliranje projekata i širenje zajednice.',
    benefits: ['Community membership.'],
  },
  {
    title: 'Buy me a coffee',
    price: 5,
    currency: 'USD',
    isOneTime: true,
    externalUrl: 'https://buymeacoffee.com/duxor',
    description: 'Jednokratna podrška bez obaveza.',
    impact:
      'Tvoja jednokratna donacija direktno finansira razvoj projekata.',
    benefits: ['Community membership.'],
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
