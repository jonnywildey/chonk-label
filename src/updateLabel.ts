import { Context } from 'probot';
import { Chonks, IChonk } from "./Chonks";

export const updateLabel = async (context: Context, selectedChonk: IChonk) => {
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
