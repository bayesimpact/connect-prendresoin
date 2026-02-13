export function getPrendresoinBaseURL(): string {
	return process.env.PRENDRE_SOIN_BASE_URL || 'https://prendresoin.francetravail.fr';
}

export function getFichesMetiersURLs(baseURL: string = getPrendresoinBaseURL()): string {
	return `
URL des fiches métiers Production

${baseURL}/je-decouvre/fiches-metier/accompagnant-accompagnante-des-eleves-en-situation-de-handicap-aesh
${baseURL}/je-decouvre/fiches-metier/accompagnant-educatif-accompagnante-educative-petite-enfance
${baseURL}/je-decouvre/fiches-metier/accompagnant-educatif-et-social-accompagnante-educative-et-sociale
${baseURL}/je-decouvre/fiches-metier/accueillant-familial-accueillante-familiale-aupres-denfants
${baseURL}/je-decouvre/fiches-metier/agent-agente-daccueil-social
${baseURL}/je-decouvre/fiches-metier/agent-agente-de-laboratoire-de-recherche-industrielle
${baseURL}/je-decouvre/fiches-metier/agent-agente-de-service-hospitalier-ash
${baseURL}/je-decouvre/fiches-metier/agente-agent-de-bio-nettoyage
${baseURL}/je-decouvre/fiches-metier/aide-a-domicile
${baseURL}/je-decouvre/fiches-metier/aide-a-domicile-auxiliaire-de-vie
${baseURL}/je-decouvre/fiches-metier/aide-soignant-aide-soignante
${baseURL}/je-decouvre/fiches-metier/ambulancier-ambulanciere
${baseURL}/je-decouvre/fiches-metier/assistant-assistante-de-recherche-clinique-en-industrie
${baseURL}/je-decouvre/fiches-metier/assistant-assistante-de-regulation-medicale
${baseURL}/je-decouvre/fiches-metier/assistant-assistante-de-service-social
${baseURL}/je-decouvre/fiches-metier/assistant-assistante-de-soins-en-gerontologie
${baseURL}/je-decouvre/fiches-metier/assistant-assistante-de-vie-dependance
${baseURL}/je-decouvre/fiches-metier/assistant-assistante-dentaire
${baseURL}/je-decouvre/fiches-metier/assistant-maternel-agree-assistante-maternelle-agreee
${baseURL}/je-decouvre/fiches-metier/assistant-medical-assistante-medicale
${baseURL}/je-decouvre/fiches-metier/attache-attachee-de-recherche-clinique-en-milieu-hospitalier
${baseURL}/je-decouvre/fiches-metier/audioprothesiste
${baseURL}/je-decouvre/fiches-metier/auxiliaire-de-puericulture
${baseURL}/je-decouvre/fiches-metier/bioinformaticien-bioinformaticienne-en-etudes-recherche-et-developpement
${baseURL}/je-decouvre/fiches-metier/biologiste-medical-medicale
${baseURL}/je-decouvre/fiches-metier/biostatisticien-biostatisticienne
${baseURL}/je-decouvre/fiches-metier/brancardier-brancardiere
${baseURL}/je-decouvre/fiches-metier/cadre-de-sante-dunite-de-soins-ou-de-service-paramedical
${baseURL}/je-decouvre/fiches-metier/charge-chargee-daffaires-en-renovation-energetique
${baseURL}/je-decouvre/fiches-metier/charge-chargee-de-recherche-clinique-arc
${baseURL}/je-decouvre/fiches-metier/chirurgien-chirurgienne
${baseURL}/je-decouvre/fiches-metier/chirurgien-dentiste-chirurgienne-dentiste
${baseURL}/je-decouvre/fiches-metier/conseiller-conseillere-en-genetique
${baseURL}/je-decouvre/fiches-metier/conseiller-conseillere-en-insertion-sociale-et-professionnelle
${baseURL}/je-decouvre/fiches-metier/conseiller-conseillere-en-transition-energetique-en-sante
${baseURL}/je-decouvre/fiches-metier/conseiller-en-economie-sociale-et-familiale
${baseURL}/je-decouvre/fiches-metier/coordinateur-coordinatrice-detudes-cliniques-cec
${baseURL}/je-decouvre/fiches-metier/coordonnateur-coordonnatrice-dactions-education-therapeutique-du-patient
${baseURL}/je-decouvre/fiches-metier/dieteticien-dieteticienne
${baseURL}/je-decouvre/fiches-metier/directeur-de-maison-de-retraite
${baseURL}/je-decouvre/fiches-metier/directeur-dhopital
${baseURL}/je-decouvre/fiches-metier/directeur-directrice-detablissement-medicosocial
${baseURL}/je-decouvre/fiches-metier/dosimetriste
${baseURL}/je-decouvre/fiches-metier/educateur-educatrice-de-jeunes-enfants
${baseURL}/je-decouvre/fiches-metier/educateur-specialise-educatrice-specialisee
${baseURL}/je-decouvre/fiches-metier/educateur-sportif-educatrice-sportive
${baseURL}/je-decouvre/fiches-metier/educateur-technique-specialise-educatrice-technique-specialisee
${baseURL}/je-decouvre/fiches-metier/ergotherapeute
${baseURL}/je-decouvre/fiches-metier/estheticien-estheticienne
${baseURL}/je-decouvre/fiches-metier/garde-denfant
${baseURL}/je-decouvre/fiches-metier/geriatre
${baseURL}/je-decouvre/fiches-metier/homme-sage-femme-sage-femme
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere-anesthesiste-iade
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere-de-bloc-operatoire-ibode
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere-de-sante-au-travail
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere-de-service-hospitalier
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere-en-pratique-avancee-ipa
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere-en-puericulture
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere-en-soins-generaux-ide
${baseURL}/je-decouvre/fiches-metier/infirmier-infirmiere-perfusionniste
${baseURL}/je-decouvre/fiches-metier/ingenieur-ingenieure-biochimiste-en-industrie
${baseURL}/je-decouvre/fiches-metier/ingenieur-ingenieure-r-d-en-industrie
${baseURL}/je-decouvre/fiches-metier/mandataire-judiciaire-a-la-protection-des-majeurs
${baseURL}/je-decouvre/fiches-metier/manipulateur-manipulatrice-en-radiologie
${baseURL}/je-decouvre/fiches-metier/masseur-masseuse-kinesitherapeute
${baseURL}/je-decouvre/fiches-metier/medecin-anesthesiste-reanimateur-mar
${baseURL}/je-decouvre/fiches-metier/medecin-biologiste
${baseURL}/je-decouvre/fiches-metier/medecin-coordonnateur
${baseURL}/je-decouvre/fiches-metier/medecin-generaliste
${baseURL}/je-decouvre/fiches-metier/medecin-specialiste
${baseURL}/je-decouvre/fiches-metier/mediateur-familial-mediatrice-familiale
${baseURL}/je-decouvre/fiches-metier/moniteur-educateur-monitrice-educatrice
${baseURL}/je-decouvre/fiches-metier/opticien-opticienne
${baseURL}/je-decouvre/fiches-metier/orthophoniste
${baseURL}/je-decouvre/fiches-metier/orthoprothesiste
${baseURL}/je-decouvre/fiches-metier/orthoptiste
${baseURL}/je-decouvre/fiches-metier/pedicure-podologue
${baseURL}/je-decouvre/fiches-metier/pharmacien-pharmacienne
${baseURL}/je-decouvre/fiches-metier/physicien-medical-physicienne-medicale-erd-en-industrie
${baseURL}/je-decouvre/fiches-metier/preparateur-preparatrice-en-pharmacie
${baseURL}/je-decouvre/fiches-metier/preparateur-preparatrice-en-pharmacie-hospitaliere-pph
${baseURL}/je-decouvre/fiches-metier/prothesiste-dentaire
${baseURL}/je-decouvre/fiches-metier/psychiatre
${baseURL}/je-decouvre/fiches-metier/psychologue
${baseURL}/je-decouvre/fiches-metier/psychomotricien-psychomotricienne
${baseURL}/je-decouvre/fiches-metier/puericulteur-puericultrice
${baseURL}/je-decouvre/fiches-metier/puericulteur-puericultrice-responsable-de-creche
${baseURL}/je-decouvre/fiches-metier/secretaire-medical-medicale
${baseURL}/je-decouvre/fiches-metier/socio-estheticien
${baseURL}/je-decouvre/fiches-metier/technicien-technicienne-bacteriologiste-en-laboratoire-de-controle-en-industrie
${baseURL}/je-decouvre/fiches-metier/technicien-technicienne-biochimiste-danalyse-industrielle
${baseURL}/je-decouvre/fiches-metier/technicien-technicienne-de-laboratoire-en-industrie
${baseURL}/je-decouvre/fiches-metier/technicien-technicienne-de-laboratoires-danalyses-medicales
${baseURL}/je-decouvre/fiches-metier/technicien-technicienne-detudes-cliniques
${baseURL}/je-decouvre/fiches-metier/technicien-technicienne-intervention-sociale-et-familiale-tisf
${baseURL}/je-decouvre/fiches-metier/teleconseiller-teleconseillere
`
}

