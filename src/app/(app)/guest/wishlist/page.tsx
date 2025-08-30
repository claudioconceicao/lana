"use client";

const Wishlist = () => {
  const favorites: any[] = []; // Replace with your real wishlist state/data

  return (
    <div className="flex justify-center">
      <div className="w-full h-full border border-gray-300 mx-[50px]  mt-[30px] px-[50px] py-8">
        <h1 className="text-3xl font-semibold mb-6">Favoritos</h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">A sua lista de favoritos está vazia.</p>
            <p className="text-sm">
              Adicione casas, apartamentos ou locais aos favoritos para vê-los aqui.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Explorar Acomodações
            </button>
          </div>
        ) : (
          <div>
            {/* Map your favorite items here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
