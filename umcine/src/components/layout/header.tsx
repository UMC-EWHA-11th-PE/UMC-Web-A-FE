
import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

interface headerProps {
    isLoggedIn: boolean;
}

export function Header({isLoggedIn} :headerProps) {

    const isActive =(path: string) => location.pathname === path;

    return (
        <header className="flex items-center justify-between box-border w-[100%] h-[91px] py-6 px-20 border-b border-[#E3E6EB] bg-white">

            <div className="flex items-center justify-between box-border w-[308px] h-8 gap-[42px]">
                <div className="flex items-center justify-between box-border w-[116px] h-8 gap-[10px]">
                    <span className="flex items-center justify-center w-8 h-8 py-[6px] rounded-[8px] border-2 border-[#17191E]">
                        <img src="/icons/movie.svg" className="flex items-center box-border justify-between w-5 h-4 object-contain" />
                    </span>
                    <span className="box-border w-[74px] h-6 font-extrabold text-[20px] tracking-[-0.7px] align-middle">UMCine</span>
                </div>

                <div className="flex items-start justify-between box-border w-[150px] h-[17px] gap-[30px]">
                    <Link to="/" className={cn("w-[26px] h-[17px] text-[14px] text-center align-middle text-[#17191E]",
                        isActive("/") ? "font-bold underline" : ""
                    )}>영화</Link>
                    <Link to="/search" className={cn("w-[26px] h-[17px] text-[14px] text-center align-middle text-[#17191E]",
                        isActive("/search") ? "font-bold underline" : ""
                    )}>검색</Link>
                    <Link to="/" className={cn("w-[26px] h-[17px] text-[14px] text-center align-middle text-[#17191E] whitespace-nowrap",
                        isActive("/myinfo") ? "font-bold underline" : ""
                    )}>내 정보</Link>
                </div>

            </div>

            <div className="flex flex-rows items-center justify-between box-border w-[147px] h-[42px] gap-[10px]">
                <img src="/icons/search.svg" className="flex items-center justify-between box-border w-[17.5px] h-[17.5px] t-[3px] l-[3px] grayscale brightness-125"/>
                <span className="flex items-center justify-between box-border w-[95px] h-[42px] px-4 rounded-[8px] border font-extrabold text-[14px] text-center align-middle text-white bg-[#2563EB]">{isLoggedIn?"마이페이지":"로그인"}</span>
            </div>
        </header>
    )
}