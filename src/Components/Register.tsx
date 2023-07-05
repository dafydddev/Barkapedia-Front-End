import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import postUser from "../../utils/postUser";
import "../Styles/register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [_type, setType] = useState<string>("");
  const [isCustomer, setIsCustomer] = useState<boolean>(false);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [user, setUser] = useState({ type: "" });
  const navigate = useNavigate();

  function handleFormChange(e: any, entry: string) {
    entry === "username" && setUsername(e.target.value);
    entry === "email" && setEmail(e.target.value);
    entry === "password" && setPassword(e.target.value);
    entry === "password2" && setPassword2(e.target.value);
  }

  function createAccount(
    username: string,
    email: string,
    password: string,
    password2: string
  ) {
    if (
      /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/.test(email) &&
      password === password2 &&
      username.length > 0
    ) {
      const updatedUser = { ...user, username, email, password };
      setUser(updatedUser);
      postUser(updatedUser)
        .then(() => {
          navigate("/signin");
        })
        .catch((err) => {
          console.dir(err);
        });
    }
  }

  useEffect(() => {
    if (username !== "" && email !== "" && password !== "") {
      if (isBusiness || isCustomer) setSubmittable(true);
    }
  }, [username, email, password, isBusiness, isCustomer]);

  function handleCheckbox(type: string) {
    if (type === "business" && !isBusiness) {
      setIsCustomer(false);
      setIsBusiness(true);
      setType(type);
      setUser({ ...user, type: type });
    } else if (type === "business" && isBusiness) {
      setType("");
      setIsBusiness(false);
    } else if (type === "consumer" && !isCustomer) {
      setType(type);
      setIsCustomer(true);
      setIsBusiness(false);
      setUser({ ...user, type: type });
    } else if (type === "consumer" && isCustomer) {
      setType("");
      setIsCustomer(false);
    }
  }

  return (
    <Card sx={{ width: "100", height: "100%" }}>
      <FormGroup>
        <CardHeader
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1.5em",
          }}
          title="Register"
        />
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "2.5em",
          }}
        >
          Fill in the form to create your Barkapedia account, all fields must be
          filled in.
        </Typography>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard"
            onChange={(e) => handleFormChange(e, "username")}
            label="Username"
            sx={{ marginBottom: "0.8em" }}
          ></TextField>
          <TextField
            variant="standard"
            label="Email"
            sx={{ marginBottom: "0.8em" }}
            onChange={(e) => handleFormChange(e, "email")}
          ></TextField>
          <TextField
            variant="standard"
            sx={{ marginBottom: "0.8em" }}
            label="Password"
            type="password"
            onChange={(e) => handleFormChange(e, "password")}
          ></TextField>
          <TextField
            variant="standard"
            label="Re-enter Password"
            type="password"
            onChange={(e) => handleFormChange(e, "password2")}
          ></TextField>
        </CardContent>
        <Typography
          sx={{ marginTop: "4em", display: "flex", justifyContent: "center" }}
        >
          Are you a business or a customer?
        </Typography>

        <CardContent sx={{ margin: "auto", paddingLeft: "0" }}>
          <FormControlLabel
            value="start"
            control={<Checkbox />}
            label="Customer"
            checked={isCustomer}
            labelPlacement="start"
            onClick={() => handleCheckbox("consumer")}
          />
          <FormControlLabel
            value="start"
            control={<Checkbox />}
            label="Business"
            checked={isBusiness}
            labelPlacement="start"
            onClick={() => handleCheckbox("business")}
          />
        </CardContent>
        {submittable ? (
          <CardContent sx={{ margin: "auto" }}>
            <Button
              variant="contained"
              sx={{ width: "20em" }}
              onClick={() =>
                createAccount(username, email, password, password2)
              }
            >
              Create Account
            </Button>
          </CardContent>
        ) : null}
      </FormGroup>
    </Card>
  );
}
