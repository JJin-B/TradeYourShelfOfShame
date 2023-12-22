class Posting {
  constructor(
    public _id: string,
    public type: "buy" | "sell",
    public title: string,
    public desc: string,
    public price: number,
    public location: string,
    public imageSrc: string[],
    public author: { _id: string; name: string },
    public createdAt: Date,
    public bggData?: {bggIdx: string; name: string}
  ) {}
}

export default Posting;
