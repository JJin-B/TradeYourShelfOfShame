class Posting {
  constructor(
    public _id: string,
    public type: "buy" | "sell",
    public title: string,
    public desc: string,
    public price: number,
    public location: string,
    public author: { _id: string; name: string },
    public createdAt: Date,
    public imageSrc: string[],
    public bggData: [{ bggIdx: string; name: string; year?: string }]
  ) {}
}

export default Posting;
