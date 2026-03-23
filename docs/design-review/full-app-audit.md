# Push Serbia - Kompletni Audit Aplikacije

**Datum:** 2026-03-17
**Branch:** develop
**Cilj:** High-converting landing, donacije, uključivanje u zajednicu, motivacija

---

## I. EXECUTIVE SUMMARY

Push Serbia je dobro strukturirana Angular 21 SSR aplikacija sa čistom arhitekturom. Međutim, iz perspektive konverzije i korisničke psihologije, stranica trenutno **informiše** umjesto da **motiviše i konvertuje**. Posjetilac dobija informacije, ali ne osjeća urgenciju, pripadnost, ili emotivni razlog da se pridruži.

**Ključni nalaz:** Aplikacija radi tehnički korektno, ali ne iskorištava psihološke principe konverzije — socijalni dokaz je slab, storytelling ne postoji, emocionalni triggeri nedostaju, a putanja korisnika ima previše frikcije.

---

## II. LANDING PAGE — DETALJNA ANALIZA

### A. Hero sekcija

**Trenutno stanje:**
```
H1: "Unapredi društvo u kome živiš!"
Subtitle: "Pridruži se i podrži open-source projekte koji donose pozitivne promene u društvu."
CTA1: "Istraži projekte"
CTA2: "Saznaj više"
```

**Problemi:**

1. **H1 je generičan i pasivan.** "Unapredi društvo" je apstraktno — korisnik ne zna ŠTA konkretno može uraditi. Nema specifičnosti ni urgencije. Bolje bi bilo: konkretna akcija + specifičan benefit + emocionalni hook.

2. **CTA-ovi su slabi.** "Istraži projekte" je passivni glagol (explore). "Saznaj više" je najslabiji mogući CTA — odlaže akciju. Nijedan CTA ne vodi ka registraciji, što bi trebao biti primarni cilj.

3. **Nema socijalnog dokaza u hero-u.** Tri avatara sa "i mnogi drugi" je minimalan social proof. Nema brojki, nema citata, nema logotipova kompanija. Posjetilac ne zna koliko ljudi već koristi platformu.

4. **Hero slika ima prazan `src=""`** na mobilnom — browser šalje broken request. `fetchpriority="high"` na slici koja je `hidden lg:block`.

5. **Nema urgencije.** Nema razloga da posjetilac djeluje SADA umjesto sutra.

### B. Projects sekcija

**Trenutno stanje:** Prikazuje 2 projekta iz API-ja + "Suggest new" kartica.

**Problemi:**

1. **Samo 2 projekta.** Previše malo da pokaže aktivnost zajednice. 3-4 projekta bi dali bolji utisak vitalnosti.

2. **Nema konteksta.** Korisnik vidi projekat, ali ne zna: koliko ljudi radi na njemu, kakav je napredak, zašto je važan. Nema storytelling elementa.

3. **"Istraži open-source projekte" link** — opet passivni CTA.

### C. How-To sekcija

**Trenutno stanje:** 3 koraka (Predloži, Glasaj, Realizuj) sa slikama i CTA dugmadima.

**Problemi:**

1. **Korak 1 je "Predloži ideju"** — ali to je advanced akcija. Novi korisnik neće predlagati projekat. Prvi korak bi trebao biti najlakša moguća akcija (npr. "Prijavi se" ili "Pogledaj projekte").

2. **Sekcija objašnjava proces, ali ne motiviše.** Ne odgovara na pitanje "ZAŠTO bih se priključio?" već samo "KAKO".

3. **Slika (`feature-office-long.webp`) zauzima 50% prostora** ali ne komunicira ništa specifično o platformi.

### D. Pricing/Donation sekcija

**Trenutno stanje:** 3 tiera (€5, €9, €990).

**Problemi:**

1. **€990/mesečno tier ("Guardian")** je nerealan za individue i djeluje neseriozno pored €5 i €9. Ogromna razlika između €9 i €990 stvara kognitivnu disonancu.

2. **Nema jednokratne opcije.** Sva tri tiera su mesečna pretplata. Mnogi korisnici preferiraju jednokratnu donaciju bez obaveze.

3. **Donacijska sekcija dolazi PRIJE nego što korisnik dobije razlog za doniranje.** Pricing je 4. sekcija, ali korisnik još nije vidio dovoljno dokaza o uticaju zajednice.

