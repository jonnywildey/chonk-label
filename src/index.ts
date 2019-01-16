import { Application, Context } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on(['pull_request.opened', 'pull_request.synchonize'], async (context) => {
    await context.github.issues.createLabel({
      color: "008330",
      description: "CHONK",
      name: "A Fine Boi",
      owner: "Chonk",
      repo: context.payload.pull_request.repo.id
    })
  })
