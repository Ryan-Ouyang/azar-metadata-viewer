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

      <div className="flex flex-col justify-center h-screen max-w-md gap-4 p-2 mx-auto">
        <h1 className="mx-auto text-3xl font-bold">Azar Metadata Viewer</h1>
        <input
          className="px-3 py-2 bg-gray-300 border text-grey-darkest"
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
