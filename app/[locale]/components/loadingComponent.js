export default function LoadingComponent() {
  return (
    <div className="position-fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-800">
      <div class="lds-roller">
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
