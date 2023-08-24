# Projet Travel-log

MAS-RAD | CAS-DAR | Développement front-end avancé

Alexander Mussitelli & Rafael Teixeira

## Table des matières

- [Introduction](#introduction)
- [Problèmes rencontrés](#problèmes-rencontrés)
  - [Architecture](#architecture)
  - [Faire communiquer deux component enfants d'un même component parent](#faire-communiquer-deux-component-enfants-dun-m%C3%AAme-component-parent)
  - [Gérer l'ordre d'exécution du code lors du chargement de la page](#g%C3%A9rer-lordre-dexecution-du-code-lors-du-chargement-de-la-page)
  - [Filtrer les données retournées par l'API dans la fonction de recherche](#filtrer-les-données-retournées-par-lapi-dans-la-fonction-de-recherche)
- [Conclusion](#conclusion)

## Introduction

Ce rapport a pour but de décrire les problématiques rencontrées dans la réalisation du projet et des solutions utilisées pour les résoudre.

## Problèmes rencontrés

### Architecture

Nous sommes partis dans l'optique de ne pas utiliser les modules car le sujet est encore un peu abstrait même si nous en comprenons l'idée. Dans une optique de performance ou si le projet est plus grand et complexe, les modules apporteraient sûrement une grande aide au niveau de la structure du projet.

En revanche, notre projet a vite eu beaucoup de components et que pour s'y retrouver il a été utile de créer une structure de dossiers adéquate.

### Faire communiquer deux component enfants d'un même component parent

Nous avons vu en cours comme faire descendre les données d'un component parent vers un component enfant, à l'aide du décorateur @Input. Nous avons également vu comment faire passer des données dans le sens opposé à l'aide du décorateur @Output et des EventEmitter.

La difficulté rencontrée dans le projet a été de faire passer des données entre deux component enfants du même parent, voir imbriqués dans d'autres components. La même problématique a été rencontrée dans l'implémentation de nombreuses fonctionnalités (centrer la map sur une place, définir les coordonnées en cliquant sur la map, etc.). A chaque fois, la même solution a été utilisée.

La solution consiste à utiliser les output EventEmitter avec des Observables et des Subscriptions. Si on regarde comment la donnée est transmise d'un component à l'autre : Elle est d'abord émise du component enfant vers le component parent dans l'EventEmitter. Le component parent récupère cette donnée et l'émet à travers l'observable passé en input au deuxième component enfant. Enfin, dans ce component enfant, une subscription à l'observable passé par le parent permet de déclencher une fonction lorsqu'une nouvelle valeur arrive.

Pour avoir un exemple de code, on peut prendre l'exemple de la fonction "centrer place sur la map" de la page "trip detail" :

Dans le component 'list-places', l'event emitter suivant émet une objet de type 'GeoJsonPoint' lorsqu'on clique sur l'icône "centrer" :

```ts
@Output() centerOnMapClicked: EventEmitter<GeoJsonPoint>;

centerOnMap(placeLocation: GeoJsonPoint) {
  this.centerOnMapClicked.emit(placeLocation);
}
```

Cet event est récupéré dans le component parent 'trip-detail-page' et déclenche la fonction centerPlaceOnMap() :

```html
<app-list-places (centerOnMapClicked)="centerPlaceOnMap($event)"></app-list-places>
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
<app-map [centerMapOnLocationObservable]="selectPlaceToCenter.asObservable()"></app-map>
```

Enfin, une subscription réalisée à l'initialisation du component permet de déclencher la fonction 'centerMapOnLocation' du component 'map' à chaque fois que l'observable émet une valeur :

```ts
@Input() centerMapOnLocationObservable?: Observable<GeoJsonPoint>;

this.centerMapOnLocationObservable?.subscribe((response) => {
  this.centerMapOnLocation(response, 13);
});

centerMapOnLocation(location: GeoJsonPoint, zoom?: number) {
  //Code to center map on given location
}
```

### Gérer l'ordre d'execution du code lors du chargement de la page

Lorsque la page est chargée, le code s'exécute dans un certain ordre, notamment en qui concerne le constructeur de la classe et la méthode angular ngOnInit. Lorsqu'un component enfant reçoit en input un objet du component parent, objet qu'il a lui même obtenu via un service. En effet, l'object est récupéré via le service après que le constructeur et la méthode ngOnInit du component enfant ait été exécutés. Cela veut dire que pour que le component enfant fasse quelque chose avec l'objet reçu du parent, il doit réagir au changement de l'objet et non pas exécuté ses méthodes dans le constructeur où la méthode ngOnInit. En effet, dans le cas décrit ici, le parent passe d'abord un objet vide en input (ou undefined) puis, lorsqu'il reçoit l'objet via le service, il le passe au component enfant.

Pour prendre un exemple concret le component 'trip-detail-page' récupère l'ID du trip dans l'URL au moment de sa construction. Il va ensuite récupérer le trip sur l'API, via sa méthode 'getTrip'. Une fois le trip récupéré, il est enregistré dans la variable this.currentTrip, qui est passée en Input au component enfant 'list-places'. Lorsque le component list-places est chargé, il reçoit en premier lieu un objet undefined en input. Il ne sert donc à rien d'exécuter ses méthodes sur cet objet vide. On doit attendre que le component parent passe le trip qu'il a récupéré via l'API et réagir à ce changement. Pour cela, nous avons opté pour la méthode ngOnChanges qui va permettre de réagir au changement de valeur de la propriété this.currentTrip et de lancer la méthode qui permettra de récupérer la liste des places liées à ce trip (getPlaces).

Cette solution fonctionne mais nous paraît "dangereuse". En effet, la méthode ngOnChanges s'exécute à chaque changement et donc, il faut faire des vérifications afin de ne pas lancer des méthodes en boucle. Dans notre exemple, nous avons opté pour un simple if qui permet de vérifier quelle propriété a été modifiée et de ne réagir qu'au changement de la propriété 'currentTrip':

```ts
ngOnChanges(changes: SimpleChanges): void {
  if (changes['currentTrip']) {
    this.getPlaces();
  }
}
```
### Filtrer les données retournées par l'API dans la fonction de recherche


## Conclusion

Le projet travel-log a constitué une charge de travail importante. Le projet a permis de mobiliser une grande partie des connaissances acquises lors du cours et ces dernières couvraient la plupart des besoins du projet. A l'aide de la documentation officielle ainsi que des différentes informations présentes sur les forums dédiés aux outils d'angular, il a été possible de trouver des solutions aux problèmes rencontrés.

Il nous paraît évident que l'optimisation de l'application nécessiterait encore des heures de travail. Cet effort supplémentaire permettrait également d'apporter de la finesse à certaines feature et de peaufiner l'aspect visuel de l'app (notamment sa responsiveness). Cependant, l'app est fonctionnelle et toutes les features ont pu être implémentées.

Ce projet a permis d'avoir une utilisation concrète des connaissances acquises pendant le cours et le fait d'avoir un site fonctionnel constitue un accomplissement satisfaisant.