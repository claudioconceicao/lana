"use client";

export default function StepNine({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  // Default coordinates (example: CN Tower)
  const lat = 43.643062;
  const lng = -79.383185;

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Mostra-nos a sua acomodação no mapa
      </h1>
      <p>
        O seu endereço só é compartilhado com os hóspedes depois que a reserva é
        confirmada
      </p>
      <div className="mt-8 h-[360px] w-full rounded-xl overflow-hidden">
        <iframe
          src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title="Localização da acomodação"
        ></iframe>
      </div>
    </div>
  );
}
