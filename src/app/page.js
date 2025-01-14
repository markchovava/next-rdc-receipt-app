import { checkAuth } from "@/actions/authActions";


export default async function Home() {
  const auth = await checkAuth();

  return (
    <>
    </>
  );
}
