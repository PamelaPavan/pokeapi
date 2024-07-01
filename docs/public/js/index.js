
/***************************** VARIÁVEIS GLOBAIS **********************/

// Elementos do DOM
const conteudoPokedex = document.querySelector('.conteudo_pokedex'); // Conteúdo da Pokédex
const conteudoDuelo = document.querySelector('.conteudo_duelo'); // Conteúdo da tela de duelo
const pokemonName = document.querySelector('.pokemon_name'); // Nome do Pokémon exibido na Pokédex
const pokemonName2 = document.querySelector('.pokemon_name2'); // Nome do Pokémon exibido na tela de duelo
const pokemonNumber = document.querySelector('.pokemon_number'); // Número do Pokémon exibido na Pokédex (id)
const dado = document.querySelector('.dado'); // Elemento para exibir dados de Pokémon

// Formulários e campos de entrada
const form = document.querySelector('.form'); // Formulário da Pokédex
const input = document.querySelector('.input_search'); // Campo de busca na Pokédex
const form1 = document.querySelector('.jogador1'); // Formulário de duelo
const input1 = document.querySelector('.input_search1'); // Campo de busca para o jogador 1 na tela de duelo

// Variável auxiliar para pesquisa de Pokémon na Pokédex
let searchPokemon = 25;

// Botões
const buttonPrev = document.querySelector('.btn-prev'); // Botão "Anterior" na Pokédex
const buttonNext = document.querySelector('.btn-next'); // Botão "Próximo" na Pokédex
const modoPokedexBtn = document.querySelector('.pokedex_modo'); // Botão para exibir a Pokédex
const modoDueloBtn = document.querySelector('.duelo_modo'); // Botão para exibir a tela de duelo
const duelarbtn = document.querySelector('.buttonDuelo'); // Botão para iniciar o duelo


/****************************FUNÇÕES*********************************** */

/** Função para consulta de API 
 * @param {string} endpoint - Endpoint para a qual fazer a solicitação.
 * @returns {Object} - Dados JSON da resposta.
 */
const fetchData = async (endpoint) => {
  const APIResponse = await fetch(`http://localhost:3000/${endpoint}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  } else {
    throw new Error(`Erro ao buscar dados: ${APIResponse.status}`);   
  }
};


/** Função para capitalizar a primeira letra do nome 
 * @param {string} string - String para capitalizar.
 * @returns {string} - String com a primeira letra capitalizada.
 */
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/** Função para atualizar a habilidade do Pokémon 
 * @param {Object} data - Dados do Pokémon.
 */
const updateAbility = (data) => {
  let abilitiesList = [];
  abilitiesList = data.abilities.map(ability => ability.ability.name);
  dado.innerHTML = abilitiesList.join(', ');
};

/** Função para atualizar a defesa do Pokémon 
 * @param {Object} data - Dados do Pokémon.
 */
const updateDef = (data) => {
  if (data.stats && data.stats.length > 0) {
    const defense = data.stats.find((stat) => stat.stat.name === 'defense');
    if (defense) {
      dado.innerHTML = defense.base_stat;
    } else {
      dado.innerHTML = 'Estatística de defesa não encontrada.';
    }
  } else {
    dado.innerHTML = 'Dados de estatísticas não disponíveis.';
  }
};

/** Função para atualizar altura e peso do Pokémon em medidas convencionais 
 * @param {Object} data - Dados do Pokémon.
 */
const updateTamanho = (data) => {
  const alturaEmMetros = data.height * 0.1; // Convertendo decímetros para metros
  const pesoEmQuilogramas = data.weight * 0.1; // Convertendo hectogramas para quilogramas
  dado.innerHTML = `<p>Altura: ${alturaEmMetros.toFixed(2)} metros</p>
                    <p>Peso: ${pesoEmQuilogramas.toFixed(2)} quilogramas</p>`;
};

/** Função para atualizar movimentos do Pokémon 
 * @param {Object} data - Dados do Pokémon.
 */
const updateMove = (data) => {
  const movesList = data.moves.slice(0, 20).map(move => move.move.name);
  dado.innerHTML = movesList.join(', ');
};

/** Função para buscar e exibir a característica disponível 
 * @param {number} id - ID do Pokémon.
 */
const updateCharacteristics = async (id) => {
  let characteristic;

  try {
    let response = await fetch(`http://localhost:3000/characteristic/${id}/`);

    if (response.status === 200) {
      characteristic = await response.json();
      dado.innerHTML = characteristic.descriptions.find(desc => desc.language.name === 'en').description;
    } else {
      dado.innerHTML = "Pokémon sem característica";
    }

  } catch (error) {
    console.error(`Failed to fetch characteristic ${id}:`, error);
  }
};

