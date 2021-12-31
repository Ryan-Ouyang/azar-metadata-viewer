import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const View: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const [metadata, setMetadata] = useState({
    image: undefined,
  });

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const metadataRes = await axios.get(
          `https://mxtter-azar.s3.us-west-2.amazonaws.com/metadata/${tokenId}`
        );

        delete metadataRes.data.description;
        delete metadataRes.data.license;
        delete metadataRes.data.external_url;

        setMetadata(metadataRes.data);
      } catch (e) {
        console.error(e);
        alert("Failed to fetch metadata. Please reload the page.");
      }
    };

    if (tokenId) getMetadata();
  }, [tokenId]);

  const imageUrl = metadata?.image
    ? `https://gateway.pinata.cloud/ipfs/${metadata?.image.substring(6)}`
    : "https://www.mxtter.art/placeholder.png";

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

      <div className="container mx-auto my-2 max-w-prose">
        <div className="my-4 border border-black border-1"></div>
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">Azar #{tokenId}</h1>
          <Link href="/">
            <h1 className="text-3xl font-bold cursor-pointer">GO BACK</h1>
          </Link>
        </div>
        <div className="my-4 border border-black border-1"></div>
        {metadata?.image ? <img src={imageUrl} /> : <ClipLoader />}
        <h3 className="mt-2 text-2xl font-bold">Raw Metadata:</h3>
        <div>
          <PrettyPrintJson data={metadata} />
        </div>
      </div>
    </div>
  );
};

function PrettyPrintJson({ data }: any) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default View;
