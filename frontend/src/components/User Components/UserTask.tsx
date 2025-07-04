export default function UserTask() {
  return (
    <div className="flex min-h-screen items-center justify-center mb-5 bg-slate-100 ">
      <div className="mt-8 border border-slate-300 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-lg p-8 w-full max-w-5xl space-y-8">
        {/* Top Badges */}
        <div className="flex flex-wrap gap-4">
          <div className="px-5 py-2 bg-blue-100 text-blue-800 text-base font-semibold rounded-full">
            Author: John Doe
          </div>
          <div className="px-5 py-2 bg-yellow-100 text-yellow-800 text-base font-semibold rounded-full">
            Status: In Progress
          </div>
          <div className="px-5 py-2 bg-red-100 text-red-800 text-base font-semibold rounded-full">
            Priority: High
          </div>
        
        </div>

        {/* Title */}
        <div className="border border-slate-200 rounded-lg p-5 text-3xl font-bold text-slate-800">
          Design Landing Page
        </div>

        {/* Description */}
        <div className="border border-slate-200 rounded-lg p-5 text-lg text-slate-700 leading-relaxed">
          Create a responsive landing page for the new product launch. Ensure mobile optimization and accessibility compliance. This will serve as the main entry point for customers and should be visually appealing and fast.
        </div>

        {/* Todo List */}
        <div className="border border-slate-200 rounded-lg p-5 space-y-3">
          <div className="text-xl font-semibold text-slate-800 mb-2">To Do</div>
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <span className="text-slate-700 text-base">Wireframe the layout</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-slate-700 text-base">Implement mobile responsiveness</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-slate-700 text-base">Write accessibility tags</span>
            </li>
          </ul>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between flex-wrap gap-4">
          <div className="px-5 py-2 bg-slate-100 text-slate-700 text-base font-medium rounded-full">
            Due: 2025-07-20
          </div>
          
        </div>
      </div>
    </div>
  );
}
