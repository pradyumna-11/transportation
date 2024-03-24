import { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import "./index.css";

const MoveItem = (props) => {
  const { MoveItemDetails } = props;
  const {
    movingFrom,
    movingTo,
    estimateId,
    propertySize,
    distance,
    movingOn,
    items,
    oldFloorNo,
    newFloorNo,
    oldElevatorAvailability,
    newElevatorAvailability,
  } = MoveItemDetails;
  const [expandedItemDetailsList, editExpandedDetailsList] = useState([]);
  const [showDetails, setShowDetails] = useState({});

  // Function to toggle the visibility of inner detail for a specific item
  const toggleDetail = (itemId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId], // Toggle the visibility
    }));
  };

  const changeItems = (id) => {
    const index = expandedItemDetailsList.indexOf(id);
    console.log(index);

    // If item is not in the list, add it
    if (index === -1) {
      editExpandedDetailsList([id, ...expandedItemDetailsList]);
    } else {
      // If item is in the list, remove it
      const newList = expandedItemDetailsList.filter((item) => item !== id);
      editExpandedDetailsList(newList);
    }
  };
  const additionalDetailsClassName =
    expandedItemDetailsList.indexOf(estimateId) === -1
      ? "extra-info-container d-none"
      : "extra-info-container";

  const { inventory } = items;
  return (
    <li className="move-item">
      <div className="move-item-container-1">
        <p className="from-address">
          From
          <span className="span-bold">{movingFrom}</span>
        </p>
        <button type="button" className="arrow-button">
          <BsArrowRightCircle size={25} color="rgb(255, 72, 0)" />
        </button>
        <p className="to-address">
          To
          <span className="span-bold">{movingTo}</span>
        </p>
        <p className="estimate-id">
          Requests
          <span className="span-bold orange">{estimateId}</span>
        </p>
      </div>
      <div className="move-item-container-2">
        <p className="container-2-item">
          <IoMdHome
            size={27}
            color="rgb(255, 72, 0)"
            className="margin-right"
          />
          {propertySize}
        </p>
        <p className="container-2-item">
          <FaBookmark
            size={25}
            color="rgb(255, 72, 0)"
            className="margin-right"
          />
        </p>
        <p className="container-2-item">
          <GiPathDistance
            size={25}
            color="rgb(255, 72, 0)"
            className="margin-right"
          />
          {distance}
        </p>
        <p className="container-2-item">
          <IoCalendarNumberOutline
            size={25}
            color="rgb(255, 72, 0)"
            className="margin-right"
          />
          {movingOn}
        </p>
        <FaPencilAlt
          size={20}
          color="rgb(255, 72, 0)"
          className="margin-right"
        />
        <p className="container-2-item">
          <IoIosCheckbox size={25} color="rgb(255, 72, 0)" />
          is flexible
        </p>
        <button
          className="view-more-details-button"
          type="button"
          onClick={() => changeItems(estimateId)}
        >
          View More Details
        </button>
        <button className="quotes-waiting-button">Quotes waiting</button>
      </div>
      <div className="move-item-container-3">
        <CgDanger size={25} color="rgb(255, 72, 0)" />
        <span className="span-bold margin-left">Disclaimer</span>
        <p className="disclaimer-content">
          Please update your move date before two days of shifting.
        </p>
      </div>
      <div className={additionalDetailsClassName}>
        <div className="additional-info-container">
          <h2 className="additional-info-heading">Additional Information</h2>
          <button type="button" className="edit-info-button">
            Edit additional info
          </button>
        </div>

        <p className="test-data-content">Test Data</p>

        <div className="house-details-container">
          <h2 className="house-details-heading">House Details</h2>
          <button type="button" className="edit-info-button">
            Edit house details
          </button>
        </div>

        <div className="existing-house-details-container">
          <h2 className="existing-house-details-heading">
            Existing House Details
          </h2>
          <div className="existing-house-details-items-container">
            <div className="existing-house-detail-item">
              <h4 className="house-detail-item-heading">Floo No.</h4>
              <p className="house-detail-item-para">{oldFloorNo}</p>
            </div>
            <div className="existing-house-detail-item">
              <h4 className="house-detail-item-heading">Elevator Available.</h4>
              <p className="house-detail-item-para">
                {oldElevatorAvailability}
              </p>
            </div>
            <div className="existing-house-detail-item">
              <h4 className="house-detail-item-heading">
                Distance from Elevator / Staircase to truck
              </h4>
              <p className="house-detail-item-para">
                {oldElevatorAvailability === "Yes" ? "11 meters" : "null"}
              </p>
            </div>
          </div>
        </div>

        <div className="new-house-details-container">
          <h2 className="new-house-details-heading">New House Details</h2>
          <div className="new-house-details-items-container">
            <div className="new-house-detail-item">
              <h4 className="house-detail-item-heading">Floo No.</h4>
              <p className="house-detail-item-para">{newFloorNo}</p>
            </div>
            <div className="new-house-detail-item">
              <h4 className="house-detail-item-heading">Elevator Available.</h4>
              <p className="house-detail-item-para">
                {newElevatorAvailability}
              </p>
            </div>
            <div className="new-house-detail-item">
              <h4 className="house-detail-item-heading">
                Distance from Elevator / Staircase to truck
              </h4>
              <p className="house-detail-item-para">
                {newElevatorAvailability === "Yes" ? "11 meters" : "null"}
              </p>
            </div>
          </div>
        </div>

        <div className="inventory-container">
          <h2 className="inventory-heading">Inventory Details</h2>
          <button type="button" className="edit-info-button">
            Edit Inventory Info
          </button>
        </div>

        <ul className="inventory-items-container">
          {inventory.map((each) => (
            <li className="inventory-item" key={each.id}>
              <div className="inventory-content-container">
                <div>
                  <p className="inventory-item-name">
                    {each.displayName}
                    <span className="inevntory-item-count">
                      {inventory.length}
                    </span>
                  </p>
                </div>
                <button
                  className="down-button"
                  type="button"
                  onClick={() => toggleDetail(each.id)}
                >
                  {showDetails[each.id] ? (
                    <MdOutlineKeyboardArrowUp size={30} />
                  ) : (
                    <MdKeyboardArrowDown size={30} />
                  )}
                </button>
              </div>

              {showDetails[each.id] && (
                <div className="inner-detail-of-each-item-container">
                  <ul className="types-of-inner-details-items-container">
                    {each.category.map((eachCategoryItem) => (
                      <li
                        key={eachCategoryItem.id}
                        className="type-item-detail-container"
                      >
                        {eachCategoryItem.displayName}
                        {eachCategoryItem.items.map((eachCategoryInnerItem) => (
                          <li
                            key={eachCategoryInnerItem.uniqueId}
                            className="each-item-inner-detail"
                          >
                            <p className="inner-item-name">
                              {eachCategoryInnerItem.displayName}
                            </p>
                            <p className="inner-item-quantity">
                              {eachCategoryInnerItem.order}
                            </p>
                          </li>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <hr className="line" />
    </li>
  );
};

export default MoveItem;
