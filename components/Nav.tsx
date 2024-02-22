'use client';
import {useLayoutEffect} from 'react';
import {useSession, signOut} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
const Nav = () => {
  const router = useRouter();
  const session = useSession();
  useLayoutEffect(() => {
    if (session?.status === 'unauthenticated') {
      router.push('/');
    }
  }, [router, session?.status]);

  return (
    <nav>
      <div className=" flex max-w-[1240px] items-center justify-between p-4">
        <ul className="flex-column flex">
          <li className="p-4">
            <Link href="/">Home</Link>
          </li>

          {session?.status === 'authenticated' ? (
            <>
              <li className="p-4">
                <Link href="/prisma">Posts</Link>
              </li>
              <li className="p-4">
                <Link href="/forms">Forms</Link>
              </li>
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
            <>
              <li className="p-4">
                <Link href="/login">Login</Link>
              </li>
              <li className="p-4">
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        <div className="flex-end flex p-4">
          {session?.data?.user ? `Hi ${session?.data?.user?.name}` : null}
        </div>
      </div>
    </nav>
  );
};
export default Nav;