/** Função para atualizar tipos do Pokémon 
 * @param {Object} data - Dados do Pokémon.
 */
const updateTypes = (data) => {
  if (data.types && data.types.length > 0) {
    const primaryType = data.types[0].type.name;
    dado.innerHTML = `Tipo: ${primaryType}`;
  } else {
    dado.innerHTML = 'Dados de tipos não disponíveis.';
  }
};

/** Função para preencher as relações de dano do pokémon 
 * @param {Array} typesData - Array de dados dos tipos do Pokémon.
 * @returns {Object} - Objeto com as relações de dano do Pokémon.
 */
function damageRelations(typesData) {
  const damageRelationsPokemon = {
    no_damage_to: [],
    half_damage_to: [],
    double_damage_to: [],
    no_damage_from: [],
    half_damage_from: [],
    double_damage_from: []
  };

  typesData.forEach(typeData => {
    for (let key in damageRelationsPokemon) {
      damageRelationsPokemon[key] = damageRelationsPokemon[key].concat(typeData.damage_relations[key].map(typeInfo => typeInfo.name));
    }
  });

  return damageRelationsPokemon;
}

/**Função para atualizar a efetividade de um Pokémon
 * @param {Object} data - Dados do Pokémon.
 * 
 * Descrição: Esta função obtém os dados dos tipos do Pokémon e calcula as relações de dano.
 *            Em seguida, atualiza o elemento 'dado' com as informações de efetividade.
 */

  const updateEfetividade = async (data) => {
    // Supondo que 'data.types' seja um array de tipos, e cada tipo tenha uma propriedade 'name'.
    const promises = data.types.map(type => fetchData(`type/${type.name}`));
    const typesData = await Promise.all(promises);
  
    // Processa os dados de cada tipo para obter as relações de dano.
    const damageRelationsPokemon = typesData.map(typeData => {
      return {
        id: typeData.id, // Aqui você obtém o ID do tipo.
        damageRelations: damageRelations(typeData)
      };
    });
    

  if (damageRelationsPokemon) {
    dado.innerHTML = `<p>Pouco eficaz contra: ${damageRelationsPokemon.no_damage_to.join(', ')}</p>
                      <p>Causa metade do dano: ${damageRelationsPokemon.half_damage_to.join(', ')}</p>
                      <p>Muito eficaz contra: ${damageRelationsPokemon.double_damage_to.join(', ')}</p>
                      <p>Não recebe dano de: ${damageRelationsPokemon.no_damage_from.join(', ')}</p>
                      <p>Recebe meio dano de: ${damageRelationsPokemon.half_damage_from.join(', ')}</p>
                      <p>Recebe dobro de dano de: ${damageRelationsPokemon.double_damage_from.join(', ')}</p>`;
  } else {
    dado.innerHTML = "Efetividade não encontrada.";
  }
};

/** Função para duelar dois pokémons 
 * @param {Object} pokemon1 - Dados do primeiro Pokémon.
 * @param {Object} pokemon2 - Dados do segundo Pokémon.
 * @returns {string} - Resultado do duelo.
 * 
 * Descrição: Esta função compara os tipos dos dois Pokémon e calcula a vantagem com base nas relações de dano.
 *            Se a vantagem for a mesma, a função desempata com base nas estatísticas de base dos Pokémon.
 */
