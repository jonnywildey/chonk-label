export interface IChonk {
  name: string;
  color: string;
  fileLimit: number;
}

export const Chonks: IChonk[] = [
  {
    name: "A Fine Boi",
    color: "01c528",
    fileLimit: 10
  },
  {
    name: "They Chomnk",
    color: "ddb706",
    fileLimit: 20
  },
  {
    name: "A Heckin' Chonker",
    color: "fea000",
    fileLimit: 40
  },
  {
    name: "HEFTYCHONK",
    color: "ff7300",
    fileLimit: 80
  },
  {
    name: "MEGACHONKER",
    color: "fd0000",
    fileLimit: 160
  },
  {
    name: "OH LAWD HE COMIN",
    color: "c70304",
    fileLimit: Infinity
  }
];

export const getChonk = (filesChanged: number): IChonk => {
  return Chonks.find(c => filesChanged < c.fileLimit)!;
}
