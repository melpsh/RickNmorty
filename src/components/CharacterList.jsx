import React, { useState } from 'react'
import { allCharacters } from '../../data/data'
import Loader from './Loader'
import { EyeIcon } from '@heroicons/react/24/outline'

const CharacterList = ({characters, isLoading, onSelectItem}) => {
    if(isLoading){
        return(
            <div className='characters-list'>
                <Loader />
            </div>

        )
    }
  return (
    <div className='characters-list'>
        {characters.map(item=>(
            <Character key={item.id} item={item} onSelectItem={onSelectItem}/>
        ))}
    </div>
  )
}

export default CharacterList

const Character = ({item, onSelectItem}) =>{
    return(
        <div className='list__item'>
            <img src={item.image} alt={item.name} />
            <h3 className='name'>
                <span>{item.gender ==='Male' ? '👨':'👱‍♀️'}</span>
                <span>{item.name}</span>
            </h3>
            <div className='list-item__info info'>
                <span className={`status ${item.status =='Dead' ? 'red':''}`}></span>
                <span>{item.status}</span>
                <span>- {item.species}</span>
            </div>
            <button className='icon red' onClick={() => onSelectItem(item.id)}>
                <EyeIcon />
            </button>
        </div>
    )
}