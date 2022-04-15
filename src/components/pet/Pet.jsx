import React from 'react';

const Pet = ({state, owner, category, sexo, description, ubicacion,photos}) => {
    return (
        <div>
            <div>
               <h1>{state}</h1> 
            </div>
            <div>
                <img src={photos} alt="img not found" />
            </div>
            <div>
                <h2>{category}</h2>
            </div>
            <div>
                <p>{sexo}</p>
            </div>
            <div>
                <p>{description}</p>
            </div>
            <div>
                <p>aqui va la ubicaicion </p>
            </div>
            


            
        </div>
    )

}

export default Pet