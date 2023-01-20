/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ExplainText from "components/Text/ExplainText";

function Explain() {
  return (
    <section css={sizeWrapper}>
      <ExplainText summary="안녕하세요 !" />
      <ExplainText summary="온수냠냠냠 관리 페이지입니다." />
      <ExplainText summary="이후에도 저희 온수냠냠냠이 원활하게 이루어지길 바라는 마음에 적어봅니다." />
      <br />
      <ExplainText summary="navbar의 식당 메뉴에서 온수냠냠냠 식당들을 관리할 수 있습니다. 해당 식당을 수정, 삭제할 수 있으며 새로운 식당도 추가할 수 있도록 구성되어 있습니다." />
      <ExplainText summary="해당 식당을 클릭하면 식당의 각 메뉴들을 수정할 수 있습니다. 메뉴의 종류나 가격이 아주 정확하지 않아서 꾸준한 관리가 필요할 것 같아요." />
      <ExplainText summary="밥풀 메뉴에서 교내의 밥full을 관리할 수 있습니다. 이 글을 적는 지금은 밥full이 교내에 있는데 이후에도 있을진 잘 모르겠네요." />
      <br />
      <ExplainText summary="따로 온수냠냠냠 타임라인 링크도 첨부할게요. 더 궁금한 사항이나 필요한 게 있다면 언제든 편하게 연락주세요!" />
      <ExplainText summary="많은 사람에게 더욱 편리하고 유용한 서비스로 성장하길 기대하고 응원할게요." />
      <br />
      <ExplainText highlight="온수냠냠냠 화이팅 !!🍔🍕🍟🌭🍿🥞🍗 " />
      <div css={endSummary}>
        <ExplainText summary="23.01.06" />
        <ExplainText summary="한슬희, 한현수" />
      </div>
    </section>
  );
}

export default Explain;

const sizeWrapper = css`
  position: relative;
  width: fit-content;
  padding: 0 3rem;
`;

const endSummary = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
