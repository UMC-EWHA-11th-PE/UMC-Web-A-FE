type Member = {
  name: string;
  memId: number;
  role: string;
  githubId?: string;
};

const members: Member[] = [
  {
    name: "Sunie",
    memId: 1,
    role: "leader",
    githubId: "suniesong",
  },
  {
    name: "Nick",
    memId: 2,
    role: "member",
  },
];

function printSearchResult(memberId: number) {
  const foundMember = members.find((member) => member.memId === memberId);

  if (!foundMember) {
    console.log(`No memeber with the Id ${memberId}.`);
    return;
  }
  const githubId = foundMember.githubId ?? "No githubId included";
  console.log(
    `ID: ${foundMember.memId}, Name: ${foundMember.name}, ` +
      `Role: ${foundMember.role}, GitHub: ${githubId}. Welcome!`,
  );
}
printSearchResult(1);
printSearchResult(2);
printSearchResult(999);
