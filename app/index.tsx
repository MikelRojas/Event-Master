import { Redirect } from "expo-router";

const Home = () => {
  return <Redirect href={"/(auth)/sign_in"} />;
};

export default Home;
