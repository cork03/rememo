import React, { useCallback } from "react";
import styled from "styled-components";
import CardModal from "../../../containers/CardModal";
import { colors } from "../../../styles/Variables";

const Container = styled.li`
  background-color: ${colors.card};
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  cursor: pointer;
`;
const Line = styled.div`
  width: 10px;
  background-color: ${colors.gree};
`;

const Info = styled.div`
  width: 100%;
  padding: 0 5px;
`;
const Options = styled.div`
  display: flex;
  border-top: 1px solid ${colors.gree};
  font-size: 12px;
  padding: 5px;
`;
const Title = styled.p`
  padding: 5px;
  font-weight: bold;
`;
const OptionParts = styled.div`
  margin-right: 10px;
`;
const Icon = styled.i`
  margin-right: 1px;
  color: ${colors.icon};
`;

export const Card = ({ card, showModal, checkDelete, learned }: any) => {
  const { userCategories, cardLinks, leanCount } = card;
  const categoryName = userCategories[0].name;
  const isCategory = cardLinks[0];
  const count = useCallback(() => {
    let _count = leanCount;
    if (!learned) {
      _count++;
    }
    return _count;
  }, [leanCount]);
  const showCard = useCallback(() => {
    showModal({
      component: <CardModal card={card} checkDelete={checkDelete} />,
    });
  }, [card]);
  return (
    <Container onClick={showCard}>
      <Line />
      <Info>
        <Title>{card.title}</Title>
        <Options>
          <OptionParts>
            <Icon className="fas fa-tag" />
            {categoryName}
          </OptionParts>
          <OptionParts>
            <Icon className="fas fa-graduation-cap" />
            {count()}回目
          </OptionParts>

          {isCategory ? (
            <OptionParts>
              <Icon className="fas fa-paperclip" />
            </OptionParts>
          ) : (
            <></>
          )}
        </Options>
      </Info>
    </Container>
  );
};
