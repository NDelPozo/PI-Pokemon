    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { getPokemonName} from "../redux/actions";

    export default function Searchbar (){

        const dispatch = useDispatch()
        const [name, setName] = useState('')

        const handleInputChange = (event) => {
            setName(event.target.value)
            console.log(name);
        }

        const handleSubmit = (event) => {
            event.preventDefault()
            console.log('hola');
            dispatch(getPokemonName(name))

        }

        return(
            <div>
                <input type="text"
                placeholder="Buscar..." 
                onChange={handleInputChange}/>
                
                <button type="button" onClick={handleSubmit}>Buscar</button>
            </div>
        )
    }