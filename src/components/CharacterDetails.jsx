import React, { useState , useEffect} from 'react'
import { character, episodes } from '../../data/data'
import {ArrowUpCircleIcon} from '@heroicons/react/24/outline'
import Loader from './Loader';
import toast from 'react-hot-toast';
import axios, { all } from "axios";


const CharacterDetails = ({selectedId , onFavoriteCharacter, isFavorite}) => {
    const [character,setCharacter]= useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function fetchData(){
          try{
            setLoading(true);
            const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`)
            setCharacter(data);
            console.log('asgharrrrr',data);
          }
          catch(e){
            toast.error(e.response.data.error);
          }
          finally{
            setLoading(false);
          }
        }
        fetchData();
      },[selectedId]);    

      
      if(loading){
        return(
            <div style={{flex:1}}>
                <Loader />
            </div>
        )
      }

      if(!character || !selectedId){
        return(
            <div style={{flex:1, color: 'var(--slate-300)'}} >
        <p>
            You can select a character to see it's details
        </p>
            </div>
        )
      }
  return (
    <div style={{flex:1}}>
        <div className='character-detail'>
            <img className='character-detail__img' src={character.image} alt={character.name} />
            <div className='character-detail__info'>
                <h3 className='name'>
                    <span>{character.gender ==='Male' ? '👨':'👱‍♀️'}</span>
                    <span>{character.name}</span>
                </h3>
                <div className='info'>
                    <span className={`status ${character.status =='Dead' ? 'red':''}`}></span>
                    <span>{character.status}</span>
                    <span>- {character.species}</span>
                </div>
                <div className='location'>
                    <p>Last location:</p>
                    <p>{character.location.name}</p>
                </div>
                <div className='actions'>
                    {isFavorite
                    ? <p>This Items is Already Favorited</p>
                    : <button className='btn btn--primary' onClick={()=>onFavoriteCharacter(character)}>
                        Add To Favorites
                        </button>
                    }

                </div>
            </div>
        </div>
        <div className='character-episodes'>
            <div className='title'>
                <h2>
                   List Of Episodes: 
                </h2>
                <button>
                    <ArrowUpCircleIcon className='icon'/>
                </button>
            </div>
            <ul>
                {episodes.map((item, index)=>(
                    <li key={item.id}>
                        <div>
                            {String(index+1).padStart(2,'0')}{" "}
                            {item.episode} :
                            <strong>{item.name}</strong>
                        </div>
                        <div className='badge badge--secondary'>
                            {item.air_date}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default CharacterDetails