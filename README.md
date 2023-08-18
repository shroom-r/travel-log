# Travel-log

MAS-RAD | CAS-DAR | Développement front-end avancé

## Table des matières

- [Introduction](#introduction)
- [Site pages](#site-pages)
  - [Login](#login)
  - [All my trips](#all-my-trips)
  - [New trip](#new-trip)
  - [Trip detail](#trip-detail)
  - [New place](#new-place)
  - [Place detail](#place-detail)
  - [Trips on map](#trips-on-map)
- [Features](#features)
  - [Création d'utilisateur et login](#cr%C3%A9ation-dutilisateur-et-login)
  - [Logout](#logout)
  - [Consulter sa liste de trip](#consulter-sa-liste-de-trips)
  - [Créer un nouveau trip](#cr%C3%A9er-un-nouveau-trip)
  - [Modifier ou supprimer un trip](#modifier-ou-supprimer-un-trip)
  - [Créer une nouvelle place](#cr%C3%A9er-une-nouvelle-place)
  - [Modifier une place](#modifier-une-place)
  - [Supprimer une place](#supprimer-une-place)
  - [Centrer la map sur un place](#centrer-la-map-sur-une-place)
  - [Centrer la map autour de plusieurs places](#centrer-la-map-autour-de-plusieurs-places)
  - [Voir un trip sur la map](#voir-un-trip-sur-la-map)
  - [Définir les coordonnées en cliquant sur la map](#d%C3%A9finir-les-coordonn%C3%A9es-en-cliquant-sur-la-map)
  - [Définir les coordonnées sur la position actuelle (geolocalisation)](#d%C3%A9finir-les-coordonn%C3%A9es-sur-la-position-actuelle-g%C3%A9olocalisation)
  - [Rechercher des trips ou des places](#rechercher-des-trips-ou-des-places)

## Introduction

L'application TravelLog est pensée comme un carnet de voyage. De ce fait, elle est centrée autour d'une seule personne utilisatrice. C'est à dire que seuls les voyages ajoutés par cette personne sont consultables dans l'app.

## Site pages

L'app travel log est constituée de 7 pages. Toutes les pages (exceptée la page Login) comportent une barre de navigation qui permet à tout moment d'aller à la page [All my trips](#all-my-trips), de [lancer une recherche](#trips-on-map), et de se [Logout](#logout).

### Login

Page pour se [connecter](#cr%C3%A9ation-dutilisateur-et-login) à l'app ou [créer un compte](#cr%C3%A9ation-dutilisateur-et-login). Cette page est la seule page accessible et la page par défaut lorsqu'on n'est pas connecté.

### All my trips

Page pour consulter sa liste de trips. Si aucun trip n'existe, un lien redirigeant vers la page [New trip](#new-trip) est affiché. Si des trips existent, la page affiche la photo de la première place qui en possède une, le titre du trip ainsi qu'une partie de sa description.

Cette page est accessible depuis partout sur le site en cliquant dans la barre de navigation.

Cliquer sur un trip permet d'accéder à la page [trip detail](#trip-detail).

### New trip

Page permettant de [créer un nouveau trip](#cr%C3%A9er-un-nouveau-trip). Une fois le trip créé, on est redirigé vers la page [trip detail](#trip-detail) du trip alors créé.

### Trip detail

Page permettant de visionner et modifier les différentes données d'un trip. Elle permet de [modifier le trip](#modifier-ou-supprimer-un-trip), de le [supprimer](#modifier-ou-supprimer-un-trip) et de le [visualiser sur la map](#voir-un-trip-sur-la-map).

Cette page permet également de naviguer vers la page [New place](#new-place) qui permet d'[ajouter une place](#cr%C3%A9er-une-nouvelle-place) au trip, de naviguer vers la page [place detail](#place-detail) qui permet de visualiser une place et de la [modifier](#modifier-une-place).

Elle permet enfin de [centrer la map](#centrer-la-map-sur-une-place) sur une place ou de [centrer la map](#centrer-la-map-autour-de-plusieurs-places) autour de toutes les places du trip.

### New place

Page permettant de [créer une nouvelle place](#cr%C3%A9er-une-nouvelle-place) pour un trip donné.

Cette page inclue deux fonctionnalités pour définir les coordonneés de la place. Une permettant de le faire en [cliquant sur la map](#d%C3%A9finir-les-coordonn%C3%A9es-en-cliquant-sur-la-map) et l'autre permettant de [récupérer la position actuelle](#d%C3%A9finir-les-coordonn%C3%A9es-sur-la-position-actuelle-g%C3%A9olocalisation) (géolocalisation).

### Place detail

Page permettant de visualiser ou [modifier une place](#modifier-une-place).

Cette page inclue deux fonctionnalités pour définir les coordonneés de la place. Une permettant de le faire en [cliquant sur la map](#d%C3%A9finir-les-coordonn%C3%A9es-en-cliquant-sur-la-map) et l'autre permettant de [récupérer la position actuelle](#d%C3%A9finir-les-coordonn%C3%A9es-sur-la-position-actuelle-g%C3%A9olocalisation) (géolocalisation).

### Trips on map

Page permettant d'afficher les résultats de la [fonction de recherche](#rechercher-des-trips-ou-des-places).

## Features

### Création d'utilisateur et login

Pour créer un compte, il faut être déconnecté. L'app s'ouvre alors sur la page de login où il faut cliquer sur le lien "Create account". La page passe alors en mode création de compte. Pour créer un compte il faut inscrire un _Username_ et un _Password_. Un fois que l'acompte a été créé, on est automatiquement connecté.

Si un compte existe déjà, il faut inscrire le _Username_ et _Password_ pour se connecter.

Lors de la connection, l'app s'ouvre directement à la page "All my trips".

### Logout

Si on est connecté, il est possible à tout moment de se déconnecter. Pour cela, il faut cliquer sur le bouton "Logout" présent dans la barre de navigation.

### Consulter sa liste de trips

Pour consulter sa liste de trips, il faut de cliquer sur "All my trips" dans la barre de navigation.
La page affiche alors tous les trips liés au compte connecté.

### Créer un nouveau trip

Pour créer un nouveau trip, il faut cliquer sur le bouton "New trip" dans la barre de navigation ou sur le lien "... Click here ..." lorsqu'on n'a encore aucun trip.

Il faut ensuite donner un titre au trip ainsi qu'une description puis cliquer sur le bouton "Save". Un fois le trip créé, on est redirigé automatiquement vers la page Trip detail du trip qui vient d'être créé.

### Modifier ou supprimer un trip

Pour modifier ou supprimer un trip, il faut aller sur sa page de détails. Pour accéder à celle-ci, il faut aller dans "All my trips" et cliquer sur le trip souhaité.

Pour modifier les informations du trip, il faut modifier les informations dans les champs de texte et cliquer ensuite sur "Save changes". Un message informe lorsque la modification a été enregistrée.

Pour supprimer un trip, il faut cliquer sur l'icône "supprimer" <img src="images/trash-solid.svg" height="20px" /> à côté du bouton "Save changes". Un message de confirmation apparaît. La suppression peut alors être confirmée ou annulée.

### Créer une nouvelle place

Pour créer une place, il faut aller sur la page trip detail du trip auquel on veut l'ajouter. Il faut ensuite cliquer sur le bouton "plus" à côté de "Places list".

Pour créer une place, il faut lui donner un nom, une description, une latitude et une longitude. Si on souhaite y ajouter une image, il faut indiquer l'URL de l'image souhaitée.

La latitude et la longitude peuvent être définies manuellement mais elles peuvent également l'être à l'aide des deux fonctionnalités : [définir les coordonnées en cliquant sur la map](#d%C3%A9finir-les-coordonn%C3%A9es-en-cliquant-sur-la-map) et [définir les coordonnées sur la position actuelle](#d%C3%A9finir-les-coordonn%C3%A9es-sur-la-position-actuelle-g%C3%A9olocalisation) (géolocalisation).

### Modifier une place

Pour modifier une place, il faut cliquer sur l'icône "modifier" <img src="images/pencil-solid.svg" height="20px" /> de la place en question. Celle-ci peut être cliquée depuis la liste des places lorsqu'on consulte les détails d'un trip ou depuis les résultats d'une recherche.

Les fonctionnalités sont les mêmes que pour [créer une place](#cr%C3%A9er-une-nouvelle-place).

### Supprimer une place

Pour supprimer une place, il faut ouvrir le trip qui contient la place en question puis, dans la partie places list, cliquer sur l'icône "supprimer" <img src="images/trash-solid.svg" height="20px" /> de la place correspondante. Un message de confirmation permet de confirmer ou annuler la suppression.

### Centrer la map sur une place

Cette fonctionnalité permet de centrer la map sur une place. Elle est accessible depuis la page trip detail ou depuis les résultats de recherche. Il faut alors cliquer sur l'icône "centrer" <img src="images/location-crosshairs-solid.svg" height="20px" />.

### Centrer la map autour de plusieurs places

Pour activer cette fonctionnalité, il faut cliquer sur l'icône "cadrer" <img src="images/expand-solid.svg" height="20px" />.

Cette fonctionnalité permet de centrer la map autour de plusieurs places. Elle est accessible sur la page trip detail, où la map se centrera autour de toutes les places du trip, ou depuis les résultats de recherches où elle se centrera autour d'un ensemble de places d'un même trip (correspondant au résultats de recherche) ou autour de toutes les places de la recherche (pouvant donc couvrir plusieurs trips).

### Voir un trip sur la map

Pour voir un trip sur la map, il suffit de naviguer vers la page de détails d'un trip (trip detail) depuis la page "All my trips" ou depuis le résultat de recherches. Sur cette page, toutes les places du trip en question seront affichées sur la map.

### Définir les coordonnées en cliquant sur la map

Lors de la création ou la modification d'une place, il est possible de définir les coordonnées en cliquant sur la map. Pour cela, il faut cliquer sur l'icône "épingler" <img src="images/map-pin-solid.svg" height="20px" />. Celle-ci devient alors jaune et un message indique qu'un click sur la map est attendu. En cliquant sur la map, les coordonnées seront alors définies à l'endroit du clique et un marqueur ajouté.

La fonction peut-être annulée en recliquant sur l'icône <img src="images/map-pin-solid.svg" height="20px" />.

### Définir les coordonnées sur la position actuelle (géolocalisation)

Lors de la création ou la modification d'une place, il est possible de définir les coordonnées à la position actuelle (géolocalisation). Pour cela, il faut cliquer sur l'icône "centrer" <img src="images/location-crosshairs-solid.svg" height="20px" />. Si la géolocalisation n'est pas activée, il faut alors l'activer. Les coordonnées seront alors définies à la position actuelle et un marqueur sera ajouté.

### Rechercher des trips ou des places

Une fois connecté, une recherche peut être effectuée depuis n'importe quelle page du site. Pour cela, il faut inscrire les mots recherchés dans la barre de navigation et cliquer sur la loupe.

Une fois la recherche demandée, le site est redirigé vers la page trips on a map où la recherche est alors lancée. La fonction de recherche va récupérer tous les trips et toutes les places correspondant aux termes recherchés. Le résultat de recherche sera affiché dans une liste à gauche de la page. Cette liste affiche toujours les places sous le trip auquel elles appartiennent.

Depuis le résultat de recherche il est possible d'accéder au pages de modification d'[un trip](#modifier-ou-supprimer-un-trip) ou d'[une place](#modifier-une-place). Il est également possible de [centrer la map sur une place](#centrer-la-map-sur-une-place) ou de [centrer la map autour des résultats de recherche](#centrer-la-map-autour-de-plusieurs-places).
