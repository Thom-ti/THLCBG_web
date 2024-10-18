import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../stores/userStore";

const ProtectRoute = ({ element, allow }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  const token = useUserStore((state) => state.token);
  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = async () => {
    try {
      const resp = await currentUser(token);
      const role = resp.data.user.role;

      if (allow.includes(role)) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    } catch (err) {
      console.log(err);
      setIsAllowed(false);
    }
  };

  if (isAllowed === null) {
    return <div>Loading.....</div>;
  }
  if (!isAllowed) {
    return <Navigate to="/unauthorization" />;
  }

  return element;
};

export default ProtectRoute;
