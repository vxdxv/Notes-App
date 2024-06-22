import express from "express";
const router=express.Router();
import passport from "passport";
import User from "../models/User.js";
// import dotenv from "dotenv";
// dotenv.config();
import GoogleStrategy from 'passport-google-oauth20';
const Google_Strategy=GoogleStrategy.Strategy;
passport.use(new Google_Strategy({
    clientID: "81985617287-09qq29m318egp1vk19uddefi2c34nici.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:3000/google/callback",
  },
  async function(accessToken, refreshToken, profile, done ){
    const newUser = {
        googleId:profile.id,
        firstName:profile.name.givenName,
        lastName:profile.name.familyName,
        profileImage:profile.photos[0].value,

    };
    try{
        let user=await User.findOne({
            googleId:profile.id
        });
        if(user){
            done(null,user);
        }else{
            user= await User.create(newUser);
            done(null,user);
        }

    }catch(error){
        console.log(error);
    }

   
    // console.log(profile);
  }
));

//Google Login Route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

  //Retrieve user data
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failure',
    successRedirect:'/dashboard'
 }),);

router.get("/login-failure",(req,res)=>{
    res.send("Something went wrong...");
})

//Destroy the session (logout button)
router.get('/logout',(req,res)=>{
    req.session.destroy(error=>{
        if(error){
            console.log(error);
            res.send('Error logging out');
        }else{
            res.redirect('/');
        }
    })
})

//Presist user data after successful authentication
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//Retrieve user data from session
passport.deserializeUser(async (id,done)=>{
    try {
        const user = await User.findById(id);
        if (user) {
          // Handle user data
          done(null,user);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
      
})

export default router;