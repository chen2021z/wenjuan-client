import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type PropsType = {
  id: string;
};

export default function Question(props: PropsType) {
  return (
    <>
      <Head>
        <title>Question</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{props.id}</h1>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "id" } = context.params;

  return {
    props: {
      id,
    },
  };
}