const duelar = async (pokemon1, pokemon2) => {
  // Obtém os dados dos tipos de ambos os Pokémon
  const typesData1 = await Promise.all(pokemon1.types.map(type => fetchData(type.type.url)));
  const typesData2 = await Promise.all(pokemon2.types.map(type => fetchData(type.type.url)));

  // Calcula as relações de dano para ambos os Pokémon
  const damageRelationsPokemon1 = damageRelations(typesData1);
  const damageRelationsPokemon2 = damageRelations(typesData2);

  let pokemon1Advantage = 0;
  let pokemon2Advantage = 0;

  // Calcula a vantagem do primeiro Pokémon com base nas relações de dano
  typesData1.forEach(typeData => {
    if (damageRelationsPokemon1.double_damage_to.includes(typeData.name)) pokemon1Advantage++;
    if (damageRelationsPokemon1.half_damage_from.includes(typeData.name)) pokemon1Advantage++;
    if (damageRelationsPokemon1.no_damage_from.includes(typeData.name)) pokemon1Advantage++;
    if (damageRelationsPokemon1.half_damage_to.includes(typeData.name)) pokemon1Advantage--;
    if (damageRelationsPokemon1.double_damage_from.includes(typeData.name)) pokemon1Advantage--;
  });

  // Calcula a vantagem do segundo Pokémon com base nas relações de dano
  typesData2.forEach(typeData => {
    if (damageRelationsPokemon2.double_damage_to.includes(typeData.name)) pokemon2Advantage++;
    if (damageRelationsPokemon2.half_damage_from.includes(typeData.name)) pokemon2Advantage++;
    if (damageRelationsPokemon2.no_damage_from.includes(typeData.name)) pokemon2Advantage++;
    if (damageRelationsPokemon2.half_damage_to.includes(typeData.name)) pokemon2Advantage--;
    if (damageRelationsPokemon2.double_damage_from.includes(typeData.name)) pokemon2Advantage--;
  });

  // Compara as vantagens para determinar o vencedor
  if (pokemon1Advantage > pokemon2Advantage) {
    return `${capitalizeFirstLetter(pokemon1.name)} ganhou!`;
  } else if (pokemon2Advantage > pokemon1Advantage) {
    return `${capitalizeFirstLetter(pokemon2.name)} ganhou!`;
  } else {
    // Desempate baseado nas estatísticas de base
    const totalStatsPokemon1 = pokemon1.stats.reduce((total, stat) => total + stat.base_stat, 0);
    const totalStatsPokemon2 = pokemon2.stats.reduce((total, stat) => total + stat.base_stat, 0);

    if (totalStatsPokemon1 > totalStatsPokemon2) {
      return `${capitalizeFirstLetter(pokemon1.name)} ganhou!`;
    } else if (totalStatsPokemon2 > totalStatsPokemon1) {
      return `${capitalizeFirstLetter(pokemon2.name)} ganhou!`;
    } else {
      return 'Empate!';
    }
  }
};

/**Função apenas para renderizar Pokémon
 * @param {Object} pokemonData - Dados do Pokémon a serem renderizados.
 * @param {HTMLElement} imagem - Elemento de imagem onde renderizar o Pokémon.
 * Descrição: Atualiza a exibição da imagem do Pokémon com base nos dados fornecidos.
 */
const renderPokemon = async (pokemonData, imagem) => {
  if (pokemonData) {
    imagem.style.display = 'block';
    // Define a imagem a ser exibida, priorizando uma versão animada, se disponível.
    imagem.src = pokemonData.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || pokemonData.sprites.front_default;
  } else {
    imagem.style.display = 'none';
  }
};

/** Função para renderizar as imagens dos Pokémon em um duelo 
 ** Descrição: busca os dados dos dois Pokémon, renderiza suas imagens e atualiza os nomes exibidos.
*/
const pokemonDuelo = async () => {
  // Obtém os nomes dos Pokémon inseridos nos campos de busca.
  const pokemon1 = document.getElementById("input_search1").value.toLowerCase();
  const pokemon2 = document.getElementById("input_search2").value.toLowerCase();

  // Obtém os elementos de imagem para os dois Pokémon.
  const pokemonImage1 = document.querySelector('.pokemon1_image'); // GIF do Pokémon 1
  const pokemonImage2 = document.querySelector('.pokemon2_image'); // GIF do Pokémon 2

  // Busca os dados dos dois Pokémon na API.
  const data1 = await fetchData(`/pokemon/${pokemon1}`);
  const data2 = await fetchData(`/pokemon/${pokemon2}`);

  // Renderiza a imagem e atualiza o nome do Pokémon 1, se encontrado.
  if (data1) {
    await renderPokemon(data1, pokemonImage1);
    document.querySelector('.pokemon1').innerHTML = capitalizeFirstLetter(data1.name);
  } else {
    document.querySelector('.pokemon1').innerHTML = 'Pokémon1'; // Nome padrão se não encontrado
  }

  // Renderiza a imagem e atualiza o nome do Pokémon 2, se encontrado.
  if (data2) {
    await renderPokemon(data2, pokemonImage2);
    document.querySelector('.pokemon2').innerHTML = capitalizeFirstLetter(data2.name);
  } else {
    document.querySelector('.pokemon2').innerHTML = 'Pokémon2'; // Nome padrão se não encontrado
  }
};

