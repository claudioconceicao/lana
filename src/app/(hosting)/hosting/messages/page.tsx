"use client";

import MessageCard from "@/components/message-card";
import Chat from "@/components/chat";

const Messages = () => {
  return (
    <div className="flex flex-1 h-full p-8"> {/* added h-full */}
      <div className="flex flex-1 bg-white border border-gray-200 overflow-hidden rounded-lg shadow-sm">
        
        {/* Sidebar */}
        <div className="w-[350px] flex flex-col border-r border-gray-200">
          {/* Header */}
          <div className="flex items-center h-[70px] px-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold">Mensagens</h1>
          </div>

          {/* Search */}
          <div className="relative px-4 py-2">
            
            <input
              type="text"
              className="block pl-10 h-9 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-100"
              placeholder="Procurar mensagens"
            />
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto mt-2 px-4">
            <ul className="space-y-2">
              <li><MessageCard /></li>
              <li><MessageCard /></li>
              <li><MessageCard /></li>
            </ul>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Messages;
