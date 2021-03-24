// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  // LAZY INITIALLIZER: inicializador "preguiçoso"
  // Quando o useState recebe uma função em vez de um valor como estado inicial,
  // essa função é executada apenas durante a fase mount do componente, sem se
  // repetir na fase update.
  const [name, setName] = React.useState(() => window.localStorage.getItem('name') || initialName)
  const [count, setCount] = React.useState(0)
  const [nameUC, setNameUC] = React.useState(() => window.localStorage.getItem('nameUC') || initialName)
  
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value) 
  }

  function handleClick(event) {
    setNameUC(event.target.value.toUpperCase())   // toUpperCase para letras maiúsculas
  }

  // Efeito colateral executado após o componente ter sido atualizado
  React.useEffect(() => {
    // O valor do localStorage será atualizado após a atualização do componente
    window.localStorage.setItem('name', name)
    window.localStorage.setItem('nameUC', nameUC)
    setCount(count + 1)
  }, [name, nameUC]) // é a lista de dependências ou seja, esse useEffect é para ser chamado
  // apenas quando a variável name sofrer alteração.

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} onClick={handleClick} id="name" />
      </form>
      {name ? <strong>Hello {name}, {nameUC} </strong> : 'Please type your name'}
  <p>localStorage: {window.localStorage.getItem('name')} - {window.localStorage.getItem('nameUC')} </p>
  <p> Contagem: {count} </p>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
