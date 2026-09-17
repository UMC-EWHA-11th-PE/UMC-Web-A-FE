type Role = 'Leader' | 'Member';

interface Member {
  id: number;
  name: string;
  role: Role;
  githubId?: string;
}

const members: Member[] = [
  {
    id: 1,
    name: '김',
    role: 'Leader',
    githubId: 'Kim'
  },
  {
    id: 2,
    name: '신',
    role: 'Member',
    githubId: 'Shin'
  },
  {
    id: 3,
    name: '장',
    role: 'Member'
  }
]

function getMemberSummary(id: number): string {
  const member = members.find((m) => m.id === id);

  if (!member) {
    return '[알림] ID ' + id + '번 회원을 찾을 수 없습니다.';
  }

  const displayGithubId = member?.githubId ?? '등록되지 않음';

  return '[회원 정보] ID: ' + member.id +
    ' | 이름: ' + member.name +
    ' | 역할: ' + member.role +
    ' | GitHub: ' + displayGithubId;
}

console.log(getMemberSummary(1));
console.log(getMemberSummary(2));
console.log(getMemberSummary(999));
