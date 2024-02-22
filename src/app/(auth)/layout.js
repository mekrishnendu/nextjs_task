export default function AuthLayout({ children }) {
  return (
    <>
      <div className="login-page-outer bg-gray-800 h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="rounded-lg bg-slate-500 p-8 w-[450] text-left bg-gradient-to-r from-cyan-500 to-blue-500">
          {children}
        </div>
      </div>
    </>
  );
}
