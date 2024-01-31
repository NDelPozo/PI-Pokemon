import axios from "axios"

export function getPokemon() {
    return async function(dispatch){
        
            const {data} = await axios.get("http://localhost:3001/pokemon");
                console.log(data);
                return dispatch({
                    type: 'GET_POKEMON',
                    payload: data
                })
            }
}




export function getTypes(){
    return async function(dispatch){
        var {data} = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: 'GET_TYPES',
            payload: data
        })
    }
}

export function getPokemonName(name){
    try {
        return async function(dispatch){
            var {data} = await axios.get('http://localhost:3001/pokemon?name=' + name)
            console.log(data);
            return dispatch ({
                type: 'GET_POKEMON_NAME',
                payload: data
    
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        var response = await axios.post('http://localhost:3001/pokemon', payload)
        console.log(response);
        return{
            type:'POST_POKEMON',
            response}
    }
}

export function filterByType(payload){
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_BY_CREATION',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}