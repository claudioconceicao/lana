import Image from "next/image";

const Chat = () => {
  return (
    <div className="flex flex-col flex-1"> {/* make it grow inside parent */}
      {/* Header */}
      <div className="flex flex-row px-4 gap-2 border-y border-gray-200 items-center h-[70px]">
        <Image
          src="/images/image.png"
          width={100}
          height={100}
          alt="pp"
          className="rounded-full w-10 h-10"
        />
        <h1 className="text-xl font-semibold">Receiver name</h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-4 w-full bg-white overflow-y-auto">
        <div className="flex flex-col gap-4 mt-4">
          {/* Received message */}
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/images/image.png"
              width={100}
              height={100}
              alt="pp"
              className="rounded-full w-8 h-8"
            />
            <div className="bg-gray-200 rounded-lg p-2">Hello</div>
          </div>

          {/* Sent message */}
          <div className="flex flex-row gap-2 items-center justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-2">Hi</div>
            <Image
              src="/images/image.png"
              width={100}
              height={100}
              alt="pp"
              className="rounded-full w-8 h-8"
            />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex flex-row items-center h-[70px] border-t border-gray-200 px-2 gap-2">
        <input
          type="text"
          className="flex-1 bg-gray-200 h-[52px] rounded pl-2"
          placeholder="Type a message"
        />
        <button className="bg-orange-500 text-white w-[100px] h-[52px] shadow-md rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
