import { Context } from 'probot';
import { Chonks } from "./Chonks";

export const createChonkLabels = async (context: Context) => {
  const labels = await context.github.issues.listLabelsForRepo(context.issue({}));
  await Promise.all(Chonks.map(async c => {
    if (labels.data.find(d => d.name === c.name)) {
      return;
    }
    context.log(`Creating label ${c.name}`);
    return context.github.issues.createLabel(context.issue({
      name: c.name,
      color: c.color,
      description: c.name
    }));
  }));
}
