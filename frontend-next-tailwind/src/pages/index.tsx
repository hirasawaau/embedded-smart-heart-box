import Image from "next/image";
import React from "react";
import { Sniglet } from "next/font/google";

const sniglet = Sniglet({
  display: "swap",
  subsets: ['latin'],
  weight: '400',
})
const login = () => {
  return (
    <div className="flex flex-col px-[44px] py-[28px] justify-center items-center flex-shrink-0 relative h-[100vh] bg-gradient-to-b from-[#FFD5D5] to-[#FF7485]">
      <img
        className="absolute bottom-0 left-0 z-0"
        src="https://cdn.discordapp.com/attachments/1213439368954642503/1213439401087205416/love_letter.png?ex=65f57a81&is=65e30581&hm=01d8def1791372622be2ac62d79de7f106a7919c78e5a6d774c2dec036dee2fc&"
        alt="logo"
      />
      <img
        className="absolute top-0 right-0 z-0"
        src="https://cdn.discordapp.com/attachments/1213439368954642503/1213439401368092672/love_lock.png?ex=65f57a81&is=65e30581&hm=808fbd9458e38164adada305d4c84b2ff92d92a7a1dc6bb7b17d4081c7358cfb&"
        alt="logo"
      />
      <div className="z-10 text-center rounded-2xl bg-opacity-60 backdrop-filter backdrop-blur-sm bg-white py-[26px] px-[40px] text-[#FF5065] text-3xl justify-center items-center flex flex-col" >
        <form className="flex flex-col gap-[24px] justify-center items-center" action="main" method="post">
          <h2 className={sniglet.className + " text-4xl"}>What’s your UID?</h2>
          <div className="flex justify-center items-center">
            <img src="static_pic/Group 1heart-box.png" />
          </div>
          <input
            type="text"
            name="serial"
            className={sniglet.className + " text-[18px] flex self-stretch py-[5px] px-[12px] items-center flex-[1_0_0] border-[1px] rounded-md border-solid border-[#FF7485] ring-1 ring-inset ring-[#FF7485]"}
            placeholder="xxxxxx"
            required
          />
          <button type="submit" className=" bg-[#FF7485] px-[16px] py-[4px] border-[1px] rounded-md border-[#FF7485]">
            <div className= {sniglet.className + " text-base text-white mx-[16px] my-[4px]"}>Save box’s number</div>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
``
export default login;
