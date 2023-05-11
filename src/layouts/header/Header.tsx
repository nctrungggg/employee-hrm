import logo from "../../assets/imgs/logo.png";
import DialogLogout from "../../components/dialogLogout/DialogLogout";

export function Header() {
  return (
    <div className="px-[30px] fixed top-0 h-[60px] w-full bg-white flex justify-between items-center shadow-sm z-50">
      <div className="flex gap-4 items-center">
        <div className="w-[36px] h-[36px] ">
          <img className="w-full h-full object-cover" src={logo} alt="logo" />
        </div>
        <h1 className="text-24 text-textPrimary font-medium">
          HR Management System
        </h1>
      </div>
      <div>
        <DialogLogout title={"T"} />
      </div>
    </div>
  );
}
