# 🌐 Web-A

UMC EWHA 11th PE Web A 프론트엔드 레포지토리입니다.

## 🙌 Our Crew

| 닉네임 | 이름 | GitHub |
|:---:|:---|:---|
| 초코 | 김서현 | [@seohyeonS2](https://github.com/seohyeonS2) |
| 젠 | 송승희 | [@SunieSong](https://github.com/SunieSong) |
| 하콩 | 김미리 | [@mirikim404](https://github.com/mirikim404) |
| 하치 | 장지원 | [@jjw1214-jiwon](https://github.com/jjw1214-jiwon) |
| 섬섬 | 강서연 | [@Kangseo0331](https://github.com/Kangseo0331) |

---

## 🌳 Branch 구조

작업 공간을 안전하게 분리하기 위해 아래와 같은 브랜치 구조를 사용합니다.

```text
main
 └── 닉네임/main (개인별 기본 브랜치)
      ├── 닉네임/week1 (1주차 작업 브랜치)
      ├── 닉네임/week2 (2주차 작업 브랜치)
      └── ...
```
### ⚠️ PR(Pull Request) 생성 시 주의사항
주차별 작업 브랜치(예: 닉네임/week1)에서 작업을 마치고 PR을 올릴 때, Base는 공통 main 브랜치가 아닌 본인의 닉네임/main 브랜치로 지정해 주세요!

---
## 💡 Commit Convention
일관성 있는 기록을 위해 아래의 커밋 메시지 규칙을 준수합니다.

| Type | Description |
| :--- | :--- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `docs` | 문서/주석 수정 |
| `chore` | 빌드 설정, 패키지 관리 등 |
