import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Sniglet } from "next/font/google";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { set } from "zod";
import { List } from "postcss/lib/list";

const sniglet = Sniglet({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

const UID_PARTNER = {
  0: "4b3g55",
  1: "4b3g56",
};

type UID_PARTNER_KEY = keyof typeof UID_PARTNER;

const Main: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const partner = UID_PARTNER[(id ?? 0) as UID_PARTNER_KEY];
  const [messages, setMessages] = useState(["", "", ""]);
  const [sendMessage, setSendMessages] = useState("");
  useEffect(() => {
    const fetchMessages = async () => {
      await fetch(
        `http://localhost:4000/menus/${UID_PARTNER[(id ?? 0) as UID_PARTNER_KEY]}`,
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log(data);
          setMessages(
            (data as Record<string, string>[]).map((item) => item.msg ?? ""),
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    void fetchMessages();
    console.log(messages);
  }, []);
  const handleInputChange = (index: number, value: string) => {
    setMessages([
      ...messages.slice(0, index),
      value,
      ...messages.slice(index + 1),
    ]);
  };
  const validateSendMessage = () => {
    if (sendMessage.length > 16) {
      alert("Message is too long please limit to 16 characters");
      return false;
    }
    if (sendMessage === "") {
      alert("Message is empty");
      return false;
    }
    return true;
  };
  const handleSendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateSendMessage()) {
      return;
    }
    await fetch(
      `http://localhost:4000/msg`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: sendMessage,
          createdBy: `${UID_PARTNER[(id ?? 0) as UID_PARTNER_KEY]}`,
          sendTo: `${UID_PARTNER[(((id ?? 0) as number) ^ 1) as UID_PARTNER_KEY]}`,
        }),
      },
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    alert("Message sent");
  };
  const validateForm = () => {
    for (const [index, message] of messages.entries()) {
      if (message.length > 16) {
        alert(`Message ${index} is too long please limit to 16 characters`);
        return false;
      }
      if (message === "") {
        alert(`Message ${index} is empty`);
        return false;
      }
    }
    return true;
  };
  const handleSaveDefaultMessage = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await fetch(
      `http://localhost:4000/menus/${UID_PARTNER[(id ?? 0) as UID_PARTNER_KEY]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menus: messages }),
      },
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    alert("Default message saved");
  };
  return (
    <div className="relative flex h-[100vh] flex-shrink-0 flex-col items-center justify-center gap-[16px] overflow-y-scroll bg-gradient-to-b from-[#FFD5D5] to-[#FF7485] px-[28px]">
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
      <div className="z-10 flex flex-col items-center justify-center gap-[20px] rounded-2xl bg-white bg-opacity-60 px-[32px] py-[26px] text-center text-[20px] text-[#FF5065] backdrop-blur-sm backdrop-filter">
        <div className="flex items-center gap-[8px] self-stretch">
          <svg
            className="h-6 w-6"
            fill="#FF5065"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 25"
          >
            <path d="M21.3113 3.18876C21.1226 3.00025 20.8872 2.86544 20.6291 2.79821C20.3711 2.73098 20.0998 2.73376 19.8431 2.80626H19.8291L1.83469 8.26626C1.54178 8.35049 1.28147 8.52197 1.08844 8.75784C0.895411 8.99371 0.778814 9.28278 0.754177 9.58658C0.72954 9.89037 0.798032 10.1945 0.950532 10.4583C1.10303 10.7222 1.3323 10.9334 1.60782 11.0638L9.63469 14.8653L13.4363 22.8922C13.5563 23.1492 13.7473 23.3666 13.9869 23.5186C14.2264 23.6706 14.5044 23.7509 14.7881 23.75C14.8313 23.75 14.8744 23.7481 14.9175 23.7444C15.2202 23.7199 15.5082 23.6034 15.7428 23.4105C15.9774 23.2176 16.1474 22.9576 16.23 22.6653L21.6863 4.67094C21.6863 4.66626 21.6863 4.66157 21.6863 4.65688C21.7597 4.40091 21.7637 4.13 21.6978 3.87199C21.6319 3.61397 21.4985 3.37815 21.3113 3.18876ZM14.7966 22.2359L14.7919 22.2491L11.1019 14.4594L15.5306 10.0297C15.6653 9.8879 15.7393 9.69908 15.7368 9.50351C15.7343 9.30794 15.6555 9.12108 15.5172 8.98278C15.3789 8.84448 15.1921 8.76568 14.9965 8.76318C14.8009 8.76067 14.6121 8.83466 14.4703 8.96938L10.0406 13.3981L2.25001 9.70813H2.26313L20.25 4.25001L14.7966 22.2359Z" />
          </svg>
          <h2 className={sniglet.className + " text-[20px]"}>
            Send message to partner
          </h2>
        </div>
        <div className="flex flex-col items-start gap-[4px] self-stretch">
          <p className={sniglet.className + " text-[14px] text-[#FF5065]"}>
            Partner’s UID: {partner}
          </p>
          <input
            type="text"
            name="serial"
            className={
              sniglet.className +
              " flex flex-[1_0_0] items-center self-stretch rounded-md border-solid border-[#FF7485] px-[12px] py-[5px] text-[14px] ring-1 ring-inset ring-[#FF5065]"
            }
            value={sendMessage}
            onChange={(e) => setSendMessages(e.target.value)}
            placeholder="Message here"
            required
          />
          <div className="flex flex-col items-center gap-[16px] self-stretch">
            <div className="flex w-[278px] items-start gap-[4px] self-stretch">
              <svg
                className="h-[16px] w-[16px]"
                fill="#977373"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM8 13.5C6.91221 13.5 5.84884 13.1774 4.94437 12.5731C4.0399 11.9687 3.33495 11.1098 2.91867 10.1048C2.50238 9.09977 2.39347 7.9939 2.60568 6.927C2.8179 5.86011 3.34173 4.8801 4.11092 4.11091C4.8801 3.34172 5.86011 2.8179 6.92701 2.60568C7.9939 2.39346 9.09977 2.50238 10.1048 2.91866C11.1098 3.33494 11.9687 4.03989 12.5731 4.94436C13.1774 5.84883 13.5 6.9122 13.5 8C13.4983 9.45818 12.9184 10.8562 11.8873 11.8873C10.8562 12.9184 9.45819 13.4983 8 13.5ZM7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8.5C8.5 8.63261 8.44732 8.75979 8.35356 8.85355C8.25979 8.94732 8.13261 9 8 9C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5ZM8.75 10.75C8.75 10.8983 8.70602 11.0433 8.6236 11.1667C8.54119 11.29 8.42406 11.3861 8.28701 11.4429C8.14997 11.4997 7.99917 11.5145 7.85368 11.4856C7.7082 11.4566 7.57456 11.3852 7.46967 11.2803C7.36478 11.1754 7.29335 11.0418 7.26441 10.8963C7.23548 10.7508 7.25033 10.6 7.30709 10.463C7.36386 10.3259 7.45999 10.2088 7.58333 10.1264C7.70666 10.044 7.85167 10 8 10C8.19892 10 8.38968 10.079 8.53033 10.2197C8.67098 10.3603 8.75 10.5511 8.75 10.75Z" />
              </svg>
              <div className={sniglet.className + " text-xs text-[#977373]"}>
                Message must be less than 16 characters
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className=" rounded-md border-[1px] border-[#FF7485] bg-[#FF7485] px-[16px] py-[4px]"
          onClick={handleSendMessage}
        >
          <div
            className={
              sniglet.className + " mx-[16px] my-[4px] text-base text-white"
            }
          >
            Send to lover
          </div>{" "}
        </button>
      </div>

      <div className="z-10 flex flex-col items-center justify-center gap-[20px] rounded-2xl bg-white bg-opacity-60 px-[32px] py-[26px] text-left text-[20px] text-[#FF5065] backdrop-blur-sm backdrop-filter">
        <div className="flex items-center gap-[8px] self-stretch">
          <svg
            className="h-6 w-6"
            fill="#FF5065"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 25"
          >
            <path d="M21 5H3C2.80109 5 2.61032 5.07902 2.46967 5.21967C2.32902 5.36032 2.25 5.55109 2.25 5.75V18.5C2.25 18.8978 2.40804 19.2794 2.68934 19.5607C2.97064 19.842 3.35218 20 3.75 20H20.25C20.6478 20 21.0294 19.842 21.3107 19.5607C21.592 19.2794 21.75 18.8978 21.75 18.5V5.75C21.75 5.55109 21.671 5.36032 21.5303 5.21967C21.3897 5.07902 21.1989 5 21 5ZM19.0716 6.5L12 12.9828L4.92844 6.5H19.0716ZM20.25 18.5H3.75V7.45531L11.4928 14.5531C11.6312 14.6801 11.8122 14.7506 12 14.7506C12.1878 14.7506 12.3688 14.6801 12.5072 14.5531L20.25 7.45531V18.5Z" />
          </svg>
          <h2 className={sniglet.className + " text-[20px]"}>
            Default message
          </h2>
        </div>
        <form className="items-left flex flex-col justify-start gap-[4px] self-stretch">
          <p
            className={
              sniglet.className + " text-left text-[14px] text-[#FF5065]"
            }
          >
            Click message to edit
          </p>
          <div className="flex w-[278px] flex-col items-start gap-[8px] self-stretch rounded-[8px] bg-white bg-opacity-50 px-[12px] py-[8px]">
            {messages.map((message, index) => (
              <input
                key={index}
                type="text"
                value={message}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={
                  sniglet.className +
                  " flex flex-[1_0_0] items-center self-stretch rounded-md bg-transparent text-[14px] "
                }
                placeholder={`Message ${index}`}
              />
            ))}
          </div>
          <button
            type="submit"
            className=" mt-[16px] rounded-md border-[1px] border-[#FF7485] bg-[#FF7485] px-[16px] py-[4px]"
            onClick={handleSaveDefaultMessage}
          >
            <div
              className={
                sniglet.className + " mx-[16px] my-[4px] text-base text-white"
              }
            >
              Save default message{" "}
            </div>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
``;
export default Main;
