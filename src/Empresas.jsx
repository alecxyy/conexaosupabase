import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./Empresas.css"

function Empresas() {

    const [empresa, alteraEmpresas] = useState([])
    const [funcionarios, alteraFuncionarios] = useState([])

    const [exibeFuncionarios, alteraExibeFuncionarios] = useState(false)
    const [exibeEmpresas, alteraExibeEmpresas] = useState(true)

    async function captarEmpresas() {

        const { error, data } = await supabase.from("empresas").select()
        console.log(data)
        alteraEmpresas(data)
    }
    async function captarFuncionarios() {

        const { error, data } = await supabase.from("funcionarios").select(
           `*,
            empresas ( nome )`)

        console.log(data)
        alteraFuncionarios(data)
    }

        async function buscaUsuariosPorEmpresa(id_empresa){
            const { error, data } = await supabase.from("funcionarios").select("*,empresas(*)").eq("id_empresa", id_empresa)

            console.log(data)
            alteraFuncionarios(data)
            alteraVisualizacao()

        }

    function alteraVisualizacao(id_empresa) {
        if (exibeEmpresas == true) {
            alteraExibeEmpresas(false)
            alteraExibeFuncionarios(true)
        }
        else{
            alteraExibeEmpresas(true)
            alteraExibeFuncionarios(false)
        }
    }

    useEffect(() => {
        captarEmpresas()
        captarFuncionarios()
    }, [])
    return (
         <div>

            {
                exibeEmpresas == true ?
                    <div>
                        <h1>Empresas</h1>
                        <p>Consulta na tabela empresas e fncionarios </p>

                        <table border="true">

                            <tr>
                                <td>ID</td>
                                <td>NOME</td>
                                <td>CNPJ</td>
                                <td>ENDEREÇO</td>
                                <td>AÇÕES</td>
                            </tr>
                            {
                                empresa.map(i =>

                                    <tr>
                                        <td> {i.id}</td>
                                        <td> {i.nome}</td>
                                        <td> {i.cnpj}</td>
                                        <td> {i.endereco}</td>
                                        <td><button onClick={() => buscaUsuariosPorEmpresa(i.id)}>Ver funcionários</button></td>
                                    </tr>

                                )
                            }

                        </table>

                        <br />            <br />            <br />            <br />            <br />            <br />


                    </div>

                    :
                    <></>
            }

            {
                exibeFuncionarios == true ?

                    <div>

                        <h2>Funcionários</h2>

                        <button onClick={alteraVisualizacao}>Voltar</button>
                        <button>Adicionar Novo</button>

                        <table border="true">

                            <tr>
                                <td>ID</td>
                                <td>NOME DA EMPRESA </td>
                                <td>NOME </td>
                                <td>ENDERECO </td>
                                <td>CARGO</td>
                                <td>CONTATO</td>

                            </tr>


                            {

                                funcionarios.map(i =>

                                    <tr>
                                        <td> {i.id}</td>
                                        <td> {i.empresas.nome}</td>
                                        <td> {i.nome}</td>
                                        <td> {i.empresas.endereco}</td>
                                        <td> {i.cargo == 0 ? "Admin" : "funcionario"}</td>
                                        <td> {i.contato}</td>
                                    </tr>

                                )
                            }

                        </table>
                    </div>

                    :
                    <></>
            }

        </div>


    );
}

export default Empresas;