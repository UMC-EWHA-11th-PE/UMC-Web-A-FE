interface Member {
    id: number;
    name: string;
    role: string;
    githubId?: string;
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