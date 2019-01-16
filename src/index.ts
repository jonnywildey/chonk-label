import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.log("Waiting for CHONK");
  app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {
    app.log(context);
    await context.github.issues.createLabel({
      color: "008330",
      description: "CHONK",
      name: "A Fine Boi",
      owner: "Chonk",
      repo: context.payload.pull_request.head.repo.id
    })
  })
}
