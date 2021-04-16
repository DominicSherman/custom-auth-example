import { NavBar } from 'client/components';
import { requireAuthentication } from 'client/services/auth-service';

export default function Protected() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />
      <div className="h-screen flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl font-semibold ml-7">{`You can only see this page if you are logged in 🎉`}</h1>
      </div>
    </div>
  );
}

export const getServerSideProps = requireAuthentication;
