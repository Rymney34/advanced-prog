const jwt = require('jsonwebtoken')
const express = require('express');
const { connect } = require('mongoose');

class JWT_Token_Provider {
    constructor(){
    this.JWT_Token = process.env.ACCESS_TOKEN_SECRET
    this.ACCESS_Token_Expires = '15m'
    // const ACCESS_Token_Expires = '15m'
    // const REFRESH_Token_Expires = '2d'
    this.REFRESH_Token = process.env.REFRESH_TOKEN
    this.REFRESH_Token_Expires = "2d"
    }

    

    generateAccessToken(user){
        const JWT_Token = process.env.ACCESS_TOKEN_SECRET
        const REFRESH_Token = process.env.REFRESH_TOKEN
        const ACCESS_Token_Expires = '15m'
        const REFRESH_Token_Expires = '2d'

        const payload = {
            sub: user.id,
            firstName: user.firstName
        }

        return jwt.sign(
            payload, this.JWT_Token, {
                expiresIn: this.ACCESS_Token_Expires
            }
        )
    }

    generateRefreshToken(user){
        return jwt.sign(
            {sub: user.id,
             firstName: user.firstName
            },
            this.REFRESH_Token,
            {expiresIn:this.REFRESH_Token_Expires}
        )
    }

    verifyRefreshToken(token) {
        try {
            // Use the separate, secure secret for refresh tokens
            const userPayload = jwt.verify(token, this.REFRESH_TOKEN_SECRET);
            return userPayload; 
        } catch (err) {
            // Token is invalid or expired
            return null; 
        }
    }

    authenticateToken(req, res, next) {
          const JWT_Token = process.env.ACCESS_TOKEN_SECRET
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Correct split
        console.log(token)
        if (!token || token == null) {
            return res.status(401).json({ message: 'Token missing' });
        }

        jwt.verify(token, JWT_Token, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            req.user = user; // This is correct now (was missing =)
            next();
        });
    }

    

    

}

module.exports = new JWT_Token_Provider();

