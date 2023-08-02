# Projet Travel-log
MAS-RAD | CAS-DAR | Développement front-end avancé

Alexander Mussitelli & Rafael Teixeira

## Introduction


# OLD README :
# travel-log
Projet MA-RAD | CAS-DAR | DFA


### page all-my-trips

- Afficher le titre du trip et afficher la description du trip
  - (1) Lazyloading? ou (2) un get pour afficher tous les trips? vote pour le (2).
- En option afficher une image de la place qui existe
- lier les boutons des tuiles
  - l'id du trip
  - la page trip-detail
- CSS des tuiles
- Reprendre CSS des pages pour l'affichage général
- afficher la tuile en attendant le chargement de la photo (asynchrone)


### page trip-detail

- ~~bouton ajouter une place~~ -> ok
- bouton modifier un place -> Not ok


### place form

- **Not ok**
- formulaire fonctionne
- problème avec submit. tripId n'est pas envoyé car pas connu. **TODO**  créer service pour avoir la response de trip et récupérer l'id du trip

fait un formulaire reactiv selon doc angular. En fait pas si facile, le template est plus adapté pour nous. A la lecture de la doc, cela sembler le contraire.
 

## architecture

Nous sommes partis dans l'optique de ne pas utiliser de modules car encore un peu abstrait même si nous en comprenons l'idée. Dans une optique de performance ou si le projet est plus grand et complexe, on ne pourrait y échapper.

En revanche, nous avons vu qu'il y a vite beaucoup de composants et que pour se retrouver, il est utile d'avoir différents dossier.

### utils

pour des composants utilisés partout tels les messages d'erreurs.
- ajouter un service pour partager la response de trip **TODO**
- ajouter un service pour partager la response de place **TODO**

### auth

pour gérer l'authentification et la connexion à l'API

### pages

pour les composants qui concernent les pages de notre application

### etc ...
