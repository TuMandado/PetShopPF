import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getTotalPets } from '../../redux/actions'
import Pet from '../pet/Pet'
import { Loader } from '../../page/loader/Loader'
import {Link} from 'react-router-dom'

const Pets = () => {
    const dispatch = useDispatch()
    const allPets = useSelector(state => state.backupPets)
    console.log('esto es allPets', allPets)

    const [loader, setLoader] = useState(true)
    const [error , setError] = useState(false)

    useEffect(() => {
        dispatch(getTotalPets())
        .then(response => {
            setLoader(false)
        })
        .catch(error => setError(error.message))
    }, [dispatch])

    if(loader) {
        return ( 
            <div>
                <Loader/>
                <h3>Cargando...</h3>
            </div>
        )
    }

    return (
        <div>
            {
                allPets.length > 0 ? (
                    allPets.map(e => {
                        return (
                            <div>
                                <Pet state={e.data.state} category={e.data.category} sexo={e.data.sexo} description = {e.data.description} photos= {e.data.photos}/>
                            </div>
                        )
                    })
                ) : (
                    <div>
                        <h1>Error, no hay datos</h1>
                    </div>
                )
                
            }
            <div>
                <Link to='/'>
                     <button>Volver al Home</button>
                </Link>
               
            </div>
        </div>
    )

    
}

export default Pets
