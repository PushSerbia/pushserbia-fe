export interface DonationOption {
  price: number;
  isOneTime: boolean;
  isHighlighted?: boolean;
  titleKey?: string;
  descriptionKey?: string;
  benefitsKeys?: string[];
  impactKey?: string;
}

export const donationOptions: DonationOption[] = [
  {
    price: 5,
    isOneTime: false,
    titleKey: 'LANDING.PRICING.PACKAGES.FRIEND.TITLE',
    descriptionKey: 'LANDING.PRICING.PACKAGES.FRIEND.DESC',
    benefitsKeys: [
      'LANDING.PRICING.PACKAGES.FRIEND.BENEFITS.0',
      'LANDING.PRICING.PACKAGES.FRIEND.BENEFITS.1',
      'LANDING.PRICING.PACKAGES.FRIEND.BENEFITS.2',
      'LANDING.PRICING.PACKAGES.FRIEND.BENEFITS.3',
      'LANDING.PRICING.PACKAGES.FRIEND.BENEFITS.4',
    ],
    impactKey: 'LANDING.PRICING.PACKAGES.FRIEND.IMPACT',
  },
  {
    price: 15,
    isOneTime: false,
    isHighlighted: true,
    titleKey: 'LANDING.PRICING.PACKAGES.MEMBER.TITLE',
    descriptionKey: 'LANDING.PRICING.PACKAGES.MEMBER.DESC',
    benefitsKeys: [
      'LANDING.PRICING.PACKAGES.MEMBER.BENEFITS.0',
      'LANDING.PRICING.PACKAGES.MEMBER.BENEFITS.1',
      'LANDING.PRICING.PACKAGES.MEMBER.BENEFITS.2',
      'LANDING.PRICING.PACKAGES.MEMBER.BENEFITS.3',
      'LANDING.PRICING.PACKAGES.MEMBER.BENEFITS.4',
    ],
    impactKey: 'LANDING.PRICING.PACKAGES.MEMBER.IMPACT',
  },
  {
    price: 97,
    isOneTime: true,
    titleKey: 'LANDING.PRICING.PACKAGES.ONE_TIME.TITLE',
    descriptionKey: 'LANDING.PRICING.PACKAGES.ONE_TIME.DESC',
    benefitsKeys: [
      'LANDING.PRICING.PACKAGES.ONE_TIME.BENEFITS.0',
      'LANDING.PRICING.PACKAGES.ONE_TIME.BENEFITS.1',
      'LANDING.PRICING.PACKAGES.ONE_TIME.BENEFITS.2',
      'LANDING.PRICING.PACKAGES.ONE_TIME.BENEFITS.3',
      'LANDING.PRICING.PACKAGES.ONE_TIME.BENEFITS.4',
    ],
    impactKey: 'LANDING.PRICING.PACKAGES.ONE_TIME.IMPACT',
  },
];
