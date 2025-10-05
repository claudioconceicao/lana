import Image from "next/image";

const MessageCard = ({selected, onClick}:{selected:boolean, onClick:() => void}) => {
  const bgClass = selected ? "bg-orange-100" : "bg-white hover:bg-gray-100";
  return (
    <button
      className={`flex flex-row items-center gap-3 p-3 w-full rounded-lg ${bgClass} transition`}
      onClick={onClick}
    >
      {/* Avatar */}
      <Image
        width={48}
        height={48}
        src="/images/image.png"
        alt="Receiver profile picture"
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            Receiver name
          </h3>
          <p className="text-xs text-gray-400 ml-2 whitespace-nowrap">
            12:45
          </p>
        </div>
        <p className="text-sm flex text-gray-500 truncate">
          Mensagem de teste que pode ser longa...
        </p>
      </div>
    </button>
  );
};

export default MessageCard;
