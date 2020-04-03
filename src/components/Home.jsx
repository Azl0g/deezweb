import React from 'react';
import {useState} from 'react';
import fetchJsonp from 'fetch-jsonp';
import Track from './Track';
import FavService from '../FavService';

function Home(props) {

    const [title, setTitle] = useState('');
    const [orderBy, setOrderBy] = useState('ALBUM_ASC');
    const [musics, setMusics] = useState([]);

    function changeTitle(event){
        setTitle(event.target.value);
    }

    function changeOrder(event){
        setOrderBy(event.target.value);
    }

    function changeMusics(event){
        setMusics(event.target.value);
    }

    //La méthode onSearch() fait une requête HTTP via “fetchJsonp” (n’oubliez pas de l’importer tout en haut du fichier avec un import : import fetchJsonp from 'fetch-jsonp') et récupère le résultat sous forme de JSON, duquel elle extrait le tableau “data” des données renvoyées par Deezer et dans lesquelles se trouvent notre Array d’objets musique. Enfin, on assigne au state la valeur de ce tableau de musiques obtenues par l’API avec la méthode “setMusics”.

    function onSearch(event) {
        event.preventDefault(); // Empêche le navigateur de recharger la page
    
        const encodedTitle = encodeURIComponent(title);
    
        fetchJsonp(
    `https://api.deezer.com/search?q=${encodedTitle}&order=${orderBy}&output=jsonp`
        )
        .then(res => res.json())
        .then(data => data.data)
        .then(musics => {
            setMusics(musics);
        });
    }

    function onFavorites(music) {
        FavService.toggleFavorite(music);
        setMusics([...musics]);
        //Le [...musics] permet de fabriquer une copie JS de l’ancien tableau (et non une référence mémoire, ce que React n’aime pas → un state n’est pas mutable !).
        //Le setMusics est également indispensable dans la mesure où il force React à re-rendre à nouveau la liste de résultats mise à jour, afin que l’on puisse voir le changement sur le bouton : Ajouter aux favoris → Retirer des favoris.

    }
    
    return (
    <main className="container mt-3">
        <h1>Recherche</h1>
        <p>Recherchez un titre sur Deezer en utilisant le formulaire suivant :</p>
        <hr/>
        <form onSubmit={onSearch}>
            <div className="row">
                <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">Titre&nbsp;:</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="searchText"
                        placeholder="Eminem, Armin Van Buuren, Rihanna, ..." onChange={changeTitle}/>
                </div>
                <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">Trier par :</label>
                <div className="col-sm-2">
                    <select id="order" className="custom-select" onChange={changeOrder}>
                        <option value="ALBUM_ASC">Album</option>
                        <option value="ARTIST_ASC">Artiste</option>
                        <option value="TRACK_ASC">Musique</option>
                        <option value="RANKING">Les plus populaires</option>
                        <option value="RATING_ASC">Les mieux notés</option>
                    </select>
                </div>
                <div className="col-sm-2 text-right">
                    <input type="submit" className="btn btn-primary" value="Go" />
                </div>
            </div>
        </form>
        <hr/>
        <h3>Aucun résultat pour cette recherche ...</h3>
        <h2>Résultats</h2>
        <div className="card-group search-results" onchange={changeMusics}>
            {musics.map(music => {  
                return (
                    <Track key={music.id} music={music}  onClick={onFavorites} isFavorite={FavService.isFavorite(music)} />
                )
                
            })}

        </div>
    </main>
    );
}

export default Home;