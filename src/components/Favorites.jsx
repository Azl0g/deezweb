import React from 'react';
import FavService from '../FavService';
import Track from './Track';
import {useState} from 'react';

function Favorites(props) {
    //state contenant les musiques favorites depuis le localStorage :
    const [musics, setMusics] = useState(FavService.getFavoritesFromStorage());

    function onFavorites(music) {
        FavService.toggleFavorite(music);
        setMusics(FavService.getFavoritesFromStorage());
    }
    
    return (
        <div>
            <main className="container mt-3">
                <h1>Mes favoris</h1>
                <p>Liste de mes titres favoris</p>
                <hr />
                
                <h3>Aucun favoris dans votre liste ...</h3>

                <div className="card-group search-results">
                {musics.map(music => (
                    <Track
                    key={music.id}
                    music={music}
                    onClick={onFavorites}
                    isFavorite={FavService.isFavorite(music)}
                    />
                ))}

                </div>
                </main>
        </div>
    );
}

export default Favorites;