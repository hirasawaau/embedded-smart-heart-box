import Image from "next/image";
import React from "react";
import { Sniglet } from "next/font/google";

const sniglet = Sniglet({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});
const Index = () => {
  const [boxId, setBoxId] = React.useState(0);
  return (
    <div className="relative flex h-[100vh] flex-shrink-0 flex-col items-center justify-center bg-gradient-to-b from-[#FFD5D5] to-[#FF7485] px-[44px] py-[28px]">
      <img
        className="absolute bottom-0 left-0 z-0"
        src="https://cdn.discordapp.com/attachments/1213439368954642503/1213439401087205416/love_letter.png?ex=65f57a81&is=65e30581&hm=01d8def1791372622be2ac62d79de7f106a7919c78e5a6d774c2dec036dee2fc&"
        alt="logo"
      />
      <img
        className="absolute right-0 top-0 z-0"
        src="https://cdn.discordapp.com/attachments/1213439368954642503/1213439401368092672/love_lock.png?ex=65f57a81&is=65e30581&hm=808fbd9458e38164adada305d4c84b2ff92d92a7a1dc6bb7b17d4081c7358cfb&"
        alt="logo"
      />
      <div className="z-10 flex flex-col items-center justify-center rounded-2xl bg-white bg-opacity-60 px-[40px] py-[26px] text-center text-3xl text-[#FF5065] backdrop-blur-sm backdrop-filter">
        <form
          className="flex flex-col items-center justify-center gap-[24px]"
          action={`main/${boxId}`}
          method="post"
        >
          <h2 className={sniglet.className + " text-4xl"}>What’s your UID?</h2>
          <div className="flex items-center justify-center">
            <img src="static_pic/Group 1heart-box.png" />
          </div>

          <select
            className={
              sniglet.className +
              " flex flex-[1_0_0] items-center self-stretch rounded-md border-[1px] border-solid border-[#FF7485] px-[12px] py-[5px] text-[18px] ring-1 ring-inset ring-[#FF7485]"
            }
            onChange={(e) => {
              console.log(e.target.value);
              setBoxId(+e.target.value);
            }}
          >
            <option value={0}>Misukana</option>
            <option value={1}>Yamamoto</option>
          </select>
          <button
            type="submit"
            className=" rounded-md border-[1px] border-[#FF7485] bg-[#FF7485] px-[16px] py-[4px]"
          >
            <div
              className={
                sniglet.className + " mx-[16px] my-[4px] text-base text-white"
              }
            >
              Save box’s number
            </div>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
``;
export default Index;
