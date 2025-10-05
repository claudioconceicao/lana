interface ReservationCardProps {
  title?: string;
  beeva?: string;
  guest?: string;
  date?: string;
  photo?: string | React.ReactNode;
}

const ReservationCard = ({
  title = "Reservation Title",
  beeva = "Beeva Name",
  guest = "Guest Name",
  date = "Reservation Date",
  photo,
}: ReservationCardProps) => {
  return (
    <div className="h-full w-full bg-white rounded-lg shadow-sm flex flex-col justify-between">
      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-red-600 font-semibold text-lg">{title}</h3>
        <h4 className="text-gray-500 text-sm">{beeva}</h4>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <h4 className="font-medium text-md">{guest}</h4>
            <p className="text-sm text-gray-500">{date}</p>
          </div>

          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
            {photo || "Foto"}
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="bg-gray-100 hover:bg-gray-200 border-t border-gray-200 w-full h-[50px] flex items-center justify-center rounded-b-lg transition">
        Message
      </button>
    </div>
  );
};

export default ReservationCard;
