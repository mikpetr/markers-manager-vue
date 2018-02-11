# markers-manager-vue

> Google maps markers manager on Vue.js

Application separated in several components: PlacesManager, PlacesList and Map.

There is one store object which allows to store data, add, edit, remove.

PlacesList and Map components communicates with each other through application state management, which done by store.

Application allows to mark places and store them in the list.
Later you can view place, edit place name, mark/unmark as viewed.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
