import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import DesignStyles from "./DesignStyles/DesignStyles";

import "./style/catalog.scss";

const usePackagesData = [
  {
    name: "Bride's Room",
    img: "/pexels-kseniia-lopyreva-4959835.jpg",
  },
  {
    name: "Celestial Room",
    img: "/celestial-room.jpeg",
  },
  {
    name: "Baptistry",
    img: "/baptistry.jpeg",
  },
  {
    name: "Hallway",
    img: "/hallway.jpeg",
  },
  {
    name: "Reception",
    img: "/reception.jpeg",
  },
  {
    name: "Stairway",
    img: "/stairway.jpeg",
  },
  {
    name: "Testing",
    img: "",
  },
  {
    name: "Testing",
    img: "",
  },
];

const usePackages = usePackagesData.map((usePackage) => {
  return (
    <>
      <div className="use-package-container">
        <div
          className="use-package-image"
          style={{
            backgroundImage: `url(/images${usePackage.img})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        {usePackage.name}
      </div>
    </>
  );
});

const Catalog: FC<AppProps> = ({ user }) => {
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="catalog-container">
            <div className="catalog-main-container">
              <DesignStyles />

              <div className="catalog-use-packages">
                <span>Use Packages</span>
                <div className="catalog-use-packages-buttons">
                  {usePackages}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Catalog;
