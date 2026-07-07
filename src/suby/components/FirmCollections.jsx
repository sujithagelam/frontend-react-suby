import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selected, setSelected] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors);
      console.log("firmData", newFirmData);
    } catch (error) {
      alert("firm data not fetched");
      console.error("firm data is not fetched");
    }
  };
  useEffect(() => {
    firmDataHandler();
  }, []);

  const filterHandler = (region, category) => {
    setSelected(region);
    setActiveCategory(category);
  };

  return (
    <>
      <h3>Restaurents with online food delivery in Hyderbad</h3>
      <div className="filterButton">
        <button
          onClick={() => filterHandler("All", "all")}
          className={activeCategory === "all" ? "activeButton" : ""}
        >
          All
        </button>
        <button
          onClick={() => filterHandler("South-Indian", "south-indian")}
          className={activeCategory === "south-indian" ? "activeButton" : ""}
        >
          South-Indian
        </button>
        <button
          onClick={() => filterHandler("North-Indian", "north-indian")}
          className={activeCategory === "north-indian" ? "activeButton" : ""}
        >
          North-Indian
        </button>
        <button
          onClick={() => filterHandler("Chinese", "chinese")}
          className={activeCategory === "chinese" ? "activeButton" : ""}
        >
          Chinese
        </button>
        <button
          onClick={() => filterHandler("Bakery", "bakery")}
          className={activeCategory === "bakery" ? "activeButton" : ""}
        >
          Bakery
        </button>
      </div>
      <section className="firmSection">
        {firmData.map((apple) => {
          return apple.firm.map((item) => {
            if (
              selected === "All" ||
              item.region.includes(selected.toLocaleLowerCase())
            ) {
              return apple.firm.map((item) => {
                return (
                  <Link
                    to={`/products/${item._id}/${item.firstname}`}
                    className="link"
                  >
                    <div className="firmGroupBox">
                      <div className="firmGroup">
                        <img src={`${API_URL}/uploads/${item.image}`} />
                        <div className="firmOffer">{item.offer}</div>
                      </div>
                      <div className="firmDetails">
                        <strong>{item.firstname}</strong>
                        <div className="firmArea"> {item.region.join(",")}</div>
                        <div className="firmArea">{item.area} </div>
                      </div>
                    </div>
                  </Link>
                );
              });
            }
          });
          return null;
        })}
      </section>
    </>
  );
};

export default FirmCollections;
