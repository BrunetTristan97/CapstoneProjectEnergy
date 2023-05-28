# **EcoEnergy**

## **Description du travail**:

ÉcoÉnergie est une compagnie qui aide à trouver des solutions écologiques. Cette compagnie aide aussi les habitants de résidences à mieux comprendre leur consommation pour participer à des systèmes écologiques et durables. Elle aide les habitants à avoir plus de contrôle et de savoir sur leur consommation d’énergie.

La consommation d’énergie peut augmenter très vite d’un mois à un autre mois sans que les consommateurs s’en aperçoivent. Si les consommateurs ne mesurent pas chaque consommation de leurs appareils, il est très difficile de pouvoir réaliser s'ils améliorent leur consommation d’un mois à un autre mois. La motivation du projet est d’aider les consommateurs à avoir plus de rétroaction sur leur consommation afin d’améliorer leur habitudes pour pouvoir consommer le moins d’énergie possible.

Nous consommons de plus en plus d’énergie, surtout depuis l'arrivée du travail à domicile avec la pandémie. Les factures d’hydro peuvent augmenter très rapidement sans s’en apercevoir. Le problème à résoudre consiste à détecter les anomalies de consommation et prévenir les consommateurs. Ces détections devraient se faire sur tous les appareils branchés. La consommation d’énergie peut augmenter très vite d’un mois à un autre mois sans que les consommateurs s’en aperçoivent. Si les consommateurs ne mesurent pas chaque consommation de leurs appareils, il est très difficile de pouvoir réaliser s'ils améliorent leur consommation d’un mois à un autre mois. La motivation du projet est d’aider les consommateurs à avoir plus de rétroaction sur leur consommation afin d’améliorer leur habitudes pour pouvoir consommer le moins d’énergie possible.

Suivant la méthode MLOPS, nous allons, étudier et transformer les données, concevoir des modèles basés sur l’apprentissage machine (ML) et l’apprentissage machine profond (DML), à l’aide des librairies utilisées dans le cadre du programme, en plus de créer et déployer un système complet basé sur votre solution d’intelligence artificielle, le tout permettant de répondre au problème décrit ci-dessous. 



## **Jeu de données (Dataset)**:

> __Dataset:__
- dred
- qud
- sim 

> __Columns:__

>> **qud** et **dred**:
- `   Occupancy    ` : 0 ou 1 respectivement pour non-occupe et occupe
- `   Power    ` : releve de puissance en watt (w) a une certaine frequence 
- `   PNormalized  ` : valeur normalisee de la puissance sur tout le dataset ( `P(t+1)-mean(t+1)/max(t+1)-min(t+1)` )
- `    p(t-1)   ` : valeur precedente uniquement lorsqu'il y'a changement de classe (output)
- `   p(t+1)    `  : valeur suivante uniquement lorsqu'il y'a changement de classe (output)
- `  out/classe` : etat courant de l'appareil (5 etats possibles)

>> **sim** :
- `   Occupancy    ` : 0 ou 1 respectivement pour non-occupe et occupe
- ` id appareil ` : identifiant unique d'un appareil ( 0 - 5 differents appareils ) 
- ` Sin(time) ` :
- ` Cos(time) ` :
- ` Sin(day) `  :
- ` Cos(day) ` :
- `   Power    ` : releve de puissance en watt (w) a une certaine frequence 
- `   PNormalized  ` : valeur normalisee de la puissance sur tout le dataset ( `P(t+1)-mean(t+1)/max(t+1)-min(t+1)` )
- `    p(t-1)   ` : valeur precedente uniquement lorsqu'il y'a changement de classe (output)
- `   p(t+1)    `  : valeur suivante uniquement lorsqu'il y'a changement de classe (output)
- `  out/classe` : etat courant de l'appareil (5 etats possibles)  

<br/>
<br/>
<br/>
<br/>
<br/>


## **References**:
>---

-  Name: YassineHimeur & Abdol
- Date: 28 janvier 2020
- Title: QUD-dataset
- Type: "electronic resource: dataset"
- URL : https://github.com/YassineHimeur/QUD-dataset
- Auteur(s) : Yassine Himeur, Abdullah Alsalemi, Faycal Bensaali & Abbes Amira

Note:

	Le jeu de données est fourni selon un laboratoire et un article; A novel Approach for Detecting Anomalous Energy Consumption Based on Micro-Moments and Deep Neural Networks. Celui-ci à été modifié pour la préparation de ce cours. Le jeu comporte 46 930 échantillons, ces données ne sont pas séparées et devront être séparées par la suite manuellement en données de test et entraînement.


