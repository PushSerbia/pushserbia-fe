import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-faq',
  imports: [],
  templateUrl: './landing-faq.component.html',
  styleUrl: './landing-faq.component.css',
})
export class LandingFaqComponent {
  faq = [
    {
      title: 'Šta je Push Serbia?',
      description:
        'Push Serbia je neprofitna platforma koja omogućava IT zajednici da predlaže i glasa za društveno korisne open-source projekte. Cilj je povezivanje developera i stručnjaka kako bi zajedno razvijali projekte sa pozitivnim društvenim uticajem.',
    },
    {
      title: 'Ko može koristiti platformu?',
      description:
        'Platforma je namenjena IT profesionalcima i entuzijastima koji žele da doprinesu open-source projektima.',
    },
    {
      title: 'Da li je korišćenje platforme besplatno?',
      description:
        'Da, svi korisnici mogu besplatno predlagati projekte i glasati za njih. Međutim, postoji opcioni sistem članstva koji može doneti dodatne benefite.',
    },
    {
      title: 'Kako mogu da se registrujem?',
      description:
        'Registracija je moguća samo putem LinkedIn naloga, što osigurava da su svi korisnici deo profesionalne zajednice.',
    },
    {
      title: 'Zašto ne mogu da se prijavim?',
      description:
        'Proverite da li koristite validan LinkedIn nalog. Takođe, ako vam je nalog blokiran od strane administratora, nećete moći da se autentifikujete.',
    },
    {
      title: 'Da li mogu koristiti platformu bez registracije?',
      description:
        'Možete pregledati projekte bez registracije, ali predlaganje i glasanje su dostupni samo registrovanim korisnicima.',
    },
    {
      title: 'Kako mogu predložiti novi projekat?',
      description:
        'Nakon prijave, možete koristiti formu za predlaganje projekta. Unesite osnovne informacije, detaljan opis, ciljeve i planirane tehnologije. Takođe, možete dodati GitHub link za repozitorijum projekta.',
    },
    {
      title: 'Da li moj projekat mora biti open-source?',
      description:
        'Da, svi predloženi projekti moraju biti društveno korisni i open-source.',
    },
    {
      title: 'Kako mogu promovisati svoj projekat?',
      description:
        'Svaki projekat automatski dobija šerabilan link koji možete podeliti na društvenim mrežama i drugim kanalima.',
    },
    {
      title: 'Šta ako moj projekat bude zabranjen?',
      description:
        'Projekti koji krše pravila mogu biti zabranjeni od strane administratora. Oni ostaju vidljivi samo vama i administratoru, uz objašnjenje razloga zabrane.',
    },
    {
      title: 'Kako funkcioniše glasanje?',
      description:
        'Registrovani korisnici mogu glasati za neograničen broj projekata, ali samo jednom po projektu.',
    },
    {
      title: 'Šta znači da glas ima različitu težinu?',
      description:
        'Svi korisnici počinju sa nivoom 1 (glas vredi 1 poen). Možete povećati nivo doprinoseći projektima ili putem članstva.',
    },
    {
      title: 'Kako znam koji su trenutno najpopularniji projekti?',
      description:
        'Na glavnoj stranici se prikazuju projekti sa najviše glasova, a možete ih filtrirati prema različitim kriterijumima.',
    },
    {
      title: 'Kako funkcioniše sistem nivoa i članstva?',
      description:
        'Korisnici mogu napredovati kroz nivoe doprinosom projektima ili putem opcione članarine. Veći nivo znači veću težinu glasa.',
    },
    {
      title: 'Gde mogu videti svoj nivo i status članstva?',
      description:
        'Na stranici profila možete videti osnovne informacije, trenutni nivo i status članstva.',
    },
    {
      title: 'Ko moderira platformu?',
      description:
        'Platformu moderiraju administratori koji mogu zabraniti projekte, blokirati korisnike i upravljati sadržajem.',
    },
    {
      title: 'Kako prijaviti neprimeren sadržaj?',
      description:
        'Ako primetite neprimeren sadržaj, možete ga prijaviti administratorima putem opcije „Prijavi projekat“.',
    },
    {
      title: 'Šta se dešava ako budem blokiran?',
      description:
        'Ako administrator blokira vaš nalog, gubite mogućnost autentifikacije na platformi.',
    },
    {
      title: 'Kako mogu organizovati sastanak za projekat?',
      description:
        'Svaki projekat ima opciju „Book Meeting“, koja generiše Meet link dostupan svim zainteresovanim korisnicima.',
    },
    {
      title: 'Kako mogu sačuvati beleške sa sastanka?',
      description:
        'Nakon sastanka, kreator projekta može dodati Meeting Notes koje će biti dostupne svim učesnicima.',
    },
    {
      title: 'Kako ću znati da je moj projekat ušao u fazu razvoja?',
      description:
        'Dobijate email notifikaciju kada vaš projekat prikupi dovoljno glasova za prelazak u razvoj.',
    },
    {
      title: 'Da li dobijam obaveštenja kada neko glasa za moj projekat?',
      description:
        'Da, postoji in-app notifikacija kada vaš projekat dobije novi glas.',
    },
    {
      title: 'Kako funkcionišu email i in-app notifikacije?',
      description:
        'Email notifikacije šaljemo za važne događaje (npr. kada projekat dobije dovoljno glasova). In-app notifikacije obaveštavaju vas o svakodnevnim aktivnostima (npr. novi glasovi, sastanci).',
    },
  ];
}
