

const initialState ={
    pokemon: [],
    types: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_POKEMON":
            console.log("Updating state with Pokemon data")
            return{
                ...state,
                pokemon: action.payload
            }
          
        case "GET_TYPES":
            console.log("Updating state with type data")
            return{
                ...state,
                types: action.payload
            }

        default:
            return state
    }
    

}

export default reducer