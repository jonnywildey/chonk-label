import { Application, Context } from 'probot' // eslint-disable-line no-unused-vars
import { Chonks, getChonk, IChonk } from "./Chonks";

export = (app: Application) => {
  app.log("Waiting for CHONK");
  app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {

    const filesChanged = context.payload.pull_request.changed_files;
    const selectedChonk = getChonk(filesChanged);

    await createChonkLabels(context);
    await updateLabel(context, selectedChonk);
  })
}

const updateLabel = async (context: Context, selectedChonk: IChonk) => {
  const labels = await context.github.issues.listLabelsOnIssue(context.issue({}));
  if (labels.data.find(l => l.name === selectedChonk.name)) {
    context.log(`Label is correct`);
    return;
  }
  // Remove previous chonk labels
  await Promise.all(Chonks.map(async (c) => {
    if (labels.data.find(l => l.name === c.name)) {
      context.log(`Deleting label ${c.name}`);
      return context.github.issues.deleteLabel(context.issue({
        name: c.name
      }))
    }
    return;
  }))
  // Add a new label
  context.log(`Adding label ${selectedChonk.name}`);
  await context.github.issues.addLabels(context.issue({
    labels: [selectedChonk.name]
  }));
}

const createChonkLabels = async (context: Context) => {
  const labels = await context.github.issues.listLabelsForRepo(context.issue({}));
  await Promise.all(Chonks.map(async c => {
    if (labels.data.find(d => d.name === c.name)) {
      return;
    }
    return context.github.issues.createLabel(context.issue({
      name: c.name,
      color: c.color,
      description: c.name
    }));
  }));
}
