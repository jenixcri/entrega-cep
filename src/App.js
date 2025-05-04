import React, { useState } from 'react';
import './App.css';

function App() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);

  const buscarCep = async () => {
    if (cep.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setResultado(null);
        alert("CEP não encontrado.");
      } else {
        setResultado(data);
      }
    } catch (error) {
      alert("Erro ao buscar o CEP.");
      console.error(error);
    }
  };

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Consulta de CEP</h1>
      <input
        type="text"
        placeholder="Digite o CEP (apenas números)"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        maxLength={8}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <button onClick={buscarCep} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Buscar
      </button>

      {resultado && (
  <div className="resultado-container">
    <div className="resultado">
      <h2>Resultado:</h2>
      <p><strong>CEP:</strong> {resultado.cep}</p>
      <p><strong>Rua:</strong> {resultado.logradouro}</p>
      <p><strong>Bairro:</strong> {resultado.bairro}</p>
      <p><strong>Cidade:</strong> {resultado.localidade}</p>
      <p><strong>Estado:</strong> {resultado.uf}</p>
    </div>
  </div>
)}
    </div>
  );
}

export default App;
