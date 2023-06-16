import { firebaseSignIn } from "../db/connection";
import Header from "./Components/Header";

function App() {

  // To get the below to work, make sure that you have the firebase emulator running and listen.ts running
  // From there, go a POST to http://localhost:9191/api/users/ with the below ...
  // {
  //   "email": "joe@example.com",
  //   "username": "JoeB",
  //   "password": "abc1232",
  //   "type": "consumer"
  // }
  // ... from after this, the auth error should change to be "signed in user_11"

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