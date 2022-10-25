const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="flex w-full ">
        <div className="flex flex-1 justify-center">
          <div className="max-w-[450px] min-w-[200px] w-full flex flex-col justify-center items-center min-h-screen sm:min-h-0 m-auto px-6 py-12 rounded-md backdrop-blur-lg bg-black/70">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
