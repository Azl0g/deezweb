
const STORAGE_FAVORITE_KEY = 'deezweb.favorites'

export default {
   // Retourne les favoris du localStorage du navigateur
   getFavoritesFromStorage() {
        return JSON.parse(window.localStorage.getItem(STORAGE_FAVORITE_KEY)) || []
        //Cette méthode renverra toujours un Array : vide si il n’y a aucun élément dans le storage, ou un tableau d’objet des favoris courants.
    },

   // Vérifie si une musique se trouve dans les favoris
   isFavorite(music) {
        return Boolean(this.getFavoritesFromStorage().find(f => f.id === music.id))
        //Cette fonction va rechercher l'objet "music" (via son id) dans le tableau de favoris actuels.
        //Si la méthode .find() trouve cet objet, elle le renvoie, sinon elle renvoie undefined.
        //La fonction Boolean() force la conversion du résultat final en Booléen : true ou false.
   },

   // Permet d'ajouter/supprimer un favori du localStorage
   toggleFavorite(music) {
        if (this.isFavorite(music)) {
            this.removeFavoriteFromStorage(music)
        } else {
            this.addFavoriteToStorage(music)
        }
        //Cette fonction est un simple raccourci pour permuter l’ajout/suppression d’un favoris en un seul coup (même principe que pour un .toggleClass() en jQuery)
   },
  
   // Ajoute un favori au localStorage
   addFavoriteToStorage(music) {
        const favorites = this.getFavoritesFromStorage()
        favorites.push(music)
        window.localStorage.setItem(STORAGE_FAVORITE_KEY, JSON.stringify(favorites))
        //on récupère les favoris courants, puis on ajoute la musique au tableau, et on sauvegarde ce nouveau tableau dans le localStorage du navigateur.
   },
  
   // Supprime un favori du localStorage
   removeFavoriteFromStorage(music) {
        const favorites = this.getFavoritesFromStorage()
        const musicIndex = favorites.findIndex(f => f.id === music.id)
        favorites.splice(musicIndex, 1)
        window.localStorage.setItem(STORAGE_FAVORITE_KEY, JSON.stringify(favorites))
        //on récupère les favoris courants, puis on y recherche l'index de l'élément à supprimer grâce à .findIndex() de JavaScript.
        //On supprime l’élément de ce tableau avec la méthode .splice() de JavaScript.
        //Puis, on sauvegarde le tableau mis à jour dans le localStorage du navigateur.

   }
}
