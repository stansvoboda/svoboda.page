import type { RawProject } from "../../schema"

// A first draft written from the project's repo; the owner may reword it.
export const parkHriste = {
  slug: "park-hriste",
  milestone: "coders-lab",
  name: { en: "Park Hřiště", cs: "Park Hřiště" },
  summary: {
    en: "My Coders Lab final project: a map and list of Prague's parks and playgrounds built on the city's open data.",
    cs: "Můj závěrečný projekt z Coders Lab: mapa a seznam pražských parků a hřišť postavená na otevřených datech města.",
  },
  technologies: ["react", "javascript", "tailwind-css"],
  featured: false,
  demo: "https://parkhriste2.pages.dev",
  repo: "https://github.com/stansvoboda/parkhriste2",
  thumbnail: "/projects/park-hriste-map.jpg",
  screenshots: [
    {
      src: "/projects/park-hriste-map.jpg",
      alt: {
        en: "Map of Prague with icons marking playgrounds and parks.",
        cs: "Mapa Prahy s ikonami, které označují hřiště a parky.",
      },
    },
    {
      src: "/projects/park-hriste-list.jpg",
      alt: {
        en: "List of Prague parks with their addresses.",
        cs: "Seznam pražských parků s jejich adresami.",
      },
    },
  ],
  caseStudy: {
    context: {
      en: "The course brief asked for a simple React app that loads data from an API, such as films from a database. I wanted something more useful: parents looking for a place to take their kids have the information scattered across many sites. Prague publishes its parks and playgrounds as open data in the Golemio API, so I built an app that shows them all on an interactive map and in a list.",
      cs: "Zadání kurzu chtělo jednoduchou React aplikaci, která načítá data z API, třeba filmy z databáze. Já chtěl něco užitečnějšího: rodiče, kteří hledají, kam vzít děti, mají informace roztroušené po mnoha webech. Praha zveřejňuje své parky a hřiště jako otevřená data v Golemio API, a tak jsem postavil aplikaci, která je všechny ukáže na interaktivní mapě i v seznamu.",
    },
    role: {
      en: "I built it alone as the final project of the course: React with React Router, Tailwind CSS with daisyUI and an interactive Leaflet map, with a light and dark theme.",
      cs: "Postavil jsem ji sám jako závěrečný projekt kurzu: React s React Routerem, Tailwind CSS s daisyUI a interaktivní mapa v Leafletu, se světlým a tmavým režimem.",
    },
    decisions: {
      en: "I took the data straight from the city's API instead of collecting it by hand, so the app stays up to date. The map centres on the visitor's location, and picking a place in the list opens it on the map.",
      cs: "Data jsem bral přímo z API města místo ručního sběru, takže aplikace zůstává aktuální. Mapa se vycentruje na polohu návštěvníka a výběr místa v seznamu ho otevře na mapě.",
    },
    challenge: {
      en: "The browser didn't let the app read data from the Golemio API because of CORS, a rule that allows reading data from another domain only when that domain permits it. And every visitor would have seen the API key. I solved it with a proxy: a small function on Cloudflare on the same domain as the app. It adds the key and passes the data from Golemio on. CORS isn't checked between servers, and the key stays hidden.",
      cs: "Prohlížeč aplikaci nedovolil číst data z Golemio API kvůli CORS, pravidlu, které čtení dat z cizí domény povolí, jen když to ta doména dovolí. A API klíč by viděl každý návštěvník. Vyřešil jsem to proxy: malou funkcí na Cloudflare na stejné doméně jako aplikace. Ta přidá klíč a data z Golemia předá dál. Mezi servery se CORS nekontroluje a klíč zůstane skrytý.",
    },
    result: {
      en: "A working app running on Cloudflare Pages that shows hundreds of Prague playgrounds and gardens with their photos.",
      cs: "Funkční aplikace běžící na Cloudflare Pages, která ukazuje stovky pražských hřišť a zahrad i s fotkami.",
    },
    ai: {
      en: "I wrote about half of the app myself. As the submission deadline got close, GitHub Copilot helped me solve the problems with connecting to the API. Later I used an AI agent to move the hosting from Netlify to Cloudflare.",
      cs: "Zhruba polovinu aplikace jsem napsal sám. Když se blížil termín odevzdání, pomohl mi GitHub Copilot vyřešit problémy s napojením na API. Později jsem s AI agentem přesunul hosting z Netlify na Cloudflare.",
    },
    differently: {
      en: "The map and the open data were more than the brief required. I submitted the project on time, but because of the map I had no time left for how the parks and playgrounds are shown. Today I would choose a smaller scope and put more care into how the places look in the list.",
      cs: "Mapa a otevřená data byly víc, než zadání vyžadovalo. Projekt jsem stihl odevzdat, ale kvůli mapě mi nezbyl čas na zobrazení parků a hřišť. Dnes bych zvolil menší rozsah a víc péče věnoval tomu, jak místa vypadají v seznamu.",
    },
  },
} satisfies RawProject
