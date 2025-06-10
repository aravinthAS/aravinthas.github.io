# 👤 Min personlige nettside – aravinthas.github.io

Dette er koden for min personlige nettside hostet via [GitHub Pages](https://pages.github.com/), bygget med [Jekyll](https://jekyllrb.com/) og Bootstrap. Nettsiden inneholder informasjon om meg, min CV, reiseoversikt og utleie av parkeringsplass nær Gardermoen.

---

## 🚀 Komme i gang lokalt

For å kjøre siden lokalt trenger du Ruby og Bundler installert.

### 1. Installer Ruby og Bundler

Hvis du bruker macOS (anbefalt med rbenv):

```bash
brew install rbenv
rbenv install 3.2.2
rbenv global 3.2.2

gem install bundler
```

### 2. Installer prosjektets avhengigheter

```bash
bundle install
```

### 3. Start Jekyll-serveren

```bash
bundle exec jekyll serve
```

Åpne deretter i nettleseren:  
[http://127.0.0.1:4000](http://127.0.0.1:4000)

---

## 📁 Katalogstruktur

```text
.
├── _config.yml         # Jekyll-konfigurasjon
├── _includes/          # Gjenbrukbare HTML-komponenter
├── _layouts/           # HTML-layouts (f.eks. default.html)
├── _pages/             # Egne sider (CV, reise, parkering)
├── _posts/             # Blogginnlegg (valgfritt)
├── assets/             # CSS, JS og bilder
├── index.md            # Hjemmeside
├── .gitignore          # Ignorerte filer for Git
└── README.md           # Dokumentasjonen du leser nå
```

---

## 🌐 Publisering

Siden publiseres automatisk via GitHub Pages hver gang du pusher til `main`-branchen i dette repoet:

```
https://brukernavn.github.io
```

Erstatt `brukernavn` med ditt faktiske GitHub-brukernavn.

---

## 🧱 Avhengigheter

Typiske Ruby-gems brukt i prosjektet (definert i `Gemfile`):

- `jekyll`
- `jekyll-seo-tag`
- `jekyll-feed`
- `jekyll-sitemap`
- `webrick`
- `bootstrap` (lastes inn via CDN eller kompilert SCSS)

---


### Flow
1. Leie parkering skjema (ta med regnr)
2. admin sjekker om pris og forespørsel, endrer hvis feil
3. sender om bekreftelse mail til kunden
4. kunder svarer ja på lenken. (lenken kan også kopieres, slik at jeg kan sende den i finn.no)
5. Bekreftelse sendes på mail om hvor det skal parkeres.
6. Avslå mail sendes til admin

### Verktøy
supabase database og api
resend brukes for epost
