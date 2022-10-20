const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-md m-auto ">
        <form className="w-full flex flex-col gap-4 justify-center ">
          {children}
        </form>
      </div>
    </>
  );
};

export default AuthLayout;
