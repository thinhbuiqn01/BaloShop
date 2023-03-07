import React, { useMemo } from "react";

import { useSelector } from "react-redux";
import { RolesEnums } from "../routes/ProtectedRoute";

export function useAuthorizationUtil() {
  const { userInfo } = useSelector((state) => state.userLogin);

  const authorities = useMemo(() => {
    if (!userInfo) {
      return [RolesEnums.get("CUSTOMER_NOT_LOGIN")];
    }
    if (userInfo.token && userInfo.isAdmin) {
      return [RolesEnums.get("ADMIN")];
    }
    if (userInfo.token && !userInfo.isAdmin) {
      return [RolesEnums.get("CUSTOMER_LOGIN")];
    }
    return [RolesEnums.get("CUSTOMER_NOT_LOGIN")];
  }, [userInfo]);

  const ifAnyGranted = (roles) => {
    let exits = false;

    roles.forEach((role) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });
    return exits;
  };

  const ifNotGranted = (roles) => {
    let exits = false;

    roles.forEach((role) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });
    return !exits;
  };

  return {
    ifAnyGranted,
    ifNotGranted,
  };
}

const Authorization = (props) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const authorities = useMemo(() => {
    if (!userInfo) {
      return [RolesEnums.get("CUSTOMER_NOT_LOGIN")];
    }
    if (userInfo.token && userInfo.isAdmin) {
      return [RolesEnums.get("ADMIN")];
    }
    if (userInfo.token && !userInfo.isAdmin) {
      return [RolesEnums.get("CUSTOMER_LOGIN")];
    }
    return [RolesEnums.get("CUSTOMER_NOT_LOGIN")];
  }, [userInfo]);

  const ifAnyGranted = (roles) => {
    let exits = false;

    roles.forEach((role) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });

    return exits;
  };
  const ifNotGranted = (roles) => {
    let exits = false;

    roles.forEach((role) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });
    return !exits;
  };

  if (props.type === "ifNotGranted" && ifNotGranted(props.roles)) {
    return <>{props.children}</>;
  }
  if (props.type === "ifAnyGranted" && ifAnyGranted(props.roles)) {
    return <>{props.children}</>;
  }
  return null;
};

export default Authorization;
