import { Injectable } from '@angular/core';
import { BlogPost } from './blog';

@Injectable({
  providedIn: 'root',
})
export class BlogStoreService {
  private _blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Kako doprineti open-source projektima',
      slug: 'kako-doprineti-open-source-projektima',
      author: 'Marko Marković',
      date: '2023-04-15',
      excerpt:
        'Vodič za početnike koji žele da se uključe u open-source zajednicu i doprinesu projektima.',
      content: `
        <p>Open-source projekti su srce moderne tehnologije. Oni omogućavaju saradnju između programera širom sveta i stvaraju softver koji je dostupan svima.</p>
        
        <h2>Zašto doprinositi open-source projektima?</h2>
        <p>Doprinošenje open-source projektima ima brojne prednosti:</p>
        <ul>
          <li>Učenje novih veština</li>
          <li>Građenje portfolija</li>
          <li>Povezivanje sa zajednicom</li>
          <li>Poboljšanje postojećih alata</li>
        </ul>
        
        <h2>Kako početi?</h2>
        <p>Evo nekoliko koraka za početak:</p>
        <ol>
          <li>Pronađite projekat koji vas zanima</li>
          <li>Pročitajte dokumentaciju i smernice za doprinose</li>
          <li>Počnite sa malim ispravkama</li>
          <li>Budite strpljivi i otvoreni za povratne informacije</li>
        </ol>
      `,
      image: 'https://example.com/images/open-source.jpg',
      tags: ['open-source', 'programiranje', 'zajednica'],
    },
    {
      id: '2',
      title: 'Razvoj web aplikacija u Srbiji',
      slug: 'razvoj-web-aplikacija-u-srbiji',
      author: 'Ana Anić',
      date: '2023-05-20',
      excerpt: 'Pregled stanja i trendova u razvoju web aplikacija u Srbiji.',
      content: `
        <p>Srbija je poslednjih godina postala značajan centar za razvoj web aplikacija u regionu. Sa rastućim brojem IT kompanija i freelancera, srpska tech scena je sve prisutnija na globalnom tržištu.</p>
        
        <h2>Trenutno stanje</h2>
        <p>Evo nekoliko ključnih činjenica o web razvoju u Srbiji:</p>
        <ul>
          <li>Preko 2000 IT kompanija</li>
          <li>Više od 30.000 programera</li>
          <li>Godišnji rast sektora od 20%</li>
          <li>Fokus na outsourcing i proizvode za globalno tržište</li>
        </ul>
        
        <h2>Popularni tehnološki stackovi</h2>
        <p>Najčešće korišćene tehnologije uključuju:</p>
        <ul>
          <li>JavaScript (React, Angular, Vue)</li>
          <li>PHP (Laravel, Symfony)</li>
          <li>Java i Spring</li>
          <li>.NET tehnologije</li>
        </ul>
      `,
      image: 'https://example.com/images/web-dev.jpg',
      tags: ['web razvoj', 'Srbija', 'tehnologija'],
    },
    {
      id: '3',
      title: 'Budućnost veštačke inteligencije',
      slug: 'buducnost-vestacke-inteligencije',
      author: 'Nikola Nikolić',
      date: '2023-06-10',
      excerpt:
        'Kako će veštačka inteligencija oblikovati našu budućnost i koje izazove donosi.',
      content: `
        <p>Veštačka inteligencija (AI) rapidno menja način na koji živimo i radimo. Od automatizacije rutinskih zadataka do revolucionarnih otkrića u medicini, AI ima potencijal da transformiše svaki aspekt našeg društva.</p>
        
        <h2>Trenutni trendovi</h2>
        <p>Neki od najvažnijih trendova u AI uključuju:</p>
        <ul>
          <li>Generativni AI modeli (GPT, DALL-E)</li>
          <li>Mašinsko učenje u zdravstvu</li>
          <li>Autonomna vozila</li>
          <li>Personalizovano obrazovanje</li>
        </ul>
        
        <h2>Etički izazovi</h2>
        <p>Sa razvojem AI dolaze i brojni etički izazovi:</p>
        <ul>
          <li>Privatnost podataka</li>
          <li>Algoritamska pristrasnost</li>
          <li>Automatizacija poslova</li>
          <li>Bezbednosni rizici</li>
        </ul>
      `,
      image: 'https://example.com/images/ai-future.jpg',
      tags: ['AI', 'veštačka inteligencija', 'tehnologija', 'budućnost'],
    },
  ];

  getBlogPosts(): BlogPost[] {
    return this._blogPosts;
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this._blogPosts.find((post) => post.slug === slug);
  }
}
