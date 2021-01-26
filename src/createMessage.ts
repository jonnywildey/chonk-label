import { Context } from 'probot';
import { IChonk } from "./Chonks";

export const createMessage = (context: Context, selectedChonk: IChonk) => {
  const message = `This PR has been labeled as **${selectedChonk.name}** ![#${selectedChonk.color}](https://placehold.it/15/${selectedChonk.color}/000000?text=+)`
  context.octokit.issues.createComment(context.issue({
    body: message
  }));
}
