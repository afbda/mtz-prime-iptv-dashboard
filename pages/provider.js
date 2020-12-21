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

export default function ProviderPage() {
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState({});
  const [modalIsOpen,setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  async function saveProvider(){
    if(client._id){
      await axios.put(window.location.origin+"/api/provider", provider);
    }else{
      try{
        await axios.post(window.location.origin+"/api/client", provider);
      }catch(err){
        console.log(err)
      }
      
    }
    setProvider({});
  }

  async function deleteClient(){
    await axios.delete(window.location.origin+"/api/provider", provider);
    setProvider({});
  }

  async function getProviders(){
    var response = await axios.get(window.location.origin+"/api/provider");
    setProviders(response.data);
  }

  function editProvider(provider){
    setProvider(provider);
    setIsOpen(true);
  }

  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('auth-user') != null;
    if (!(loggedIn)) {
      router.push('/login')
    }
    getProviders();
  }, []);

  return (
    <>
    <div>
      <Nav />
      <div className="flex justify-end">
        <button onClick={openModal} className="bg-primary hover:bg-primary-dark p-4 text-sm text-white uppercase font-bold tracking-wider">Novo Fornecedor</button>
      </div>
      <table className="w-full text-left rounded-lg border-collapse border table-auto">
        <thead>
          <tr>
            <th className="border">Nome</th>
          </tr>
        </thead>
        {
          providers == null || providers == undefined || providers.length === 0 ? (<div className="empty">Acabou :(</div>):
          (
            <tbody>
            {
              providers.map((provider, index) => (
                <tr key={index} onClick={() => editProvider(provider)}>
                  <td class="border">{provider.nome}</td>
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
        
        <div className="inline-flex justify-between">
          <div className="w-1/3 mr-1">
            <label>Nome</label>
            <input value={provider.nome} onChange={e => setProvider({...provider, nome: e.target.value})} className="border w-full" />
          </div>
        </div>
        <div className="w-full">
          <button onClick={saveProvider} className="bg-primary hover:bg-primary-dark p-4 text-sm text-white uppercase font-bold tracking-wider mt-1">Salvar</button>
          {
            provider._id == null || provider._id == undefined ? (<div>(</div>):
            (
              <button onClick={deleteProvider} className="bg-primary ml-3 hover:bg-primary-dark p-4 text-sm text-white uppercase font-bold tracking-wider mt-1">Excluir</button>
            )
          }
          
        </div>
       
      </form>
    </Modal>
    </>
  )
}
