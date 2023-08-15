# Projet Travel-log

MAS-RAD | CAS-DAR | Développement front-end avancé

Alexander Mussitelli & Rafael Teixeira

## Table des matières

- [Introduction](#introduction)
- [Problèmes rencontrés](#problèmes-rencontrés)
  - [Architecture](#architecture)
  - [Faire communiquer deux component enfants d'un même component parent](#faire-communiquer-deux-component-enfants-dun-m%C3%AAme-component-parent)
- [Conclusion](#conclusion)

## Introduction

Ce rapport a pour but de décrire les problématiques rencontrées dans la réalisation du projet et des solutions utilisées pour les résoudre.

## Problèmes rencontrés

### Architecture

Nous sommes partis dans l'optique de ne pas utiliser les modules car le sujet est encore un peu abstrait même si nous en comprenons l'idée. Dans une optique de performance ou si le projet est plus grand et complexe, les modules apporteraient surement une grande aide au niveau de la structure du projet.

En revanche, notre projet a vite compris beaucoup de components et pour s'y retrouver il a été utile de créer une structude de dossiers adéquate.

### Faire communiquer deux component enfants d'un même component parent

Nous avons vu en cours comme faire descendre les données d'un component parent vers un component enfant, à l'aide du décorateur @Input. Nous avons également vu comment faire passer des données dans le sens opposé à l'aide du décorateur @Output et des EventEmitter.

La difficulté rencontrée dans le projet a été de faire passer des données entre deux component enfants du même parent, voir imbriqués dans d'autres components. La même problématique a été rencontrée dans l'implémentation de nombreuses fonctionnalités (centrer la map sur une place, définir les coordonnées en cliquant sur la map, etc.). A chaque fois, la même solution a été utilisée.

La solution consiste à utiliser les output EventEmitter avec des Observables et des Subscriptions. Si on regarde comment la données est transmise d'un component à l'autre : Elle est d'abord émise du component enfant vers le component parent dans l'EventEmitter. Le component parent récupère cette donnée et l'émet à travers l'observable passé en input au deuxième component enfant. Enfin, dans ce component enfant, une subscription à l'observable passé par le parent permet de déclencher une fonction lorsqu'une nouvelle valeur arrive.

Pour avoir un exemple de code, on peut prendre l'exemple de la fonction "centrer place sur la map" de la page "trip detail" :

Dans le component 'list-places', l'event emitter suivant émet une objet de type 'GeoJsonPoint' lorsqu'on clique sur l'icone "centrer" :

```ts
@Output() centerOnMapClicked: EventEmitter<GeoJsonPoint>;

centerOnMap(placeLocation: GeoJsonPoint) {
  this.centerOnMapClicked.emit(placeLocation);
}
```

Cet event est récupéré dans le component parent 'trip-detail-page' et déclenche la fonction centerPlaceOnMap() :

```html
<app-list-places
  (centerOnMapClicked)="centerPlaceOnMap($event)"
></app-list-places>
```

Cette fonction fait émettre une nouvelle valeur au Subject 'selectPlaceToCenter' :

```ts
selectPlaceToCenter: Subject<GeoJsonPoint> = new Subject<GeoJsonPoint>();

centerPlaceOnMap(location: GeoJsonPoint) {
  this.selectPlaceToCenter.next(location);
}
```

Subject qui est lui même passé dans le component enfant 'map' comme observable à l'input 'centerMapOnLocationObservable' :

```html
<app-map
  [centerMapOnLocationObservable]="selectPlaceToCenter.asObservable()"
></app-map>
```

Enfin, une subscription réalisée à l'initalisation du component permer de déclencher la fonction 'centerMapOnLocation' du component 'map' à chaque fois que l'observable émet une valeur :

```ts
@Input() centerMapOnLocationObservable?: Observable<GeoJsonPoint>;

this.centerMapOnLocationObservable?.subscribe((response) => {
  this.centerMapOnLocation(response, 13);
});

centerMapOnLocation(location: GeoJsonPoint, zoom?: number) {
  //Code to center map on given location
}
```

## Conclusion
