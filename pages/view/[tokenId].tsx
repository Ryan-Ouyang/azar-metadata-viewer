import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

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

      <div className="container mx-auto max-w-prose">
        <h1 className="text-3xl font-bold">Azar #{tokenId}</h1>
        <div className="my-4 border border-black border-1"></div>
        <img src={imageUrl} />
        <h3>Raw Metadata:</h3>
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
