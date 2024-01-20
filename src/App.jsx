import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, {Result, Search, Favorite} from "./components/Navbar";
import {allCharacters} from "../data/data"
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import Loader from "./components/Loader";
import toast, { Toaster } from 'react-hot-toast';

function App(){
  const [characters, setCharacters] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [favorite, setFavorite] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      try{
        setLoading(true);
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        setCharacters(data.results.slice(0,5));
        console.log(data);
      }
      catch(e){
        toast.error(e.response.data.error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchData();
  },[query]);

  function handleSelectCharacter(id){
    setSelectedId(id);
  }

  function handleFavoriteCharacter(char){
    setFavorite((preChar)=>[ ...preChar, char]);
    console.log(favorite);
  }

  const isFavorite = favorite.map(item=> item.id).includes(selectedId);
  return (
    <div className="app">
      <Toaster />
      <Navbar >
        <Search query={query} setQuery={setQuery} />
        <Result numOfCharacters={characters.length} />
        <Favorite numOfFavorite = {favorite.length}/>
      </Navbar>
      <Main>
        <CharacterList isLoading={isLoading} characters={characters} onSelectItem={handleSelectCharacter}/>
        <CharacterDetails selectedId={selectedId} onFavoriteCharacter={handleFavoriteCharacter} isFavorite={isFavorite}/>
      </Main>
      {/* <div className="main">
        <CharacterList characters={characters}/>
        <CharacterDetails />
      </div> */}
    </div>
  )
}

export default App

function Main({children}){
  return(
    <div className="main">
      {children}
    </div>
  )
}

/*
  useEffect(()=>{
    async function fetchData(){
      try{
        setLoading(true);
        const res = await fetch('https://rickandmortyapi.com/api/characterx')
        const data = await res.json();
        setCharacters(data.results.slice(0,5));
        console.log(res.json);
      }
      catch(e){
        toast.error(e.response.data.error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchData();
  },[]);
  */