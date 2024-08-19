# Overview
Nova Library is a custom library management software that is hosted with docker. It includes the necessary basic functions such as creating libraries, choosing what data you want to track, and adding/deleting from those libraries as necessary. It was created as a simpler alternative to other library tracking options, as they were either too opinionated or weren't as sustainable in the long term. Another common problem was having multiple software to track different types of collections (i.e. one for books and one for movies), where the unopinionated nature of Nova Library allows for tracking any collection, even those that aren't related to media at all!

Nova Library is an ongoing project, so some features may either be not fully implemented or still in the backlog. If you're interested in helping out, I'm more than open to working with others! That being said, the repo is in need of refactoring for readability, as it was recently overhauled architecturally. It is in working condition, but is not fully shaped around the new architecture (particularly the dashboard/frontend).

# Getting Started with Development
This is a repo that is still in development, and does not have a public image released due to not meeting a minimally viable state for release. If you want to build it for development or just to play around with, you can do so with the following steps: 

1. First set up your db credentials by copying .env.template and renaming it .env and filling out the dummy data with valid credentials
2. If you do not have docker installed, now is the time to do so. You can start [here](https://docs.docker.com/get-docker/)
3. Next, run `npm run build-all` to build the images necessary to run the app
4. Once everything is built, run `npm run start-all` to spin up the containers
5. Everything should be running, and you should be able to start using the frontend at https://localhost:5001, or whatever port you chose if you set it manually

If you have any issues with these steps, please open an issue and I'll get on it asap!
