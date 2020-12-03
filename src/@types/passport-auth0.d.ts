/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// https://github.com/r-k-b/passport-auth0/blob/typescript-def/index.d.ts

declare module 'passport-auth0' {

  import passport = require('passport')
  import express = require('express')

  export interface Profile extends passport.Profile {
    id: string
    displayName: string
    gender?: string
    ageRange?: {
      min: number
      max?: number
    }
    profileUrl?: string
    username?: string
    birthday: string

    _raw: string
    _json: any
  }

  export interface AuthenticateOptions extends passport.AuthenticateOptions {
    clientID: string
    domain: string
    redirectUri: string
    audience: string
    responseType: string
  }

  export interface StrategyOption {
    domain: string
    clientID: string
    clientSecret: string
    callbackURL: string

    scopeSeparator?: string
    enableProof?: boolean
    profileFields?: string[]
  }

  export interface StrategyOptionWithRequest extends StrategyOption {
    passReqToCallback: true
  }

  export interface ExtraVerificationParams {
    audience?: string
    connection?: string
    prompt?: string
  }

  export type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    extraParams: ExtraVerificationParams,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) => void

  export type VerifyFunctionWithRequest = (
    req: express.Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) => void

  export default class Auth0Strategy implements passport.Strategy {
    constructor(
      options: StrategyOptionWithRequest,
      verify: VerifyFunctionWithRequest,
    )

    constructor(options: StrategyOption, verify: VerifyFunction)

    name: string

    authenticate: (req: express.Request, options?: object) => void
  }
}
