import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

const secretKey = 'secreto'
const jwtOptions = {
  secretOrKey: secretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(
  new Strategy(jwtOptions, (payload, done) => {
    if (payload.id === 1) {
      return done(null, { id: 1, username: 'usuario' })
    } else {
      return done(null, false)
    }
    return done(null, false)
  })
)
