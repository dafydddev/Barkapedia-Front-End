import { firebaseSignIn } from "../db/connection";
import Header from "./Components/Header";

function App() {
  const email = "joe@example.com";
  const password = "abc1232";
  return (
    <> 
    {
    firebaseSignIn(email, password)
    }
      <Header />
    </>
  );
}

export default App;