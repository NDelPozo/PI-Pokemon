const initialState = {
    pokemon: [],
    allPokemon: [],
    types: [],
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_POKEMON":
            return {
                ...state,
                pokemon: action.payload,
                allPokemon: action.payload
            }

        case "GET_TYPES":
            return {
                ...state,
                types: action.payload
            }
        
        case 'GET_POKEMON_NAME':
            return{
                ...state,
                pokemon:action.payload
            }


        case "FILTER_BY_TYPE":
            const allPokemon = state.allPokemon
            const filteredTypes = action.payload === 'All' ? allPokemon : allPokemon.filter(poke => poke.types.includes(action.payload))
            return {
                ...state,
                pokemon: filteredTypes
            }
        
        case "FILTER_BY_CREATION":
            const creationFilter = action.payload === 'Db' ? state.allPokemon.filter(poke => poke.custom) : state.allPokemon.filter(poke => !poke.custom)
            return{
                ...state,
                pokemon: action.payload === "All" ? state.allPokemon : creationFilter
            }
        
            case "ORDER_BY_NAME":
                let orderArray = [...state.pokemon];  
                if (action.payload === 'Asc') {
                    orderArray.sort((a, b) => (a.name > b.name) ? 1 : -1);
                } else if (action.payload === 'Des') {
                    orderArray.sort((a, b) => (a.name < b.name) ? 1 : -1);
                } else if (action.payload === 'Atkup') {
                    orderArray.sort((a, b) => a.attack - b.attack);
                } else if(action.payload === 'Atkdown'){
                    orderArray.sort((a, b) => b.attack - a.attack);
                }
                return {
                    ...state,
                    pokemon: orderArray
                }
    
            default:
                return state;
        }
    }
    
    export default reducer;