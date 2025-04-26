import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent implements OnInit {
  slug: string = '';
  post: any;

  // Mock blog post data
  blogPosts = [
    {
      id: 1,
      title: 'Kako doprineti open-source projektima kao početnik',
      excerpt: 'Vodič za početnike koji žele da se uključe u open-source zajednicu i doprinesu projektima.',
      date: '15. april 2023.',
      author: 'Marko Petrović',
      imageUrl: 'https://via.placeholder.com/800x400',
      slug: 'kako-doprineti-open-source-projektima',
      content: `
        <p>Open-source zajednica je srce modernog razvoja softvera. Doprinošenje open-source projektima ne samo da pomaže zajednici, već i vama pruža priliku da unapredite svoje veštine, izgradite portfolio i povežete se sa drugim programerima.</p>

        <h2>Zašto doprinositi open-source projektima?</h2>

        <p>Postoji mnogo razloga zašto biste trebali razmotriti doprinošenje open-source projektima:</p>

        <ul>
          <li><strong>Učenje i razvoj veština</strong> - Rad na stvarnim projektima je najbolji način da unapredite svoje programerske veštine.</li>
          <li><strong>Izgradnja portfolija</strong> - Vaši doprinosi su javni i mogu poslužiti kao dokaz vašeg znanja i iskustva.</li>
          <li><strong>Umrežavanje</strong> - Povezivanje sa drugim programerima i potencijalnim poslodavcima.</li>
          <li><strong>Davanje nazad zajednici</strong> - Pomaganje u razvoju alata koje i sami koristite.</li>
        </ul>

        <h2>Kako početi?</h2>

        <p>Evo nekoliko koraka koji će vam pomoći da započnete svoj put u open-source zajednici:</p>

        <h3>1. Pronađite projekat koji vas zanima</h3>

        <p>Najbolje je početi sa projektima koje već koristite ili koji vas zanimaju. GitHub je odlično mesto za pretragu projekata. Možete koristiti oznake kao što su "good first issue" ili "beginner friendly" da pronađete zadatke pogodne za početnike.</p>

        <h3>2. Razumite projekat</h3>

        <p>Pre nego što počnete da doprinosite, važno je da razumete projekat. Pročitajte dokumentaciju, istražite kod i upoznajte se sa strukturom projekta.</p>

        <h3>3. Pronađite način da doprinesete</h3>

        <p>Postoji mnogo načina da doprinesete open-source projektima, čak i ako niste iskusan programer:</p>

        <ul>
          <li>Ispravljanje grešaka u kodu</li>
          <li>Dodavanje novih funkcionalnosti</li>
          <li>Poboljšanje dokumentacije</li>
          <li>Prevođenje sadržaja</li>
          <li>Testiranje i prijavljivanje bagova</li>
        </ul>

        <h3>4. Napravite fork projekta i klonirajte ga lokalno</h3>

        <p>Kada pronađete projekat i zadatak na kojem želite da radite, napravite fork projekta na GitHub-u i klonirajte ga na svoj računar.</p>

        <h3>5. Napravite promene i pošaljite pull request</h3>

        <p>Napravite promene u kodu, testirajte ih i pošaljite pull request. Budite spremni da prihvatite povratne informacije i napravite dodatne izmene ako je potrebno.</p>

        <h2>Saveti za uspešno doprinošenje</h2>

        <ul>
          <li><strong>Počnite sa malim</strong> - Fokusirajte se na male, jednostavne zadatke dok se ne upoznate sa projektom.</li>
          <li><strong>Pratite smernice projekta</strong> - Svaki projekat ima svoje smernice za doprinošenje. Pročitajte ih i sledite ih.</li>
          <li><strong>Budite strpljivi</strong> - Može proći neko vreme pre nego što vaš pull request bude pregledan i prihvaćen.</li>
          <li><strong>Tražite pomoć</strong> - Ne ustručavajte se da tražite pomoć od zajednice ako naiđete na probleme.</li>
        </ul>

        <p>Doprinošenje open-source projektima je putovanje koje zahteva vreme i strpljenje, ali nagrade su vredne truda. Započnite danas i postanite deo globalne zajednice programera koji zajedno grade budućnost tehnologije!</p>
      `
    },
    {
      id: 2,
      title: 'Pregled najpopularnijih JavaScript framework-a u 2023.',
      excerpt: 'Analiza trenutno najpopularnijih JavaScript framework-a i njihovih prednosti i mana.',
      date: '28. maj 2023.',
      author: 'Ana Jovanović',
      imageUrl: 'https://via.placeholder.com/800x400',
      slug: 'pregled-javascript-frameworka-2023',
      content: `
        <p>JavaScript framework-i su postali neizostavan deo modernog web razvoja. Oni omogućavaju programerima da brže i efikasnije razvijaju kompleksne web aplikacije. U ovom članku, analiziraćemo najpopularnije JavaScript framework-e u 2023. godini i njihove prednosti i mane.</p>

        <h2>React</h2>

        <p>React, razvijen od strane Facebook-a, i dalje drži poziciju najpopularnijeg JavaScript framework-a u 2023. godini.</p>

        <h3>Prednosti:</h3>

        <ul>
          <li><strong>Virtuelni DOM</strong> - Omogućava brže renderovanje i bolje performanse.</li>
          <li><strong>Komponente za višekratnu upotrebu</strong> - Olakšava razvoj i održavanje koda.</li>
          <li><strong>Velika zajednica</strong> - Mnoštvo resursa, biblioteka i alata.</li>
          <li><strong>React Native</strong> - Mogućnost razvoja mobilnih aplikacija sa istim znanjem.</li>
        </ul>

        <h3>Mane:</h3>

        <ul>
          <li><strong>Strma kriva učenja</strong> - Posebno za koncepte kao što su Redux i Hooks.</li>
          <li><strong>Potreba za dodatnim bibliotekama</strong> - React se fokusira samo na UI, pa su često potrebne dodatne biblioteke za funkcionalnosti kao što su rutiranje i upravljanje stanjem.</li>
        </ul>

        <h2>Angular</h2>

        <p>Angular, razvijen od strane Google-a, je sveobuhvatan framework koji pruža sve što je potrebno za razvoj kompleksnih aplikacija.</p>

        <h3>Prednosti:</h3>

        <ul>
          <li><strong>Kompletno rešenje</strong> - Uključuje sve potrebne alate i funkcionalnosti.</li>
          <li><strong>TypeScript</strong> - Pruža tipizaciju i bolje alate za razvoj.</li>
          <li><strong>Dvosmerno vezivanje podataka</strong> - Olakšava razvoj formulara i interaktivnih elemenata.</li>
          <li><strong>Dependency Injection</strong> - Olakšava testiranje i održavanje koda.</li>
        </ul>

        <h3>Mane:</h3>

        <ul>
          <li><strong>Kompleksnost</strong> - Može biti previše kompleksan za jednostavnije projekte.</li>
          <li><strong>Veličina</strong> - Angular aplikacije su često veće od React ili Vue aplikacija.</li>
          <li><strong>Strma kriva učenja</strong> - Zahteva više vremena za savladavanje.</li>
        </ul>

        <h2>Vue.js</h2>

        <p>Vue.js je progresivni framework koji se može postepeno integrisati u postojeće projekte.</p>

        <h3>Prednosti:</h3>

        <ul>
          <li><strong>Jednostavnost</strong> - Lak za učenje i korišćenje.</li>
          <li><strong>Fleksibilnost</strong> - Može se koristiti za male delove postojećih aplikacija ili za razvoj kompletnih SPA.</li>
          <li><strong>Detaljna dokumentacija</strong> - Odlična dokumentacija koja olakšava učenje.</li>
          <li><strong>Reaktivnost</strong> - Automatsko ažuriranje UI-a kada se podaci promene.</li>
        </ul>

        <h3>Mane:</h3>

        <ul>
          <li><strong>Manja zajednica</strong> - U poređenju sa React-om i Angular-om.</li>
          <li><strong>Manje biblioteka i alata</strong> - Iako se ovo brzo menja.</li>
          <li><strong>Manje iskusnih programera</strong> - Može biti teže pronaći iskusne Vue programere.</li>
        </ul>

        <h2>Svelte</h2>

        <p>Svelte je relativno nov framework koji se razlikuje od ostalih po tome što se većina posla obavlja tokom kompilacije, a ne u browseru.</p>

        <h3>Prednosti:</h3>

        <ul>
          <li><strong>Performanse</strong> - Izuzetno brz zbog kompilacije u vanila JavaScript.</li>
          <li><strong>Manja veličina bundle-a</strong> - Rezultira manjim i bržim aplikacijama.</li>
          <li><strong>Manje boilerplate koda</strong> - Jednostavnija sintaksa i manje koda.</li>
          <li><strong>Reaktivnost bez virtuelnog DOM-a</strong> - Direktno ažuriranje DOM-a kada se podaci promene.</li>
        </ul>

        <h3>Mane:</h3>

        <ul>
          <li><strong>Nova tehnologija</strong> - Manje zrela i testirana u produkciji.</li>
          <li><strong>Manja zajednica</strong> - Manje resursa, biblioteka i alata.</li>
          <li><strong>Manje iskusnih programera</strong> - Teže pronaći programere sa iskustvom u Svelte-u.</li>
        </ul>

        <h2>Koji framework izabrati?</h2>

        <p>Izbor framework-a zavisi od mnogih faktora, uključujući:</p>

        <ul>
          <li>Kompleksnost projekta</li>
          <li>Veličina tima i njihovo iskustvo</li>
          <li>Vremenski okvir projekta</li>
          <li>Potrebe za performansama</li>
          <li>Dugoročno održavanje</li>
        </ul>

        <p>Svaki od ovih framework-a ima svoje prednosti i mane, i važno je izabrati onaj koji najbolje odgovara vašim specifičnim potrebama. Takođe, imajte na umu da je važnije postati stručnjak u jednom framework-u nego površno poznavati više njih.</p>

        <p>Koji JavaScript framework vi koristite i zašto? Podelite svoje iskustvo u komentarima!</p>
      `
    },
    {
      id: 3,
      title: 'Organizacija uspešnog hackathon-a: saveti i trikovi',
      excerpt: 'Naučite kako da organizujete uspešan hackathon događaj koji će inspirisati učesnike i doneti inovativna rešenja.',
      date: '10. jun 2023.',
      author: 'Nikola Đorđević',
      imageUrl: 'https://via.placeholder.com/800x400',
      slug: 'organizacija-uspesnog-hackathona',
      content: `
        <p>Hackathon-i su postali popularan način za podsticanje inovacija, rešavanje problema i povezivanje talentovanih pojedinaca. Bilo da organizujete hackathon za svoju kompaniju, obrazovnu instituciju ili zajednicu, ovi saveti će vam pomoći da organizujete uspešan događaj koji će inspirisati učesnike i doneti inovativna rešenja.</p>

        <h2>Šta je hackathon?</h2>

        <p>Hackathon je događaj, obično u trajanju od 24 do 48 sati, gde programeri, dizajneri i drugi stručnjaci sarađuju na razvoju rešenja za određene probleme ili izazove. Cilj je da se u kratkom vremenskom periodu razviju funkcionalni prototipovi ili koncepti.</p>

        <h2>Koraci za organizaciju uspešnog hackathon-a</h2>

        <h3>1. Definišite ciljeve i temu</h3>

        <p>Prvi korak u organizaciji hackathon-a je definisanje jasnih ciljeva i teme. Šta želite da postignete ovim događajem? Da li je fokus na rešavanju specifičnih problema, edukaciji učesnika, ili možda regrutovanju talenata?</p>

        <p>Tema treba da bude dovoljno široka da omogući kreativnost, ali i dovoljno specifična da usmerava učesnike. Neke popularne teme uključuju:</p>

        <ul>
          <li>Održivi razvoj i ekologija</li>
          <li>Zdravstvo i medicina</li>
          <li>Obrazovanje</li>
          <li>Pametni gradovi</li>
          <li>Finansijske tehnologije</li>
        </ul>

        <h3>2. Obezbedite resurse i sponzore</h3>

        <p>Organizacija hackathon-a zahteva određene resurse, uključujući:</p>

        <ul>
          <li><strong>Prostor</strong> - Dovoljno velik da primi sve učesnike, sa stabilnom internet vezom i dovoljno utičnica.</li>
          <li><strong>Hrana i piće</strong> - Učesnici će raditi dugo, pa je važno obezbediti redovne obroke i osveženja.</li>
          <li><strong>Tehnička podrška</strong> - Obezbedite tehničku podršku za rešavanje problema tokom događaja.</li>
          <li><strong>Nagrade</strong> - Obezbedite atraktivne nagrade za pobednike.</li>
        </ul>

        <p>Potražite sponzore koji mogu pomoći u pokrivanju troškova ili obezbediti resurse. Sponzori mogu biti kompanije, obrazovne institucije ili organizacije koje su zainteresovane za temu hackathon-a.</p>

        <h3>3. Formirajte organizacioni tim</h3>

        <p>Organizacija hackathon-a je timski posao. Formirajte tim sa različitim veštinama i odgovornostima:</p>

        <ul>
          <li><strong>Projektni menadžer</strong> - Koordinira sve aspekte događaja.</li>
          <li><strong>Tehnički koordinator</strong> - Brine o tehničkim aspektima i podršci.</li>
          <li><strong>Marketing i komunikacije</strong> - Promoviše događaj i komunicira sa učesnicima.</li>
          <li><strong>Logistika</strong> - Brine o prostoru, hrani i drugim logističkim aspektima.</li>
          <li><strong>Mentori</strong> - Iskusni stručnjaci koji će pomagati učesnicima tokom događaja.</li>
        </ul>

        <h3>4. Kreirajte jasan raspored</h3>

        <p>Kreirajte detaljan raspored koji uključuje:</p>

        <ul>
          <li>Registraciju i uvodnu prezentaciju</li>
          <li>Formiranje timova (ako učesnici ne dolaze sa već formiranim timovima)</li>
          <li>Radionice i prezentacije</li>
          <li>Vreme za rad na projektima</li>
          <li>Redovne pauze i obroke</li>
          <li>Prezentacije projekata i ocenjivanje</li>
          <li>Proglašenje pobednika i dodelu nagrada</li>
        </ul>

        <h3>5. Promovišite događaj</h3>

        <p>Koristite različite kanale za promociju vašeg hackathon-a:</p>

        <ul>
          <li>Društvene mreže</li>
          <li>Email marketing</li>
          <li>Saradnja sa univerzitetima i tehnološkim zajednicama</li>
          <li>Tehnološki blogovi i portali</li>
          <li>Meetup grupe i forumi</li>
        </ul>

        <h3>6. Obezbedite mentore i sudije</h3>

        <p>Mentori su ključni za uspeh hackathon-a. Oni pomažu učesnicima da prevaziđu tehničke izazove, daju savete i usmeravaju timove. Sudije treba da budu stručnjaci u relevantnim oblastima koji mogu objektivno oceniti projekte.</p>

        <h3>7. Definišite jasne kriterijume za ocenjivanje</h3>

        <p>Transparentni kriterijumi za ocenjivanje pomažu učesnicima da se fokusiraju na ono što je važno. Neki uobičajeni kriterijumi uključuju:</p>

        <ul>
          <li>Inovativnost i originalnost</li>
          <li>Tehnička implementacija</li>
          <li>Dizajn i korisničko iskustvo</li>
          <li>Potencijalni uticaj i održivost</li>
          <li>Prezentacija i pitch</li>
        </ul>

        <h3>8. Obezbedite follow-up nakon događaja</h3>

        <p>Hackathon ne treba da se završi sa dodelom nagrada. Obezbedite follow-up koji može uključivati:</p>

        <ul>
          <li>Mentorstvo za pobedničke timove</li>
          <li>Mogućnosti za dalji razvoj projekata</li>
          <li>Povezivanje sa potencijalnim investitorima</li>
          <li>Povratne informacije za sve učesnike</li>
        </ul>

        <h2>Saveti za uspešan hackathon</h2>

        <ul>
          <li><strong>Fokusirajte se na iskustvo učesnika</strong> - Obezbedite prijatno i produktivno okruženje.</li>
          <li><strong>Budite fleksibilni</strong> - Budite spremni da se prilagodite neočekivanim situacijama.</li>
          <li><strong>Dokumentujte sve</strong> - Fotografije, video zapisi i svedočenja učesnika su vredni resursi za buduće događaje.</li>
          <li><strong>Prikupite povratne informacije</strong> - Nakon događaja, prikupite povratne informacije od učesnika, mentora i sudija.</li>
          <li><strong>Slavite uspehe</strong> - Prepoznajte i slavite uspehe svih učesnika, ne samo pobednika.</li>
        </ul>

        <p>Organizacija hackathon-a zahteva pažljivo planiranje i koordinaciju, ali rezultati mogu biti izuzetno vredni. Uspešan hackathon ne samo da donosi inovativna rešenja, već i povezuje talentovane pojedince, podstiče učenje i saradnju, i može dovesti do stvaranja novih startap-a i projekata.</p>

        <p>Da li ste ikada učestvovali u hackathon-u ili organizovali jedan? Podelite svoje iskustvo i savete u komentarima!</p>
      `
    }
  ];

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      const post = this.blogPosts.find(post => post.slug === this.slug);
      if (post) {
        this.post = {
          ...post,
          content: this.sanitizer.bypassSecurityTrustHtml(post.content)
        };
      }
    });
  }
}
