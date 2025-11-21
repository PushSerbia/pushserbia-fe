# Donacije i Finansiranje

## Opis / Poslovni kontekst
Funkcionalnost donacija i finansiranja omogućava korisnicima da finansijski podrže Push Serbia zajednicu kroz jednokratne donacije ili mesečne pretplate. Ova funkcionalnost je ključna za održivost projekta jer omogućava prikupljanje sredstava potrebnih za infrastrukturu, razvoj projekata, edukaciju i aktivnosti zajednice.

Trenutna implementacija ne podržava direktno online plaćanje, već prikuplja informacije o korisnicima koji žele da doniraju, nakon čega se proces plaćanja završava van platforme. Ovo je privremeno rešenje dok se ne implementira potpuna integracija sa sistemom za online plaćanje.

Funkcionalnost se sastoji od dve glavne komponente:
1. **Stranica o finansiranju** - informativna stranica koja objašnjava principe finansiranja i kako se koriste donacije
2. **Stranica za plaćanje** - interaktivna forma za prikupljanje podataka o korisnicima koji žele da doniraju

## Korisničke priče

### Kao posetilac sajta
- Kao posetilac sajta, želim da razumem kako se Push Serbia finansira, kako bih stekao poverenje u organizaciju pre nego što doniram.
- Kao posetilac sajta, želim da vidim kako se koriste donacije, kako bih znao da će moj novac biti iskorišćen na pravi način.
- Kao posetilac sajta, želim da vidim različite opcije za donaciju, kako bih mogao da izaberem onu koja mi najviše odgovara.

### Kao potencijalni donator
- Kao potencijalni donator, želim da lako izaberem iznos i tip donacije (jednokratna ili pretplata), kako bih mogao da podržim projekat na način koji mi odgovara.
- Kao potencijalni donator, želim da znam koje benefite dobijam za svaku opciju donacije, kako bih mogao da donesem informisanu odluku.
- Kao potencijalni donator, želim da jednostavno popunim formular sa svojim podacima, kako bih mogao brzo da završim proces donacije.

### Kao administrator
- Kao administrator, želim da primam obaveštenja o novim donacijama, kako bih mogao da kontaktiram donatore i završim proces plaćanja.
- Kao administrator, želim da imam evidenciju o donatorima i njihovim izabranim paketima, kako bih mogao da pratim finansiranje projekta.

## Pregled funkcionalnosti

### Stranica o finansiranju (/finansiranje)
1. Korisnik pristupa stranici o finansiranju putem navigacije ili direktnog linka
2. Stranica prikazuje:
   - Uvod o tome kako se Push Serbia finansira
   - Principe finansiranja (transparentnost, odgovornost, zajednica na prvom mestu, održivost)
   - Raspodelu donacija (infrastruktura 40%, razvoj projekata 30%, edukacija 20%, zajednica 10%)
   - Informacije o finansijskim izveštajima
3. Na dnu stranice nalazi se dugme "Podrži naš rad" koje vodi na stranicu za plaćanje sa predefinisanim parametrima za jednokratnu donaciju

### Stranica za plaćanje (/placanje)
1. Korisnik pristupa stranici za plaćanje direktno ili sa stranice o finansiranju
2. Stranica prikazuje izabrani paket donacije (naslov, iznos, tip - jednokratna ili pretplata)
3. Korisnik može da promeni izabrani paket klikom na "Promeni izabranu podršku"
4. Korisnik popunjava formular sa svojim podacima:
   - Ime i prezime (obavezno)
   - Email adresa (obavezno)
   - Potvrda da se slaže sa uslovima korišćenja (obavezno)
5. Nakon uspešnog slanja podataka, prikazuje se stranica sa potvrdom i zahvalnicom
6. Podaci se šalju na backend putem API-ja, gde se čuvaju za dalju obradu

### Opcije donacije
Sistem nudi tri predefinisane opcije donacije:
1. **Prijatelj zajednice** - €5 mesečno (pretplata)
   - Benefiti: pristup Slack kanalu, zahvalnica na sajtu, transparentni izveštaji, učešće u anketama
   - Uticaj: pokriva mesečne troškove hostinga i osnovnih servisa

2. **Aktivni član** - €15 mesečno (pretplata) - preporučena opcija
   - Benefiti: sve pogodnosti "Prijatelja zajednice" plus učešće u odlučivanju, pristup resursima za učenje, prioritetni glas
   - Uticaj: podržava organizaciju događaja i razvoj novih inicijativa