export function getServicesMD(baseURL: string = getPrendresoinBaseURL()): string {
	return `
### 1.Je découvre - Fiches métier

  - Socle
  - **Type de service** : Intégration des fiches métiers
  - **URL de redirection** : Moteur de recherche + Fiches intégrés. Redirection vers FT Métierscope
  - **URL du service Production** : [${baseURL}/je-decouvre/fiches-metier](${baseURL}/je-decouvre/fiches-metier)

-----

### 1.Je découvre - Immersion facilitée

  - Socle
  - **Type de service** : Intégration complete
  - **Service ayant l'authent FT-Connect** : Oui
  - **URL de redirection** : Moteur de recherche + Présentation entreprise intégrés. Redirection possible vers FT, l'entreprise ou autre via des liens sur la présentation
  - **URL du service Production** : [${baseURL}/je-decouvre/immersion-facilite?utm\_source=chatFT](${baseURL}/je-decouvre/immersion-facilite?utm_source=chatFT)

-----

### 1.Je découvre - Diagoriente

  - Socle
  - **Type de service** : Intégration complete
  - **Service ayant l'authent FT-Connect** : Oui
  - **URL de redirection** : Questionnaire intégré avec proposition de métier \> redirection interne à la plateforme vers Fiches métier. Puis redirection vers Métierscope possible
  - **URL du service Production** : [${baseURL}/je-decouvre/diagoriente?utm\_source=chatFT](${baseURL}/je-decouvre/diagoriente?utm_source=chatFT)

-----

### 1.Je découvre - JeVeuxAider.gouv

  - Socle
  - **Type de service** : Intégration complete
  - **URL de redirection** : Moteur de recherche intégré. Rediredction par la mission vers [https://www.jeveuxaider.gouv.fr/missions-benevolat/](https://www.jeveuxaider.gouv.fr/missions-benevolat/) + ref mission
  - **URL du service Production** : [${baseURL}/je-decouvre/je-veux-aider](${baseURL}/je-decouvre/je-veux-aider)

-----

### 1.Je découvre - Service Civique

  - Socle
  - **Type de service** : Intégration complete
  - **URL de redirection** : Moteur de recherche intégré. Redirection via les missions \> [https://www.service-civique.gouv.fr/trouver-ma-mission/](https://www.service-civique.gouv.fr/trouver-ma-mission/) + ref mission
  - **URL du service Production** : [${baseURL}/je-decouvre/service-civique](${baseURL}/je-decouvre/service-civique)

-----

### 1.Je découvre - Service Civique Solidarité Seniors

  - Specifique
  - **Type de service** : Intégration complete
  - **URL du service Production** : [${baseURL}/je-decouvre/service-civique-solidarite-seniors](${baseURL}/je-decouvre/service-civique-solidarite-seniors)

-----

### 1.Je découvre - Bloc videos

  - Socle
  - **Type de service** : En cours de développement

-----

### 1.Je découvre - MyJobGlasses

  - Socle
  - **Type de service** : Reflexion en cours
  - **Service ayant l'authent FT-Connect** : Oui
  - **URL de redirection** : PrendreSoin = redirection simple vers le site

Idf + à venir = Intégration complète avec moteur de recherche. Redirection vers les professionnels sur le site [https://www.myjobglasses.com/professionals/](https://www.myjobglasses.com/professionals/) + ref pro

  - **URL du service Production** : [${baseURL}/je-me-fais-accompagner/my-job-glasses](${baseURL}/je-me-fais-accompagner/my-job-glasses)

-----

### 1.Je découvre - 1élève1stage

  - Socle
  - **Type de service** : Intégration complete
  - **Service ayant l'authent FT-Connect** : Autre Systeme : EDUCONNECT
  - **URL de redirection** : Moteur de recherche intégré. Redirection via les stages \> [https://1eleve1stage.education.gouv.fr/offres-de-stage](https://1eleve1stage.education.gouv.fr/offres-de-stage) + stage séléctionné
  - **URL du service Production** : [${baseURL}/je-decouvre/1-eleve-1-stage](${baseURL}/je-decouvre/1-eleve-1-stage)

-----

### 1.Je découvre - jobirl.com

  - Socle
  - **Type de service** : Redirection simple
  - **URL de redirection** : PrendreSoin = [https://www.jobirl.com/e-mentorat/jeunes?mtm\_source=prendresoinft\&mtm\_medium=referral\&mtm\_campaign=mentorat](https://www.jobirl.com/e-mentorat/jeunes?mtm_source=prendresoinft&mtm_medium=referral&mtm_campaign=mentorat)
  - **URL du service Production** : [${baseURL}/je-decouvre/jobirl-ambassadeur](${baseURL}/je-decouvre/jobirl-ambassadeur)

-----

### 1.Je découvre - Mes événements emploi

  - Socle
  - **Type de service** : Intégation du moteur avec redirection sur MEE
  - **URL de redirection** : Moteur de recherche intégré. Redirection vers FT si clic sur "Je découvre" un événement \> [https://mesevenementsemploi.francetravail.fr/mes-evenements-emploi/evenement](https://mesevenementsemploi.francetravail.fr/mes-evenements-emploi/evenement) + ref event
  - **URL du service Production** : [${baseURL}/je-decouvre/evenements-de-decouverte](${baseURL}/je-decouvre/evenements-de-decouverte)

-----

### 1.Je découvre - Evenements fournis par les partenaires via un formulaire et une modération

  - Socle
  - **Type de service** : En cours de développement

-----

### 2. Je me fais accompagner - Moteur de recherche des structures (France Travail, Missions locales, Cap Emploi)

  - Socle
  - **Type de service** : Intégration complete
  - **URL du service Production** : [${baseURL}/je-me-fais-accompagner/annuaire-acteurs](${baseURL}/je-me-fais-accompagner/annuaire-acteurs)

-----

### 2. Je me fais accompagner - Mon conseil en évolution pro

  - Socle
  - **Type de service** : Redirection simple
  - **URL de redirection** : [https://mon-cep.org/](https://mon-cep.org/)
  - **URL du service Production** : [${baseURL}/je-me-fais-accompagner/mon-conseil-evo-pro](${baseURL}/je-me-fais-accompagner/mon-conseil-evo-pro)

-----

### 2. Je me fais accompagner - Dema1n . org

  - Socle
  - **Type de service** : Redirection simple
  - **URL de redirection** : [https://www.dema1n.org/etudiant/web/](https://www.dema1n.org/etudiant/web/)
  - **URL du service Production** : [${baseURL}/je-me-fais-accompagner/DEMA1N.org](${baseURL}/je-me-fais-accompagner/DEMA1N.org)

-----

### 2. Je me fais accompagner - 1jeune1mentor

  - Socle
  - **Type de service** : Intégation complete
  - **URL de redirection** : Questionnaire à compléter depuis la plateforme
  - **URL du service Production** : [${baseURL}/je-me-fais-accompagner/1-jeune-1-mentor](${baseURL}/je-me-fais-accompagner/1-jeune-1-mentor)

-----

### 2. Je me fais accompagner - MyJobGlasses

  - Socle
  - **Type de service** : Reflexion en cours
  - **Service ayant l'authent FT-Connect** : Oui
  - **URL de redirection** : PrendreSoin = redirection simple vers le site

Idf + à venir = Intégration complète avec moteur de recherche. Redirection vers les professionnels sur le site [https://www.myjobglasses.com/professionals/](https://www.myjobglasses.com/professionals/) + ref pro

  - **URL du service Production** : [${baseURL}/je-decouvre/jobirl-ambassadeur](${baseURL}/je-decouvre/jobirl-ambassadeur)

-----

### 2. Je me fais accompagner - job IRL

  - Socle
  - **Type de service** : Redirection simple
  - **URL de redirection** : [https://www.jobirl.com/e-mentorat/jeunes?mtm\_source=prendresoinft\&mtm\_medium=referral\&mtm\_campaign=mentorat](https://www.jobirl.com/e-mentorat/jeunes?mtm_source=prendresoinft&mtm_medium=referral&mtm_campaign=mentorat)
  - **URL du service Production** : [${baseURL}/je-decouvre/jobirl-ambassadeur](${baseURL}/je-decouvre/jobirl-ambassadeur)

-----

### 2. Je me fais accompagner - France VAE

  - Socle
  - **Type de service** : Redirection simple
  - **URL de redirection** : [https://vae.gouv.fr/](https://vae.gouv.fr/)
  - **URL du service Production** : [${baseURL}/je-me-fais-accompagner/france-vae](${baseURL}/je-me-fais-accompagner/france-vae)

-----

### 2. Je me fais accompagner - Emploi Store

  - Socle
  - **Type de service** : Redirection simple
  - **URL de redirection** : [https://www.emploi-store.fr/portail/accueil](https://www.emploi-store.fr/portail/accueil)
  - **URL du service Production** : [https://www.emploi-store.fr/portail/accueil](https://www.emploi-store.fr/portail/accueil)

-----

### 2. Je me fais accompagner - Mes aides FT

  - Socle
  - **Type de service** : Redirection simple
  - **URL de redirection** : [https://mes-aides.francetravail.fr/](https://mes-aides.francetravail.fr/)
  - **URL du service Production** : [${baseURL}/je-me-fais-accompagner/mes-aides-france-travail](${baseURL}/je-me-fais-accompagner/mes-aides-france-travail)

-----

### 3. Je me forme ou je postule - Moteur de recherche emploi FT

  - Socle
  - **Type de service** : Intégation du moteur avec redirection
  - **URL du service Production** : [${baseURL}/je-me-forme-ou-je-postule/offres-emploi](${baseURL}/je-me-forme-ou-je-postule/offres-emploi)

-----

### 3. Je me forme ou je postule - La bonne boite

  - Socle
  - **Type de service** : Intégration des offres avec redirection sur la bonne boite
  - **Service ayant l'authent FT-Connect** : Oui
  - **URL de redirection** : Moteur de recherche intégré. Redirection si clic sur "Découvrir" une entreprise \> [https://labonneboite.francetravail.fr/entreprise/](https://labonneboite.francetravail.fr/entreprise/) + code entreprise
  - **URL du service Production** : [${baseURL}/je-me-forme-ou-je-postule/la-bonne-boite](${baseURL}/je-me-forme-ou-je-postule/la-bonne-boite)

-----

### 3. Je me forme ou je postule - La bonne alternance

  - Socle
  - **Type de service** : Intégration des offres avec redirection sur la bonne alternance
  - **URL de redirection** : Moteur de recherche intégré. Redirection si clic sur "Découvrir" une alternance \> [https://labonnealternance.apprentissage.beta.gouv.fr/emploi/offres\_emploi\_lba/](https://labonnealternance.apprentissage.beta.gouv.fr/emploi/offres_emploi_lba/) + code offre
  - **URL du service Production** : [${baseURL}/je-me-forme-ou-je-postule/la-bonne-alternance](${baseURL}/je-me-forme-ou-je-postule/la-bonne-alternance)

-----

### 3. Je me forme ou je postule - Immersion facilité

  - Socle
  - **Type de service** : Intégration complète
  - **URL de redirection** : Moteur de recherche + Présentation entreprise intégrés. Redirection possible vers FT, l'entreprise ou autre via des liens sur la présentation
  - **URL du service Production** : [${baseURL}/je-me-forme-ou-je-postule/immersion-facilite](${baseURL}/je-me-forme-ou-je-postule/immersion-facilite)

-----

### 3. Je me forme ou je postule - Ma Formation (FT - infos du carif oref)

  - Socle
  - **Type de service** : Intégration des formations avec redirection sur les formations
  - **URL du service Production** : [${baseURL}/je-me-forme-ou-je-postule/formation](${baseURL}/je-me-forme-ou-je-postule/formation)

-----

### 3. Je me forme ou je postule - Mon compte formation

  - Socle
  - **Type de service** : Redirection simple
  - **URL de redirection** : [https://www.moncompteformation.gouv.fr/](https://www.moncompteformation.gouv.fr/)
  - **URL du service Production** : [${baseURL}/je-me-forme-ou-je-postule/mon-compte-formation](${baseURL}/je-me-forme-ou-je-postule/mon-compte-formation)

-----

### 3. Je me forme ou je postule - Mes événements emploi

  - Socle
  - **Type de service** : Intégration des événements avec redirection sur MEE
  - **URL de redirection** : Moteur de recherche intégré. Redirection vers FT si clic sur "Je découvre" un événement \> [https://mesevenementsemploi.francetravail.fr/mes-evenements-emploi/evenement](https://mesevenementsemploi.francetravail.fr/mes-evenements-emploi/evenement) + ref event
  - **URL du service Production** : [${baseURL}/je-me-forme-ou-je-postule/evenements-emploi-recrutement-je-postule](${baseURL}/je-me-forme-ou-je-postule/evenements-emploi-recrutement-je-postule)

-----

### 3. Je me forme ou je postule - Evenements fournis par les partenaires via un formulaire et une modération

  - Socle
  - **Type de service** : En cours de développement

-----`;
}
