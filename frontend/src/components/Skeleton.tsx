

export const CardSkeleton = ()=>{
    return (
    <div className="animate-pulse flex flex-col space-y-4 p-2 m-2 bg-white shadow rounded-lg w-full h-40 ">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-2 bg-gray-300 rounded w-full"></div>
      <div className="h-2 bg-gray-300 rounded w-5/6"></div>
      <div className="mt-auto flex space-x-2">
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}