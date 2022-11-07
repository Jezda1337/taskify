import { withAuthSSR } from "middleware/withAuthSSR";
export default function Projects() {
  return (
    <>
      <h1>Projects</h1>
    </>
  );
}

export const getServerSideProps = withAuthSSR();
