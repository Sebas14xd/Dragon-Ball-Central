const api = {
    getCharacters: () => {
        return fetch('api_personajes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching api_personajes.json:', error);
                return [];
            });
    },
    getMedia: () => {
        return fetch('api_media.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching api_media.json:', error);
                return { series: [], mangas: [], peliculas: [], videojuegos: [] };
            });
    }
};

window.api = api;
