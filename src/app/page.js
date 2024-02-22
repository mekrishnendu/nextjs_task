import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Login() {
  return (
    <main>
      <div className="login-page-outer bg-gray-800 h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="rounded-lg bg-slate-500 p-8 w-[450] text-left bg-gradient-to-r from-cyan-500 to-blue-500">
          <form>
            <div className="text-white">
              <h1 className="text-center text-3xl mb-2">Welcome</h1>
              <p className="text-center mb-4 text-sm">Sign in to continue the application.</p>
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-full w-[100px] h-[100px] text-center">
                  <Image
                    src="/images/person.png"
                    width={72}
                    height={72}
                    alt="Picture of the author"
                    className="self-auto inline-block mt-2"
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6 items-center">
                <label className="w-[100px] block text-white text-md">Email Id:</label>
                <input type="text" className="py-2 px-4 rounded-md text-sm text-black" />
              </div>

              <div className="flex justify-between mb-6 items-center">
                <label className="w-[100px] block text-white text-md">Password:</label>
                <input type="password" className="py-2 px-4 rounded-md text-sm text-black" />
              </div>

              <button
                type="submit"
                className="rounded-md bg-white text-black p-2 px-10 ml-[100px] mb-10"
              >
                Login
              </button>
              <p className="text-center text-sm">
                Dont have an account? <strong className="underline">Sign Up</strong>{' '}
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
