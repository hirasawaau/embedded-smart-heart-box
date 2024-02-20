import Image from "next/image";
import React from "react";

const login = () => {
  return (
    <div className="flex flex-col px-[44px] py-[28px] justify-center items-center flex-shrink-0 relative h-[100vh] bg-gradient-to-b from-[#FFD5D5] to-[#FF7485]">
      <img
        className="absolute bottom-0 left-0"
        src="https://media.discordapp.net/attachments/1199373638579785838/1207243742705352744/letter.png?ex=65def059&is=65cc7b59&hm=b8ff48bbe6c2059a662e7a80ed132f371ec8957e52b59df8caf69819e3ebe1d7&=&format=webp&quality=lossless"
        alt="logo"
        class="logo"
      />
      <img
        className="absolute top-0 right-0"
        src="https://media.discordapp.net/attachments/1199373638579785838/1207243742940241920/lock.png?ex=65def059&is=65cc7b59&hm=5de1b715237ab5a19cb300bb24a48adcf240e4b5cd46760317394d583e4835b9&=&format=webp&quality=lossless"
        alt="logo"
        class="logo"
      />
      <div>
        <form action="login.php" method="post">
          <h2>What’s your serial number?</h2>
          <img src="static_pic/Group 1heart-box.png" />
          <input
            type="text"
            name="serial"
            className="flex flex-col self-stretch px-[5px] py-[12px] items-center gap-[4px] flex-[1_0_0] border-[1px] rounded-xl border-solid border-[#FF7485]"
        
            class="typographyInput"
            placeholder="xx:xx:xx:xx:xx:xx"
            required
          />
          <button type="submit">
            <div class="typographyButton">Save box’s number</div>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
