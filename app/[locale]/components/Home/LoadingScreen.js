export default function LoadingScreen() {
  return (
    <div className="w-full h-full bg-white flex justify-center items-center">
      <div className="lds-roller spin-black">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
