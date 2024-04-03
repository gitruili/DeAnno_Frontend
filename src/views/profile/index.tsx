import React, { FC, useState, useEffect } from 'react';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
  }

// Simulated profile data fetching function
const fetchProfileData = () => {
  // Simulate fetching updated data after a trade
  return {
    name: 'Daniel',
    points: 45, // Simulate updated points after trade
    proficiency: 350,
    totalHours: '20h',
    functionalities: ['积分兑现', '功能1', '功能2', '功能3', '功能4', '功能5'],
    usdc: 25, // Simulate updated USDC after trade
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
    const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
        <img loading="lazy" src={src} alt={alt} className={className} />
    );
    const handleGetReward = () => {
        setIsNextPage(true);
    };
    const handleSubmit = () => {
        setIsNextPage(false);
        setSubmitted(true);
        // alert('兑换成功!');
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
        setProfile(updatedProfile);
      }, [isNextPage]); // Dependency array includes isNextPage to re-fetch on change

    return (
        <div className="flex flex-col pt-12 bg-white max-w-[360px]">
            {!isNextPage&&!submitted ? <div className="flex flex-col px-14 w-full">
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
                <div className="mt-5 text-base text-black">余额：{!submitted ? 25 : (25 + 22)}USDC</div>
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
                        <div className="self-stretch mt-2.5">积分兑现</div>
                    </div>
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
                        <div className="self-stretch mt-2.5">积分兑现</div>
                    </div>
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
                        <div className="self-stretch mt-2.5">积分兑现</div>
                    </div>
                </div>
            </div>
            :
            <div className="flex flex-col pt-12 text-base text-black whitespace-nowrap bg-white max-w-[360px]">
                {!submitted ? <div className="flex flex-col px-12 w-full">
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
                    </div>
                    <button 
                        onClick={() => handleSubmit()}
                        className="justify-center items-center self-center px-16 py-2.5 mt-11 max-w-full text-xs font-bold bg-white shadow-sm w-[199px]">
                        确认兑换
                    </button>
                </div> 
                :
                <div className="flex gap-1.5 self-center px-5 mt-44">
                    <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1d88e9d106110ab92f6fa724fdf11f92ca92d242141de4940273723d38204bc?apiKey=9090ba5df68b4a4da03d4cea998d894a&" alt="" className="shrink-0 aspect-square w-[30px]" />
                    <p className="my-auto">兑换成功！</p>
                </div>
                }
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
