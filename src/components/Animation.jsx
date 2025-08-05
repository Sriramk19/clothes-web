import Lottie from "react-lottie-player";
import animationData from "../assets/Redgirl.json";
export default function IntroAnimation() {
  return (
    <div className="flex justify-center items-center py-4">
      <Lottie
        loop
        play
        animationData={animationData}
        style={{ width: 90, height: 90 }}
      />
    </div>
  );
}
