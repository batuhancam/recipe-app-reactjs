import React,{useEffect, useState} from 'react';
import Recipe from './recipe';
import './App.css';


const App = () =>{
  const APP_ID= "xxxxxx";
  const APP_KEY="xxxxxxxxxxxxxxx";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipes();
  }, [query]);

  const getRecipes = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = (e) =>{
    setSearch(e.target.value);

  }

  const getSearch = (e) =>{
    e.preventDefault();
    setQuery(search);
  }

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.title} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients= {recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  );
}


export default App;
