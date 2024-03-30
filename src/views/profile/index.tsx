import React, { FC, useState, useEffect } from 'react';

// Simulated profile data fetching function
const fetchProfileData = () => {
  // Simulate fetching updated data after a trade
  return {
    name: 'Daniel',
    points: 45, // Simulate updated points after trade
    proficiency: 350,
    totalHours: '20h',
    functionalities: ['积分兑现', '功能1', '功能2', '功能3', '功能4', '功能5'],
    usdt: 25, // Simulate updated USDT after trade
  };
};

interface UserAvatarProps {
    src: string;
    alt: string;
    className?: string;
  }

  const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, className }) => (
    <img src={src} alt={alt} className={`shrink-0 w-20 aspect-square ${className}`} />
  );
  

export const ProfilePage: FC = ({ }) => {
    const [profile, setProfile] = useState(null);
    const [isNextPage, setIsNextPage] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const handleGetReward = () => {
        setIsNextPage(true);
    };
    const handleSubmit = () => {
        setIsNextPage(false);
        setSubmitted(true);
        alert('兑换成功!');
    };
    // Example profile data (replace with actual data fetching logic)
    // const profile = {
    //     name: 'Daniel',
    //     points: '45DAN',
    //     proficiency: 350,
    //     totalHours: '20h',
    //     functionalities: ['积分兑现', '功能1', '功能2', '功能3', '功能4', '功能5'],
    // };
    useEffect(() => {
        // Fetch profile data when the component mounts or isNextPage changes
        const updatedProfile = fetchProfileData();
        console.log('333');
        setProfile(updatedProfile);
      }, [isNextPage]); // Dependency array includes isNextPage to re-fetch on change

    return (
        <div className="flex flex-col pt-12 bg-white max-w-[360px]">
            {!isNextPage ? <div className="flex flex-col px-14 w-full">
                <div className="flex gap-5 text-2xl text-black whitespace-nowrap">
                    <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&"
                        className="shrink-0 w-20 aspect-square"
                    />
                    <div className="flex-auto my-auto">Daniel</div>
                </div>
                {<div className="mt-8 text-base text-black">积分：{!submitted ? 45 : (45 - 11)}DAN</div>}
                <div className="mt-5 text-base text-black">熟练度：350</div>
                <div className="mt-5 text-base text-black">累积工作时长：20h</div>
                <div className="mt-5 text-base text-black">余额：{!submitted ? 25 : (25 + 22)}USDT</div>
                <div className="flex gap-5 justify-between self-start mt-10 ml-3">
                <div className="flex flex-col items-center self-start text-xs text-black whitespace-nowrap" onClick={() => handleGetReward()}>
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecdcef207689c13371fecd88308895e4363a44e2d016649f1e2010ff9adb72a6?apiKey=9090ba5df68b4a4da03d4cea998d894a&"
                    className="aspect-square w-[25px]"
                    />
                    <div className="self-stretch mt-2.5">积分兑现</div>
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fab1fb8d9b23dbe18b547c3d57f20af77055bc7e1bb16ba8c101e5adbb77ad8?apiKey=9090ba5df68b4a4da03d4cea998d894a&"
                    className="mt-9 aspect-square w-[25px]"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex gap-5 justify-between">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/17a833fb937a869b430e7f99764d20c7e457d52705c7448950535c346d7deed9?apiKey=9090ba5df68b4a4da03d4cea998d894a&"
                        className="shrink-0 aspect-square w-[25px]"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/85fd748b654137f3c27ea242bc6d44aa891d20ec10efcd7a378338e291e57c9d?apiKey=9090ba5df68b4a4da03d4cea998d894a&"
                        className="shrink-0 aspect-square w-[25px]"
                    />
                    </div>
                    <div className="flex gap-5 justify-between mt-3 text-xs text-black whitespace-nowrap">
                    <div>功能1</div>
                    <div>功能2</div>
                    </div>
                    <div className="flex gap-5 justify-between mt-9">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/27a63d2decf6c4e42ecf0e16aa6c02919a6673ea63e1b099b0c0e469bb1db182?apiKey=9090ba5df68b4a4da03d4cea998d894a&"
                        className="shrink-0 aspect-square w-[25px]"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5797f874f5c2d0f8e8d9e29c6e49ceab5d02234612c91c48c93ea66c70d220a1?apiKey=9090ba5df68b4a4da03d4cea998d894a&"
                        className="shrink-0 aspect-square w-[25px]"
                    />
                    </div>
                </div>
                </div>
                <div className="flex gap-5 justify-between self-start mt-3 ml-3.5 text-xs text-black whitespace-nowrap">
                <div>功能3</div>
                <div>功能4</div>
                <div>功能5</div>
                </div>
            </div>
            :
            <div className="flex flex-col pt-12 text-base text-black whitespace-nowrap bg-white max-w-[360px]">
                <div className="flex flex-col px-12 w-full">
                    <header className="flex gap-5 text-2xl">
                    <UserAvatar src="https://cdn.builder.io/api/v1/image/assets/TEMP/81750f156c47f3a5f9ec309241cd10b23388506c63fe903d219a64ebe655a682?apiKey=9090ba5df68b4a4da03d4cea998d894a&" alt="User avatar" />
                    <h1 className="flex-auto my-auto">Daniel</h1>
                    </header>
                    <div className="flex gap-1.5 mt-16">
                    <div className="flex flex-col">
                        <div className="flex gap-4">
                        <p className="grow my-auto">积分：</p>
                        <input 
                            disabled
                            className={`box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300`}
                            value={11}
                        />
                        {/* <ProgressBar src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d8182773c637e71907f6c85572fd8649cc3d14e0d24c4b1550d3f3e53d76e13?apiKey=9090ba5df68b4a4da03d4cea998d894a&" alt="Progress bar for points" /> */}
                        </div>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bbdbbd182e41e2ed702f2f94d67b1dfbc50401a24db90e01d1b96efe6ffa2f1?apiKey=9090ba5df68b4a4da03d4cea998d894a&" alt="" className="mt-2.5 w-6 aspect-square" />
                    </div>
                    <p className="self-start mt-3">max</p>
                    </div>
                    <div className="flex gap-4 self-center mt-2">
                    <p className="grow my-auto">现金：</p>
                    <input
                        disabled
                        className={`box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300`}
                        value={22}
                    />
                    {/* <ProgressBar src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d8182773c637e71907f6c85572fd8649cc3d14e0d24c4b1550d3f3e53d76e13?apiKey=9090ba5df68b4a4da03d4cea998d894a&" alt="Progress bar for cash" /> */}
                    </div>
                    <button 
                        onClick={() => handleSubmit()}
                        className="justify-center items-center self-center px-16 py-2.5 mt-11 max-w-full text-xs font-bold bg-white shadow-sm w-[199px]">
                        确认兑换
                    </button>
                </div>
                {/* <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/069b7ace6ee2363e6da7c340ffb753dae2f567b7cf6e7fa630ca0506e7ec4331?apiKey=9090ba5df68b4a4da03d4cea998d894a&" alt="" className="mt-52 w-full aspect-[5.56]" /> */}
            </div>
            }
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/069b7ace6ee2363e6da7c340ffb753dae2f567b7cf6e7fa630ca0506e7ec4331?apiKey=9090ba5df68b4a4da03d4cea998d894a&"
                className="mt-40 w-full aspect-[5.56]"
            />
        </div>
    );
};
