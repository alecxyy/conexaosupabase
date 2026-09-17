import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {

  const [produtos,alteraProdutos] = useState([])

  const [nome,alteraNome] = useState("")
  const [preco,alteraPreco] = useState("")
  const [tamanho,alteraTamanho] = useState("")
  const [descricao,alteraDecricao] = useState("")

  async function  inserir() {

    const obj = {

      nome: nome,
      preco:preco,
      tamanho:tamanho,
      descricao: descricao
    }
      
    const { data, error } = await supabase.from('produtos').insert(obj)
    
    alert("produto cadastrado")
    document.location.reload()

  }
  async function buscarDados() {
    const { data, error } = await supabase.from('produtos').select().order('id',{ascending:false})
    console.log(data)

    alteraProdutos(data)
  } 

  useEffect(()=> {
      buscarDados()
  },[])

  return (
    <div>
      <h1>Conexão com Supabase</h1>
     
      <input onChange = {e => alteraNome(e.target.value)} placeholder ="text" />
      <br />
      <input onChange = {e => alteraPreco(e.target.value)} placeholder ="text" />
      <br />
      <input onChange = {e => alteraTamanho(e.target.value)} placeholder ="TAMANHO" />
      <br />
      <input onChange = {e => alteraDecricao(e.target.value)} placeholder ="DESCRIÇÃO" />
      <br />

      <button onClick={inserir}>Salvar</button>
      
      {produtos.map(i=> <p>{i.nome} - R${i.preco}</p>)}
    </div>
  )
}

export default App;