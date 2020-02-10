import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";
const MAX = 100000000;
const MIN = 10000000;

export const generateLoginSecret = () => {
  const randomNumber = Math.floor(Math.random() * (MAX - MIN) + MIN);
  return randomNumber.toString();
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "no-reply",
    to: address,
    subject: "로그인을 위한 인증코드",
    html: `안녕하세요. 로그인을 위한 인증 코드는 <strong>${secret}</strong>입니다.<br/>인증 코드를 이용해서 로그인 해주세요`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
