import RegularNav from "@/components/regular_nav";

const CreateHouseLayout = ({children} : Readonly<{children:React.ReactNode}>) =>{

    return (
        <div>
            <RegularNav />
            {children}
            <div className="flex flex-row justify-between items-center px-4 py-2 bg-gray-100">
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                    Voltar
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Avançar
                </button>
            </div>
        </div>
     );
}
export default CreateHouseLayout;