4. **Nema konkretnog uticaja.** "Pokriva troškove hostinga" nije motivišuć. Bolje: "Sa €5 mesečno, omogućavaš jednoj open-source aplikaciji da ostane dostupna za 1000+ korisnika."

5. **Nema testimonijala donatora.** Zašto bi neko donirao ako ne vidi da su i drugi donirali?

### E. FAQ sekcija

**Pozitivno:** Pretraga, filtri, 23 pitanja, show more/less — tehnički dobro urađeno.

**Problemi:**

1. **FAQ je poslednja sekcija.** Na landing stranici, FAQ služi da otkloni prepreke prije konverzije — ali nakon FAQ-a nema finalnog CTA-a. Korisnik pročita FAQ i... nema kuda dalje.

2. **Pitanja su tehničko-informativna.** Nedostaju emotivna pitanja poput "Kako moja donacija mijenja nešto?" ili "Šta se desilo sa dosadašnjim projektima?".

### F. Šta NEDOSTAJE na landingu

1. **Final CTA sekcija** — Nakon FAQ-a nema poziva na akciju. Stranica se završava bez closure-a.

2. **Social proof sekcija** — Nema statistike zajednice (broj članova, broj projekata, broj glasova), nema testimonijala, nema logotipova partnera.

3. **Storytelling / Impact sekcija** — Nema priče o tome šta je zajednica postigla. "Mi smo zajednica" nije dovoljno — treba "Evo šta smo zajedno napravili".

4. **Benefits sekcija** — Korisnik ne zna šta dobija pristupanjem. Nema "Šta ti donosi članstvo".

---

## III. SEO AUDIT

### A. Globalni meta tagovi

| Tag | Vrijednost | Problem |
|---|---|---|
| `<html lang="en">` | English | **Sajt je na srpskom!** Mora biti `lang="sr"` |
| `<meta name="viewport">` | Dupliran (linija 5 i 44) | Duplikat |
| `<title>` | "Push Serbia" | Prekratko, nema ključne riječi |
| `<meta description>` | English text | **Tekst je na engleskom a sajt na srpskom** |
| `og:title` | English | Mora biti srpski za srpsku publiku |
| `og:description` | English | Isto |
| `og:image` | `/pushserbia.png` | Relativni path — mora biti apsolutni URL za OG |
| `twitter:image` | `/pushserbia.png` | Isto |
| `<link rel="canonical">` | **NE POSTOJI** | Kritično za SEO |

### B. Per-page SEO

**Nijedna stranica nema dinamičke meta tagove.** Angular ne mijenja title/description po ruti. Svaka stranica ima isti "Push Serbia" title i isti opis. Ovo znači:
- Google vidi isti title za /projekti, /blog, /dokumentacija/o-nama
- Social sharing za bilo koju stranicu prikazuje isti tekst

### C. Strukturirani podaci (JSON-LD)

**Ne postoje.** Nedostaje:
- `Organization` schema
- `FAQPage` schema (za FAQ sekciju — ovo bi dalo rich results u Google-u)
- `WebSite` schema sa search action
- `BreadcrumbList` za navigaciju

### D. Sitemap problemi

- Sadrži `/admin/projekti` i `/admin/korisnici` — admin stranice ne bi trebale biti u sitemap-u
- Sadrži `/autentikacija/preusmeravanje/linkedin` — redirect stranica
- Sadrži `/profil` i `/profil/obavestenja` — auth-only stranice
- Nedostaje: dinamičke `/projekti/{slug}` i `/blog/{slug}` URL-ove
- Nema `<lastmod>` tagova

### E. Performance SEO

- SSR je uključen za landing, projekte, blog — **dobro**
- Dokumentacija je prerendered — **dobro**
- Slika `network.webp` (1.2MB) — potencijalno prevelika

---

## IV. UX/UI AUDIT

### A. Navigacija

**Header sadrži samo:** Logo + Theme switcher + User widget (Login/Avatar)

**Nedostaje:**
- Navigacijski linkovi (Projekti, Blog, O nama, Podrži)
- Na mobilnom nema hamburger menija jer nema šta prikazati
- Korisnik mora ići na footer ili FAQ za navigaciju

**Ovo je kritičan UX problem** — korisnik ne može navigirati sajt sa headera.

### B. Korisničke putanje i frikcija

