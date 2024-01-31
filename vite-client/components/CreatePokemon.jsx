    import { useState, useEffect } from "react";
    import { Link } from "react-router-dom";
    import { postPokemon, getTypes} from "../redux/actions";
    import { useDispatch, useSelector } from "react-redux";


    export default function CreatePokemon (){
        const dispatch = useDispatch()
        const types = useSelector((state) => state.types)

        const [input, setInput] = useState({
            name:'',
            image:'',
            hp:'',
            attack:'',
            defense:'',
            speed:undefined,
            height:undefined,
            weight:undefined,
            types: []


        })

        useEffect(()=>{
            dispatch(getTypes())
        }, [])

        const handleChange = (event) => {
            setInput({
                ...input,
                [event.target.name] : event.target.value
            })

        }
        const handleSelect = (event) => {
            const selectedType = event.target.value;
        
            if (!input.types.includes(selectedType)) {
                const updatedTypes = [...input.types, selectedType].slice(0, 2);
        
                setInput({
                    ...input,
                    types: updatedTypes,
                });
            }
        };
        

        const handleSubmit = (event) => {
            event.preventDefault()
            console.log(input)
            dispatch(postPokemon(input))
            setInput({
                name:'',
                image:'',
                hp:'',
                attack:'',
                defense:'',
                speed:undefined,
                height:undefined,
                weight:undefined,
                types: []
    
    
            })

        }

        return(
            <div>
                <Link to = '/home'><button>Volver</button></Link>
                <h1>Crea tu Pokemon!!</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>Imagen: </label>
                        <input
                            type="text"
                            value= {input.image}
                            name="image"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label>Nombre: </label>
                        <input
                            type="text"
                            value= {input.name}
                            name="name"
                            onChange={handleChange} />
                    </div>
                    <div>
                    <label>Hp: </label>
                        <input
                            type="number"
                            value= {input.hp}
                            name="hp"
                            onChange={handleChange} />
                    </div>
                    <div>
                    <label>Attack: </label>
                        <input
                            type="number"
                            value= {input.attack}
                            name="attack"
                            onChange={handleChange} />
                    </div>
                    <div>
                    <label>Defense: </label>
                        <input
                            type="number"
                            value= {input.defense}
                            name="defense" 
                            onChange={handleChange}/>
                    </div>
                    <div>
                    <label>Speed: </label>
                        <input
                            type="number"
                            value= {input.speed === undefined ? '' : input.speed}
                            name="speed"
                            onChange={handleChange} />
                    </div>
                    <div>
                    <label>Height: </label>
                        <input
                            type="number"
                            value={input.height === undefined ? '' : input.height}
                            name="height" 
                            onChange={handleChange}/>
                    </div>
                    <div>
                    <label>Weight: </label>
                        <input
                            type="number"
                            value={input.weight === undefined ? '' : input.weight}
                            name="weight" 
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <select onChange={handleSelect}>
                        {types.map((type)=>{
                        return(
                        <option value= {type.name} key={type.id}>{type.name}</option>)
                    })}
                </select>
                    </div>

                    <button type="submit">Crear Pokemon</button>
                    
                </form>
            </div>
        )

    }