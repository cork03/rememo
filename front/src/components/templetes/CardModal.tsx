import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../styles/Variables";
import Button from "../atoms/Buttons";
import Input from "../atoms/Input";
import { TextArea } from "../atoms/TextArea";
import { counts } from "../../utils";

const Container = styled.div`
  margin: 10px;
`;

const Width = styled.div`
  margin: 10px auto;
`;
const TitleArea = styled.div``;
const Title = styled.label``;

const BodyArea = styled.div`
  margin-top: 30px;
`;
const BodyTitle = styled.label``;

const LinksArea = styled.div`
  margin-top: 20px;
`;
const LinkArea = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const LinksTitle = styled.label``;
const LinkButton = styled.a`
  min-width: 50px;
  text-align: center;
  color: white;
  padding: 4px 0;
  margin: 4px;
  border-radius: 6px;
  cursor: pointer;
  background: ${colors.skyBlue};
  border-bottom: 2px solid ${colors.darkSkyBlue};
  &:hover {
    background: ${colors.darkSkyBlue};
  }
`;
const Options = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CountArea = styled.div``;
const CountTitle = styled.label`
  margin-right: 7px;
`;

const CategoryArea = styled.div``;
const CategoryTitle = styled.label`
  margin-right: 7px;
`;
const NewCategoryArea = styled.div`
  display: flex;
`;

const SubmitArea = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;
const Icon = styled.i`
  margin-right: 5px;
`;

const SubmitRight = styled.div``;
const SubmitLeft = styled.div`
  display: flex;
`;