**Putanja: Posjetilac → Registracija**
1. Landing page (nema CTA za registraciju u hero-u!)
2. Klikne "Istraži projekte" → /projekti
3. Klikne projekt → detalji
4. Klikne "Glasaj" → redirect na login
5. Login → LinkedIn OAuth

**Problem:** 5 koraka do registracije. Landing hero CTA vodi na projekte, ne na registraciju. Korisnik mora SAM otkriti da treba da se registruje.

**Putanja: Posjetilac → Donacija**
1. Landing → scrolluje do pricing sekcije (4. sekcija!)
2. Klikne "Pretplati se" → /placanja/placanje
3. Popuni formu (ime, email, checkbox)
4. Submit → "Hvala na podršci" (ali NEMA stvarne payment integracije!)

**Problem:** Payment forma prikuplja podatke ali **ne procesira plaćanje**. Korisnik se zahvali, ali nikad ne donira. Ovo je conversion killer.

### C. Emotivni dizajn

**Trenutno:** Čist, profesionalan, ali hladan. Nema:
- Ljudskih slika (osim 3 avatara u hero-u)
- Priča korisnika
- Vizuelnog prikaza uticaja (before/after, growth charts)
- Boja koje izazivaju emocije (samo zelena + siva)
- Animacija ili mikro-interakcija koje stvaraju "delight"

### D. Mobile UX

- Responzivan layout — **dobro**
- Hero slika skrivena na mobilnom — OK
- FAQ pretraga funkcionalna — **dobro**
- Pricing kartice se stackuju — **dobro**
- Footer gap od 4rem može biti prevelik na malom ekranu

---

## V. PSIHOLOŠKA ANALIZA (Conversion Psychology)

### A. Cialdini principi — primjena

| Princip | Primjenjen? | Ocjena |
|---|---|---|
| **Social Proof** | Minimalno (3 avatara) | 2/10 |
| **Authority** | Nema (nema partnera, institucija, medijskih objava) | 1/10 |
| **Reciprocity** | Nema (platforma ne daje ništa besplatno prije nego traži) | 1/10 |
| **Scarcity/Urgency** | Nema | 0/10 |
| **Commitment** | Djelimično (glasanje je mala obaveza) | 4/10 |
| **Liking** | Djelimično (clean design, ali nema emotivnog sadržaja) | 3/10 |

### B. Motivacioni framework (Self-Determination Theory)

| Potreba | Zadovoljena? | Kako poboljšati |
|---|---|---|
| **Autonomija** | Da — korisnik bira projekte | Dodati više opcija filtriranja i personalizacije |
| **Kompetentnost** | Slabo — nema sistema nivoa, badge-ova | Gamification: nivoi, badge-ovi, progress bar |
| **Pripadnost** | Slabo — nema community feeling | Testimonijali, member stories, "X članova online" |

### C. Fogg Behavior Model (B = M × A × T)

- **Motivation (M):** Niska — korisnik ne vidi konkretne razloge za akciju
- **Ability (A):** Srednja — LinkedIn login je jednostavan, ali navigacija je confusing
- **Trigger (T):** Nizak — nema urgencije, CTA-ovi su slabi

### D. Kognitivna opterećenja

1. **Choice overload na landingu** — previše sekcija (5) bez jasnog fokusa
2. **Pricing shock** — skok sa €9 na €990 je konfuzan
3. **Information overload u FAQ-u** — 23 pitanja bez kategorija

---

## VI. CONVERSION FUNNEL ANALIZA

### Trenutni funnel (procjena):

```
Landing page visitors:     100%
Scrolluju ispod fold-a:    ~40%  (hero ne daje razlog za scroll)
Kliknu CTA:                ~5%   (CTA-ovi su slabi)
Registruju se:             ~1%   (5 koraka do registracije)
Glasaju za projekat:       ~0.5% (moraju naći projekat koji ih zanima)
Doniraju:                  ~0.1% (nema payment integracije)
```

### Idealni funnel:

```
Landing page visitors:     100%
Scrolluju / engage:        ~70%  (emotivni hero + social proof)
Kliknu CTA:                ~15%  (jasni, benefit-focused CTA-ovi)
Registruju se:             ~8%   (1-klik LinkedIn, odmah iz hero-a)
Glasaju / učestvuju:       ~4%   (guided onboarding)
Doniraju:                  ~1%   (real payment, nakon dokaza uticaja)
```

