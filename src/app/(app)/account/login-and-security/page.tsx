const LoginAndSecurity = () => {
    return ( 

        <div>
            <div className="flex flex-col w-full h-full p-8 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Login e Segurança</h1>
                <form className="flex flex-col gap-4">
                    <label className="flex flex-col">
                        Email:
                        <input type="email" className="border p-2 rounded" placeholder="Seu email" />
                    </label>
                    <label className="flex flex-col">
                        Senha:
                        <input type="password" className="border p-2 rounded" placeholder="Sua senha" />
                    </label>
                    <button type="submit" className="bg-orange-500 text-white p-2 rounded">Salvar</button>
                </form>
            </div>
        </div>
     );
}
 
export default LoginAndSecurity;