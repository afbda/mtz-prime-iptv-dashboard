import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Nav from '../components/nav'
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function IndexPage() {
  // const [clients, setClients] = useState([]);
  const [devices, setDevices] = useState([]);
  const [iptvapps, setIptvapps] = useState([]);
  const [providers, setProviders] = useState([]);
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [client, setClient] = useState({});
  const [modalIsOpen,setIsOpen] = useState(false);
  const [clientes, setClients] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  async function saveClient(){
    if(client._id){
      await axios.put(window.location.origin+"/api/client", client);
    }else{
      try{
        await axios.post(window.location.origin+"/api/client", client);
      }catch(err){
        console.log(err)
      }
      
    }
    setClient({});
  }

  async function deleteClient(){
    await axios.delete(window.location.origin+"/api/client", client);
    setClient({});
  }

  async function getClients(){
    var response = await axios.get(window.location.origin+"/api/client");
    console.log(response);
    setClients(response.data);
  }

  function editClient(cliente){
    setClient(cliente);
    setIsOpen(true);
  }

  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('auth-user') != null;
    if (!(loggedIn)) {
      router.push('/login')
    }
    getClients();
  }, []);

  return (
    <>
    <div>
      <Nav />
      <div className="flex justify-end">
        <button onClick={openModal} className="bg-primary hover:bg-primary-dark p-4 text-sm text-white uppercase font-bold tracking-wider">Novo Cliente</button>
      </div>
      <table className="w-full text-left rounded-lg border-collapse border table-auto">
        <thead>
          <tr>
            <th className="border">Número Telefone</th>
            <th className="border ">Nome Cliente</th>
            <th className="border ">Senha</th>
            <th className="border ">MAC</th>
            <th className="border ">Fornecedores</th>
            <th className="border ">Aparelhos</th>
            <th className="border ">Aplicativos</th>
            {/* <th>Vencimento Correto</th>
            <th>Vencimento Quadro Cliente</th>
            <th>Número de Conexões</th>
            <th>Quantidade de Meses</th>
            <th>Valor a Receber em Reais</th>
            <th>Valor a Receber em Dólares</th>
            <th>Número de Conexões</th>
            <th>URL Cliente</th>
            <th>Status</th>
            <th>DNS</th>
            <th>Notas</th> */}
          </tr>
        </thead>
        {
          clientes == null || clientes == undefined || clientes.length === 0 ? (<div className="empty">Acabou :(</div>):
          (
            <tbody>
            {
              clientes.map((cliente, index) => (
                <tr key={index} onClick={() => editClient(cliente)}>
                  <td class="border">{cliente.numeroTelefone}</td>
                  <th class="border ">{cliente.nome}</th>
                  <th class="border ">{cliente.senha}</th>
                  <th class="border ">{cliente.MACAddress}</th>
                  <th class="border ">{cliente.fornecedor}</th>
                  <th class="border ">{cliente.aparelho}</th>
                  <th class="border ">{cliente.aplicativo}</th>
                  {/* <th>{client.vencimentoCorreto}</th>
                  <th>{client.vencimentoQuadroCliente}</th>
                  <th>{client.numeroConexoes}</th>
                  <th>{client.quantidadeMeses}</th>
                  <th>{client.valorAReceberEmReais}</th>
                  <th>{client.valorAReceberEmDolares}</th>
                  <th>{client.numeroConexoes}</th>
                  <th>{client.URLCliente}</th>
                  <th>{client.status}</th>
                  <th>{client.DNSCliente}</th>
                  <th>{client.notas}</th> */}
                </tr>
              ))
            }
            </tbody>
          )
        }
      </table>
    </div>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form>
        <div className="w-full inline-flex">
          <div className="w-1/3 mr-1">
            <label>Número de Telefone</label>
            <input value={client.numeroTelefone} onChange={e => setClient({...client, numeroTelefone: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Nome</label>
            <input value={client.nome} onChange={e => setClient({...client, nome: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Senha</label>
            <input value={client.senha} onChange={e => setClient({...client, senha: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>MAC</label>
            <input value={client.MACAddress} onChange={e => setClient({...client, MACAddress: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Fornecedor</label>
            <input value={client.fornecedor} onChange={e => setClient({...client, fornecedor: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3">
            <label>Aparelho</label>
            <input value={client.aparelho} onChange={e => setClient({...client, aparelho: e.target.value})} className="border w-full" />
          </div>
        </div>


        <div className="w-full inline-flex">
          <div className="w-1/3 mr-1">
            <label>Aplicativo</label>
            <input value={client.aplicativo} onChange={e => setClient({...client, aplicativo: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Vencimento Correto</label>
            <input value={client.vencimentoCorreto} onChange={e => setClient({...client, vencimentoCorreto: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Vencimento Quadro</label>
            <input value={client.vencimentoQuadroCliente} onChange={e => setClient({...client, vencimentoQuadroCliente: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Número de conexões</label>
            <input value={client.numeroConexoes} onChange={e => setClient({...client, numeroConexoes: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Quantidade de Meses</label>
            <input value={client.quantidadeMeses} onChange={e => setClient({...client, quantidadeMeses: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3">
            <label>Valor a receber em reais</label>
            <input value={client.valorAReceberEmReais} onChange={e => setClient({...client, valorAReceberEmReais: e.target.value})} className="border w-full" />
          </div>
        </div>
        
        <div className="inline-flex justify-between">
          <div className="w-1/3 mr-1">
            <label>Valor a receber em dólares</label>
            <input value={client.valorAReceberEmDolares} onChange={e => setClient({...client, valorAReceberEmDolares: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>URL</label>
            <input value={client.URLCliente} onChange={e => setClient({...client, URLCliente: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Status</label>
            <input value={client.status} onChange={e => setClient({...client, status: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>DNS</label>
            <input value={client.DNSCliente} onChange={e => setClient({...client, DNSCliente: e.target.value})} className="border w-full" />
          </div>
          <div className="w-1/3 mr-1">
            <label>Notas</label>
            <input value={client.notas} onChange={e => setClient({...client, notas: e.target.value})} className="border w-full" />
          </div>
        </div>
        <div className="w-full">
          <button onClick={saveClient} className="bg-primary hover:bg-primary-dark p-4 text-sm text-white uppercase font-bold tracking-wider mt-1">Salvar</button>
          {
            client._id == null || client._id == undefined ? (<div>(</div>):
            (
              <button onClick={deleteClient} className="bg-primary ml-3 hover:bg-primary-dark p-4 text-sm text-white uppercase font-bold tracking-wider mt-1">Excluir</button>
            )
          }
          
        </div>
       
      </form>
    </Modal>
    </>
  )
}