/** Função para mostrar dados de Pokémon na Pokédex 
 ** Descrição: Busca e exibe informações detalhadas de um Pokémon na Pokédex. 
*/
const pokedex = async (pokemon) => {
  // Se não for fornecido um nome de Pokémon, busca pelo valor inserido no campo de busca.
  if (!pokemon) pokemon = document.getElementById("input_search").value.toLowerCase();

  // Exibe mensagem de "Carregando" enquanto busca os dados do Pokémon.
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  // Obtém o elemento de imagem para o Pokémon.
  const pokemonImage = document.querySelector('.pokemon_image'); // GIF do Pokémon

  // Busca os dados do Pokémon na API do servidor local.
  const pokemonData = await fetchData(`pokemon/${pokemon}`);

  // Se os dados do Pokémon forem encontrados, renderiza a imagem e exibe informações detalhadas.
  if (pokemonData) {
    await renderPokemon(pokemonData, pokemonImage);

    // Atualiza o nome do Pokémon com a primeira letra maiúscula e exibe o número do Pokémon.
    pokemonName.innerHTML = capitalizeFirstLetter(pokemonData.name);
    pokemonNumber.innerHTML = pokemonData.id;
    searchPokemon = pokemonData.id;

    // Limpa e recria o elemento de efetividade.
    document.querySelector('.pokemon_efetividade').replaceWith(document.querySelector('.pokemon_efetividade').cloneNode(true));

    // Adiciona eventos para exibir diferentes informações do Pokémon quando clicados.
    document.querySelector('.pokemon_ability').addEventListener('click', () => updateAbility(pokemonData));
    document.querySelector('.pokemon_moves').addEventListener('click', () => updateMove(pokemonData));
    document.querySelector('.pokemon_types').addEventListener('click', () => updateTypes(pokemonData));
    document.querySelector('.pokemon_characteristics').addEventListener('click', () => updateCharacteristics(pokemonData.id));
    document.querySelector('.pokemon_def').addEventListener('click', () => updateDef(pokemonData));
    document.querySelector('.pokemon_tamanho').addEventListener('click', () => updateTamanho(pokemonData));
    document.querySelector('.pokemon_efetividade').addEventListener('click', async () => { await updateEfetividade(pokemonData); });

  } else {
    // Se o Pokémon não for encontrado, exibe uma mensagem de "Not found".
    pokemonName.innerHTML = 'Not found :(';
    pokemonNumber.innerHTML = '';
  }
};
/******************* EVENTOS ******************************/

// Evento de envio do formulário da Pokédex
// Evita o comportamento padrão do formulário, busca informações do Pokémon e limpa o campo de entrada.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  pokedex(input.value.toLowerCase());
  input.value = '';
});

// Evento de envio do formulário de duelo
// Evita o comportamento padrão do formulário, inicia o duelo entre os Pokémon inseridos e limpa o campo de entrada.
form1.addEventListener('submit', (event) => {
  event.preventDefault();
  pokemonDuelo();
  input1.value = '';
});

// Evento do botão "Anterior" na Pokédex
// Reduz o número de pesquisa do Pokémon e exibe os dados do Pokémon anterior.
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    pokedex(searchPokemon);
  }
});

// Evento do botão "Próximo" na Pokédex
// Aumenta o número de pesquisa do Pokémon e exibe os dados do próximo Pokémon.
buttonNext.addEventListener('click', () => {
  searchPokemon++;
  pokedex(searchPokemon);
});

// Evento para exibir a Pokédex
modoPokedexBtn.addEventListener('click', () => {
  conteudoPokedex.style.display = 'inline-block';
  conteudoDuelo.style.display = 'none';
});

// Evento do botão de busca na Pokédex
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const pokemonNameOrId = input.value.toLowerCase();
  pokedex(pokemonNameOrId);
  input.value = '';
});

// Evento para exibir o modo de duelo
modoDueloBtn.addEventListener('click', () => {
  conteudoPokedex.style.display = 'none';
  conteudoDuelo.style.display = 'inline-block';
});

// Evento para iniciar o duelo entre Pokémon
// Obtém os nomes dos Pokémon inseridos, busca seus dados na API, inicia o duelo e exibe o resultado.
duelarbtn.addEventListener('click', async () => {
  const ganhador = document.querySelector('.ganhador');
  const pokemonName1 = document.getElementById("input_search1").value.toLowerCase();
  const pokemonName2 = document.getElementById("input_search2").value.toLowerCase();

  try {
    const [pokemonData1, pokemonData2] = await Promise.all([
      fetchData(`http://localhost:3000/pokemon${pokemonName1}`),
      fetchData(`http://localhost:3000/pokemon${pokemonName2}`)
    ]);

    const resultado = await duelar(pokemonData1, pokemonData2);
    ganhador.innerHTML = resultado;
  } catch (error) {
    console.error(error);
    ganhador.innerHTML = 'Erro ao buscar dados dos Pokémon.';
  }
});

// Inicia a Pokédex com o Pokémon de número de pesquisa atual.
pokedex(searchPokemon);