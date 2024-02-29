import format from "date-fns/format";

export const initialPostInfoState = {
  // arrivalDate: "",
  // arrivalTime: "",
  // pickUpLocation: "",
  // dropOffLocation: "",
  // arrivalQtyOfTraveler: 1,
  // departureQtyOfTraveler: 1,
  // departureDate: "",
  // departureTime: "",
  // returnDropOffLocation: "",
  // returnPickUpLocation: "",
  // arrivalPrice: 0,
  // departurePrice: 0,

  time: "",
  pickUp: "",
  dropOff: "",
  qtyOfTravelers: 1,
  date: "",
  price: 0,
  travelInfo: "",
  requestOrPost: "request",
  oneWayOrRoundTrip: "oneWay",
  user: undefined,
  airlineName: "",
  flightNumber: "",
  hasFlight: "no"
};

const submitRequestOrPost = async (postInfo, setPostInfo, createRequestOrPost, token) => {
  const arrivalTimeString = postInfo?.time || "";
  const time = format(new Date(`1970-01-01T${arrivalTimeString}:00.000Z`), "HH:mm:ss.SSS");

  // const cleanEmpty = Object?.fromEntries(
  //   Object?.keys(postInfo)
  //     ?.filter((k) => postInfo[k] !== "")
  //     ?.map((k) => [k, postInfo[k]])
  // );

  // const postData = {
  //   ...cleanEmpty,
  //   arrivalTime: `${arrivalTime}`
  // };

  // if (postInfo.oneWayOrRoundTrip !== "oneWay") {
  //   const departureTimeString = postInfo?.departureTime || "";
  //   const departureTime = format(
  //     new Date(`1970-01-01T${departureTimeString}:00.000Z`),
  //     "HH:mm:ss.SSS"
  //   );

  //   postData.departureTime = `${departureTime}`;
  // }

  const postData = {
    ...postInfo,
    time
  };

  createRequestOrPost({ postData, time, token });
  setPostInfo(initialPostInfoState);
};

export default submitRequestOrPost;
