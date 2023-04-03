import { Whiteboard } from "@d/whiteboard/Whiteboard";
import { type NextPage } from "next";
import Head from "next/head";
import { ReactFlowProvider } from "reactflow";

const Home: NextPage = () => {
  return (
    <ReactFlowProvider>
      <Head>
        <title>FlowGPT</title>
        <meta
          name="description"
          content="Visual prompt generation for ChatGPT"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Whiteboard />
    </ReactFlowProvider>
  );
};

export default Home;
