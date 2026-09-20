type Member = {     //회원 타입 정의
    Id: number;
    name: string;
    role: "admin"|"user";
    githubId?: string;
}

const members :Member[] = [];       //Member 타입을 원소로 갖는 배열 선언

//서로 다른 정보 갖는 회원 3명 작성
members[0] = {Id: 1, name: "Jisoo",role:"admin", githubId: "Jisoo1"};
members[1] = {Id: 2, name: "Jane",role:"user", githubId: "Jane2"};
members[2] = {Id: 3, name: "Smith", role:"user"};


function memberInfo (memberId:number) {         //회원 정보 검색 함수 정의
    console.log("[ ", memberId, "번 회원님의 정보 ]");

    if(members[memberId-1]){            //해당 아이디의 회원이 존재하는 경우
        console.log("성명: ",members[memberId-1].name);
        console.log("역할: ", members[memberId-1].role);

        let currentGithub :string = members[memberId-1].githubId ?? "GitHub 정보가 없습니다.";
        console.log("GitHub ID: ", currentGithub);
    }
    
    else {      //해당 아이디의 회원이 존재하지 않는 경우
        console.log("회원 정보가 존재하지 않습니다. ");
    }


}

memberInfo(1);
memberInfo(2);
memberInfo(3);
memberInfo(999);