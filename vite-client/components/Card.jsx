
const  Card = ({name, image, types}) =>{

    console.log(types)
    return (
        <div>
            <h2>{name}</h2>
            <h4>Tipos:</h4>
            <ul>{types.map((type)=> {
                return <li key={type}>{type}</li>
            })}</ul>
            <img src={image} alt="img not found"/>

        </div>
    )

    
}

export default Card