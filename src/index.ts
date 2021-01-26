import { Probot, Context } from 'probot';
import { getChonk } from "./Chonks";

import { createChonkLabels } from "./createChonkLabels";
import { updateLabel } from "./updateLabel";

export = (app: Probot) => {
  app.log("Waiting for CHONK");
  app.on(
    ["pull_request.opened", "pull_request.synchronize"],
    async (context: Context) => {
      const filesChanged = context.payload.pull_request.changed_files;
      const selectedChonk = getChonk(filesChanged);

      await createChonkLabels(context);
      await updateLabel(context, selectedChonk);
    }
  );
};
