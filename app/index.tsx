import { Redirect } from "expo-router";

const Page = () => {
  console.log("HOME");
  return <Redirect href={"/notes"} />;
};

export default Page;
