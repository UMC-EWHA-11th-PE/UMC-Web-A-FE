// 미니 실습: 컴파일 오류와 런타임 오류 구분
function introduceStudent(studentName: string, currentLevel: number) {
  return studentName + " 님은 현재 " + currentLevel + "레벨이에요.";
}

introduceStudent("광수", 1);


// 미니 실습: 값의 종류와 추론 확인하기
let student = "미리";
let week = 1;
let isCompleted = false;

const stack = ["HTML", "CSS", "JavaScript"];
// stack.push(1); // number 타입이므로 오류 발생
const stack2 = ["HTML", "CSS", "JavaScript"];
stack == stack2; // false
stack === stack2; // false 

// 미니 실습: 오류를 고쳐 회원 카드 만들기
type StudyMember = {
  name: string;
  level: number;
  isLeader: boolean;
};

const member: StudyMember = {
  name: "광수",
  level: 1,
  isLeader: false,
};

function createMemberCard(studyMember: StudyMember) {
  return studyMember.name + " 님, " + studyMember.level + "레벨";
}

console.log(createMemberCard(member));


// 미니 실습: 회원 역할에 따라 문구 바꾸기
function getMemberRoleMessage(memberRole: "leader" | "member" ) {
    if (memberRole === "leader") {
        return "스터디를 이끌어요.";
    }
    else if (memberRole === "member") {
        return "스터디에 참여해요.";
    }
}
const roleMessage = getMemberRoleMessage("leader");
console.log(roleMessage);


// 미니 실습: 값이 없는 경우와 기본값 비교하기
type StudyMemberCard = {
    name: string;
    githubId?: string;
    studyTime?: number;
};

const members: StudyMemberCard[] = [
    { name: "광수", githubId: "gwangsoo"},
    { name: "미리", githubId: "miri", studyTime: 10 },
    { name: "민지", githubId: "minji" }
]

let selectedMember: StudyMember | null = null;
const foundMember = members.find((member) => member.name === "광수");
if (foundMember) {
    console.log(foundMember.name);
    console.log(foundMember.studyTime ?? 0); // studyTime이 undefined이면 0으로 출력
    console.log(foundMember.studyTime || 0); // studyTime이 falsy이면 0으로 출력
    console.log(foundMember.githubId ?? "깃허브 아이디가 없어요."); // githubId가 undefined이면 "깃허브 아이디가 없어요."로 출력
}

// 미니 실습: unknown 값 구분하기
function formatStudyWeek(week: unknown) {
    if (typeof week === "number") {
        return "현재 " + week + "주차에요.";
    } else if (typeof week === "string") {
        return "입력한 주차: " + week;
    } else {
        return "주차를 확인할 수 없어요.";
    }
}

// 미니 실습: createBox<T> 사용하기
function createBox<T>(value: T) {
    return { value };
}

const stringBox = createBox("Hello");
const numberBox = createBox(42);
const memberBox = createBox({ name: "광수", level: 1 });


// 미니 실습: 오류 두 개 해결하기
type WeeklyGoal = {
  title: string;
  targetCount: number;
};

const weeklyGoal: WeeklyGoal = {
  title: "TypeScript 예제 연습",
  targetCount: 3,
};

function printGoal(goal: WeeklyGoal): string {
  console.log(goal.title);
  return "이번 주 목표: " + goal.title + ", 목표 횟수: " + goal.targetCount;
}

console.log(printGoal(weeklyGoal));

// 종합 실습: 스터디 회원 관리 프로그램 완성하기
type studyMemberType = {
    id: number;
    name: string;
    role: "leader" | "member";
    githubId?: string;
    studyHours?: number;
}

interface StudyMemberInterface {
  name: string;
  level: number;
  isLeader: boolean;
}

const memberList: studyMemberType[] = [
    { id: 1, name: "광수", role: "leader", githubId: "gwangsoo", studyHours: 10 },
    { id: 2, name: "미리", role: "member", githubId: "miri" },
    { id: 3, name: "민지", role: "member" }
];

function findMember(id: number): string {
    const member = memberList.find((member) => member.id === id);

    if (!member) {
        return "회원이 존재하지 않아요.";
    }

    const githubId = member.githubId ?? "깃허브 아이디가 없어요.";
    const studyHours = member.studyHours ?? 0;  

    return member.name + " 님의 GitHub 아이디: " + githubId + ", 스터디 시간: " + studyHours + "시간";
}

console.log(findMember(1));
console.log(findMember(2));
console.log(findMember(999)); // 존재하지 않는 회원 ID를 테스트

const studyHour: number | undefined = 0;
studyHour || 1; // studyHour가 falsy이면 1로 출력
studyHour ?? 1; // studyHour가 undefined이면 1로 출력


function formatMemberId(input: unknown): string {
  if (typeof input === "number") {
    return "회원 ID: " + input;
  } else if (typeof input === "string") {
    return "회원 ID 문자열: " + input;
  } else {
    return "올바른 회원 ID가 아니에요.";
  }
} 

console.log(formatMemberId(1)); // 회원 ID: 1
console.log(formatMemberId("1")); // 회원 ID 문자열: 1
console.log(formatMemberId(true)); // 올바른 회원 ID가 아니에요.