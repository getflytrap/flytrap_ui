import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context";
import { postLoginData } from "../../services/data";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [userIsRootUser, setUserIsRootUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
}

export default Login