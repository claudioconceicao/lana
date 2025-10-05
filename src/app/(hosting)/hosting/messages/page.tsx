"use client";

import { ChangeEvent, useState } from "react";
import MessageCard from "@/components/message-card";
import Chat from "@/components/chat";

type Message = {
  id: number;
  sender: string;
  preview: string;
  time: string;
};

const mockMessages: Message[] = [
  {
    id: 0,
    sender: "João",
    preview: "Olá, ainda está disponível?",
    time: "Ontem",
  },
  {
    id: 1,
    sender: "Maria",
    preview: "Gostaria de reservar...",
    time: "2 dias atrás",
  },
  {
    id: 2,
    sender: "Carlos",
    preview: "Posso fazer check-in mais cedo?",
    time: "1 semana atrás",
  },
];

const Messages = () => {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectMessage = (id: number) => {
    setSelectedMessageId(id);
  };

  // Filter messages
  const filteredMessages = mockMessages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-1 h-[calc(100vh-4rem)] p-4 md:p-8 sm:p-0">
      <div className="flex flex-1 w-fit bg-white border border-gray-200 overflow-hidden rounded-lg shadow-sm">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[400px] flex-col border-r border-gray-200 p-4">
          {/* Header */}
          <h1 className="text-xl font-semibold mt-2">Mensagens</h1>

          {/* Search */}
          <div className="pt-2">
            <input
              type="text"
              placeholder="Procurar mensagens"
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg bg-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Message List */}
          <div className="flex-1 py-2 pb-4">
            <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <li key={msg.id}>
                    <MessageCard
                      selected={selectedMessageId === msg.id}
                      onClick={() => handleSelectMessage(msg.id)}
                    />
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center py-4 text-sm">
                  Nenhuma mensagem encontrada
                </li>
              )}
            </ul>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          {selectedMessageId !== null ? (
            <Chat />
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-500">
              Selecione uma conversa para começar
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Messages;
