# Launch-checklist CDW

Deze site staat nog op concept. GitHub Pages publiceert vanaf `main`. Deze checklist moet af zijn vóór die branch live gaat. `noindex`, de canonical naar github.io en de labels “(concept)” blijven staan tot dan.

## Indexering en domein

- [ ] `noindex,nofollow` weghalen op elke pagina (meta robots).
- [ ] `robots.txt`: `Disallow: /` vervangen door een crawl die de site toelaat. De sitemap-URL mee aanpassen naar het echte domein.
- [ ] Canonical, Open Graph en Twitter-URL’s wijzen nu naar `https://clementgryp1991.github.io/v1-cleaning/`. Zet ze op het productiedomein.
- [ ] `sitemap.xml`: dezelfde domeinwissel, en daarna indienen.
- [ ] JSON-LD (`url`, `@id`, breadcrumbs) gebruikt dezelfde github.io-basis. Meenemen in de domeinwissel.
- [ ] Labels “(concept)” bij privacy, cookies en voorwaarden vervangen zodra de teksten juridisch zijn nagelezen.

## Formulier en contact

- [ ] `formEndpoint` in `site-config.js` invullen. Nu leeg: verzenden faalt bewust. Geen URL verzinnen.
- [ ] `contactEmail` invullen: `[INVULLEN: e-mailadres voor offertes]`.
- [ ] Bedankt-tekst: `[INVULLEN: responstijd]` vervangen door een afgesproken termijn.
- [ ] Zichtbare placeholders `[INVULLEN: formulier-endpoint]` en `[INVULLEN: e-mailadres voor offertes]` verwijderen zodra de waarden er zijn.
- [ ] Honeypot (`website`) laten staan.
- [ ] Privacytekst laten kloppen met de echte verwerking (endpoint, bewaartermijn, verwerker).

## Bewijzen die nog ontbreken

Niet invullen met aannames. Geen VCA of andere certificaten vermelden zolang CDW ze niet heeft.

- [ ] `[INVULLEN: actief sinds]`
- [ ] `[INVULLEN: certificaten/verzekering]`
- [ ] `[INVULLEN: klantlogo’s of cases]`

## Wat niet op de site hoort

- [ ] Geen uurtarieven.
- [ ] Geen openingsuren, tenzij die bevestigd zijn.
- [ ] Geen namen van oprichters.
- [ ] Werk blijft “opdracht van CDW”. Geen formuleringen over mensen plaatsen of uitzenden.
- [ ] Vergelijking blijft tegenover “zelf organiseren” en “projectreiniger”.
- [ ] Bezoeker blijft “je” / “jouw”.
- [ ] Telefoon blijft `+32 495 18 36 28` / `tel:+32495183628`, tenzij het nummer wijzigt.
- [ ] Rechtspersoon blijft Etablissements Charles De Waegenaere NV, Vijvermeerspark 28, 9000 Gent, BE0405.873.041, tenzij de gegevens wijzigen.

## Inhoud die al is uitgebreid

- [ ] Regiopagina’s voor Antwerpen, Mechelen, Leuven, Hasselt, Genk en Turnhout nalezen. Ze staan in de footer, in `areaServed` en in `sitemap.xml`.
- [ ] Bevestig dat “heel Vlaanderen” klopt met het echte werkgebied vóór je de pagina’s indexeert.
