import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';
import NodeCache from 'node-cache';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const cache = new NodeCache(); // Inicializando o cache

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

const API_URL = 'https://pokeapi.co/api/v2/';

// Função assíncrona para buscar dados de uma API externa
const fetchFromApi = async (endpoint, res, errorMessage) => {
    const url = API_URL + endpoint;

    try {
        const cachedData = cache.get(url);
        if (cachedData) {
            return res.json(cachedData);
        }
        
        const response = await axios.get(url);
        cache.set(url, response.data);
        return res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: errorMessage });
        }
        return res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

// Rota para obter dados do Pokémon por nome
app.get('/pokemon/:name', (req, res) => {
    const endpoint = `pokemon/${req.params.name.toLowerCase()}`;
    fetchFromApi(endpoint, res, 'Pokemon not found!');
});

// Rota para obter dados do Pokémon por ID
app.get('/pokemonById/:id', (req, res) => {
    const pokemonId = req.params.id;
    fetchFromApi(`pokemon/${pokemonId}`, res, 'Pokemon not found!');
});

// Rota para obter dados do tipo do Pokémon
app.get('/type/:typeId', (req, res) => {
    const typeId = req.params.typeId.toLowerCase();
    fetchFromApi(`type/${typeId}`, res, 'Type not found!');
});

// Rota para obter características do Pokémon
app.get('/characteristic/:id', (req, res) => {
    const id = req.params.id;
    fetchFromApi(`characteristic/${id}/`, res, 'Characteristic not found!');
});

// Rota para obter habilidades do Pokémon
app.get('/ability/:id', (req, res) => {
    const abilityId = req.params.id;
    fetchFromApi(`ability/${abilityId}`, res, 'Ability not found!');
});

// Rota para obter detalhes do movimento do Pokémon por ID
app.get('/move/:id', (req, res) => {
    const moveId = req.params.id;
    fetchFromApi(`move/${moveId}`, res, 'Move not found!');
});


export { fetchFromApi };

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
