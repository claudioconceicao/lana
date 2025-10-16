export default function StepOne({
  value,
  onChange,
  maxLength = 50,
}: {
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
}) {
  const remaining = maxLength - value.length;

  return (
    <div className="flex flex-col justify-center w-full max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Vamos dar um título ao seu anúncio
      </h1>

      <input
        type="text"
        placeholder="Digite o título..."
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-xl p-3 w-full text-lg transition-all outline-none placeholder-gray-400"
      />

      <div className="flex items-center justify-between mt-2">
        <p className="text-gray-500 text-sm leading-relaxed">
          Escolha um título curto e chamativo para destacar o seu anúncio.
        </p>
        <span
          className={`text-sm ${
            remaining <= 10 ? "text-red-500 font-medium" : "text-gray-400"
          }`}
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
