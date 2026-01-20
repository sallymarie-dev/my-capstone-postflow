import postFlowImg from "../assets/PostFlow.png";

export default function LogoHeader() {
  return (
    <>
      <div className="logo-wrapper">
        <img src={postFlowImg} alt="PostFlow Logo" className="logo-img" />
      </div>
      <p className="tagline">Share Life’s Moments</p>
    </>
  );
}
