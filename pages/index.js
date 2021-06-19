import Auth from "../components/Auth";
import Layout from "../components/Layout";
import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState(true)
  return (
    <Layout title={title ? 'login' : 'sign up'}>
      <Auth title={setTitle} />
    </Layout>
  );
}
