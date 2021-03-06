import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import User from "../models/user";
import { compare } from "./bcrypt";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// ローカルpassportの設定

passport.use(
  new LocalStrategy(
    {
      usernameField: "loginId",
      passwordField: "password",
    },
    async (loginId: string, password: string, done: any) => {
      const user = await User.findOne({ where: { loginId } });
      if (!user) {
        return done(null, false);
      }
      const isCorrectPass = await compare(password, user!.authorizeToken!);
      if (!isCorrectPass) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

// jwtPassportの設定

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (jwtPayload: any, done: any) => {
      const user = await User.findOne({
        where: { loginId: jwtPayload.loginId },
      });
      return done(null, user);
    }
  )
);
