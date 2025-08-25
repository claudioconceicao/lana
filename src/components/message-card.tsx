import Image from "next/image";

const MessageCard = () => {
  return (
    <div className="flex flex-row w-full items-center cursor-pointer hover:bg-gray-100 overflow-hidden">
      <div className="">
        <Image
          width={100}
          height={100}
          src="/images/image.png"
          alt="House"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex flex-col w-full px-2">
        <div className="flex justify-between">
          <h3 className="text-md font-semibold">Receiver name</h3>
          <p>data </p>
        </div>
        <p className="text-sm text-gray-500">Mensagem de teste</p>
      </div>
    </div>
  );
};
export default MessageCard;
