import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getPokemon, getTypes, filterByType, filterCreated, orderByName} from "../redux/actions";
import {Link} from "react-router-dom"
import Card from "./card";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";





export default function Home (){

    const dispatch = useDispatch()
    const allPokemon = useSelector((state)=> state.pokemon)
    const types = useSelector((state) => state.types)
 
   const [currentPage, setCurrentPage] = useState(1)
   const pokemonsPerPage = 12

    const lastPokemon = currentPage * pokemonsPerPage
    const firstPokemon = lastPokemon - pokemonsPerPage
    const currentPokemon = allPokemon.slice(firstPokemon, lastPokemon)

    const [order, setOrder] = useState('')

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }





    useEffect(()=>{
        dispatch(getPokemon())
        console.log("Redux State after dispatching GET_POKEMON:", allPokemon);
    },[])


    useEffect(()=> {
        dispatch(getTypes())
    },[])


    const handleClick = (event) => {
        event.preventDefault()
        dispatch(getPokemon())

    }

    const handleFilterByType = (event) => {
        dispatch(filterByType(event.target.value))
    }

    const handleFilterByCreation = (event) => {
        dispatch(filterCreated(event.target.value))
    }

    const handleOrderByName = (event) =>{
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${event.target.value}`)

    }
    //filtros = si viene de api o db y por tipos ===== dsps hay q ordenarlo ascen como descen por orden alfabetico y por atk
    return(
        <div>
            <Link to = '/pokemon'>Crear Personaje</Link>
            <h1>Gotta Catch em All!</h1>
            <button onClick={handleClick}>
                Cargar todos los pokemons   
            </button>
            <div>
                <select onChange={handleFilterByCreation}>
                    <option value="All">Todos</option>
                    <option value="Api">Api</option>
                    <option value="Db">DataBase</option>
                </select>
                <select onChange={handleOrderByName}>
                    <option value="Asc">Ascendente</option>
                    <option value="Des">Descendente</option>
                    <option value="Atkup">Attack UP</option>
                    <option value="Atkdown">Attack Down</option>
                </select>
                <select onChange={handleFilterByType}>
                    <option value="All">All</option>
                    {types.map((type)=>{
                        return(
                        <option value= {type.name} key={type.id}>{type.name}</option>)
                    })}

                </select>

                {
                    currentPokemon && currentPokemon.map((poke) =>{
                      return  <Card key = {poke.id} name = {poke.name} image={poke.image} types = {poke.types}/>
                    })
                }
              
            </div>
                <Pagination 
                pokemonsPerPage={pokemonsPerPage}
                allPokemon={allPokemon.length}
                pagination={pagination}
                />

                <Searchbar/>


        </div>
    )
}