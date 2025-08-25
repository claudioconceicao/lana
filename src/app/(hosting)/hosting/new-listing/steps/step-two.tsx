

export default function StepTwo({
  value,
  onChange,
  maxLength = 500,
}: {
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
}) {
  const remaining = maxLength - value.length;

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Adicione uma descrição
      </h1>

      <textarea
        placeholder="Escreva algo sobre sua acomodação..."
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-xl p-4 w-full h-40 text-base transition-all outline-none placeholder-gray-400 resize-none"
      />

      <div className="flex items-center justify-between mt-2">
        <p className="text-gray-500 text-sm leading-relaxed">
          Descreva os pontos fortes do seu espaço. Seja claro e atraente para os
          hóspedes.
        </p>
        <span
          className={`text-sm ${
            remaining <= 50 ? "text-red-500 font-medium" : "text-gray-400"
          }`}
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}