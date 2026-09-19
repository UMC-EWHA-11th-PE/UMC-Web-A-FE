interface Member {
    id: number;
    name: string;
    role: string;
    githubId?: string;
    studyHour?: number;
}

const members: Member[]=[
    {id:1, name:"seohyeon", role:"leader", githubId:"seohyeonS2"},
    {id:2, name:"choco", role:"member"},
];

function findMember(id:number):Member|undefined{
    return members.find((m)=>m.id === id);
}

function memberMessage(id:number):string{
    const member=findMember(id);

    if(!member){
        return `ID ${id}에 해당하는 회원이 없습니다.`;
    }

    const github=member.githubId??"GitHub 아이디가 없음";
    return `${member.role}인 ${member.name}님 - ${github}`;
}

console.log(memberMessage(1));
console.log(memberMessage(2));
console.log(memberMessage(999));

// 선택 미션 1
type StudyMember={
    id: number;
    name: string;
    role: string;
    githubId?: string;
    studyHour?: number;
}

// 선택 미션 2
const studyHour:number|undefined=0;
const withOr=studyHour||1;
const withNullish=studyHour??1;

console.log(studyHour);
console.log(withOr);
console.log(withNullish);

// 선택 미션 3
function formatMemberId(input:unknown){
    if(typeof input === "string"){
        return memberMessage(Number(input));
    }
    if(typeof input === "number"){
        return memberMessage(input);
    }
    else{
        return null;
    }
}

console.log(formatMemberId("1"));
console.log(formatMemberId(2));
console.log(formatMemberId(true));