export const CardModal = ({
  card,
  hideModal,
  checkCard,
  patchCard,
  deleteLink,
  createCategory,
  userCategories,
  fetchCategory,
  deleteCard,
  checkDelete,
}: any) => {
  const categoryId = card.userCategories[0]?.id;
  const [title, setTitle] = useState(card.title);
  const [body, setBody] = useState(card.body);
  const [links, setLinks] = useState({});
  const [newLinks, setNewLinks] = useState({});
  const [forAddLink, setForAddLink] = useState("");
  const [count, setCount] = useState(card.totalCount);
  const [id, setId] = useState(0);
  const [category, setCategory] = useState(categoryId || 0);
  const [forAddCategory, setForAddCategory] = useState("");
  const changeCount = useCallback(
    (e) => {
      setCount(e.target.value);
    },
    [setCount]
  );
  const changeCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [setCategory]
  );
  const check = useCallback(() => {
    checkCard(card.id);
    hideModal();
  }, [checkCard, hideModal]);
  const patch = useCallback(() => {
    const linksValue = Object.values(links);
    const linkEl = linksValue.reduce((acc: any, item: any) => {
      acc.push({ id: item.id, string: item.string });
      return acc;
    }, []);
    const newLinksValue = Object.values(newLinks);
    const newLinkEl = newLinksValue.reduce((acc: any, item: any) => {
      acc.push(item.string);
      return acc;
    }, []);
    patchCard(
      {
        payload: {
          title,
          body,
          totalCount: count,
          categoryIds: [category],
          links: linkEl,
          newLinks: newLinkEl,
        },
      },
      card.id
    );
    hideModal();
  }, [patchCard, hideModal, title, body, count, category, links, newLinks]);
  const addLink = useCallback(() => {
    let test = newLinks;
    setId(id + 1);
    test = { ...test, [id]: { id, string: forAddLink } };
    setNewLinks({ ...newLinks, ...test });
    setForAddLink("");
  }, [forAddLink, setNewLinks, newLinks, id, setId, setForAddLink]);
  const addCategory = useCallback(() => {
    createCategory({
      payload: {
        userCategories: {
          name: forAddCategory,
        },
      },
    });
    setForAddCategory("");
  }, [createCategory, forAddCategory, setForAddCategory]);
  const _deleteCard = useCallback(() => {
    deleteCard(card.id);
    hideModal();
  }, [deleteCard, card, hideModal]);
  useEffect(() => {
    const links = card.cardLinks.reduce((acc: any, item: any) => {
      acc[item.id] = item;
      return acc;
    }, {});
    setLinks(links);
    fetchCategory();
  }, [fetchCategory, setLinks, card]);
  const categories = Object.values(userCategories);
  return (
    <Container>
      <Width>
        <TitleArea>
          <Title>
            <Icon className="fas fa-pen" />
            タイトル
          </Title>
          <Input type="default" value={title} onChangeText={setTitle} />
        </TitleArea>
        <BodyArea>
          <BodyTitle>
            <Icon className="fas fa-book-open" />
            内容
          </BodyTitle>
          <TextArea value={body} onChangeText={setBody} />
        </BodyArea>
        <LinksArea>
          <LinksTitle>
            <Icon className="fas fa-paperclip" />
            参考サイト
          </LinksTitle>
          {Object.values(links).map((link: any) => {
            const onChange = (text: string) => {
              const newItem = { ...link, string: text };
              const _links = { ...links, [link.id]: newItem };
              setLinks(_links);
            };
            const _deleteLink = () => {
              deleteLink(link.id);
              const _links: any = { ...links };
              delete _links[link.id];
              setLinks(_links);
            };
            return (
              <LinkArea>
                <Input
                  type="default"
                  value={link.string}
                  onChangeText={onChange}
                />
                <LinkButton
                  href={link.string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt" />
                </LinkButton>
                <Button type="smallDanger" onClick={_deleteLink}>
                  <i className="fas fa-trash" />
                </Button>
              </LinkArea>
            );
          })}
          {Object.values(newLinks).map((link: any) => {
            const onChange = (text: string) => {
              const newItem = { ...link, string: text };
              const _links = { ...newLinks, [link.id]: newItem };
              setNewLinks(_links);
            };
            const _deleteLink = () => {
              const _links: any = { ...newLinks };
              delete _links[link.id];
              setNewLinks(_links);
            };
            return (
              <LinkArea>
                <Input
                  type="default"
                  value={link.string}
                  onChangeText={onChange}
                />
                <LinkButton
                  href={link.string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt" />
                </LinkButton>
                <Button type="smallDanger" onClick={_deleteLink}>
                  <i className="fas fa-trash" />
                </Button>
              </LinkArea>
            );
          })}
          <LinkArea>
            <Input
              type="dafalut"
              value={forAddLink}
              onChangeText={setForAddLink}
              placeholder="リンクの追加 例:http://www.example.com"
            />
            <Button type="smallBlue" onClick={addLink}>
              <i className="fas fa-plus-circle" />
            </Button>
          </LinkArea>
        </LinksArea>
        <Options>
          <CountArea>
            <CountTitle>再表示回数</CountTitle>
            <select value={count} onChange={changeCount}>
              {counts.map((count: number) => {
                return <option value={count}>{count}</option>;
              })}
            </select>
          </CountArea>
          <CategoryArea>
            <CategoryTitle>カテゴリー</CategoryTitle>
            <select value={category} onChange={changeCategory}>
              <option value="0">なし</option>
              {categories.map((category: any) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </CategoryArea>
          <NewCategoryArea>
            <Input
              type="default"
              value={forAddCategory}
              onChangeText={setForAddCategory}
              placeholder="カテゴリーを追加する"
            />
            <Button type="smallBlue" onClick={addCategory}>
              <i className="fas fa-plus-circle" />
            </Button>
          </NewCategoryArea>
        </Options>
        <SubmitArea>
          <SubmitLeft>
            <Button type="primary" onClick={patch}>
              変更を保存
            </Button>

            {card.checked ? (
              <></>
            ) : (
              <Button type="danger" onClick={check}>
                学習完了
              </Button>
            )}
          </SubmitLeft>
          <SubmitRight>
            <Button type="skyBlue" onClick={_deleteCard}>
              削除
            </Button>
          </SubmitRight>
        </SubmitArea>
      </Width>
    </Container>
  );
};
