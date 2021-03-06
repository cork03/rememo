import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ErrorMessage } from "../atoms/ErrorMessage";
import { PassWordInput, TextInput } from "../atoms/Input";
import { SignUpModal } from "./SignUpModal";
import Button from "../atoms/Buttons";
import { axiosAuthorization } from "../../axios/setting";

const Container = styled.div`
  margin: 0 auto 60px auto;
  width: 70%;
`;

const Title = styled.h2`
  margin: 20px 0;
  text-align: center;
`;

const InputArea = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;
const Text = styled.p`
  width: 160px;
`;

const LoginArea = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
`;

const UnLogin = styled.div`
  margin: 30px 0;
  text-align: center;
`;
const SignUp = styled.a`
  cursor: pointer;
  font-weight: 700;
  margin-left: 10px;
`;

export const LoginModal = ({
  hideModal,
  userLogin,
  showModal,
  createUser,
  returnUser,
}: any) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const messageError = useCallback(() => {
    if (!mail) {
      setErrorMessage("メールアドレスを入力してください。");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("パスワードは６文字以上入力してください。");
      return;
    }
    return true;
  }, [setErrorMessage, mail, password, setMail, setPassword]);
  const unAuthorizedError = useCallback(() => {
    setMail("");
    setPassword("");
    setErrorMessage("メールアドレス、またはパスワードに誤りがあります。");
  }, [setMail, setPassword, setErrorMessage]);
  const login = useCallback(async () => {
    const noOmission = messageError();
    if (noOmission) {
      const isSuccess = await userLogin({
        payload: {
          loginId: mail,
          password,
        },
      });
      if (isSuccess) {
        axiosAuthorization();
        hideModal();
        returnUser();
      }
      unAuthorizedError();
    }
  }, [userLogin, hideModal, history, messageError]);
  const gestLogin = useCallback(async () => {
    await userLogin({
      payload: {
        loginId: "tsubasa",
        password: "tsubasa",
      },
    });
    axiosAuthorization();
    hideModal();
    returnUser();
  }, [login, hideModal, history]);
  const forSignUP = useCallback(() => {
    hideModal();
    showModal({
      component: (
        <SignUpModal
          hideModal={hideModal}
          createUser={createUser}
          returnUser={returnUser}
          userLogin={userLogin}
        />
      ),
    });
  }, [showModal, hideModal]);
  return (
    <Container>
      <Title>ログイン</Title>
      <InputArea>
        <Text>メールアドレス：</Text>
        <TextInput
          value={mail}
          onChangeText={setMail}
          placeholder="例：taro@example.com"
        />
      </InputArea>
      <InputArea>
        <Text>パスワード：</Text>
        <PassWordInput
          value={password}
          onChangeText={setPassword}
          placeholder="6文字以上入力してください"
        />
      </InputArea>
      {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : <></>}
      <LoginArea>
        <Button type="loginModalSkyBlue" onClick={login}>
          ログイン
        </Button>
        <Button type="loginModalPrimary" onClick={gestLogin}>
          ゲストユーザー
        </Button>
      </LoginArea>
      <UnLogin>
        登録してない方<SignUp onClick={forSignUP}>アカウント作成</SignUp>
      </UnLogin>
    </Container>
  );
};
