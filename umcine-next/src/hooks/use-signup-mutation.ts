import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/members/signup";
//import { useNavigate } from "@tanstack/react-router";

export function useSignupMutation() {
    //const navigate = useNavigate();

    return useMutation({
        mutationFn: signup,
        onSuccess: (Response) => {
            alert(Response.message);
            //navigate({to: "/login"})
        },
        onError: () => {
            alert("회원가입에 실패했어요. 다시 시도해주세요.");
        },
    });
}