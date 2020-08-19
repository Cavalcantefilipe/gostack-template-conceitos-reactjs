import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(Response => {
      setRepositories(Response.data)
    })
  },[])

  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
      title: `Novo Projeto ${Date.now()}`,
      url: 'Filipe Alves Cavalcante',
      techs: 'Filipe Alves Cavalcante',
    })

    const repository = response.data

    setRepositories([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
   
    const projectIndex = repositories.findIndex(repository => repository.id === id)
  
    const response = await api.delete(`repositories/${id}`)
    
    if(response.status === 204){
      
      repositories.splice(projectIndex,1)

      setRepositories([...repositories])
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => ( 
        <li key={repository.id}> 
          {repository.title} 
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
        </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
