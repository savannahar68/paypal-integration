import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/paypal");
  }, [router]);
  return (
    <div>
      <Head>
        <title>Paypal Payment gateway</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  );
}
