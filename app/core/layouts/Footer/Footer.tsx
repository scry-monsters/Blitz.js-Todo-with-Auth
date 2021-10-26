import React from "react"
import classes from "./footer.module.css"
export default function Footer() {
  return (
    <footer className={classes.main__footer}>
      <a
        className={classes.anchor__man}
        href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Blitz.js
      </a>
    </footer>
  )
}
