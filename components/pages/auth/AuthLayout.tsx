const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-md m-auto ">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
