import nodemailer from 'nodemailer'
import { Container } from 'typedi'
import config from '../config'

export default async () => {
  try {
    Container.set('email-client', nodemailer.createTransport(config.email))
  } catch (err) {
    console.log(err)
    throw err
  }
}