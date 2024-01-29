import axios from "axios"

export function getPokemon() {
    return async function(dispatch){
      
            const {data} = await axios.get("http://localhost:3001/pokemon",{});

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