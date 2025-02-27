const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] relative">
        <div className="md:relative absolute md:translate-x-0 z-20 h-full">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-base-200/50">
          <div className="text-center p-4 space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Chitti!
            </h1>
            <p className="text-sm md:text-base text-base-content/60">
              Select a conversation to start chatting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 