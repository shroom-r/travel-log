# travel-log

MAS-RAD | CAS-DAR | Développement front-end avancé

## Table des matières

- [Introduction](#introduction)
- [Site pages](#site-pages)
- [Features](#features)
  - [Create user & login](#create-user--log-in)
  - [Consulter sa liste de trip](#consulter-sa-liste-de-trip)
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

### Consulter sa liste de trip

Pour consulter sa liste de trips, il suffit de cliquer sur "All my trips" dans la barre de navigation.
La page affiche alors tous les trip liés au compte connecté.

### Create a trip

Pour créer un nouveau trip, il faut cliquer sur le bouton "New trip" dans la barre de navigation ou sur le lien "... Click here ..." lorsqu'on n'a encore aucun trip.

Il faut ensuite donner un titre au trip ainsi qu'une description puis cliquer sur le bouton "Save". Un fois le trip créé, on est redirigé automatiquement vers la page Trip detail du trip qu'on vient de créer.

### Update or delete a trip

Pour modifier ou supprimer un trip, il faut aller sur sa page de détails. Pour accéder à celle-ci, il faut aller dans "All my trips" et cliquer sur le trip souhaité.

Pour modifier les informations du trip, il faut modifier les informations dans les champs de texte et cliquer ensuite sur "Save changes". Un message informe lorsque la modification a été enregistrée.

Pour supprimer un trip, il faut cliquer sur l'icône poubelle à côté du bouton "Save changes". Un message de confirmation apparaît. La suppression peut alors être annulée ou confirmée.

Depuis cette page "Trip detail" il est également possible de :
- [Ajouter une nouvelle place au trip](#create-place)
- [Modifier une place existante](#update-place)
- [Supprimer une place existante](#delete-place)
- [Centrer la map sur une place](#center-map-on-existing-place)
- [Centrer la map autour de plusieurs places](#center-map-around-many-places)

### Create place

### Update place

### Delete place

### Center map on existing place

### Center map around many places

### See trip on map

### Set coordinates clicking on map

### Set coordinates on current position

### Search trips or places