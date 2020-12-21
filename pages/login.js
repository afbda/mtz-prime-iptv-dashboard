import { useState } from 'react';
import { useRouter } from 'next/router'
export default function LoginPage() {
    const [login, setLogin] = useState(null);
    const [senha, setSenha] = useState(null);

    const router = useRouter();

    function logar(){
        if(login == 'mtzprime' && senha == 'iptv') {
            localStorage.setItem('auth-user', login);
            router.push('/');
        }
    }
    return (
      <div className="container mx-auto p-8">
        <div className="mx-auto max-w-sm">
            <div className="py-10 text-center">
                Logo aqui
            </div>

            <div className="bg-white rounded shadow">
                <div className="border-b py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                    Bem Vindo de Volta
                </div>

                <form className="bg-grey-lightest px-10 py-10">
                    <div className="mb-3">
                        <input placeholder="Login" onChange={event => setLogin(event.target.value)} className="border w-full p-3" />
                    </div>
                    <div className="mb-6">
                        <input type="password" placeholder="Senha" onChange={event => setSenha(event.target.value)} className="border w-full p-3" />
                    </div>
                    <div className="flex">
                        <button onClick={()=> logar()} className="bg-primary hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    )
  }