import { swapi } from '../constants';

export function getCharacters() {
  return fetch(`${swapi.API_URL}/${swapi.PEOPLE_ENDPOINT}/?page=1`)
    .then(res => validateResponse(res))
    .then(res => res.results)
    .then(characters => selectCharacterDetails(characters))
    .catch(error => ({ error: true, message: error.message }));
};

export function getCharacter(characterId) {
  return fetch(`${swapi.API_URL}/${swapi.PEOPLE_ENDPOINT}/${characterId}/?`)
    .then(res => validateResponse(res))
    .then(character => selectCharacterDetails([character]))
    .catch(error => ({ error: true, message: error.message }));
};

export function getCharacterHomeworld(homeworldUrl) {
  return fetch(homeworldUrl)
    .then(res => validateResponse(res))
    .then(world => world.name)
    .catch(error => ({ error: true, message: error.message }));
};

function selectCharacterDetails(characters) {
  const characterDetails = characters.reduce((characterDetails, character) => {
    const id = getIdFromUrl(character.url);
    characterDetails[id] = {
      id: id,
      name: character.name,
      gender: character.gender,
      height: character.height,
      mass: character.mass,
      eye_color: character.eye_color,
      hair_color: character.hair_color,
      homeworld_url: urlToHttps(character.homeworld)
    };
    return characterDetails;
  }, {});

  return characterDetails;
}

function urlToHttps(url) {
  const httpRegex = /^http:\/\//i;
  return url.replace(httpRegex, 'https://');
}

function getIdFromUrl(url) {
  const urlIdRegex = /.+\/(.+)\/$/;
  return url.match(urlIdRegex)[1];
}

function validateResponse(res) {
  switch (res.status) {
    case 404:
      throw new Error('404: Not found');

    default:
      if (res.status !== 200) throw new Error(`${res.status} error`);
      return res.json();
  }
}
