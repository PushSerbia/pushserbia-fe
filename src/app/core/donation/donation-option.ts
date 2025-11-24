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
      'Tvoja podrška pokriva osnovne tehničke troškove i omogućava stabilno funkcionisanje servisa.',
    benefits: [
      'Pokrivanje dela troškova hostinga i servera',
      'Održavanje redovnog rada servisa',
      'Omogućavanje dostupnosti projekata svakodnevnim korisnicima'
    ]
  },
  {
    title: 'Contributor',
    price: 9,
    isOneTime: false,
    isHighlighted: true,
    description:
      'Za članove koji žele da podrže skaliranje i širenje projekata.',
    impact:
      'Tvoja podrška omogućava proširenje infrastrukture i skaliranje servisa kako bi više ljudi moglo koristiti projekte.',
    benefits: [
      'Proširenje kapaciteta servera i resursa',
      'Omogućavanje skalabilnosti postojećih projekata',
      'Podrška rastu zajednice i novih inicijativa'
    ]
  },
  {
    title: 'Guardian',
    price: 990,
    isOneTime: false,
    description:
      'Najviši nivo podrške za dugoročnu održivost zajednice i njenih projekata.',
    impact:
      'Tvoja podrška omogućava da inicijativa i zajednica žive i razvijaju se na duge staze, održavajući ideje i projekte dostupnim svima.',
    benefits: [
      'Održavanje i unapređenje infrastrukture zajednice',
      'Podrška razvoju novih projekata i ideja',
      'Omogućavanje zajednici da samostalno rešava administrativne i birokratske stvari',
      'Osiguravanje kontinuiteta i stabilnosti zajednice'
    ]
  }
];

