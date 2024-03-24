import { Component } from "react";
import { FaTruckArrowRight } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { ImBooks } from "react-icons/im";
import { RiLogoutCircleFill } from "react-icons/ri";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";
import MoveItem from "../MoveItem";

const homePageConstStatus = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Home extends Component {
  state = { homePageStatus: homePageConstStatus.loading, movesData: [] };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ homePageStatus: homePageConstStatus.loading });
    const options = {
      method: "GET",
    };
    const response = await fetch(
      "https://run.mocky.io/v3/3d59aba6-f03d-44b5-aa8c-1fac10657d3b",
      options
    );
    if (response.ok === true) {
      const data = await response.json();
      //console.log(data);
      const parsedData = data.Customer_Estimate_Flow.map((each) => ({
        estimateId: each.estimate_id,
        userId: each.user_id,
        movingFrom: each.moving_from,
        movingTo: each.moving_to,
        movingOn: each.moving_on,
        distance: each.distance,
        propertySize: each.property_size,
        oldFloorNo: each.old_floor_no,
        newFloorNo: each.new_floor_no,
        oldElevatorAvailability: each.old_elevator_availability,
        newElevatorAvailability: each.new_elevator_availability,
        oldParkingDistance: each.old_parking_distance,
        newParkingDistance: each.new_parking_distance,
        unpackingService: each.unpacking_service,
        packingService: each.packing_service,
        items: { ...each.items },
        oldHouseAdditionalInfo: each.old_house_additional_info,
        newHouseAdditionalInfo: each.new_house_additional_info,
        totalItems: each.total_items,
        status: each.status,
        orderDate: each.order_date,
        dateCreated: each.date_created,
        dateOfComplete: each.date_of_complete,
        dateOfCancel: each.date_of_cancel,
        estimateStatus: each.estimate_status,
        estimateComparison: each.estimate_comparison,
        estimateAmount: each.estimate_amount,
        successfulPayments: each.successfulPayments,
        orderReviewed: each.order_reviewed,
        callBack: each.call_back,
        moveDateFlexible: each.move_date_flexible,
        fromAddress: each.from_address,
        toAddress: each.to_address,
        serviceType: each.service_type,
        storageItems: each.storage_items,
      }));
      this.setState({
        homePageStatus: homePageConstStatus.success,
        movesData: parsedData,
      });
    } else {
      this.setState({ homePageStatus: homePageConstStatus.failure });
    }
  };

  renderHomePageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  );

  renderHomePageFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1705590349/erroring_1_pn7sxb.png"
        alt="failure-img"
        className="failure-img"
      />
      <p className="failure-msg">Something went wrong,Please try again.</p>
      <button className="retry-books-button" onClick={this.getBooksData()}>
        Retry
      </button>
    </div>
  );

  renderHomePageSuccess = () => {
    const { movesData } = this.state;
    //  console.log(movesData);
    return (
      <div className="my-moves-container">
        <h1 className="my-moves-heading">My Moves</h1>
        <ul className="home-page-move-items-container">
          {movesData.map((each) => (
            <MoveItem MoveItemDetails={each} key={each.estimateId} />
          ))}
        </ul>
      </div>
    );
  };

  renderHomePage = () => {
    const { homePageStatus } = this.state;
    switch (homePageStatus) {
      case homePageConstStatus.loading:
        return this.renderHomePageLoader();
      case homePageConstStatus.success:
        return this.renderHomePageSuccess();
      case homePageConstStatus.failure:
        return this.renderHomePageFailure();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="main-bg">
        <div className="side-bar-container">
          <p className="side-bar-item red">
            <FaTruckArrowRight size={22} className="icon-margin" />
            My Moves
          </p>
          <p className="side-bar-item">
            <CgProfile size={22} color="grey" className="icon-margin" />
            My Profile
          </p>
          <p className="side-bar-item">
            <ImBooks size={22} color="grey" className="icon-margin" />
            Get Quote
          </p>
          <p className="side-bar-item">
            <RiLogoutCircleFill
              size={22}
              color="grey"
              className="icon-margin"
            />
            Logout
          </p>
        </div>
        {this.renderHomePage()}
      </div>
    );
  }
}

export default Home;
