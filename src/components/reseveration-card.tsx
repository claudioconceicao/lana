const ReservationCard = () => {
  return (
    <div className="h-[180] w-[290] bg-white rounded-lg shadow-sm">
      <div className="p-2">
        <h3 className="text-red-600 text-semibold text-lg">Reservation Title</h3>
        <h3 className="text-gray-500">Beeva name</h3>
        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex flex-col justify-center">
            <h3 className="text-semibold text-md">Guest name</h3>
            <h3 className="text-sm">Reservation Date</h3>
          </div>
          <h3>foto</h3>
        </div>
      </div>

      <button className="bg-gray border-t border-gray-200 w-full h-[50] items-center justify-center">
        Message
      </button>
    </div>
  );
};
export default ReservationCard;
