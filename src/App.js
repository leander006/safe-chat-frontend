import { useContext } from "react";
import { Context } from "./context/ContextProvider";

function App() {
  const { user } = useContext(Context);
  console.log(user);

  return (
    <>
      <h1>hello</h1>
    </>
  );
}

export default App;
