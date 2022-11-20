import { withAuthSSR } from "middleware/withAuthSSR";

export default function People() {
  return (
    <>
      <h1>People</h1>
    </>
  );
}

export const getServerSideProps = withAuthSSR();