---

## VII. TEHNIČKI PROBLEMI

### Lint greške (2)
- `payment-page.html:63` — `<div (click)>` bez keyboard event + focusability

### Build warnings (pre-existing)
- Bundle > 500KB (833KB) — prekoračen budget
- CommonJS moduli (slugify, ts-md5, quill-delta)

### Kod
- Signal anti-pattern u `LandingProjects` (effect kopira signal)
- Hero slika prazan `src=""`
- HowTo importuje `NgOptimizedImage` ali ga koristi (OK na develop)
- Footer ima `href="#"` linkove umjesto `routerLink`

### Accessibility
- ~12 SVG ikona bez `aria-hidden="true"`
- Sekcije bez `aria-labelledby`
- Payment page div bez keyboard accessibility

---

## VIII. PRIORITIZOVANE PREPORUKE

### Tier 1 — KRITIČNO ZA KONVERZIJU (Immediate Impact)

1. **Dodati navigaciju u header** — Linkovi: Projekti, Blog, O nama, Podrži nas
2. **Preraditi hero CTA** — Primarni: "Pridruži se zajednici" (→ LinkedIn login). Sekundarni: "Pogledaj projekte"
3. **Dodati social proof u hero** — Brojke: "750+ članova", "15 projekata", "X glasova"
4. **Dodati Final CTA sekciju** nakon FAQ-a — "Spreman da se pridružiš? Registruj se besplatno"
5. **Fix SEO lang** — `<html lang="sr">` umjesto `lang="en"`
6. **Fix og:image** — Apsolutni URL: `https://pushserbia.com/pushserbia.png`

### Tier 2 — VISOK UTICAJ (1-2 sedmice)

7. **Dodati benefits/value proposition sekciju** — "Šta dobijaš": Networking, Učenje, Projekti, Mentorstvo
8. **Dodati testimonijal/impact sekciju** — Priče članova, statistika uticaja
9. **Restrukturirati donation tiere** — Zamijeniti €990 sa jednokratnom opcijom (€20-50)
10. **Dinamički meta tagovi per-page** — Title, description za svaku rutu
11. **JSON-LD strukturirani podaci** — Organization, FAQPage schemas
12. **Očistiti sitemap** — Ukloniti admin, auth redirect, profile URL-ove

### Tier 3 — SREDNJI UTICAJ (2-4 sedmice)

13. **Dodati onboarding flow** — Nakon registracije: "Welcome" → "Popuni profil" → "Glasaj za prvi projekat"
14. **Gamification elementi** — Badge za prvi glas, badge za predložen projekat
15. **Newsletter integracija** — Footer forma da stvarno radi
16. **Blog CTA na landingu** — Kratka sekcija sa najnovijim blog postom
17. **Animirani brojači** — Statistike zajednice sa animacijom na scroll

### Tier 4 — NICE TO HAVE

18. **A/B test hero headline**
19. **Prefers-reduced-motion** podrška
20. **Lazy-load below-fold sekcije**
21. **PWA manifest**

---

## IX. LANDING PAGE SEKCIJSKI REDOSLJED (Preporučeni)

Trenutno: Hero → Projects → HowTo → Pricing → FAQ

**Preporučeno:**
1. **Hero** — Emotivni headline + Social proof + CTA za registraciju
2. **Social Proof / Stats** — Brojevi zajednice + partner logotipi
3. **Benefits** — Šta korisnik dobija (Networking, Učenje, Karijera, Impact)
4. **Projects** — Istaknuti projekti (3-4 komada)
5. **How It Works** — 3 koraka priključivanja
6. **Testimonials / Impact** — Priče članova, before/after
7. **Pricing** — Donacijske opcije (sa jednokratnom)
8. **FAQ** — Česta pitanja
9. **Final CTA** — Završni poziv na akciju + registracija

---

## X. METRIČKI CILJEVI

| Metrika | Trenutno (procjena) | Cilj |
|---|---|---|
| Bounce rate | ~65% | <45% |
| Avg. time on page | ~30s | >90s |
| CTA click rate | ~3% | >12% |
| Registration rate | ~1% | >5% |
| Donation conversion | ~0% (nema payment) | >0.5% |
| FAQ engagement | Nepoznato | >20% visitors |
