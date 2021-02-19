<p align="center">
  <img height="80" src="./src/server/public/images/logo-full.svg">
</p>

<p align="center">
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/BartoszOsn/Drafty">
  <img alt="Vue version" src="https://img.shields.io/badge/Vue.js-v2.6-brightgreen?logo=vue.js">
  <img alt="Vue version" src="https://img.shields.io/badge/Express.js-v4.17-brightgreen">
</p>

- [Summary](#summary)
- [Usage](#usage)
- [Running Drafty locally](#running-drafty-locally)
  - [Requirements](#requirements)
  - [Setting up](#setting-up)

## Summary
Drafty is a web application made for writing screenplays. It was inspired by Google Docs and my will to find a new hobby :smile:

## Usage
As for now, Drafty isn't online. To actually use it, see the section: [Running Drafty locally](#running-drafty-locally).

When you visit the home page, you should see something similiar to this:

![Drafty's home page](/doc_images/home.png)

Click `Create account`, and it will transfer you to registation page. You will see something like this:

![Drafty's register page](/doc_images/register.png)

After you complete required fields, click `Create account`.
You will be automatically logged in. click `Enter editor` button.

![Drafty's screenplay's list page](/doc_images/browse.png)

Click `New screenplay` button in the left top corner, to create a new screenplay.

![Drafty's editor page](/doc_images/edit.png)

That's the editor page. Click on the pencil icon next to `Untitled` to change your screenplay's name. Below that, there are buttons to select a type of the current paragraph, button to export your screenplay to `*.pdf`, and a slider for controlling zoom.

To start writing screenplay, click on the paragraph which you want to edit (currently, there is only one empty at the top of the page.) Background color of it should change slightly when you hover the cursor over it.

You add the next paragraph by clicking enter. The type of it is set automatically based on the previous one. For example, when you press enter while the cursor is on `Character Cue` type, the type of the new paragraph will be `Dialogue`. You can change the type of the current paragraph using buttons on the left, or by pressing combinations of `Tab` and `Shift+Tab`.

## Running Drafty locally
As for now, Drafty isn't deployed for production. The only way to use it, is to run it locally, on your own machine.

### Requirements
To run Drafty's server on your local machine you must have MongoDB installed.

### Setting up

1. On your PC, open the terminal and run: `git clone https://github.com/bartoszOsn/Drafty`. A folder called `drafty` will be created.
2. Run `cd drafty` to enter the project directory, and then `npm install` to install all dependencies.
3. Create file `secret.js` in Drafty's directory and paste into it:
    ```
    exports.sessionSecret = '<random-string>';
    exports.mail = {
        user: '<email-login>',
        pass: '<email-password>'
    };
    ```
    Change the `<random string>` with, well... some random string. It will we used for hashing password.
    If you want to be able to reset passwords, you must provide some e-mail account credentials. It will be used for sending mails with tokens allowing for changing your password. If you're not planning to forget your password in the future, just leave it like that.
4. Run `npm start`. you will see the output similiar to this:
    ```
    [nodemon] 2.0.7
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): src\**\*
    [nodemon] watching extensions: (all)
    [nodemon] starting `node start.js`
    Server listening at http://localhost:3000
    ```
5. open link from the last line (http://localhost:3000) in your browser.
   
That's it! You should see now Drafty's home page.