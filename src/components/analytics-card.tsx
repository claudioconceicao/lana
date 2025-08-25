const AnalyticsCard = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="p-4 text-black w-full aspect-square h-32 shadow-md border rounded-md flex justify-center items-center">
      {children}
    </div>
  );
};

export default AnalyticsCard;
