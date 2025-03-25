import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-landing-pricing',
  imports: [CurrencyPipe],
  templateUrl: './landing-pricing.component.html',
  styleUrl: './landing-pricing.component.css'
})
export class LandingPricingComponent {
  donationOptions = [
    {
      title: "Može kafa",
      price: 4,
      description: "Mala donacija, veliki doprinos! Uz tvoju podršku, infrastruktura naše zajednice ostaje stabilna i dostupna.",
      benefits: [
        "Pristup ekskluzivnom Discord kanalu za donatore",
        "Zahvalnica na našem sajtu",
        "Glasanje za manje tehničke odluke zajednice",
        "Mesečni izveštaj o napretku projekata",
        "Dobro osećanje jer si pomogao/la open-source inicijativi"
      ]
    },
    {
      title: "Timski igrač",
      price: 49,
      description: "Kao pravi timski igrač, tvoja podrška omogućava ne samo održavanje, već i rast naših projekata!",
      benefits: [
        "Sve iz “Može kafa” paketa",
        "Ime u zahvalnicama open-source projekata",
        "Prioritetna registracija za naše meetup-ove",
        "Ekskluzivni uvid u nove projekte i inicijative",
        "Poziv na kvartalni community call sa osnivačima"
      ]
    },
    {
      title: "Vizionar",
      price: 499,
      description: "Tvoja vizija gura zajednicu napred! Uz ovu donaciju, postaješ ključni pokretač promena i inovacija.",
      benefits: [
        "Sve iz “Timski igrač” paketa",
        "Ime istaknuto kao glavni donator na sajtu",
        "Prilika da predložiš i vodiš inicijative unutar zajednice",
        "Pozivnica za ekskluzivne događaje i radionice",
        "Pristup internim roadmap diskusijama i strategiji razvoja"
      ]
    }
  ];
}
