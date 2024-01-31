const { Router } = require('express');
const axios = require('axios')
const {Pokemon, Types} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getPokeApi = async () => {
   
        const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const pokeUrl = await apiUrl.data.results.map(poke => poke.url)
        
        const pokeInfo = await Promise.all(pokeUrl.map(url => axios.get(url)))

        const dataPokemon = await pokeInfo.map(({data}) => {
            return{
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map(types => types.type.name),
            hp: data.stats.find(num => num.stat.name === 'hp').base_stat,
            attack: data.stats.find(num => num.stat.name === 'attack').base_stat,
            defense: data.stats.find(num => num.stat.name === 'defense').base_stat,
            speed: data.stats.find(num => num.stat.name === 'speed').base_stat,
            weight: data.weight,
            height: data.height            

            }
        })
        return dataPokemon

}
const getPokeDb = async () => {
    const pokemonFromDb = await Pokemon.findAll({
        include: {
            model: Types,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    return pokemonFromDb.map(poke => ({
        ...poke.toJSON(),
        types: poke.types.map(type => type.name)
    }));
}

const getAllPokemon = async () => {
    const infoApi = await getPokeApi()
    const infoDb = await getPokeDb()
    const infoTotal = infoApi.concat(infoDb)
    return infoTotal
}


router.get('/pokemon', async(req, res)=> {
    const name = req.query.name
    const {id} = req.query
    console.log(id);
    const totalPokemon = await getAllPokemon()

    try {
        if(name){
            let pokeName = await totalPokemon.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()))
            pokeName.length ?
            res.status(200).send(pokeName) :
            res.status(404).send('No se encontro el Pokemon')
        }
        else if(id){
            const idToNum = parseInt(id)
            let pokeId = await totalPokemon.find(poke => poke.id === idToNum)
            console.log(pokeId);
            pokeId ?
            res.status(200).send(pokeId):
            res.status(404).send('No existe un Pokemon con ese ids')
    
        }
        else{
            res.status(200).send(totalPokemon)
        }
        
    } catch (error) {
        res.status(500).send('Error')
        
    }

})

router.get('/types',  async (req, res) => {
    const infoPokemon = await getAllPokemon()
    const pokeTypes = infoPokemon.flatMap(({ types }) => types)
    console.log(pokeTypes);
    for (const type of pokeTypes) {
        await Types.findOrCreate({
            where: { name: type }
            })
        }
    
    const allTypes = await Types.findAll()
    res.send(allTypes)  
         
     })
     
     router.post('/pokemon', async (req, res) => {
         try {
             let{
                 name,
                 image,
                 types,
                 hp,
                 attack,
                 defense,
                 speed,
                 weight,
                 height,
                 custom,
             } = req.body
          
             let newPoke = await Pokemon.create ({
                 name,
                 image,
                 hp,
                 attack,
                 defense,
                 speed,
                 weight,
                 height,
                 custom,
             })
             console.log(newPoke);
         
             let pokeType = await Types.findAll({
                 where: { name : types}
             })
             
             newPoke.addTypes(pokeType)
             res.status(201).send('Pokemon creado con exito!')
    }  catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el Pokemon :c' });
    }

})






module.exports = router;
