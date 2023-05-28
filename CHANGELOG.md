# Changelog
Ce fichier contient les changements apportes au projets Ecoenergy capstone
 
Version 1.0.0 (01-05-2023)
## **New**
- creation des colonnes selon le mecanisme de la fenetre (sliding window) pour chaque fenetre:
    * `   Occup 1 ` , ` Occu 2 ` , ` Occup 3 `: etat du capteur selon la colonne **_occupancy_** sur 03 valeurs consecutives
    * `   Power 1 ` , ` Power 2` , ` Power 3   `: valeur de la lecture de la puissance selon la colonne **_power_** sur 03 valeurs consecutives
    * `   PNorm  1 ` , ` PNorm 2 ` , ` PNorm 3 `: valeur de la lecture de la puissance normalisee selon la colonne **_powerNormalized_** sur 03 valeurs consecutives    
    * ` p(t-1)  1 ` , `  p(t-1) 2  ` , `  p(t-1) 3  `: valeur de la lecture de la puissance selon la colonne **_p(t-1)_** sur 03 valeurs consecutives    
     * `   p(t+1)  1 ` , `  p(t+1) 2 ` , `  p(t+1) 3   ` : valeur de la lecture de la puissance selon la colonne **_p(t+1)_** sur 03 valeurs consecutives      
    * `  out/classe   1 ` , ` out/classe 2 ` , ` out/classe 3 `: valeur de la lecture de la classe/output de l'etat de consommation de l'appareil selon la colonne **_classe_** sur 03 valeurs consecutives    
    * `mean` : moyenne des trois valeurs contenues dans une fenetre ( selon la formule (**_'pn1' + 'pn2' + 'pn3' ) / 3_** ) 
    * `diff` : la difference de 2 valeurs consecutives (pour la colonne **_power 2 = p2_**)

    **Note**: Chaque fenetre est constitue de 3 lectures consecutives
 
## **Changes** 
- Suppression des colonnes (dans le dataset **_sim_**)
    * ` id appareil `
    * ` Sin(time) ` 
    * ` Cos(time) ` 
    * ` Sin(day) ` 
    * ` Cos(day) `
 
## **Fixes**
- separer le dataset **_sim_** en 6 differents sous dataset selon les differents equipements disponoble (colonne `Id Appliance`); on obtient donc 06 sous datasets:
    - new_subdataset0_01_20230516.xlsx (equipement 0)
    - new_subdataset1_01_20230516.xlsx (equipement 1)
    - new_subdataset2_01_20230516.xlsx (equipement 2)
    - new_subdataset3_01_20230516.xlsx (equipement 3)
    - new_subdataset4_01_20230516.xlsx (equipement 4)
    - new_subdataset5_01_20230516.xlsx (equipement 5)

