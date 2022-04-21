import AuthContext from "../Contexts/authContexts";
import { useContext } from "react";

export default function useAuth() {

  return useContext(AuthContext)
}