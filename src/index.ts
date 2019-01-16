import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.log("Waiting for CHONK");
  app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {
    app.log(context);
    const label = context.issue({
      color: "008330",
      description: "CHONK",
      name: "bug"
    });
    await context.github.issues.createLabel(label);
  })
}
