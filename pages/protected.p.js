import React from "react";

export default function Protected() {
  return <div>Protected page</div>;
}
export const getStaticProps = () => {
  return {
    props: {
      userAccess: ["user", "super admin"],
    },
  };
};
