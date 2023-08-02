# Travel-log

MAS-RAD | CAS-DAR | Développement front-end avancé

## Table des matières

- [Introduction](#introduction)
- [Site pages](#site-pages)
- [Features](#features)
  - [Create user & login](#create-user--log-in)
  - [Consulter sa liste de trip](#list-of-trips)
  - [Create a trip](#create-a-trip)
  - [Update or delete trip](#update-or-delete-a-trip)

## Introduction

L'application TravelLog est pensée comme un carnet de voyage. De ce fait, elle est centrée autour d'une seule personne utilisatrice. C'est à dire que seuls les voyages ajoutés par cette personne sont consultables dans l'app.

## Site pages

L'app travel log est constituée de 7 pages. Toutes les pages (exceptée la page Login) comportent une barre de navigation qui permet à tout moment d'aller à la page [All my trips](#all-my-trips), de [lancer une recherche](#trips-on-map), et de se [Logout](#logout).

### Login

Page pour se [connecter](#create-user--log-in) à l'app ou [créer un compte](#create-user--log-in). Cette page est la seule page accessible et la page par défaut lorsqu'on n'est pas connecté.

### All my trips

Page pour consulter sa liste de trips. Si aucun trip n'existe, un lien redirigeant vers la page [New trip](#new-trip) est affiché. Si des trips existent, la page affiche la photo de la première place qui en possède une, le titre du trip ainsi qu'une partie de sa description.

Cette page est accessible depuis partout sur le site en cliquant dans la barre de navigation.

Cliquer sur un trip permet d'accéder à la page [trip detail](#trip-detail).

### New trip

Page permettant de [créer un nouveau trip](#create-a-trip). Une fois le trip créé, on est redirigé vers la page [trip detail](#trip-detail) du trip alors créé.

### Trip detail

Page permettant de visionner et modifier les différentes données d'un trip. Elle permet de [modifier le trip](#update-or-delete-a-trip), de le [supprimer](#update-or-delete-a-trip) et de le [visualiser sur la map](#see-trip-on-map).

Cette page permet également de naviguer vers la page [New place](#new-place) qui permet d'[ajouter une place](#create-place) au trip, de naviguer vers la page [place detail](#place-detail) qui permet de visualiser une place et de la [modifier](#update-place).

Elle permet enfin de [centrer la map](#center-map-on-existing-place) sur une place ou de [centrer la map](#center-map-around-many-places) autour de toutes les places du trip.

### New place

Page permettant de [créer une nouvelle place](#create-place) pour un trip donné.

Cette page inclue deux fonctionnalités pour définir les coordonneés de la place. Une permettant de le faire en [cliquant sur la map](#set-coordinates-clicking-on-map) et l'autre permettant de [récupérer la position actuelle](#set-coordinates-on-current-position) (géolocalisation).

### Place detail

Page permettant de visualiser ou [modifier une place](#update-place).

Cette page inclue deux fonctionnalités pour définir les coordonneés de la place. Une permettant de le faire en [cliquant sur la map](#set-coordinates-clicking-on-map) et l'autre permettant de [récupérer la position actuelle](#set-coordinates-on-current-position) (géolocalisation).

### Trips on map

Page permettant d'afficher les résultats de la [fonction de recherche](#search-trips-or-places).

## Features

### Create user & log-in

Pour créer un compte, il faut être déconnecté. L'app s'ouvre alors sur la page de login où il faut cliquer sur le lien "Create account". La passe alors en mode création de compte. Pour créer un compte il faut inscrire un _Username_ et un _Password_. Un fois que l'acompte a été créé, on est automatiquement connecté.

Si un compte existe déjà, il faut inscrire le _Username_ et _Password_ pour se connecter.

Lors de la connection, l'app s'ouvre directement à la page "All my trips".

### Logout

Si on est connecté, il est possible à tout moment de se déconnecter. Pour celà, il suffit de cliquer sur le bouton "Logout" présent dans la barre de navigation.

### List of trips

Pour consulter sa liste de trips, il suffit de cliquer sur "All my trips" dans la barre de navigation.
La page affiche alors tous les trip liés au compte connecté.

### Create a trip

Pour créer un nouveau trip, il faut cliquer sur le bouton "New trip" dans la barre de navigation ou sur le lien "... Click here ..." lorsqu'on n'a encore aucun trip.

Il faut ensuite donner un titre au trip ainsi qu'une description puis cliquer sur le bouton "Save". Un fois le trip créé, on est redirigé automatiquement vers la page Trip detail du trip qu'on vient de créer.

### Update or delete a trip

Pour modifier ou supprimer un trip, il faut aller sur sa page de détails. Pour accéder à celle-ci, il faut aller dans "All my trips" et cliquer sur le trip souhaité.

Pour modifier les informations du trip, il faut modifier les informations dans les champs de texte et cliquer ensuite sur "Save changes". Un message informe lorsque la modification a été enregistrée.

Pour supprimer un trip, il faut cliquer sur l'icône poubelle à côté du bouton "Save changes". Un message de confirmation apparaît. La suppression peut alors être confirmée ou annulée.

### Create place

Pour créer une place, il faut aller sur la page trip detail du trip auquel on veut l'ajouter. Il faut ensuite cliquer sur le bouton "plus" à côté de "Places list".

Pour créer une place, il faut lui donner un nom, une description, une latitude et une longitude. Si on souhaite y ajouter une image, il faut indiquer l'URL de l'image souhaitée.

La latitude et la longitude peuvent être définies manuellement mais elles peuvent également l'être à l'aide des deux fonctionnalités : [définir les coordonnées en cliquant sur la map](#set-coordinates-clicking-on-map) et [définir les coordonnées sur la position actuelle](#set-coordinates-on-current-position) (géolocalisation).

### Update place

Pour modifier une place, il faut cliquer sur l'icône "crayon" de la place en question. Celle-ci peut être cliquée depuis la liste des places lorsqu'on consulte les détails d'un trip ou depuis les résutats d'une recherche.

Les fonctionnalités sont les mêmes que pour [créer une place](#create-place).

### Delete place

Pour supprimer une place, il faut ouvrir le trip qui contient la place en question puis, dans la partie places list, cliquer sur l'icône supprimer de la place correspondante. Un message de confirmation permet de confirmer ou annuler la suppression.

### Center map on existing place

Cette fonctionnalité permet de centrer la map sur une place. Elle est accessible depuis la page trip detail ou depuis les résultats de recherche. Il faut alors cliquer sur l'icône "cible".

### Center map around many places

Pour activer cette fonctionnalité, il faut cliquer sur l'icône <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/></svg>.

Cette fonctionnalité permet de centrer la map autour de plusieurs places. Elle est accessible sur la page trip detail, où la map se centrera autour de toutes les places du trip ou depuis les résultats de recherches où elle se centrera autour d'un ensemble de places d'un même trip (corresponsant au résultats de recherche) ou autour de toutes les places de la recherche (pouvant donc couvrir plusieurs trips).

### See trip on map

Pour voir un trip sur la map, il suffit de naviguer vers la page de détails d'un trip (trip detail) depuis la page "All my trips" ou depuis le résultat de recherches. Sur cette page, toutes les places du trip en question seront affichées sur la map.

### Set coordinates clicking on map

Lors de la création ou la modification d'une place, il est possible de définir les coordonées en cliquant sur la map. Pour cela, il faut cliquer sur l'icône "épingle". Celle-ci devient alors jaune et un message indique qu'un click sur la map est attendu. En cliquant sur la map, les coordonnées seront alors définies à l'endroit du clique et un marqueur ajouté.

La fonction peut-être annulée en recliquant sur l'icône <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M16 144a144 144 0 1 1 288 0A144 144 0 1 1 16 144zM160 80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96c0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zM128 480V317.1c10.4 1.9 21.1 2.9 32 2.9s21.6-1 32-2.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32z"/></svg>.

### Set coordinates on current position

Lors de la création ou la modification d'une place, il est possible de définir les coordonnées à la position actuelle (géolocalisation). Pour cela, il faut cliquer sur l'icône "cible". Si la géolocalisation n'est pas activée, il faut alors l'activer. Les coordonnées seront alors définies à la position actuelle et un marqueur sera ajouté.

### Search trips or places

Une fois connecté, une recherche peut être effectuée depuis n'importe quelle page du site. Pour cela, il faut inscrire les mots recherchés dans la barre de navigation et cliquer sur la loupe.

Une fois la recherche demandée, le site est redirigé vers la page trips on a map où la recherche est alors lancée. La fonction de recherche va récupérer tous les trips et toutes les places correspondant aux termes recherchés. Le résultat de recherche sera affiché dans une liste à gauche de la page. Cette liste affiche toujours les places sous le trip auquel elles appartiennent.

Depuis le résultat de recherche il est possible d'accéder au pages de modification d'[un trip](#update-or-delete-a-trip) ou d'[une place](#update-place). Il est également possible de [centrer la map sur une place](#center-map-on-existing-place) ou de [centrer la map autour des résultats de recherche](#center-map-around-many-places).
