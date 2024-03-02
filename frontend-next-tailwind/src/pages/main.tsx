import Image from "next/image";
import React, { useState } from "react";
import { Sniglet } from "next/font/google";

const sniglet = Sniglet({
    display: "swap",
    subsets: ['latin'],
    weight: '400',
})

const main = () => {
    const [selected, setSelected] = useState<boolean>(false);
    return (
        <div className="overflow-y-scroll flex flex-col pt-[44px] px-[28px] gap-[16px] justify-center items-center flex-shrink-0 relative h-[100vh] bg-gradient-to-b from-[#FFD5D5] to-[#FF7485]">
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
            <div className="z-10 gap-[24px] text-center rounded-2xl bg-opacity-60 backdrop-filter backdrop-blur-sm bg-white py-[26px] px-[32px] text-[#FF5065] text-[20px] justify-center items-center flex flex-col" >
                <div className="flex items-center gap-[8px] self-stretch">
                    <svg className="w-6 h-6" fill="#FF5065" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
                        <path d="M21.3113 3.18876C21.1226 3.00025 20.8872 2.86544 20.6291 2.79821C20.3711 2.73098 20.0998 2.73376 19.8431 2.80626H19.8291L1.83469 8.26626C1.54178 8.35049 1.28147 8.52197 1.08844 8.75784C0.895411 8.99371 0.778814 9.28278 0.754177 9.58658C0.72954 9.89037 0.798032 10.1945 0.950532 10.4583C1.10303 10.7222 1.3323 10.9334 1.60782 11.0638L9.63469 14.8653L13.4363 22.8922C13.5563 23.1492 13.7473 23.3666 13.9869 23.5186C14.2264 23.6706 14.5044 23.7509 14.7881 23.75C14.8313 23.75 14.8744 23.7481 14.9175 23.7444C15.2202 23.7199 15.5082 23.6034 15.7428 23.4105C15.9774 23.2176 16.1474 22.9576 16.23 22.6653L21.6863 4.67094C21.6863 4.66626 21.6863 4.66157 21.6863 4.65688C21.7597 4.40091 21.7637 4.13 21.6978 3.87199C21.6319 3.61397 21.4985 3.37815 21.3113 3.18876ZM14.7966 22.2359L14.7919 22.2491L11.1019 14.4594L15.5306 10.0297C15.6653 9.8879 15.7393 9.69908 15.7368 9.50351C15.7343 9.30794 15.6555 9.12108 15.5172 8.98278C15.3789 8.84448 15.1921 8.76568 14.9965 8.76318C14.8009 8.76067 14.6121 8.83466 14.4703 8.96938L10.0406 13.3981L2.25001 9.70813H2.26313L20.25 4.25001L14.7966 22.2359Z"/>
                    </svg>
                    <h2 className={sniglet.className + " text-[20px]"}>Send message to partner</h2>
                </div>
                <div className="relative inline-block text-left">
                    <div>
                        <button type="button" className={sniglet.className + " text-[#FF7485] inline-flex w-[270px] h-[40px] px-[16px] py-[5px] justify-between items-center gap-x-1.5 rounded-md bg-[#FFF5F5] text-[14px] shadow-sm ring-1 ring-inset ring-[#FF5065] hover:bg-gray-50"} id="menu-button" aria-expanded="true" aria-haspopup="true">
                        Select your partner
                        <svg className="-mr-1 h-5 w-5 text-[#FF7485]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                        </button>
                    </div>
                    {/* <!--
                        Dropdown menu, show/hide based on menu state.

                        Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    --> */}
                    <div className="absolute right-0 z-10 w-[270px] h-[40px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className={sniglet.className + " text-[#FF7485] block text-left text-[14px]"} role="none">
                        {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Account settings</a>
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1">Support</a>
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-2">License</a> */}
                        <form method="POST" action="#" role="none">
                            <button type="submit" className="block w-[270px] h-[40px] px-[12px] py-[5px] text-left text-[14px]" role="menuitem" tabIndex={-1} id="menu-item-3">Box1</button>
                        </form>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-[4px] self-stretch">
                <input
                    type="text"
                    name="serial"
                    className={sniglet.className + " text-[14px] flex self-stretch py-[5px] px-[12px] items-center flex-[1_0_0] rounded-md border-solid border-[#FF7485] ring-1 ring-inset ring-[#FF5065]"}
                    placeholder="Message here"
                    required
                />
                <div className="flex flex-col items-center gap-[16px] self-stretch">
                    <div className="flex justify-center items-center gap-[4px] self-stretch">
                        <svg className="w-[16px] h-[16px]" fill="#977373" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM8 13.5C6.91221 13.5 5.84884 13.1774 4.94437 12.5731C4.0399 11.9687 3.33495 11.1098 2.91867 10.1048C2.50238 9.09977 2.39347 7.9939 2.60568 6.927C2.8179 5.86011 3.34173 4.8801 4.11092 4.11091C4.8801 3.34172 5.86011 2.8179 6.92701 2.60568C7.9939 2.39346 9.09977 2.50238 10.1048 2.91866C11.1098 3.33494 11.9687 4.03989 12.5731 4.94436C13.1774 5.84883 13.5 6.9122 13.5 8C13.4983 9.45818 12.9184 10.8562 11.8873 11.8873C10.8562 12.9184 9.45819 13.4983 8 13.5ZM7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8.5C8.5 8.63261 8.44732 8.75979 8.35356 8.85355C8.25979 8.94732 8.13261 9 8 9C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5ZM8.75 10.75C8.75 10.8983 8.70602 11.0433 8.6236 11.1667C8.54119 11.29 8.42406 11.3861 8.28701 11.4429C8.14997 11.4997 7.99917 11.5145 7.85368 11.4856C7.7082 11.4566 7.57456 11.3852 7.46967 11.2803C7.36478 11.1754 7.29335 11.0418 7.26441 10.8963C7.23548 10.7508 7.25033 10.6 7.30709 10.463C7.36386 10.3259 7.45999 10.2088 7.58333 10.1264C7.70666 10.044 7.85167 10 8 10C8.19892 10 8.38968 10.079 8.53033 10.2197C8.67098 10.3603 8.75 10.5511 8.75 10.75Z"/>
                        </svg>
                        <div className={sniglet.className + " text-[#977373] text-xs"}>
                            Message 14-16 characters exclude white space
                        </div>
                    </div>
                    <button type="submit" className=" bg-[#FF7485] px-[16px] py-[4px] border-[1px] rounded-md border-[#FF7485]">
                        <div className= {sniglet.className + " text-base text-white mx-[16px] my-[4px]"}>Send to lover</div>{" "}
                    </button>
                </div>
                </div>
            </div>

            <div className="z-10 gap-[24px] text-center rounded-2xl bg-opacity-60 backdrop-filter backdrop-blur-sm bg-white py-[26px] px-[32px] text-[#FF5065] text-[20px] justify-center items-center flex flex-col" >
                <div className="flex items-center gap-[8px] self-stretch">
                    <svg className="w-6 h-6" fill="#FF5065" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
                        <path d="M24 13.25C24 13.4489 23.921 13.6397 23.7803 13.7803C23.6397 13.921 23.4489 14 23.25 14H21.75V15.5C21.75 15.6989 21.671 15.8897 21.5303 16.0303C21.3897 16.171 21.1989 16.25 21 16.25C20.8011 16.25 20.6103 16.171 20.4697 16.0303C20.329 15.8897 20.25 15.6989 20.25 15.5V14H18.75C18.5511 14 18.3603 13.921 18.2197 13.7803C18.079 13.6397 18 13.4489 18 13.25C18 13.0511 18.079 12.8603 18.2197 12.7197C18.3603 12.579 18.5511 12.5 18.75 12.5H20.25V11C20.25 10.8011 20.329 10.6103 20.4697 10.4697C20.6103 10.329 20.8011 10.25 21 10.25C21.1989 10.25 21.3897 10.329 21.5303 10.4697C21.671 10.6103 21.75 10.8011 21.75 11V12.5H23.25C23.4489 12.5 23.6397 12.579 23.7803 12.7197C23.921 12.8603 24 13.0511 24 13.25ZM18.5747 18.7672C18.7027 18.9196 18.765 19.1166 18.7478 19.315C18.7305 19.5133 18.6352 19.6966 18.4828 19.8247C18.3304 19.9527 18.1334 20.015 17.935 19.9978C17.7367 19.9805 17.5534 19.8852 17.4253 19.7328C15.5391 17.4866 12.9459 16.25 10.125 16.25C7.30406 16.25 4.71094 17.4866 2.82469 19.7328C2.69664 19.8851 2.51334 19.9803 2.3151 19.9974C2.11687 20.0146 1.91995 19.9523 1.76766 19.8242C1.61536 19.6962 1.52018 19.5129 1.50304 19.3146C1.48589 19.1164 1.5482 18.9195 1.67625 18.7672C3.07688 17.1003 4.81875 15.9163 6.75469 15.2825C5.57897 14.5502 4.67374 13.455 4.17594 12.1624C3.67814 10.8698 3.61486 9.45029 3.99567 8.11856C4.37649 6.78682 5.18067 5.61534 6.28657 4.78136C7.39246 3.94737 8.73989 3.49625 10.125 3.49625C11.5101 3.49625 12.8575 3.94737 13.9634 4.78136C15.0693 5.61534 15.8735 6.78682 16.2543 8.11856C16.6351 9.45029 16.5719 10.8698 16.0741 12.1624C15.5763 13.455 14.671 14.5502 13.4953 15.2825C15.4312 15.9163 17.1731 17.1003 18.5747 18.7672ZM10.125 14.75C11.0892 14.75 12.0317 14.4641 12.8334 13.9284C13.6351 13.3927 14.2599 12.6314 14.6289 11.7406C14.9979 10.8498 15.0944 9.8696 14.9063 8.92394C14.7182 7.97828 14.2539 7.10964 13.5721 6.42786C12.8904 5.74608 12.0217 5.28178 11.0761 5.09367C10.1304 4.90557 9.15021 5.00211 8.25942 5.37109C7.36863 5.74007 6.60726 6.36491 6.07159 7.1666C5.53591 7.96829 5.25 8.91082 5.25 9.875C5.25149 11.1675 5.76558 12.4066 6.6795 13.3205C7.59342 14.2344 8.83253 14.7485 10.125 14.75Z"/>
                    </svg>
                    <h2 className={sniglet.className + " text-[20px]"}>Add partner’s box</h2>
                </div>
                <div className={sniglet.className + " flex flex-col items-center gap-[16px] self-stretch"}>
                    <div className="text-left flex flex-col items-center gap-[4px] self-stretch">
                    <p className="w-[270px] flex-1 text-[14px] text-#FF5065 text-base font-normal leading-[157.143%]">Enter name</p>
                    <input
                    type="text"
                    name="serial"
                    className={sniglet.className + " text-[14px] flex self-stretch py-[5px] px-[12px] items-center flex-[1_0_0] rounded-md border-solid border-[#FF7485] ring-1 ring-inset ring-[#FF5065]"}
                    required
                    />
                    </div> 
                    <div className="text-left flex flex-col items-center gap-[4px] self-stretch">
                    <p className="w-[270px] flex-1 text-[14px] text-#FF5065 text-base font-normal leading-[157.143%]">Enter partner’s UID</p>
                    <input
                    type="text"
                    name="serial"
                    className={sniglet.className + " text-[14px] flex self-stretch py-[5px] px-[12px] items-center flex-[1_0_0] rounded-md border-solid border-[#FF7485] ring-1 ring-inset ring-[#FF5065]"}
                    required
                    />
                    </div> 
                    <button type="submit" className=" bg-[#FF7485] px-[16px] py-[4px] border-[1px] rounded-md border-[#FF7485]">
                        <div className= {sniglet.className + " text-base text-white mx-[16px] my-[4px]"}>Save partner’s box</div>{" "}
                    </button>
                </div>
            </div>

            <div className="z-10 gap-[24px] text-left rounded-2xl bg-opacity-60 backdrop-filter backdrop-blur-sm bg-white py-[26px] px-[32px] text-[#FF5065] text-[20px] justify-center items-center flex flex-col" >
                <div className="flex items-center gap-[8px] self-stretch">
                    <svg className="w-6 h-6" fill="#FF5065" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
                        <path d="M21 5H3C2.80109 5 2.61032 5.07902 2.46967 5.21967C2.32902 5.36032 2.25 5.55109 2.25 5.75V18.5C2.25 18.8978 2.40804 19.2794 2.68934 19.5607C2.97064 19.842 3.35218 20 3.75 20H20.25C20.6478 20 21.0294 19.842 21.3107 19.5607C21.592 19.2794 21.75 18.8978 21.75 18.5V5.75C21.75 5.55109 21.671 5.36032 21.5303 5.21967C21.3897 5.07902 21.1989 5 21 5ZM19.0716 6.5L12 12.9828L4.92844 6.5H19.0716ZM20.25 18.5H3.75V7.45531L11.4928 14.5531C11.6312 14.6801 11.8122 14.7506 12 14.7506C12.1878 14.7506 12.3688 14.6801 12.5072 14.5531L20.25 7.45531V18.5Z"/>
                    </svg>
                    <h2 className={sniglet.className + " text-[20px]"}>Default message</h2>
                </div>
                <div className="flex flex-col items-center gap-[4px] self-stretch">
                    <div className="flex px-[12px] py-[8px] flex-col items-start gap-[8px] self-stretch rounded-[8px] bg-opacity-50 bg-white" >
                    <table className={sniglet.className + " table-auto w-[254px] text-[14px] text-[#FF5065]"}>
                    <thead>
                        <tr>
                        <th>Message</th>
                        <th className="text-center" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Text1</td>
                        <td className="flex justify-center items-center flex-shrink-0 self-stretch">
                            <svg className="w-[16px] h-[16px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_137_830)">
                                    <path d="M3.45872 12.2841C3.49443 12.2841 3.53015 12.2805 3.56586 12.2752L6.56943 11.7484C6.60515 11.7412 6.63908 11.7252 6.66408 11.6984L14.2337 4.12874C14.2503 4.11222 14.2634 4.0926 14.2724 4.071C14.2813 4.0494 14.2859 4.02624 14.2859 4.00285C14.2859 3.97946 14.2813 3.95631 14.2724 3.9347C14.2634 3.9131 14.2503 3.89348 14.2337 3.87696L11.2659 0.907316C11.2319 0.873387 11.1873 0.85553 11.1391 0.85553C11.0909 0.85553 11.0462 0.873387 11.0123 0.907316L3.44265 8.47696C3.41586 8.50374 3.39979 8.53589 3.39265 8.5716L2.86586 11.5752C2.84849 11.6708 2.8547 11.7693 2.88395 11.862C2.91319 11.9547 2.9646 12.0389 3.03372 12.1073C3.15158 12.2216 3.29979 12.2841 3.45872 12.2841V12.2841ZM4.66229 9.16982L11.1391 2.69482L12.448 4.00374L5.97122 10.4787L4.38372 10.7591L4.66229 9.16982V9.16982ZM14.5712 13.7841H1.42836C1.11229 13.7841 0.856934 14.0395 0.856934 14.3555V14.9984C0.856934 15.077 0.921219 15.1412 0.999791 15.1412H14.9998C15.0784 15.1412 15.1427 15.077 15.1427 14.9984V14.3555C15.1427 14.0395 14.8873 13.7841 14.5712 13.7841Z" fill="#FF5065"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_137_830">
                                    <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </td>
                        </tr>
                        <tr>
                        <td>Text2</td>
                        <td className="flex justify-center items-center flex-shrink-0 self-stretch">
                            <svg className="w-[16px] h-[16px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_137_830)">
                                    <path d="M3.45872 12.2841C3.49443 12.2841 3.53015 12.2805 3.56586 12.2752L6.56943 11.7484C6.60515 11.7412 6.63908 11.7252 6.66408 11.6984L14.2337 4.12874C14.2503 4.11222 14.2634 4.0926 14.2724 4.071C14.2813 4.0494 14.2859 4.02624 14.2859 4.00285C14.2859 3.97946 14.2813 3.95631 14.2724 3.9347C14.2634 3.9131 14.2503 3.89348 14.2337 3.87696L11.2659 0.907316C11.2319 0.873387 11.1873 0.85553 11.1391 0.85553C11.0909 0.85553 11.0462 0.873387 11.0123 0.907316L3.44265 8.47696C3.41586 8.50374 3.39979 8.53589 3.39265 8.5716L2.86586 11.5752C2.84849 11.6708 2.8547 11.7693 2.88395 11.862C2.91319 11.9547 2.9646 12.0389 3.03372 12.1073C3.15158 12.2216 3.29979 12.2841 3.45872 12.2841V12.2841ZM4.66229 9.16982L11.1391 2.69482L12.448 4.00374L5.97122 10.4787L4.38372 10.7591L4.66229 9.16982V9.16982ZM14.5712 13.7841H1.42836C1.11229 13.7841 0.856934 14.0395 0.856934 14.3555V14.9984C0.856934 15.077 0.921219 15.1412 0.999791 15.1412H14.9998C15.0784 15.1412 15.1427 15.077 15.1427 14.9984V14.3555C15.1427 14.0395 14.8873 13.7841 14.5712 13.7841Z" fill="#FF5065"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_137_830">
                                    <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </td>
                        </tr>
                        <tr>
                        <td>Text3</td>
                        <td className="flex justify-center items-center flex-shrink-0 self-stretch">
                            <svg className="w-[16px] h-[16px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_137_830)">
                                    <path d="M3.45872 12.2841C3.49443 12.2841 3.53015 12.2805 3.56586 12.2752L6.56943 11.7484C6.60515 11.7412 6.63908 11.7252 6.66408 11.6984L14.2337 4.12874C14.2503 4.11222 14.2634 4.0926 14.2724 4.071C14.2813 4.0494 14.2859 4.02624 14.2859 4.00285C14.2859 3.97946 14.2813 3.95631 14.2724 3.9347C14.2634 3.9131 14.2503 3.89348 14.2337 3.87696L11.2659 0.907316C11.2319 0.873387 11.1873 0.85553 11.1391 0.85553C11.0909 0.85553 11.0462 0.873387 11.0123 0.907316L3.44265 8.47696C3.41586 8.50374 3.39979 8.53589 3.39265 8.5716L2.86586 11.5752C2.84849 11.6708 2.8547 11.7693 2.88395 11.862C2.91319 11.9547 2.9646 12.0389 3.03372 12.1073C3.15158 12.2216 3.29979 12.2841 3.45872 12.2841V12.2841ZM4.66229 9.16982L11.1391 2.69482L12.448 4.00374L5.97122 10.4787L4.38372 10.7591L4.66229 9.16982V9.16982ZM14.5712 13.7841H1.42836C1.11229 13.7841 0.856934 14.0395 0.856934 14.3555V14.9984C0.856934 15.077 0.921219 15.1412 0.999791 15.1412H14.9998C15.0784 15.1412 15.1427 15.077 15.1427 14.9984V14.3555C15.1427 14.0395 14.8873 13.7841 14.5712 13.7841Z" fill="#FF5065"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_137_830">
                                    <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                    <div className="flex justify-start items-center gap-[4px] self-stretch">
                        <svg className="w-[16px] h-[16px]" fill="#977373" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM8 13.5C6.91221 13.5 5.84884 13.1774 4.94437 12.5731C4.0399 11.9687 3.33495 11.1098 2.91867 10.1048C2.50238 9.09977 2.39347 7.9939 2.60568 6.927C2.8179 5.86011 3.34173 4.8801 4.11092 4.11091C4.8801 3.34172 5.86011 2.8179 6.92701 2.60568C7.9939 2.39346 9.09977 2.50238 10.1048 2.91866C11.1098 3.33494 11.9687 4.03989 12.5731 4.94436C13.1774 5.84883 13.5 6.9122 13.5 8C13.4983 9.45818 12.9184 10.8562 11.8873 11.8873C10.8562 12.9184 9.45819 13.4983 8 13.5ZM7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8.5C8.5 8.63261 8.44732 8.75979 8.35356 8.85355C8.25979 8.94732 8.13261 9 8 9C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5ZM8.75 10.75C8.75 10.8983 8.70602 11.0433 8.6236 11.1667C8.54119 11.29 8.42406 11.3861 8.28701 11.4429C8.14997 11.4997 7.99917 11.5145 7.85368 11.4856C7.7082 11.4566 7.57456 11.3852 7.46967 11.2803C7.36478 11.1754 7.29335 11.0418 7.26441 10.8963C7.23548 10.7508 7.25033 10.6 7.30709 10.463C7.36386 10.3259 7.45999 10.2088 7.58333 10.1264C7.70666 10.044 7.85167 10 8 10C8.19892 10 8.38968 10.079 8.53033 10.2197C8.67098 10.3603 8.75 10.5511 8.75 10.75Z"/>
                        </svg>
                        <div className={sniglet.className + " text-[#977373] text-xs"}>
                            If message is blank, box will send "I love you"
                        </div>
                    </div>
                </div>
                <button type="submit" className=" bg-[#FF7485] px-[16px] py-[4px] border-[1px] rounded-md border-[#FF7485]">
                        <div className= {sniglet.className + " text-base text-white mx-[16px] my-[4px]"}>Send to lover</div>{" "}
                    </button>
            </div>
        </div>
    );
};
``
export default main;