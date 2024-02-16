import {getServerSession} from 'next-auth';

import User from './../components/User';
import {authOptions} from './../lib/authOptions';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex flex-col items-center justify-center">
      <h1>Home</h1>
      <h1>Server Side Rendered</h1>
      <pre>{JSON.stringify(session)}</pre>
      <h1>Client Side Rendered</h1>
      <User />
    </section>
  );
}
