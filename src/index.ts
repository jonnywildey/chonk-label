import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.log("Waiting for CHONK");
  app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {
    // app.log(context);
    // const label = context.issue({
    //   color: "008330",
    //   description: "CHONK",
    //   name: "bug"
    // });
    // const commits = await context.github.pullRequests.(context.repo({ number: pr.number }))

    const filesChanged = context.payload.pull_request.changed_files;
    const chonk = getChonk(filesChanged);


    const message = `This PR has been labeled as **${chonk.text}** ![#${chonk.color}](https://placehold.it/15/${chonk.color}/000000?text=+)`
    context.github.issues.createComment(context.issue({
      body: message
    }));

    const labels = await context.github.issues.listLabelsForRepo(context.issue({}));
    console.log("labels", labels);
    const createPromises = await Promise.all(chonks.map(async c => {
      if (labels.data.find(d => d.name === c.text)) {
        return;
      }
      return context.github.issues.createLabel(context.issue({
        name: c.text,
        color: c.color,
        description: c.text
      }));
    }));

    await context.github.issues.addLabels(context.issue({
      labels: [chonk.text]
    }));

  })
}

const createChonkLabels = (context: any) => {

}

interface IChonk {
  text: string;
  color: string;
  fileLimit: number;
}

const chonks: IChonk[] = [
  {
    text: "A Fine Boi",
    color: "01c528",
    fileLimit: 10
  },
  {
    text: "They Chomnk'",
    color: "ddb706",
    fileLimit: 20
  },
  {
    text: "A Hecklin' Chonker",
    color: "fea000",
    fileLimit: 40
  },
  {
    text: "HEFTYCHONK",
    color: "ff7300",
    fileLimit: 80
  },
  {
    text: "MEGACHONKER",
    color: "fd0000",
    fileLimit: 160
  },
  {
    text: "OH LAWD HE COMIN",
    color: "c70304",
    fileLimit: Infinity
  }
];

const getChonk = (filesChanged: number): IChonk => {
  return chonks.find(c => filesChanged < c.fileLimit)!;
}
