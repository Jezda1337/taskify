import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-black z-50 ${ mounted ? "fade-out" : "" } flex flex-col justify-between`}>
      <LinearProgress color="primary" />
      <CircularProgress className="m-auto" />
      <LinearProgress />
    </div>
  );
}
