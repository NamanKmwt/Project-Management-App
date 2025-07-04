
type InputTypes = {
  email: string;
  name: string;
};

export default function UserCard({ name, email }: InputTypes) {
  return (
    <div className="flex flex-col border border-blue-300 rounded-xl bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 hover:to-white transition-all cursor-pointer m-4 p-4 max-w-sm shadow-sm">
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
          src="https://cdn-icons-png.flaticon.com/128/16689/16689395.png"
          alt={`${name}'s avatar`}
        />
        <div className="ml-4 text-lg font-semibold text-blue-800 break-words">
          {name}
        </div>
      </div>
      <div className="mt-2 text-blue-700 text-sm break-words">
        {email}
      </div>
    </div>
  );
}
