import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const [tokenId, setTokenId] = useState<number | null>(null);

  const goToToken = () => {
    if (tokenId === null) {
      alert("Please enter a token ID.");
    } else {
      router.push(`/view/${tokenId}`);
    }
  };

  return (
    <div>
      <Head>
        <title>Azar Viewer</title>
        <meta
          name="description"
          content="A metadata viewer for Mxtter's first drop, Azar."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-md p-2 mx-auto h-screen flex flex-col justify-center gap-4">
        <h1 className="text-3xl font-bold mx-auto">Azar Metadata Viewer</h1>
        <input
          className="border py-2 px-3 text-grey-darkest bg-gray-300"
          type="number"
          placeholder="Enter token ID"
          onChange={(e) => setTokenId(Number(e.target.value))}
          onKeyPress={(event) => {
            // Integers only
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        <button onClick={goToToken}>View Metadata</button>
      </div>
    </div>
  );
};

export default Home;
