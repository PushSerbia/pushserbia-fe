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
    title: 'Supporter',
    price: 5,
    isOneTime: false,
    description:
      'Osnovni nivo podrške za održavanje zajedničkih projekata.',
    impact:
      'Sa €5 mesečno omogućavaš jednom open-source projektu da ostane dostupan za stotine korisnika.',
    benefits: [
      'Pokrivanje dela troškova hostinga i servera',
      'Održavanje redovnog rada servisa',
      'Omogućavanje dostupnosti projekata svakodnevnim korisnicima',
    ],
  },
  {
    title: 'Contributor',
    price: 9,
    isOneTime: false,
    isHighlighted: true,
    description:
      'Za članove koji žele da podrže skaliranje i širenje projekata.',
    impact:
      'Sa €9 mesečno pomažeš da naši projekti dođu do više ljudi i imaju veći društveni uticaj.',
    benefits: [
      'Proširenje kapaciteta servera i resursa',
      'Omogućavanje skalabilnosti postojećih projekata',
      'Podrška rastu zajednice i novih inicijativa',
    ],
  },
  {
    title: 'Jednokratna podrška',
    price: 25,
    isOneTime: true,
    description:
      'Jednokratna donacija za sve koji žele da podrže bez mesečne obaveze.',
    impact:
      'Tvoja jednokratna donacija direktno finansira razvoj projekata koji pomažu zajednici.',
    benefits: [
      'Bez mesečne obaveze — doniraj kada želiš',
      'Direktna podrška aktivnim projektima',
      'Doprinos održivosti zajednice',
    ],
  },
];
