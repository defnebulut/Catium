import { useContext } from "react";
import AuthContext from "../../pages/login/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;