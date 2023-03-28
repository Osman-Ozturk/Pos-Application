import User from "../models/UserModel.js";
import express from "express"
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail"
import jwt from "jsonwebtoken";

const JWT_KEY =process.env.JWT || "mein_geheimnisePassword";

const router = express.Router()
const updateUser = async (req, res,next) => {
  if ((req.body.userId = req.params.id || req.body.isAdmin)) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        next(error)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Konto wurde aktualisiert");
    } catch (error) {
      next(error)
    }
  }
};

router.delete("/:id", async (req, res,next) => {
  if ((req.body.userId = req.params.id || req.body.isAdmin)) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Konto wurde gelöscht");
    } catch (error) {
      next(error)
    }
  }
});

router.get("/:userName",async (req, res,next) => {
  const userName = req.params.userName;
  try {
    const user = await User.findOne({ userName: userName });
    res.status(201).json(user);
  } catch (error) {
    next(error)
  }
})

router.get("/", async (req, res,next) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    next(error)
  }
})

//register

router.post("/register",async (req, res,next) => {
  try {
  const newUser =req.body 
  const existedUser = await User.findOne({ email: newUser.email });
    if (existedUser) {
      const error = new Error(
        "Es gibt bereits einen User mit der e-Mail-Adresse."
      );
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const createdUser = await User.create({
      ...newUser,
      password: hashedPassword,
    });
  
  
// mit sendGrid email verifizieren

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const token = jwt.sign(
  {
    email: newUser.email,
    _id: createdUser._id,
  },
  JWT_KEY,
  {
    expiresIn: "1h",
  }
);

const msg = {
  to: newUser.email,
  from: "osman_0940@outlook.com",
  subject: "Email Verification",
  text: `Zur Verifizierung der email bitte auf diese Adresse gehen: http://localhost:3000/${token}`,
  html: `<p><a href="http://localhost:3000/verify/${token}">Verifiziere deine email!</a></p>`,
};
const response = await sgMail.send(msg);
const {userName,email,password,profilePicture, isVerified}=newUser
res.status(201).json({userName,email,password,profilePicture, isVerified,token})
} catch (error) {
next(error);
}
})


export const verifyEmail = async (req, res,next) => {
try {
const token = req.params.token;
const decodedToken = jwt.verify(token, JWT_KEY);
const id = decodedToken._id;
const user = await User.findByIdAndUpdate(id, { isVerified: true });

res.send({ message: "email verifiziert" });
} catch (error) {
next(error)
}
};

// login

router.post("/login",async (req, res, next) => {
  try {
    const user = req.body;
    const existedUser = await User.findOne({ email: user.email });
/*     if(!existedUser.isVerified) {
      const err = new Error("Benutzer ist noch nicht verifiziert, bitte verifizieren Sie sich über den Link in Ihrer E-Mail. Wenn der Link älter als eine Stunde ist, fordern Sie bitte einen neuen an.");
      err.statusCode = 401;
      throw err;
    } */

    if (!existedUser) {
       const error = newError(`Kein User mit der eMail ${user.email}`);
      error.statusCode = 401;
      
      throw error; 
    }
    const vergleichRichtigesPasswort = await bcrypt.compare(
      req.body.password,
      existedUser.password
    );
    if (!vergleichRichtigesPasswort) {
    const error = new Error(`Invalid Password`);
      error.statusCode = 403;
      throw error; 
    } 
    const token = jwt.sign({email:existedUser.email,id:existedUser._id}, process.env.JWT,{expiresIn:"1h"})
     // COOKIE CODE //
     const oneHour = 1000 * 60 * 60;
     res
       .cookie("posAppCookie", token, {
         maxAge: oneHour,
         httpOnly: true,
         sameSite: 'none',
         secure: true,
       })
       .json({
         auth: "loggedin",
         username:existedUser.userName,
         email: existedUser.email,
         id: existedUser._id,
         message: "Login SUCCESSFUL!",
         token:token,
         
       });
     // END COOKIE CODE //
  } catch (error) {
    res.status(500).send({ message: "Einloggen fehlgeschlagen" });
    next(error);
  }
})

export default router;