3. **Jednokratna podrška** - €97 jednokratno
   - Benefiti: sve pogodnosti "Prijatelja zajednice" plus mogućnost usmeravanja donacije, priznanje u dokumentaciji, pristup edukativnim materijalima
   - Uticaj: omogućava razvoj novih funkcionalnosti i edukativnih materijala

## UX napomene / Ideje za wireframe

### Stranica o finansiranju
- Čist, pregledan dizajn sa jasnim sekcijama
- Vizuelni prikaz raspodele donacija (potencijalno kroz grafikone)
- Istaknuto dugme za poziv na akciju na dnu stranice
- Responsive dizajn koji se prilagođava različitim veličinama ekrana

### Stranica za plaćanje
- Dvostepeni proces: 1) unos podataka, 2) potvrda
- Jasno istaknuta trenutno izabrana opcija donacije
- Dropdown za promenu opcije donacije koji se otvara/zatvara na klik
- Validacija forme u realnom vremenu sa jasnim porukama o greškama
- Indikator učitavanja tokom slanja podataka
- Jasna potvrda uspešne donacije sa zahvalnicom

## Tehničke napomene (visok nivo)

### Komponente
- **FinancingDetails** - statička komponenta za prikaz informacija o finansiranju
- **PaymentPage** - interaktivna komponenta za prikupljanje podataka o donaciji

### Modeli podataka
- **DonationOption** - interfejs koji definiše strukturu opcije donacije (naslov, cena, tip, opis, benefiti, uticaj)
- **SubscriptionData** - interfejs koji definiše strukturu podataka koji se šalju na backend

### Servisi
- **IntegrationsService** - servis za komunikaciju sa backend API-jem
  - `subscribeForPayment(email, name, message)` - metoda za slanje podataka o donaciji

### API endpointi
- `POST /integrations/subscribe` - endpoint za slanje podataka o donaciji
  - Parametri: email, name, message, tags

### Rutiranje
- `/finansiranje` - ruta za stranicu o finansiranju
- `/placanje` - ruta za stranicu za plaćanje
  - Query parametri: isOneTime, amount, title

## Kriterijumi prihvatanja

### Stranica o finansiranju
1. Stranica prikazuje sve sekcije definisane u pregledu funkcionalnosti
2. Dugme "Podrži naš rad" vodi na stranicu za plaćanje sa predefinisanim parametrima
3. Stranica je responsive i pravilno se prikazuje na desktop i mobilnim uređajima

### Stranica za plaćanje
1. Stranica prikazuje izabrani paket donacije na osnovu query parametara
2. Korisnik može da promeni izabrani paket donacije
3. Forma validira unos i prikazuje odgovarajuće poruke o greškama
4. Nakon uspešnog slanja podataka, prikazuje se stranica sa potvrdom
5. Podaci se uspešno šalju na backend API

## Granični slučajevi i ograničenja

### Granični slučajevi
1. **Nedostajući query parametri** - Ako korisnik direktno pristupi stranici za plaćanje bez query parametara, treba prikazati podrazumevanu opciju donacije
2. **Neuspešno slanje podataka** - Ako dođe do greške prilikom slanja podataka, prikazati jasnu poruku o grešci i omogućiti korisniku da pokuša ponovo
3. **Navigacija tokom procesa donacije** - Ako korisnik pokuša da napusti stranicu tokom procesa donacije, prikazati upozorenje
4. **Nevalidni iznosi donacije** - Sistem treba da prihvata samo predefinisane iznose donacija

### Ograničenja
1. **Bez direktnog online plaćanja** - Trenutna implementacija ne podržava direktno online plaćanje, već samo prikuplja podatke o korisnicima
2. **Ograničene opcije donacije** - Sistem trenutno podržava samo tri predefinisane opcije donacije
3. **Manuelna obrada donacija** - Nakon što korisnik pošalje podatke, potrebna je manuelna obrada i kontaktiranje korisnika za završetak procesa plaćanja
4. **Bez integracije sa CRM sistemom** - Trenutno ne postoji automatska integracija sa CRM sistemom za praćenje donatora

### Buduća poboljšanja
1. Implementacija direktnog online plaćanja kroz integraciju sa payment gateway-om
2. Mogućnost za korisnike da sami definišu iznos donacije
3. Automatsko generisanje i slanje potvrde o donaciji putem email-a
4. Dashboard za administratore sa pregledom donacija i statistikom
5. Integracija sa CRM sistemom za bolje praćenje donatora i njihovih donacija
