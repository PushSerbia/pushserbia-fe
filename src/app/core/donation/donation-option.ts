export interface DonationOption {
  title: string;
  price: number;
  isOneTime: boolean;
  description: string;
  benefits: string[];
  impact: string;
  isHighlighted?: boolean;
}

export const donationOptions: DonationOption[] = [
  {
    title: 'Prijatelj zajednice',
    price: 5,
    isOneTime: false,
    description:
      'Svaki doprinos je važan! Tvoja podrška pomaže održavanju osnovne infrastrukture i omogućava pristup resursima svima.',
    benefits: [
      'Pristup zajedničkom Slack kanalu',
      'Zahvalnica na našem sajtu',
      'Transparentni izveštaji o korišćenju sredstava',
      'Učešće u mesečnim anketama zajednice',
      'Doprinos održivosti open-source ekosistema',
    ],
    impact: 'Pokriva mesečne troškove hostinga i osnovnih servisa',
  },
  {
    title: 'Aktivni član',
    price: 15,
    isOneTime: false,
    description:
      'Redovna podrška koja omogućava dugoročno planiranje i kontinuirani razvoj projekata od društvenog značaja.',
    benefits: [
      'Sve pogodnosti "Prijatelja zajednice"',
      'Učešće u odlučivanju o prioritetima razvoja',
      'Pristup zajedničkim resursima za učenje',
      'Prioritetni glas prilikom glasanja (broji se duplo)',
      'Povezivanje sa drugim članovima zajednice',
    ],
    impact: 'Podržava organizaciju događaja i razvoj novih inicijativa',
    isHighlighted: true,
  },
  {
    title: 'Jednokratna podrška',
    price: 97,
    isOneTime: true,
    description:
      'Jednokratna donacija koja pomaže razvoju konkretnih projekata i inicijativa bez dugoročne obaveze.',
    benefits: [
      'Sve pogodnosti "Prijatelja zajednice"',
      'Mogućnost usmeravanja donacije ka određenom projektu',
      'Priznanje u dokumentaciji projekta',
      'Pristup edukativnim materijalima zajednice',
      'Poziv na online događaje i radionice',
    ],
    impact: 'Omogućava razvoj novih funkcionalnosti i edukativnih materijala',
  },
];
