import { Injectable } from '@angular/core';
import { BlogPost } from './blog';

@Injectable({
  providedIn: 'root',
})
export class BlogStoreService {
  private _blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Zašto smo pokrenuli Push Serbia',
      slug: 'zasto-smo-pokrenuli-push-serbia',
      author: 'Push Serbia tim',
      date: '2025-11-15',
      excerpt:
        'Priča o tome kako je jedna ideja na kafi postala platforma sa stotinama članova koji zajedno grade softver za opšte dobro.',
      content: `
        <p>Sve je počelo jednostavno — grupa developera iz Beograda, Novog Sada i Niša koji su se pitali: šta ako bismo mogli da iskoristimo naše veštine za nešto što zaista pomaže ljudima oko nas?</p>

        <p>IT zajednica u Srbiji je neverovatno talentovana. Svaki dan gradimo proizvode za kompanije širom sveta. Ali koliko od tog znanja ostaje ovde, u našim zajednicama? Koliko softvera koji pravimo zapravo rešava probleme naših komšija, škola, bolnica, opština?</p>

        <h2>Problem koji smo videli</h2>
        <p>Developeri koji žele da doprinesu društvu nemaju centralno mesto gde mogu da nađu projekte, povežu se sa istomišljenicima i organizuju rad. Ideje postoje — ali bez strukture, bez glasanja, bez zajednice koja ih podržava, većina nikada ne zaživi.</p>

        <h2>Rešenje koje gradimo</h2>
        <p>Push Serbia je platforma gde svako može da predloži open-source projekat sa društvenim uticajem. Zajednica glasa, najbolje ideje ulaze u razvoj, a članovi zajedno pišu kod koji menja stvari.</p>

        <p>Nismo kompanija. Nismo startup. Neprofitni smo i otvoreni za sve — od seniora sa 20 godina iskustva do studenta koji je napisao prvi "Hello World" prošle nedelje.</p>

        <h2>Šta smo do sada postigli</h2>
        <p>Od pokretanja platforme, zajednica je predložila više od 15 projekata. Članovi su glasali, diskutovali, i započeli razvoj prvih inicijativa. Svaki dan nam se pridružuju novi ljudi koji žele da budu deo nečeg većeg od sebe.</p>

        <p>Ovo je tek početak. Ako si developer, dizajner, ili jednostavno neko ko veruje da tehnologija može da pomogne — pridruži nam se. Tvoja ideja bi mogla biti sledeći projekat koji zajednica izglasa.</p>
      `,
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80',
      tags: ['zajednica', 'open-source', 'Push Serbia'],
    },
    {
      id: '2',
      title: 'Kako izgleda prvi doprinos open-source projektu',
      slug: 'kako-izgleda-prvi-doprinos',
      author: 'Push Serbia tim',
      date: '2025-12-08',
      excerpt:
        'Korak po korak vodič za svakoga ko želi da napravi svoj prvi commit na projektu koji pomaže društvu.',
      content: `
        <p>Mnogi developeri žele da doprinesu open-source projektima, ali ne znaju odakle da počnu. "Nisam dovoljno iskusan", "Ne znam šta da radim", "Plašim se da ću napraviti grešku" — ovo su rečenice koje čujemo svaki dan.</p>

        <p>Hajde da razbijemo te mitove.</p>

        <h2>Ne moraš biti senior</h2>
        <p>Svaki projekat treba pomoć — i to ne samo u pisanju komplikovanog koda. Dokumentacija, testovi, UI poboljšanja, ispravka grešaka u tekstu, prevodi — sve to je doprinos koji se ceni. Na Push Serbia platformi, svaki projekat ima jasne oznake šta je potrebno, pa možeš naći zadatak koji odgovara tvom nivou.</p>

        <h2>Koraci za prvi doprinos</h2>
        <p><strong>1. Izaberi projekat koji te zanima.</strong> Na pushserbia.com/projekti možeš pregledati sve aktivne projekte. Pročitaj opise, pogledaj GitHub repozitorijume, i odaberi onaj čija misija ti je bliska.</p>

        <p><strong>2. Upoznaj se sa kodom.</strong> Kloniraj repo, pokreni lokalno, pročitaj README. Ne moraš razumeti sve od prvog dana — fokusiraj se na jedan deo.</p>

        <p><strong>3. Počni sa nečim malim.</strong> Ispravi tipografsku grešku u dokumentaciji. Dodaj unit test. Poboljšaj poruku greške. Svaki commit je doprinos.</p>

        <p><strong>4. Otvori Pull Request.</strong> Napiši šta si promenio i zašto. Zajednica će pregledati tvoj kod, dati feedback, i pomoći ti da naučiš.</p>

        <h2>Šta dobijaš zauzvrat</h2>
        <p>Iskustvo rada na realnom projektu. GitHub aktivnost koja se vidi. Kontakte u zajednici. I osećaj da tvoj kod zaista pomaže nekome — a to je nešto što nijedan korporativni projekat ne može da ti pruži.</p>
      `,
      image:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1470&q=80',
      tags: ['open-source', 'vodič', 'početnci'],
    },
    {
      id: '3',
      title: 'Šta znači "softver za opšte dobro"',
      slug: 'sta-znaci-softver-za-opste-dobro',
      author: 'Push Serbia tim',
      date: '2026-01-22',
      excerpt:
        'Kako definišemo projekte koji zaslužuju podršku zajednice i zašto verujemo da kod može da menja društvo.',
      content: `
        <p>Kada kažemo "open-source projekti za opšte dobro", ne mislimo na još jedan todo-app ili portfolio template. Mislimo na softver koji rešava konkretne probleme u našem društvu.</p>

        <h2>Kakve projekte tražimo</h2>
        <p>Projekti na Push Serbia platformi treba da ispunjavaju tri kriterijuma:</p>

        <p><strong>Društveni uticaj.</strong> Projekat mora da rešava realan problem — bilo da je to digitalizacija javnih usluga, pomoć ugroženim grupama, edukacija, zaštita životne sredine, ili pristupačnost informacija.</p>

        <p><strong>Open-source.</strong> Kod mora biti javan i slobodan. Verujemo da softver koji pomaže društvu treba da bude dostupan svima — da se koristi, modifikuje i unapređuje.</p>

        <p><strong>Izvodljivost.</strong> Ideja ne mora biti savršena, ali mora biti realna. Zajednica glasa za projekte za koje veruje da se mogu realizovati sa resursima koje imamo.</p>

        <h2>Primeri projekata</h2>
        <p>Evo nekoliko tipova projekata koji su predloženi na platformi:</p>

        <p>Aplikacija koja povezuje višak hrane iz restorana sa ljudima kojima je potrebna. Platforma za praćenje sadnje drveća sa geolokacijom. Alat za digitalizaciju školskih udžbenika. Sistem za prijavu komunalnih problema u opštini.</p>

        <p>Nijedan od ovih projekata nije komplikovan za senior developera. Ali svaki od njih može da promeni svakodnevicu stotina ili hiljada ljudi.</p>

        <h2>Tvoja ideja</h2>
        <p>Ako imaš ideju za projekat koji ispunjava ove kriterijume — predloži je. Ne moraš imati gotov plan, tim, ili iskustvo u vođenju projekata. Zajednica je tu da pomogne. Predloži ideju na pushserbia.com/projekti/novi i pusti zajednicu da odluči.</p>
      `,
      image:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1470&q=80',
      tags: ['misija', 'open-source', 'društveni uticaj'],
    },
    {
      id: '4',
      title: 'Kako zajednica odlučuje koji projekat ide u razvoj',
      slug: 'kako-zajednica-odlucuje-koji-projekat-ide-u-razvoj',
      author: 'Push Serbia tim',
      date: '2026-02-10',
      excerpt:
        'Transparentan pogled na proces glasanja, kriterijume odabira i kako osiguravamo da glas svačiji bude uslišan.',
      content: `
        <p>Jedna od najčešćih pitanja koja dobijamo je: "Kako odlučujete koji projekat će se razvijati?" Kratak odgovor: ne odlučujemo mi. Odlučujete vi — zajednica.</p>

        <p>Ali iza tog jednostavnog odgovora krije se sistem koji smo pažljivo osmislili da bude fer, transparentan i efikasan. Evo kako funkcioniše.</p>

        <h2>Faza 1: Predlaganje</h2>
        <p>Svaki registrovani član može predložiti projekat. Jedini uslov je da projekat bude open-source i da ima jasan društveni uticaj. Ne tražimo savršen biznis plan — tražimo iskrenu ideju i spremnost da se radi na njoj.</p>

        <p>Kada predložiš projekat, on ulazi u fazu "pending" dok ga moderatori ne pregledaju. Proveravamo samo osnovno: da li opis ima smisla, da li nije duplikat, i da li zadovoljava osnovne kriterijume. Ne ocenjujemo kvalitet ideje — to je posao zajednice.</p>

        <h2>Faza 2: Glasanje</h2>
        <p>Nakon odobrenja, projekat prelazi u fazu glasanja. Svi članovi mogu glasati za neograničen broj projekata, ali samo jednom po projektu. Svaki glas ima težinu koja zavisi od nivoa člana — aktivniji članovi koji doprinose zajednici imaju veći uticaj.</p>

        <p>Glasanje nije vremenski ograničeno. Projekat prikuplja glasove sve dok ne dostigne prag koji ga kvalifikuje za razvoj. Ovaj pristup osigurava da dobre ideje ne propadnu samo zato što su predložene u "pogrešno vreme".</p>

        <h2>Faza 3: Razvoj</h2>
        <p>Kada projekat skupi dovoljno glasova, prelazi u fazu "in progress". U ovom trenutku, kreator projekta organizuje prvi sastanak, kreira GitHub repozitorijum, i počinje da okuplja tim. Svaki član zajednice može da se priključi — ne trebaš čekati pozivnicu.</p>

        <h2>Zašto ovaj sistem</h2>
        <p>Mogli smo da odlučujemo sami. Mogli smo da imamo komisiju od pet ljudi koja bira projekte. Ali verujemo da kolektivna inteligencija zajednice donosi bolje odluke od bilo koje male grupe. Ljudi koji će raditi na projektima treba da budu isti oni koji biraju šta će se raditi.</p>

        <p>Sistem nije savršen i stalno ga unapređujemo na osnovu povratnih informacija zajednice. Ako imaš predlog kako da ga poboljšamo — javi nam se.</p>
      `,
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1470&q=80',
      tags: ['transparentnost', 'glasanje', 'proces'],
    },
    {
      id: '5',
      title: '5 lekcija iz prve godine Push Serbia zajednice',
      slug: '5-lekcija-iz-prve-godine',
      author: 'Push Serbia tim',
      date: '2026-02-28',
      excerpt:
        'Šta smo naučili, gde smo pogrešili i šta bismo uradili drugačije da krenemo iz početka.',
      content: `
        <p>Prošla je godina od pokretanja Push Serbia. Vreme za iskren pogled unazad — bez ulepšavanja.</p>

        <h2>Lekcija 1: Ljudi se pridružuju zbog misije, ostaju zbog ljudi</h2>
        <p>Naša pretpostavka je bila da će developeri dolaziti zbog projekata. Ispostavilo se da dolaze zbog osećaja pripadnosti. Najaktivniji članovi nisu oni koji pišu najviše koda — to su oni koji pomažu drugima, odgovaraju na pitanja, i stvaraju atmosferu u kojoj se svi osećaju dobrodošlo.</p>

        <p>Ono što nas je iznenadilo: neki od najvrednijih članova nikada nisu napisali liniju koda za naše projekte. Umesto toga, oni mentorišu, organizuju, i povezuju ljude. Zajednica je mnogo više od koda.</p>

        <h2>Lekcija 2: Jednostavnost pobjeđuje</h2>
        <p>U početku smo planirali kompleksan sistem sa kategorijama, pod-kategorijama, milestone-ima, i detaljnim project management alatima. Brzo smo naučili da je manje — više. Ljudi žele da predlože ideju za 5 minuta, glasaju jednim klikom, i počnu da rade bez birokratije.</p>

        <h2>Lekcija 3: Transparentnost gradi poverenje brže od bilo čega</h2>
        <p>Svaka odluka koju donosimo je javna. Svaki dinar koji primimo je dokumentovan. Kada smo napravili grešku sa jednim od prvih projekata koji nije zaživeo, napisali smo o tome javno umesto da to sakrijemo. Rezultat? Više ljudi se prijavilo nakon tog posta nego nakon bilo kog "uspešnog" ažuriranja.</p>

        <h2>Lekcija 4: Ne trebaš hiljadu članova da bi napravio razliku</h2>
        <p>Fiksirali smo se na brojke — koliko članova, koliko glasova, koliko projekata. Ali istina je da je jedan posvećen član vredniji od stotinu pasivnih. Tri developera koji se nađu svake nedelje i zajedno pišu kod naprave više od hiljadu ljudi koji se jednom registruju i nikada ne vrate.</p>

        <h2>Lekcija 5: Strpljenje je nepregovarljivo</h2>
        <p>Open-source projekti sa društvenim uticajem ne nastaju preko noći. Naš prvi projekat je bio u razvoju mesecima pre nego što je bio spreman za korišćenje. To je OK. Gradimo nešto što treba da traje, ne nešto što treba da impresionira investitore na pitch deku.</p>

        <p>Ovih pet lekcija nas je oblikovalo više nego bilo koji plan koji smo napisali pre pokretanja. Godina dva — idemo.</p>
      `,
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1470&q=80',
      tags: ['lekcije', 'transparentnost', 'zajednica'],
    },
    {
      id: '6',
      title: 'Dizajneri u open-source: zašto vas trebamo',
      slug: 'dizajneri-u-open-source',
      author: 'Push Serbia tim',
      date: '2026-03-05',
      excerpt:
        'Open-source nije samo za programere. Evo zašto dizajneri, pisci i project manageri imaju ključnu ulogu.',
      content: `
        <p>Kada čujete "open-source", verovatno zamislite programera koji piše kod u terminalu. I niste pogrešili — kod je temelj svakog projekta. Ali softver koji zaista pomaže ljudima zahteva mnogo više od koda.</p>

        <h2>Problem lepog koda koji niko ne koristi</h2>
        <p>Jedan od naših prvih projekata imao je odličan backend — čist kod, dobra arhitektura, sve po pravilima. Ali interfejs je bio toliko konfuzan da ga niko nije mogao koristiti bez detaljnog uputstva. Trebalo nam je tri meseca da to shvatimo, jer smo svi bili programeri.</p>

        <p>Tada smo naučili lekciju koju mnogi open-source projekti nikada ne nauče: softver koji niko ne može da koristi je beskoristan, koliko god da je kod elegantan.</p>

        <h2>Šta dizajneri mogu da doprinesu</h2>
        <p><strong>UX istraživanje.</strong> Ko su korisnici? Šta im treba? Kako koriste softver? Ova pitanja se retko postavljaju u open-source projektima, a odgovori na njih su razlika između projekta koji pomaže i projekta koji skuplja prašinu na GitHub-u.</p>

        <p><strong>UI dizajn.</strong> Dugmad, forme, navigacija, vizuelna hijerarhija — sve ono što čini da se korisnik oseća sigurno i zna šta da radi sledeće.</p>

        <p><strong>Dokumentacija i vizuali.</strong> Dobar README sa screenshotovima. Jasna uputstva sa dijagramima. Onboarding flow koji ne zahteva PhD iz informatike.</p>

        <h2>Kako da se uključiš</h2>
        <p>Ako si dizajner i želiš da doprineseš:</p>

        <p>Registruj se na platformi i pregledaj aktivne projekte. Mnogi od njih imaju otvorene zadatke za dizajn — od wireframe-ova do finalne implementacije. Ne moraš znati da kodiraš — tim će implementirati tvoj dizajn.</p>

        <p>Ako nemaš iskustva sa open-source projektima, to je zapravo prednost. Donosiš perspektivu korisnika, a ne developera. I to je upravo ono što nam treba.</p>

        <p>Open-source zajednice koje uključuju dizajnere prave bolji softver. Tačka.</p>
      `,
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1470&q=80',
      tags: ['dizajn', 'UX', 'inkluzivnost'],
    },
    {
      id: '7',
      title: 'Kako organizujemo rad na projektima: iza kulisa',
      slug: 'kako-organizujemo-rad-na-projektima',
      author: 'Push Serbia tim',
      date: '2026-03-15',
      excerpt:
        'Pogled iznutra na alate, rituale i principe koji pokreću razvoj naših open-source projekata.',
      content: `
        <p>Jedno od pitanja koje najčešće čujemo od novih članova: "OK, pridružio sam se. Šta sad?" Fer pitanje. Evo kako zapravo izgleda rad na projektu u Push Serbia zajednici.</p>

        <h2>Organizacija</h2>
        <p>Svaki projekat koji uđe u fazu razvoja dobija: GitHub repozitorijum, Slack kanal, i nedeljni sync poziv. To je to. Nema Jira ticketa, nema sprintova, nema standupa u 9 ujutru. Verujemo da volonterski rad zahteva fleksibilnost, ne korporativne procese.</p>

        <p>Kreator projekta je de facto vođa tima, ali to ne znači da donosi sve odluke. Važne tehničke odluke se diskutuju na Slack-u ili tokom nedeljnog poziva. Princip je jednostavan: ko radi — odlučuje.</p>

        <h2>Komunikacija</h2>
        <p>Slack je naš centralni hub. Svaki projekat ima svoj kanal, plus postoje opšti kanali za diskusiju, pomoć, i objave. Pravilo broj jedan: nema glupih pitanja. Ako ne znaš kako nešto funkcioniše, pitaj. Neko će ti odgovoriti — obično u roku od par sati.</p>

        <p>Nedeljni sync pozivi traju 30 minuta. Format: svako kaže šta je radio, šta planira, i gde mu treba pomoć. Bez PowerPoint prezentacija. Bez formalnosti. Kamere opcione.</p>

        <h2>Kod</h2>
        <p>Svaki projekat ima svoj tech stack koji bira tim. Jedino pravilo: mora biti open-source i dokumentovan. Pull request-ovi su obavezni — niko ne pusha direktno na main branch. Code review rade članovi tima, i tretiramo ga kao priliku za učenje, ne kao gatekeeping.</p>

        <p>Za nove članove, obeležavamo issue-je sa labelom "good first issue" — to su zadaci koji su dovoljno mali i jasni da ih neko može uraditi bez dubokog razumevanja celokupnog koda.</p>

        <h2>Šta ne radimo</h2>
        <p>Ne pratimo ko koliko sati radi. Ne kažnjavamo ljude koji nestanu na dve nedelje — život se dešava. Ne zahtevamo minimum doprinosa. Ovo je volonterski rad i tretiramo ga kao takav.</p>

        <p>Ali — očekujemo poštovanje prema drugima u timu. Ako si preuzeo zadatak i shvatiš da nećeš stići, javi. Ako imaš feedback na tuđi kod, budi konstruktivan. Ako nisi siguran u nešto, pitaj pre nego što pretpostaviš.</p>

        <p>To je ceo "rulebook". Jednostavno je jer mora biti — volonteri nemaju vremena za birokratiju, a mi nemamo potrebu da je stvaramo.</p>
      `,
      image:
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1470&q=80',
      tags: ['organizacija', 'iza kulisa', 'proces'],
    },
  ];

  getBlogPosts(): BlogPost[] {
    return this._blogPosts;
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this._blogPosts.find((post) => post.slug === slug);
  }
}
