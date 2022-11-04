import { withAuthSSR } from "middleware/withAuthSSR";

export default function Settings() {
  return (
    <>
      <h1>Settings</h1>
    </>
  );
}

export const getServerSideProps = withAuthSSR();
